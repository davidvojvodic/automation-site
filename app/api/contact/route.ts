import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    console.log("Form data received:", formData);

    // Determine webhook URL based on environment
    const webhookUrl = process.env.NODE_ENV === 'production'
      ? "https://davidvojvodic.app.n8n.cloud/webhook/contact-form" // Production URL
      : "https://davidvojvodic.app.n8n.cloud/webhook-test/contact-form"; // Development/test URL

    console.log("Using webhook URL:", webhookUrl);

    // Forward to n8n webhook
    const response = await fetch(
      webhookUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    console.log("n8n response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("n8n webhook error:", response.status, errorText);
      throw new Error(`n8n webhook failed: ${response.status} - ${errorText}`);
    }

    const responseText = await response.text();
    console.log("n8n raw response:", responseText);

    let result;
    try {
      result = responseText ? JSON.parse(responseText) : { success: true };
    } catch (jsonError) {
      console.error("Failed to parse n8n response as JSON:", jsonError);
      result = {
        success: true,
        message: "Webhook executed but returned invalid JSON",
      };
    }

    console.log("n8n parsed response:", result);

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Error processing form: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
