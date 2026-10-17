"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/config";
import { categories, getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/hooks/useFavorites";
import FAQ from "@/components/FAQ";

const heroSlides = [
  {
    image: "/Photos/487312245_657080413939892_396357785909587725_n.jpg",
    alt: "Handcrafted carved wooden living room sofa set with glass-top coffee table",
    caption: "Living Room Showcase",
  },
  {
    image: "/Photos/487949718_657077367273530_502994373561440933_n.jpg",
    alt: "Furniture King Nepal showroom displaying premium hardwood collections",
    caption: "Artisan Woodworking",
  },
  {
    image: "/Photos/520813632_749533304694602_5302357473682948902_n.jpg",
    alt: "Solid wood master bedroom bed frame with warm grain textures",
    caption: "Master Bedroom Haven",
  },
  {
    image: "/Photos/523779865_749533121361287_3602915158766384796_n.jpg",
    alt: "Handmade dining table and comfort seating crafted for family gatherings",
    caption: "Heirloom Dining Sets",
  },
  {
    image: "/Photos/486115684_651321481182452_2819366713137830601_n.jpg",
    alt: "Intricate traditional carving and royal seating design",
    caption: "Classic Heritage Craft",
  },
];

const rooms = [
  {
    name: "Living Room",
    slug: "Living Room",
    image: "/Photos/487312245_657080413939892_396357785909587725_n.jpg",
  },
  {
    name: "Bedroom",
    slug: "Bedroom",
    image: "/Photos/520813632_749533304694602_5302357473682948902_n.jpg",
  },
  {
    name: "Dining Room",
    slug: "Dining Room",
    image: "/Photos/523779865_749533121361287_3602915158766384796_n.jpg",
  },
  {
    name: "Workspace",
    slug: "Workspace",
    image: "/Photos/487297686_657078867273380_5111974539386840409_n.jpg",
  },
];

export default function HomePage() {
  const { isFavorite, toggle } = useFavorites();
  const featured = getFeaturedProducts();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Automatically cycle hero photo smoothly every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-section relative overflow-hidden" id="hero">
        {/* Smooth Transitioning Hero Photos */}
        <div className="absolute inset-0 overflow-hidden">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentHeroIndex;
            return (
              <div
                key={slide.image}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  className={`object-cover transition-transform duration-7000 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                  style={{ objectPosition: "center 60%" }}
                  sizes="100vw"
                />
              </div>
            );
          })}
        </div>

        <div className="hero-overlay" />

        {/* Hero Photo Navigation Indicators */}
        <div className="absolute bottom-8 right-6 lg:right-12 z-20 flex items-center gap-2">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.image}
              onClick={() => setCurrentHeroIndex(idx)}
              aria-label={`Show ${slide.caption}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer border-0 p-0 ${
                idx === currentHeroIndex
                  ? "w-8 bg-white shadow-xs"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
          <span className="text-[11px] text-white/80 font-mono ml-2 tracking-widest hidden sm:inline-block">
            0{currentHeroIndex + 1} / 0{heroSlides.length}
          </span>
        </div>

        <div className="hero-content animate-fade-in-up">
          <p
            className="section-eyebrow"
            style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1rem" }}
          >
            {siteConfig.heroEyebrow}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
              color: "var(--color-white)",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              maxWidth: "560px",
            }}
          >
            {siteConfig.heroHeadline}
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.7,
              maxWidth: "440px",
              marginBottom: "2rem",
            }}
          >
            {siteConfig.heroSubtext}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="btn-primary no-underline">
              {siteConfig.heroCTAPrimary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary no-underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {siteConfig.heroCTASecondary}
            </a>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY DISCOVERY ===== */}
      <section className="py-20 lg:py-28 px-6 lg:px-12" id="categories">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">Browse by Category</p>
            <h2 className="section-title">Explore Our Collections</h2>
            <p className="section-subtitle mx-auto">
              Discover furniture across a range of categories, each selected to help you find the right piece for your space.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="category-card no-underline group"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={500}
                  height={667}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="category-card-overlay">
                  <div>
                    <h3 className="category-card-label">{cat.name}</h3>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: "rgba(255,255,255,0.7)",
                        marginTop: "0.25rem",
                      }}
                    >
                      {cat.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section
        className="py-20 lg:py-28 px-6 lg:px-12"
        style={{ background: "var(--color-white)" }}
        id="featured"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">Curated Selection</p>
            <h2 className="section-title">Selected for Your Space</h2>
            <p className="section-subtitle mx-auto">
              Featured pieces from our collection, chosen for their craftsmanship, design, and ability to transform a room.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite(product.id)}
                onToggleFavorite={toggle}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop" className="btn-outline no-underline">
              View All Furniture
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SHOP BY ROOM ===== */}
      <section className="py-20 lg:py-28 px-6 lg:px-12" id="rooms">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">Shop by Space</p>
            <h2 className="section-title">Find Furniture for Every Room</h2>
            <p className="section-subtitle mx-auto">
              Browse furniture suited to different living spaces and find the right fit for your home or office.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <Link
                key={room.name}
                href={`/shop?room=${encodeURIComponent(room.slug)}`}
                className="room-card no-underline"
              >
                <Image
                  src={room.image}
                  alt={`${room.name} furniture`}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="room-card-overlay">
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      color: "var(--color-white)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {room.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    Explore {room.name.toLowerCase()} furniture →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY ===== */}
      <section
        className="py-20 lg:py-28 px-6 lg:px-12"
        style={{ background: "var(--color-white)" }}
        id="about-preview"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden rounded-md" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/Photos/523779865_749533121361287_3602915158766384796_n.jpg"
                alt="Furniture King Nepal showroom dining set display"
                width={700}
                height={525}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="section-eyebrow">About Furniture King Nepal</p>
              <h2
                className="section-title"
                style={{ maxWidth: "440px" }}
              >
                A Better Space Starts With the Right Furniture
              </h2>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-warm-gray)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                Furniture King Nepal helps you discover furniture that suits your home, office, and lifestyle. We believe every space deserves thoughtful furniture choices, and we&apos;re here to help you explore options and find pieces that feel right.
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-warm-gray)",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                Browse our collection online, save your favorite pieces, and reach out to our team to discuss availability, dimensions, and purchasing. We&apos;re available via WhatsApp, phone, or email.
              </p>
              <Link href="/about" className="btn-outline no-underline">
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST SECTION ===== */}
      <section className="py-16 lg:py-20 px-6 lg:px-12" id="trust">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
              Explore with Confidence
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "💬",
                title: "Easy Inquiries",
                text: "Contact us instantly via WhatsApp, phone, or email about any product",
              },
              {
                icon: "📐",
                title: "Clear Information",
                text: "Detailed descriptions, materials, dimensions, and multiple product images",
              },
              {
                icon: "🤝",
                title: "Personal Guidance",
                text: "Our team helps you choose furniture suited to your space and needs",
              },
              {
                icon: "📱",
                title: "Direct Communication",
                text: "Speak directly with our team — no automated responses or chatbots",
              },
            ].map((item) => (
              <div key={item.title} className="trust-item flex-col items-center text-center">
                <div
                  className="trust-icon mx-auto mb-3"
                  style={{ fontSize: "1.4rem" }}
                >
                  {item.icon}
                </div>
                <h4
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    marginBottom: "0.35rem",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-warm-gray)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY / INSPIRATION ===== */}
      <section
        className="py-20 lg:py-28 px-6 lg:px-12"
        style={{ background: "var(--color-white)" }}
        id="gallery"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">Inspiration</p>
            <h2 className="section-title">Furniture in Context</h2>
            <p className="section-subtitle mx-auto">
              See how different furniture pieces come together to create inviting, cohesive spaces.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
            {[
              { src: "/Photos/487949718_657077367273530_502994373561440933_n.jpg", alt: "Traditional carved canopy swing in showroom" },
              { src: "/Photos/523918079_749533938027872_7963866855478984573_n.jpg", alt: "Gold royal dining set with tufted chairs" },
              { src: "/Photos/520813632_749533304694602_5302357473682948902_n.jpg", alt: "White tufted bed with golden frame" },
              { src: "/Photos/486130443_651321494515784_5244541923420412931_n.jpg", alt: "Colonial dark wood seating with red velvet" },
              { src: "/Photos/524309944_749533201361279_7055694723605919085_n.jpg", alt: "Platinum tufted dining set" },
              { src: "/Photos/486115684_651321481182452_2819366713137830601_n.jpg", alt: "Classic tufted loveseat with carved frame" },
            ].map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-md"
                style={{
                  aspectRatio: i === 0 || i === 5 ? "3/4" : "4/3",
                  gridRow: i === 0 ? "span 2" : undefined,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={i === 0 || i === 5 ? 800 : 450}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 lg:py-28 px-6 lg:px-12" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Common Questions</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ===== CLOSING CTA ===== */}
      <section
        className="py-20 lg:py-28 px-6 lg:px-12 text-center"
        style={{ background: "var(--color-charcoal)" }}
        id="cta"
      >
        <div className="max-w-2xl mx-auto">
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "var(--color-white)",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            Found Something You Love?
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-warm-gray)",
              lineHeight: 1.7,
              marginBottom: "2rem",
              maxWidth: "460px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Tell us which piece caught your eye, and contact our team to discuss your requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp no-underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <Link href="/shop" className="btn-secondary no-underline">
              Browse Furniture
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
