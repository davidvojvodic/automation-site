import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Forward to n8n webhook
    const response = await fetch('https://davidvojvodic.app.n8n.cloud/webhook/contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      data: result 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error processing form' 
    }, { status: 500 });
  }
}