import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    console.log('Form data received:', formData);
    
    // Forward to n8n webhook
    const response = await fetch('https://davidvojvodic.app.n8n.cloud/webhook/contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    console.log('n8n response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('n8n webhook error:', response.status, errorText);
      throw new Error(`n8n webhook failed: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('n8n response:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      data: result 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      success: false, 
      message: `Error processing form: ${error.message}` 
    }, { status: 500 });
  }
}