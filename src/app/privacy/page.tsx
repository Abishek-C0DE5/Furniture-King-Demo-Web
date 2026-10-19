import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.businessName}`,
  description: "Privacy policy and customer data handling practices for Furniture King Nepal.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="mb-12 border-b border-soft-beige pb-6">
          <span className="text-xs uppercase tracking-widest text-walnut font-medium mb-2 block">
            Customer Information
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              lineHeight: 1.2,
            }}
            className="text-charcoal mb-3"
          >
            Privacy Policy
          </h1>
          <p className="text-xs text-warm-gray">Last updated: October 2026</p>
        </div>

        <div className="space-y-8 text-charcoal/90 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-xl text-charcoal mb-3">
              1. Information We Collect
            </h2>
            <p className="text-warm-gray mb-3">
              At Furniture King Nepal, we respect your privacy. When you use our catalog and inquiry features, we only collect information that you voluntarily choose to provide:
            </p>
            <ul className="list-disc pl-5 text-warm-gray space-y-1.5">
              <li>Your name and contact phone / WhatsApp number when submitting an inquiry form.</li>
              <li>Your email address if you choose to include it for quotation or correspondence.</li>
              <li>The specific furniture items or categories you are inquiring about.</li>
              <li>Local browser storage data for your saved favorites (stored solely on your own browser).</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-xl text-charcoal mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-warm-gray mb-3">
              We use your contact details solely for the following business purposes:
            </p>
            <ul className="list-disc pl-5 text-warm-gray space-y-1.5">
              <li>Responding directly to your furniture inquiries and questions regarding availability, finishes, and dimensions.</li>
              <li>Providing requested photos, videos, or showroom visitation information.</li>
              <li>Coordinating purchase agreements and delivery logistics agreed directly between you and our showroom.</li>
            </ul>
            <p className="text-warm-gray mt-3">
              We never sell, rent, or trade your personal contact information to third parties or marketing brokers.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-xl text-charcoal mb-3">
              3. WhatsApp Communications
            </h2>
            <p className="text-warm-gray">
              When you click &ldquo;Chat to Buy&rdquo; or WhatsApp links on our website, you are redirected to WhatsApp&apos;s platform. Messages exchanged over WhatsApp are subject to WhatsApp&apos;s privacy policy and end-to-end encryption protocols.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-xl text-charcoal mb-3">
              4. Contact Regarding Privacy
            </h2>
            <p className="text-warm-gray">
              If you have any questions about how your inquiry information is handled, please contact our team directly at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-walnut font-medium underline">
                {siteConfig.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${siteConfig.phoneIntl}`} className="text-walnut font-medium underline">
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
