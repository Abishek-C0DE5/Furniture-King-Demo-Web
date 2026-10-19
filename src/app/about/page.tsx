import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, getWhatsAppLink } from "@/lib/config";
import { ArrowRight, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.businessName}`,
  description:
    "Learn about Furniture King Nepal — your trusted destination in Nepal for discovering beautiful living, bedroom, dining, and workspace furniture.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-14 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Hero Banner */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-walnut font-medium mb-3 block">
            Our Purpose & Vision
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 4vw, 3.25rem)",
              lineHeight: 1.15,
            }}
            className="text-charcoal mb-6"
          >
            A Better Space Starts With the Right Furniture
          </h1>
          <p className="text-warm-gray text-base sm:text-lg leading-relaxed">
            Welcome to Furniture King Nepal. We believe that furniture is not merely functional—it shapes the rhythm, comfort, and character of every home and workplace.
          </p>
        </div>

        {/* Feature Image & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-96 sm:h-[480px] rounded-2xl overflow-hidden border border-soft-beige shadow-sm bg-ivory">
            <Image
              src="/Photos/487949718_657077367273530_502994373561440933_n.jpg"
              alt="Furniture King Nepal Showroom and Display"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6 text-charcoal/90">
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-2xl sm:text-3xl text-charcoal font-normal"
            >
              How We Help You Find What You Need
            </h2>
            <p className="text-warm-gray leading-relaxed">
              Finding the right furniture in Nepal shouldn’t feel complicated or uncertain. At Furniture King Nepal, we have built this catalog to give you a transparent, visual showroom experience from anywhere.
            </p>
            <p className="text-warm-gray leading-relaxed">
              Whether you are furnishing a new apartment, replacing a living room set, upgrading your bedroom, or outfitting an office space, our goal is simple: allow you to browse high-resolution photography, review clear dimensions and specifications, and contact us directly to confirm availability, finishes, and purchasing.
            </p>

            <div className="pt-4 border-t border-soft-beige grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-ivory/60 border border-soft-beige/50">
                <h3 className="font-semibold text-charcoal text-sm mb-1">Direct Consultation</h3>
                <p className="text-xs text-warm-gray leading-normal">
                  Speak directly with our team via WhatsApp or phone to clarify materials, sizes, and showroom availability.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-ivory/60 border border-soft-beige/50">
                <h3 className="font-semibold text-charcoal text-sm mb-1">Honest & Transparent</h3>
                <p className="text-xs text-warm-gray leading-normal">
                  No hidden terms or misleading prices. Every piece is discussed with you individually to meet your exact space.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Section */}
        <div className="bg-ivory rounded-2xl p-8 sm:p-12 mb-20 border border-soft-beige">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-wider text-walnut font-medium block mb-2">
              Our Principles
            </span>
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-2xl sm:text-3xl text-charcoal font-normal"
            >
              Why Customers Discover With Confidence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-walnut font-semibold shadow-xs">
                01
              </span>
              <h3 className="text-base font-semibold text-charcoal">Real Photographic Discovery</h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                Explore authentic furniture pieces with multiple viewing angles and realistic room settings so you can picture the design in your own home.
              </p>
            </div>

            <div className="space-y-3">
              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-walnut font-semibold shadow-xs">
                02
              </span>
              <h3 className="text-base font-semibold text-charcoal">Instant WhatsApp Assistance</h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                Each product connects instantly to our WhatsApp desk. Just tap &ldquo;Chat to Buy&rdquo; to send the item details and receive prompt personal guidance.
              </p>
            </div>

            <div className="space-y-3">
              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-walnut font-semibold shadow-xs">
                03
              </span>
              <h3 className="text-base font-semibold text-charcoal">Personalized Service</h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                We take the time to answer your questions regarding timber, upholstery, dimensions, delivery, and matching accessories.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center max-w-xl mx-auto space-y-6">
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-2xl sm:text-3xl text-charcoal"
          >
            Ready to Furnish Your Space?
          </h2>
          <p className="text-warm-gray text-sm sm:text-base">
            Explore our curated catalog or get in touch with our team directly. We are always happy to answer your inquiries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full sm:w-auto">
            <Link href="/shop" className="btn-primary no-underline inline-flex items-center justify-center gap-2 w-full sm:w-auto">
              <span>Browse Furniture Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary no-underline inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
