"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";
import { siteConfig, getWhatsAppLink } from "@/lib/config";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/hooks/useFavorites";
import { Phone, Mail, Check, X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { isFavorite, toggle } = useFavorites();

  const productUrl = typeof window !== "undefined"
    ? window.location.href
    : `${siteConfig.website}product/${product.slug}`;

  const whatsappLink = getWhatsAppLink(product.name, productUrl);

  return (
    <div style={{ background: "var(--color-ivory)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs mb-6 sm:mb-8" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span style={{ color: "var(--color-border)" }}>/</span>
          <a href="/shop">Shop</a>
          <span style={{ color: "var(--color-border)" }}>/</span>
          <a href={`/shop?category=${product.categoryId}`}>{product.category}</a>
          <span style={{ color: "var(--color-border)" }}>/</span>
          <span style={{ color: "var(--color-charcoal)" }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div
              className="overflow-hidden rounded-md cursor-zoom-in mb-3"
              style={{
                aspectRatio: "4/3",
                background: "var(--color-light-gray)",
              }}
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={product.images[selectedImage]}
                alt={`${product.name} — view ${selectedImage + 1}`}
                width={800}
                height={600}
                priority
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`gallery-thumb ${i === selectedImage ? "active" : ""}`}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      width={72}
                      height={56}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-3">
              {product.isFeatured && <span className="badge badge-featured">Featured</span>}
              {product.isNewArrival && <span className="badge badge-new">New Arrival</span>}
            </div>

            <p className="section-eyebrow" style={{ marginBottom: "0.5rem" }}>
              {product.category}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                marginBottom: "0.5rem",
                lineHeight: 1.15,
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--color-warm-gray)",
                marginBottom: "1.5rem",
              }}
            >
              SKU: {product.sku}
            </p>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-charcoal)",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              {product.description}
            </p>

            {/* Key Details */}
            <div
              className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6 py-6"
              style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}
            >
              {product.materials.length > 0 && (
                <div>
                  <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-warm-gray)", marginBottom: "0.25rem", fontWeight: 500 }}>
                    Materials
                  </p>
                  <p style={{ fontSize: "0.88rem" }}>{product.materials.join(", ")}</p>
                </div>
              )}
              {product.colors.length > 0 && (
                <div>
                  <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-warm-gray)", marginBottom: "0.25rem", fontWeight: 500 }}>
                    Colors / Finish
                  </p>
                  <p style={{ fontSize: "0.88rem" }}>{product.colors.join(", ")}</p>
                </div>
              )}
              <div>
                <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-warm-gray)", marginBottom: "0.25rem", fontWeight: 500 }}>
                  Style
                </p>
                <p style={{ fontSize: "0.88rem" }}>{product.style}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-warm-gray)", marginBottom: "0.25rem", fontWeight: 500 }}>
                  Room
                </p>
                <p style={{ fontSize: "0.88rem" }}>{product.room}</p>
              </div>
            </div>

            {/* Dimensions */}
            {(product.dimensions.width || product.dimensions.depth || product.dimensions.height) && (
              <div className="mb-6">
                <h3
                  style={{
                    fontSize: "0.82rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Dimensions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {product.dimensions.width && (
                    <div
                      className="text-center p-3 rounded"
                      style={{ background: "var(--color-stone)" }}
                    >
                      <p style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-warm-gray)", marginBottom: "0.2rem" }}>
                        Width
                      </p>
                      <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>{product.dimensions.width}</p>
                    </div>
                  )}
                  {product.dimensions.depth && (
                    <div
                      className="text-center p-3 rounded"
                      style={{ background: "var(--color-stone)" }}
                    >
                      <p style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-warm-gray)", marginBottom: "0.2rem" }}>
                        Depth
                      </p>
                      <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>{product.dimensions.depth}</p>
                    </div>
                  )}
                  {product.dimensions.height && (
                    <div
                      className="text-center p-3 rounded"
                      style={{ background: "var(--color-stone)" }}
                    >
                      <p style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-warm-gray)", marginBottom: "0.2rem" }}>
                        Height
                      </p>
                      <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>{product.dimensions.height}</p>
                    </div>
                  )}
                  {product.dimensions.seatHeight && (
                    <div
                      className="text-center p-3 rounded"
                      style={{ background: "var(--color-stone)" }}
                    >
                      <p style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-warm-gray)", marginBottom: "0.2rem" }}>
                        Seat Height
                      </p>
                      <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>{product.dimensions.seatHeight}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features.length > 0 && (
              <div className="mb-8">
                <h3
                  style={{
                    fontSize: "0.82rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Key Features
                </h3>
                <ul className="space-y-2" style={{ listStyle: "none", padding: 0 }}>
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ fontSize: "0.9rem" }}>
                      <Check className="w-4 h-4 text-walnut mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp no-underline flex-1 justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat to Buy
              </a>
              <a
                href={`tel:${siteConfig.phoneIntl}`}
                className="btn-outline no-underline flex-1 justify-center inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
            </div>
            <a
              href={`mailto:${siteConfig.email}?subject=Inquiry about ${product.name}&body=Hello Furniture King Nepal, I am interested in ${product.name} (${product.sku}). Please share more information.`}
              className="btn-outline no-underline w-full justify-center inline-flex items-center gap-2"
              style={{ display: "flex" }}
            >
              <Mail className="w-4 h-4" />
              <span>Email Inquiry</span>
            </a>

            {/* Favorite */}
            <button
              onClick={() => toggle(product.id)}
              className="mt-3 w-full flex items-center justify-center gap-2 py-3"
              style={{
                background: "none",
                border: "1px solid var(--color-border)",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "0.85rem",
                color: isFavorite(product.id) ? "#E53E3E" : "var(--color-charcoal)",
              }}
            >
              <Heart
                className="w-4 h-4"
                fill={isFavorite(product.id) ? "#E53E3E" : "none"}
                stroke={isFavorite(product.id) ? "#E53E3E" : "currentColor"}
              />
              {isFavorite(product.id) ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14 sm:mt-20 pt-8 sm:pt-12" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="text-center mb-8 sm:mb-10">
              <p className="section-eyebrow">You May Also Like</p>
              <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Related Furniture
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFavorite={isFavorite(p.id)}
                  onToggleFavorite={toggle}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6"
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              zIndex: 310,
            }}
            aria-label="Close lightbox"
          >
            <X className="w-7 h-7" />
          </button>
          {product.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", cursor: "pointer", padding: "0.75rem", borderRadius: "50%", zIndex: 310 }}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", cursor: "pointer", padding: "0.75rem", borderRadius: "50%", zIndex: 310 }}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <Image
            src={product.images[selectedImage]}
            alt={`${product.name} full view`}
            width={1200}
            height={900}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
