import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/config";
import { categories } from "@/lib/products";
import { Phone, Mail, Globe, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                color: "var(--color-white)",
                marginBottom: "1rem",
              }}
            >
              Furniture King
              <span
                style={{
                  display: "block",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-walnut)",
                  fontFamily: "var(--font-sans)",
                  marginTop: "0.15rem",
                  fontWeight: 500,
                }}
              >
                Nepal
              </span>
            </h3>
            <p
              style={{
                fontSize: "0.88rem",
                lineHeight: 1.7,
                color: "var(--color-warm-gray)",
                maxWidth: "280px",
              }}
            >
              Helping you discover furniture that transforms your living spaces.
              Browse our collection and contact us to discuss your requirements.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-4">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "var(--color-warm-gray)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={siteConfig.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                style={{ color: "var(--color-warm-gray)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.15a8.16 8.16 0 005.58 2.17V11.2a4.85 4.85 0 01-3.58-1.59V6.69h3.58z" />
                </svg>
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{ color: "var(--color-warm-gray)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-white)",
                marginBottom: "1.25rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2" style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/" style={{ fontSize: "0.88rem" }} className="no-underline">Home</Link></li>
              <li><Link href="/shop" style={{ fontSize: "0.88rem" }} className="no-underline">Shop Furniture</Link></li>
              <li><Link href="/collections" style={{ fontSize: "0.88rem" }} className="no-underline">Collections</Link></li>
              <li><Link href="/about" style={{ fontSize: "0.88rem" }} className="no-underline">About Us</Link></li>
              <li><Link href="/contact" style={{ fontSize: "0.88rem" }} className="no-underline">Contact</Link></li>
              <li><Link href="/favorites" style={{ fontSize: "0.88rem" }} className="no-underline">My Favorites</Link></li>
              <li><Link href="/cart" style={{ fontSize: "0.88rem" }} className="no-underline">Shopping Bag</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-white)",
                marginBottom: "1.25rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
              }}
            >
              Categories
            </h4>
            <ul className="space-y-2" style={{ listStyle: "none", padding: 0 }}>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    style={{ fontSize: "0.88rem" }}
                    className="no-underline"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-white)",
                marginBottom: "1.25rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
              }}
            >
              Contact
            </h4>
            <ul className="space-y-3" style={{ listStyle: "none", padding: 0, fontSize: "0.88rem" }}>
              <li>
                <a href={`tel:${siteConfig.phoneIntl}`} className="no-underline inline-flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-walnut" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="no-underline inline-flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-walnut" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a href={siteConfig.website} target="_blank" rel="noopener noreferrer" className="no-underline inline-flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-walnut" />
                  <span>furnitureking.com.np</span>
                </a>
              </li>
              <li>
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="no-underline inline-flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-8 pt-5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p style={{ fontSize: "0.8rem", color: "var(--color-warm-gray)" }}>
            © {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-end" style={{ fontSize: "0.8rem" }}>
            <Link href="/privacy" className="no-underline" style={{ color: "var(--color-warm-gray)" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="no-underline" style={{ color: "var(--color-warm-gray)" }}>
              Terms of Use
            </Link>
            <Link href="/admin" className="no-underline" style={{ color: "var(--color-warm-gray)", opacity: 0.6 }}>
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
