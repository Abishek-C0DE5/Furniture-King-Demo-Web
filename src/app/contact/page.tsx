import { Suspense } from "react";
import { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: `Contact Us & Inquiries | ${siteConfig.businessName}`,
  description:
    "Contact Furniture King Nepal via WhatsApp, phone, email, or send an inquiry directly for product availability, specifications, and orders.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-14 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-walnut font-medium mb-3 block">
            Let&rsquo;s Connect
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.2,
            }}
            className="text-charcoal mb-4"
          >
            Contact & Furniture Inquiries
          </h1>
          <p className="text-warm-gray leading-relaxed text-sm sm:text-base">
            Have questions about a sofa, bed, dining set, or custom dimensions? Reach out directly to our showroom team.
          </p>
        </div>

        {/* Client Form with Suspense for search params */}
        <Suspense
          fallback={
            <div className="text-center py-20 text-warm-gray text-sm">
              Loading contact details...
            </div>
          }
        >
          <ContactClient />
        </Suspense>
      </div>
    </div>
  );
}
