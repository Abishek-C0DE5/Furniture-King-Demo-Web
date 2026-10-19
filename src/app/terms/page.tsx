import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: `Terms of Use | ${siteConfig.businessName}`,
  description: "Terms of use, catalog inquiry terms, and business conditions for Furniture King Nepal.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="mb-12 border-b border-soft-beige pb-6">
          <span className="text-xs uppercase tracking-widest text-walnut font-medium mb-2 block">
            General Terms
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              lineHeight: 1.2,
            }}
            className="text-charcoal mb-3"
          >
            Terms of Use
          </h1>
          <p className="text-xs text-warm-gray">Last updated: October 2026</p>
        </div>

        <div className="space-y-8 text-charcoal/90 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-xl text-charcoal mb-3">
              1. Catalog & Inquiry Website Model
            </h2>
            <p className="text-warm-gray mb-3">
              Furniture King Nepal operates this website as an online discovery showroom and product catalog. This website does not process automated credit card transactions, digital checkouts, or binding e-commerce contracts.
            </p>
            <p className="text-warm-gray">
              Inquiries submitted through this website or WhatsApp constitute an expression of interest to discuss product availability, dimensions, finish selections, delivery options, and quotation with our showroom team.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-xl text-charcoal mb-3">
              2. Product Photography & Specifications
            </h2>
            <p className="text-warm-gray mb-3">
              We make every effort to display the colors, textures, and details of our furniture as accurately as possible. However, due to variations in monitor displays, natural solid wood grain patterns, and ambient lighting, actual furniture finishes may vary slightly.
            </p>
            <p className="text-warm-gray">
              All dimensions provided in the catalog are approximate guidelines to assist in space planning. Customers are encouraged to verify exact room measurements and door clearances with our team before final placement.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-xl text-charcoal mb-3">
              3. Availability & Orders
            </h2>
            <p className="text-warm-gray">
              Stock availability is subject to showroom turnover. Final pricing, manufacturing timelines (where applicable), delivery charges, and payment methods are confirmed directly between the customer and Furniture King Nepal via our verified phone, WhatsApp, or official showroom representatives.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-xl text-charcoal mb-3">
              4. Contact
            </h2>
            <p className="text-warm-gray">
              For any questions regarding these terms, please contact us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-walnut font-medium underline">
                {siteConfig.email}
              </a>{" "}
              or via WhatsApp at{" "}
              <a href={siteConfig.whatsapp} className="text-walnut font-medium underline">
                {siteConfig.phone}
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-soft-beige">
          <Link href="/shop" className="text-sm font-medium text-walnut hover:underline inline-flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Furniture Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
