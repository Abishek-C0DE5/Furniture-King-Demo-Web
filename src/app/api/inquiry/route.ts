import { NextResponse } from "next/server";

// Server-side inquiry submission handler
// In-memory inquiry store for demo persistence (can be swapped with Supabase/DB)
export interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  category?: string;
  preferredTime?: string;
  message: string;
  createdAt: string;
}

// In-memory array for demo runtime
export const globalInquiries: InquiryRecord[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, product, category, preferredTime, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json(
        { error: "Please provide a valid phone or contact number (at least 7 digits)." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please write a brief message or question about what you are looking for." },
        { status: 400 }
      );
    }

    const newInquiry: InquiryRecord = {
      id: "inq_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      phone: phone.trim(),
      email: email ? String(email).trim() : undefined,
      product: product ? String(product).trim() : undefined,
      category: category ? String(category).trim() : undefined,
      preferredTime: preferredTime ? String(preferredTime).trim() : undefined,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    globalInquiries.unshift(newInquiry);

    // If an external webhook or email service (Resend / SendGrid / Supabase) is configured in env,
    // it can be called here:
    // if (process.env.INQUIRY_WEBHOOK_URL) { ... }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been received. Our team will contact you shortly.",
      inquiryId: newInquiry.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your inquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Returns inquiries for admin area
  return NextResponse.json({
    inquiries: globalInquiries,
  });
}
