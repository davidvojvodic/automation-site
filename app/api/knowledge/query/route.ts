import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!
});

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Verify authentication
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse request
    const { question, language, category, conversationId } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 });
    }

    // Verify conversation belongs to user
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('id')
      .eq('id', conversationId)
      .eq('user_id', session.user.id)
      .single();

    if (convError || !conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // 3. Generate embedding for question using Voyage AI REST API
    const embeddingResponse = await fetch('https://api.voyageai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`,
      },
      body: JSON.stringify({
        input: [question],
        model: 'voyage-3-large',
        input_type: 'document',
      }),
    });

    if (!embeddingResponse.ok) {
      throw new Error(`Voyage AI API error: ${embeddingResponse.statusText}`);
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    console.log('Query embedding length:', queryEmbedding.length);
    console.log('First 5 values:', queryEmbedding.slice(0, 5));

    // 4. Search Supabase for similar chunks
    // Pass the array directly as per Supabase documentation
    const { data: results, error } = await supabase.rpc('match_embeddings', {
      query_embedding: queryEmbedding,  // Pass array directly
      match_threshold: 0.6,
      match_count: 5,
      filter_language: language || null,
      filter_category: category || null
    });

    console.log('Supabase RPC error:', error);
    console.log('Supabase RPC results count:', results?.length || 0);

    if (results && results.length > 0) {
      console.log('Top result similarity:', results[0].similarity);
    }

    if (error) {
      console.error('Supabase search error:', error);
      return NextResponse.json({
        answer: "I encountered an error searching the knowledge base. Please try again.",
        sources: [],
        confidence: 'low',
        debug: { error: error.message }
      });
    }

    if (!results || results.length === 0) {
      return NextResponse.json({
        answer: "I couldn't find relevant information in the Flowko knowledge base for that question. Try rephrasing or asking about our services, pricing, or business processes.",
        sources: [],
        confidence: 'low',
        debug: { message: 'No results from vector search' }
      });
    }

    // 5. Calculate confidence
    const topScore = results[0].similarity;
    const confidence = topScore > 0.8 ? 'high' : topScore > 0.6 ? 'medium' : 'low';

    // 6. Build context from results
    const context = results.map((r: {
      doc_title: string;
      doc_source: string;
      doc_language: string;
      chunk_content: string;
      similarity: number;
    }) =>
      `Document: ${r.doc_title}\n` +
      `Source: ${r.doc_source}\n` +
      `Language: ${r.doc_language}\n` +
      `Content:\n${r.chunk_content}\n`
    ).join('\n---\n\n');

    // 7. Generate answer with Claude
    const systemPrompt = `You are a knowledgeable assistant for Flowko, an AI automation business.

Answer the user's question using ONLY the provided context from Flowko's business documents.

Rules:
1. Be accurate and concise
2. Cite specific documents when making claims (use "According to [Document Name]...")
3. If confidence is "low", acknowledge uncertainty
4. If context doesn't fully answer the question, say what you know and what's missing
5. Include specific numbers, prices, or details when available
6. Format your answer clearly with bullet points or paragraphs as appropriate
7. Be professional and helpful

Context from Flowko Knowledge Base:
${context}

Confidence Level: ${confidence}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      temperature: 0.1,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: question
      }]
    });

    const answer = message.content[0].type === 'text' ? message.content[0].text : '';
    const responseTime = Date.now() - startTime;

    // 8. Save messages to database
    const sources = results.map((r: {
      doc_title: string;
      doc_source: string;
      doc_language: string;
      chunk_content: string;
      similarity: number;
    }) => ({
      doc_title: r.doc_title,
      doc_source: r.doc_source,
      doc_language: r.doc_language,
      chunk_content: r.chunk_content.substring(0, 300) + '...',
      similarity_score: r.similarity
    }));

    // Save user message
    const { error: userMsgError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role: 'user',
        content: question,
      });

    if (userMsgError) {
      console.error('Error saving user message:', userMsgError);
    }

    // Save assistant message
    const { error: assistantMsgError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role: 'assistant',
        content: answer,
        sources: sources,
        confidence: confidence,
        response_time_ms: responseTime,
      });

    if (assistantMsgError) {
      console.error('Error saving assistant message:', assistantMsgError);
    }

    // 9. Auto-generate title if this is the first message
    const { count } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('conversation_id', conversationId);

    if (count === 2) { // First Q&A pair (2 messages)
      const { data: titleData } = await supabase
        .rpc('generate_conversation_title', { p_conversation_id: conversationId });

      if (titleData) {
        await supabase
          .from('conversations')
          .update({ title: titleData })
          .eq('id', conversationId);
      }
    }

    // 10. Log query for analytics
    await supabase
      .from('knowledge_queries')
      .insert({
        user_id: session.user.id,
        conversation_id: conversationId,
        query_text: question,
        answer_text: answer,
        confidence_score: confidence,
        response_time_ms: responseTime,
        sources_count: sources.length,
      });

    // 11. Return response
    return NextResponse.json({
      answer,
      sources,
      confidence,
      response_time_ms: responseTime
    });

  } catch (error) {
    const err = error as Error;
    console.error('Query error:', err);
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    );
  }
}
