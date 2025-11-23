"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Bot,
  User,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Source {
  doc_title: string;
  doc_source: string;
  doc_language: string;
  chunk_content: string;
  similarity_score: number;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  confidence?: "high" | "medium" | "low";
  timestamp: Date;
}

interface KnowledgeChatProps {
  conversationId: string;
  onConversationUpdate?: () => void;
}

export function KnowledgeChat({ conversationId, onConversationUpdate }: KnowledgeChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [error, setError] = useState("");
  const [expandedSources, setExpandedSources] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages when conversation changes
  useEffect(() => {
    loadMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  const loadMessages = async () => {
    try {
      setLoadingMessages(true);
      const response = await fetch(`/api/conversations/${conversationId}`);

      if (!response.ok) {
        throw new Error("Failed to load messages");
      }

      const data = await response.json();
      const loadedMessages = data.conversation.messages.map((msg: {
        id: string;
        role: 'user' | 'assistant';
        content: string;
        sources?: Source[];
        confidence?: 'high' | 'medium' | 'low';
        created_at: string;
      }) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        sources: msg.sources || [],
        confidence: msg.confidence,
        timestamp: new Date(msg.created_at),
      }));

      setMessages(loadedMessages);
    } catch (err) {
      console.error("Error loading messages:", err);
      setError("Failed to load conversation history");
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const question = input.trim();
    setInput("");
    setLoading(true);
    setError("");

    // Optimistically add user message
    const optimisticUserMessage: Message = {
      id: `temp-user-${Date.now()}`,
      role: "user",
      content: question,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, optimisticUserMessage]);

    try {
      const response = await fetch("/api/knowledge/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      // Reload messages from database to get persisted versions
      await loadMessages();

      // Update conversation list in sidebar
      if (onConversationUpdate) {
        onConversationUpdate();
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error("Chat error:", err);
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m.id !== optimisticUserMessage.id));
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "high":
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-green-400 font-semibold">
              High Confidence
            </span>
          </div>
        );
      case "medium":
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-lg backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs text-yellow-400 font-semibold">
              Medium Confidence
            </span>
          </div>
        );
      case "low":
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs text-red-400 font-semibold">
              Low Confidence
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  if (loadingMessages) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-n-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-color-1/20 to-color-2/20 blur-2xl rounded-full" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-color-1 to-color-2 rounded-2xl flex items-center justify-center shadow-xl shadow-color-1/20 animate-pulse">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        </div>
        <p className="mt-6 text-sm text-n-3 font-medium">Loading conversation...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-color-1/20 to-color-2/20 blur-2xl rounded-full" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-color-1 to-color-2 rounded-2xl flex items-center justify-center shadow-xl shadow-color-1/20 transition-transform duration-500 hover:scale-110">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-color-1/10 to-color-2/10 border border-color-1/20 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-color-1" />
              <span className="text-xs font-medium text-color-1">AI-Powered Knowledge Base</span>
            </div>
            <h3 className="text-2xl font-bold text-n-1 mb-3 bg-gradient-to-r from-n-1 to-n-3 bg-clip-text text-transparent">
              Ask me anything about Flowko
            </h3>
            <p className="text-sm text-n-3 max-w-md mb-8 leading-relaxed">
              I can help you with questions about our services, pricing,
              processes, and business information.
            </p>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
              {[
                "What are Flowko's pricing tiers?",
                "What services does Flowko offer?",
                "How does the automation process work?",
                "What is included in the website bundles?",
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(suggestion)}
                  style={{
                    animationDelay: `${300 + idx * 150}ms`,
                  }}
                  className="group p-4 text-left text-sm text-n-3 bg-gradient-to-br from-n-7 to-n-8 border border-n-6 rounded-xl hover:border-color-1/50 hover:text-n-1 hover:-translate-y-1 hover:shadow-xl hover:shadow-color-1/10 transition-all duration-300 animate-fade-in opacity-0 [animation-fill-mode:forwards]"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-n-5 group-hover:text-color-1 transition-colors duration-300 flex-shrink-0 mt-0.5" />
                    <span>{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, msgIdx) => (
            <div
              key={message.id}
              style={{
                animationDelay: `${msgIdx * 100}ms`,
              }}
              className={cn(
                "flex gap-4 animate-fade-in opacity-0 [animation-fill-mode:forwards]",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 bg-gradient-to-br from-color-1 to-color-2 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-color-1/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={cn(
                  "flex flex-col gap-2 max-w-3xl",
                  message.role === "user" ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "px-5 py-3.5 rounded-2xl backdrop-blur-sm transition-all duration-300",
                    message.role === "user"
                      ? "bg-gradient-to-br from-color-1/15 to-color-2/10 border border-color-1/30 text-n-1 shadow-lg shadow-color-1/5"
                      : "bg-gradient-to-br from-n-7 to-n-8 border border-n-6 text-n-1 hover:border-n-5 shadow-md"
                  )}
                >
                  {message.role === "user" ? (
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  ) : (
                    <div className="prose prose-sm prose-invert max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: (props) => <h1 className="text-lg font-bold text-n-1 mb-3 mt-4 first:mt-0" {...props} />,
                          h2: (props) => <h2 className="text-base font-semibold text-n-1 mb-2 mt-3 first:mt-0" {...props} />,
                          h3: (props) => <h3 className="text-sm font-semibold text-n-2 mb-2 mt-2" {...props} />,
                          p: (props) => <p className="text-sm text-n-2 leading-relaxed mb-3 last:mb-0" {...props} />,
                          ul: (props) => <ul className="list-disc list-inside text-sm text-n-2 space-y-1 mb-3" {...props} />,
                          ol: (props) => <ol className="list-decimal list-inside text-sm text-n-2 space-y-1 mb-3" {...props} />,
                          li: (props) => <li className="text-sm text-n-2" {...props} />,
                          strong: (props) => <strong className="font-semibold text-n-1" {...props} />,
                          em: (props) => <em className="italic text-n-2" {...props} />,
                          code: (props) => <code className="px-1.5 py-0.5 bg-n-6 text-color-1 rounded text-xs font-mono" {...props} />,
                          pre: (props) => <pre className="bg-n-6 p-3 rounded-lg overflow-x-auto mb-3" {...props} />,
                          a: (props) => <a className="text-color-1 hover:text-color-2 underline transition-colors" {...props} />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>

                {message.role === "assistant" && message.confidence && (
                  <div className="flex items-center gap-2">
                    {getConfidenceBadge(message.confidence)}
                  </div>
                )}

                {message.role === "assistant" &&
                  message.sources &&
                  message.sources.length > 0 && (
                    <div className="w-full">
                      <button
                        onClick={() =>
                          setExpandedSources(
                            expandedSources === message.id ? null : message.id
                          )
                        }
                        className="group flex items-center gap-2 px-3 py-1.5 text-xs text-n-3 hover:text-color-1 bg-n-8 border border-n-6 hover:border-color-1/50 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-color-1/5"
                      >
                        {expandedSources === message.id ? (
                          <ChevronUp className="w-3.5 h-3.5 transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300" />
                        )}
                        <Sparkles className="w-3 h-3 text-n-5 group-hover:text-color-1 transition-colors duration-300" />
                        <span className="font-medium">
                          {message.sources.length} source
                          {message.sources.length > 1 ? "s" : ""}
                        </span>
                      </button>

                      {expandedSources === message.id && (
                        <div className="mt-3 space-y-3">
                          {message.sources.map((source, idx) => (
                            <div
                              key={idx}
                              style={{
                                animationDelay: `${idx * 100}ms`,
                              }}
                              className="group p-4 bg-gradient-to-br from-n-8 to-n-7 border border-n-6 rounded-xl hover:border-color-1/30 transition-all duration-300 hover:shadow-lg hover:shadow-color-1/5 animate-fade-in opacity-0 [animation-fill-mode:forwards]"
                            >
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <h4 className="text-sm font-semibold text-n-1 leading-tight">
                                  {source.doc_title}
                                </h4>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-color-1/10 to-color-2/10 border border-color-1/20 rounded-lg flex-shrink-0">
                                  <div className="w-1.5 h-1.5 bg-color-1 rounded-full" />
                                  <span className="text-xs text-color-1 font-bold">
                                    {Math.round(source.similarity_score * 100)}%
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-n-3 leading-relaxed line-clamp-3">
                                {source.chunk_content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
              </div>

              {message.role === "user" && (
                <div className="w-8 h-8 bg-gradient-to-br from-n-7 to-n-6 border border-n-5 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <User className="w-5 h-5 text-n-3" />
                </div>
              )}
            </div>
          ))
        )}

        {loading && (
          <div className="flex gap-4 justify-start animate-fade-in">
            <div className="w-8 h-8 bg-gradient-to-br from-color-1 to-color-2 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-color-1/20 animate-pulse">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-n-7 to-n-8 border border-n-6 rounded-2xl shadow-md">
              <Loader2 className="w-4 h-4 text-color-1 animate-spin" />
              <span className="text-sm text-n-2 font-medium">Searching knowledge base...</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-color-1 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-color-1 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-color-1 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-6 py-4 bg-gradient-to-r from-red-500/10 to-rose-500/10 border-t border-red-500/30 backdrop-blur-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-sm text-red-400 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-n-6 bg-gradient-to-b from-n-8 to-n-7 p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Flowko services, pricing, processes..."
              className="flex-1 bg-n-7 border-n-6 text-n-1 placeholder:text-n-4 h-14 px-5 pr-12 focus:border-color-1 focus:ring-2 focus:ring-color-1/20 rounded-xl transition-all duration-300 shadow-sm"
              disabled={loading}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Sparkles className="w-4 h-4 text-n-5" />
            </div>
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || loading}
            className="h-14 px-8 bg-gradient-to-r from-color-1 to-color-2 hover:from-color-1/90 hover:to-color-2/90 text-white rounded-xl shadow-lg shadow-color-1/20 hover:shadow-xl hover:shadow-color-1/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Send</span>
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
