"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig, navLinks, getWhatsAppLink } from "@/lib/config";
import { Search, Heart, Menu, X, Phone, Mail, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Announcement Bar — Infinite Right-to-Left Ticker */}
      <div className="announcement-bar overflow-hidden relative" role="region" aria-label="Announcement">
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="marquee-track flex whitespace-nowrap no-underline cursor-pointer"
          title="Click to chat with us on WhatsApp"
        >
          {/* Primary Track Content */}
          <div className="marquee-content flex items-center shrink-0">
            {[1, 2, 3, 4].map((i) => (
              <span key={`item-${i}`} className="inline-flex items-center gap-4 px-6 text-stone hover:text-white transition-colors">
                <span>{siteConfig.announcementText}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 inline-block shrink-0" />
              </span>
            ))}
          </div>

          {/* Duplicated Track Content for Seamless Infinite Loop */}
          <div className="marquee-content flex items-center shrink-0" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <span key={`dup-${i}`} className="inline-flex items-center gap-4 px-6 text-stone hover:text-white transition-colors">
                <span>{siteConfig.announcementText}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 inline-block shrink-0" />
              </span>
            ))}
          </div>
        </a>
      </div>

      {/* Header */}
      <header className={`nav-header ${scrolled ? "scrolled" : ""}`}>
        <div
          className="flex items-center justify-between px-4 sm:px-6 lg:px-12"
          style={{ height: "68px" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.15rem, 4vw, 1.35rem)",
                color: "var(--color-charcoal)",
                letterSpacing: "-0.02em",
              }}
            >
              Furniture King
            </span>
            <span
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-walnut)",
                fontWeight: 500,
                marginTop: "2px",
              }}
            >
              Nepal
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link no-underline">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:text-walnut transition-colors"
              aria-label="Search products"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorites */}
            <Link href="/favorites" className="p-2 hover:text-walnut transition-colors no-underline" aria-label="View favorites">
              <Heart className="w-5 h-5" />
            </Link>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="p-2 hover:text-walnut transition-colors relative"
              aria-label={`View shopping cart with ${totalItems} items`}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-walnut text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* WhatsApp */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp no-underline"
              style={{ padding: "0.55rem 1.25rem", fontSize: "0.75rem" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat With Us
            </a>
          </div>

          {/* Mobile Actions: Search + Favorites + Cart + Hamburger */}
          <div className="flex lg:hidden items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-charcoal hover:text-walnut transition-colors"
              aria-label="Search products"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/favorites"
              className="p-2 text-charcoal hover:text-walnut transition-colors no-underline"
              aria-label="View favorites"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <button
              onClick={openCart}
              className="p-2 text-charcoal hover:text-walnut transition-colors relative"
              aria-label={`View shopping cart with ${totalItems} items`}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-walnut text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="p-2 text-charcoal hover:text-walnut transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="px-4 sm:px-6 lg:px-12 pb-4 animate-fade-in">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const q = formData.get("q") as string;
                if (q.trim()) {
                  window.location.href = `/shop?search=${encodeURIComponent(q.trim())}`;
                  setSearchOpen(false);
                }
              }}
            >
              <div className="relative max-w-xl mx-auto">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray"
                />
                <input
                  name="q"
                  type="text"
                  className="search-input"
                  placeholder="Search furniture by name, material, category..."
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className={`mobile-nav-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Nav Drawer */}
      <div
        className={`mobile-nav-drawer ${mobileOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-between items-center mb-6">
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.2rem",
              color: "var(--color-charcoal)",
            }}
          >
            Menu
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Search */}
        <form
          className="mb-6"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const q = formData.get("mobile-q") as string;
            if (q && typeof q === "string" && q.trim()) {
              window.location.href = `/shop?search=${encodeURIComponent(q.trim())}`;
              setMobileOpen(false);
            }
          }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
            <input
              name="mobile-q"
              type="text"
              className="search-input text-xs py-2 pl-9 pr-3"
              placeholder="Search sofas, beds, tables..."
            />
          </div>
        </form>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-base font-medium no-underline"
              style={{
                color: "var(--color-charcoal)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => {
              setMobileOpen(false);
              openCart();
            }}
            className="btn-primary no-underline text-center inline-flex items-center justify-center gap-2 cursor-pointer w-full"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shopping Bag ({totalItems})</span>
          </button>
          <Link
            href="/favorites"
            onClick={() => setMobileOpen(false)}
            className="btn-outline no-underline text-center inline-flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Favorites
          </Link>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp no-underline text-center"
          >
            Chat on WhatsApp
          </a>
        </div>

        <div className="mt-8 text-sm" style={{ color: "var(--color-warm-gray)" }}>
          <p className="mb-2">
            <a href={`tel:${siteConfig.phoneIntl}`} className="no-underline inline-flex items-center gap-2" style={{ color: "var(--color-warm-gray)" }}>
              <Phone className="w-4 h-4 text-walnut" />
              {siteConfig.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${siteConfig.email}`} className="no-underline inline-flex items-center gap-2" style={{ color: "var(--color-warm-gray)" }}>
              <Mail className="w-4 h-4 text-walnut" />
              {siteConfig.email}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
