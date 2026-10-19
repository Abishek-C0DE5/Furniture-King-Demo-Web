"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, formatPrice, calculateDiscount } from "@/lib/products";
import { siteConfig, getWhatsAppLink } from "@/lib/config";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/context/CartContext";
import {
  Phone,
  Mail,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Zap,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Wrench,
  Sparkles,
  MapPin,
} from "lucide-react";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "Standard Finish");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "delivery" | "reviews">("specs");

  const { isFavorite, toggle } = useFavorites();
  const { addToCart } = useCart();

  const discountPercent = calculateDiscount(product.originalPrice, product.price);
  const savings = Math.max(0, product.originalPrice - product.price);

  const productUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `${siteConfig.website}product/${product.slug}`;

  const customWhatsAppMessage = `*ORDER INQUIRY — FURNITURE KING NEPAL*\n\nHello, I am interested in purchasing:\n*Item:* ${product.name}\n*SKU:* ${product.sku}\n*Finish:* ${selectedColor}\n*Quantity:* ${quantity}\n*Price:* ${formatPrice(product.price * quantity)}\n*URL:* ${productUrl}\n\nPlease confirm availability and delivery slot.`;

  const directWhatsAppLink = `https://wa.me/${siteConfig.phoneIntl}?text=${encodeURIComponent(
    customWhatsAppMessage
  )}`;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, false);
    router.push("/checkout");
  };

  // Sample authentic client reviews
  const reviews = [
    {
      id: 1,
      author: "Pooja Sharma",
      location: "Baluwatar, Kathmandu",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "The wood grain and hand carving on this piece are truly breathtaking. Delivered right to our 2nd floor and assembled by their polite carpenters. Highly recommend Furniture King!",
    },
    {
      id: 2,
      author: "Er. Ramesh Shrestha",
      location: "Jhamsikhel, Lalitpur",
      rating: 5,
      date: "1 month ago",
      comment:
        "Top-notch hardwood finish and very sturdy joint construction. It feels like an heirloom piece that will easily last decades. Worth every rupee.",
    },
    {
      id: 3,
      author: "Anjana Thapa",
      location: "Lakeside, Pokhara",
      rating: 4.8,
      date: "2 months ago",
      comment:
        "Delivered safely to Pokhara in secure wooden crate packaging. Perfectly matches our traditional Nepali living room aesthetics.",
    },
  ];

  return (
    <div style={{ background: "var(--color-ivory)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs mb-6 sm:mb-8" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span style={{ color: "var(--color-border)" }}>/</span>
          <Link href="/shop">Shop</Link>
          <span style={{ color: "var(--color-border)" }}>/</span>
          <Link href={`/shop?category=${product.categoryId}`}>{product.category}</Link>
          <span style={{ color: "var(--color-border)" }}>/</span>
          <span style={{ color: "var(--color-charcoal)" }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery (7 cols on lg) */}
          <div className="lg:col-span-7">
            {/* Main Image */}
            <div
              className="overflow-hidden rounded-lg cursor-zoom-in mb-3.5 relative bg-light-gray border border-border shadow-xs group"
              style={{
                aspectRatio: "4/3",
              }}
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={product.images[selectedImage]}
                alt={`${product.name} — view ${selectedImage + 1}`}
                width={900}
                height={675}
                priority
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />

              {/* Floating Zoom Hint */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-full pointer-events-none flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                <span>Click to expand high-res</span>
              </div>

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                {discountPercent > 0 && (
                  <span className="bg-rose-700 text-white text-xs font-bold px-2.5 py-1 rounded shadow-md">
                    {discountPercent}% OFF
                  </span>
                )}
                {product.isFeatured && <span className="badge badge-featured">Featured</span>}
                {product.isNewArrival && <span className="badge badge-new">New Arrival</span>}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1 max-w-full">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`gallery-thumb rounded border ${
                      i === selectedImage ? "active ring-2 ring-walnut" : "opacity-80 hover:opacity-100"
                    }`}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      width={80}
                      height={60}
                      className="object-cover rounded-xs"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product E-Commerce Info (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Ratings */}
              <div className="flex items-center justify-between mb-2">
                <span className="section-eyebrow mb-0">{product.category}</span>
                <div className="flex items-center gap-1.5 text-xs text-warm-gray">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-charcoal">{product.rating}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & SKU */}
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  lineHeight: 1.15,
                }}
                className="text-charcoal mb-1"
              >
                {product.name}
              </h1>

              <div className="flex items-center gap-3 text-xs text-warm-gray mb-4">
                <span>SKU: {product.sku}</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  In Stock ({product.stockCount} available)
                </span>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-lg bg-stone/30 border border-border mb-5">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm sm:text-base text-warm-gray line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {savings > 0 && (
                    <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2 py-0.5 rounded">
                      Save {formatPrice(savings)} ({discountPercent}% OFF)
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-warm-gray mt-1">
                  Inclusive of all local taxes. White-glove installation available across Kathmandu Valley.
                </p>
              </div>

              {/* Color / Finish Selector */}
              {product.colors.length > 0 && (
                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal block mb-2">
                    Select Finish: <span className="font-normal text-walnut">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs px-3 py-1.5 rounded border transition-all ${
                          selectedColor === color
                            ? "bg-charcoal text-white border-charcoal shadow-xs"
                            : "bg-white text-charcoal border-border hover:border-walnut"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Stock Warning */}
              <div className="mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal block mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center border border-border rounded bg-white overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="px-3 py-2 text-charcoal hover:bg-stone/50 transition-colors disabled:opacity-30"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-semibold text-sm select-none text-charcoal min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(product.stockCount || 99, q + 1))}
                      disabled={quantity >= (product.stockCount || 99)}
                      className="px-3 py-2 text-charcoal hover:bg-stone/50 transition-colors disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-xs text-warm-gray">
                    Max: {product.stockCount} units per order
                  </span>
                </div>
              </div>

              {/* Action Buttons: Add to Cart + Buy Now */}
              <div className="space-y-2.5 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="btn-primary w-full justify-center py-3 text-xs tracking-wider uppercase font-semibold flex items-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="btn-outline w-full justify-center py-3 text-xs tracking-wider uppercase font-semibold flex items-center gap-2 bg-walnut text-white border-walnut hover:bg-charcoal hover:border-charcoal shadow-sm transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Buy Now</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={directWhatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp no-underline w-full justify-center py-2.5 text-xs font-semibold flex items-center gap-2 shadow-xs"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => toggle(product.id)}
                    className="btn-outline no-underline w-full justify-center py-2.5 text-xs font-semibold flex items-center gap-2"
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={isFavorite(product.id) ? "#E53E3E" : "none"}
                      stroke={isFavorite(product.id) ? "#E53E3E" : "currentColor"}
                    />
                    <span>{isFavorite(product.id) ? "Saved to Favorites" : "Add to Favorites"}</span>
                  </button>
                </div>
              </div>

              {/* Guarantees & Highlights */}
              <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-border/80 text-xs">
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-walnut shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-charcoal">Free Valley Delivery</strong>
                    <span className="text-warm-gray text-[11px]">On orders over Rs. 50k</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-walnut shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-charcoal">{product.warranty}</strong>
                    <span className="text-warm-gray text-[11px]">Seasoned hardwood warranty</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Wrench className="w-4 h-4 text-walnut shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-charcoal">Complimentary Assembly</strong>
                    <span className="text-warm-gray text-[11px]">By master craftsmen</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <RotateCcw className="w-4 h-4 text-walnut shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-charcoal">COD & Inspection</strong>
                    <span className="text-warm-gray text-[11px]">Verify piece before payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-12 pt-8 border-t border-border">
          {/* Tab Navigation */}
          <div className="flex border-b border-border gap-4 sm:gap-8 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === "specs"
                  ? "border-walnut text-walnut"
                  : "border-transparent text-warm-gray hover:text-charcoal"
              }`}
            >
              Specifications & Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab("delivery")}
              className={`pb-3 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === "delivery"
                  ? "border-walnut text-walnut"
                  : "border-transparent text-warm-gray hover:text-charcoal"
              }`}
            >
              Delivery & White-Glove Setup
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === "reviews"
                  ? "border-walnut text-walnut"
                  : "border-transparent text-warm-gray hover:text-charcoal"
              }`}
            >
              Client Reviews ({reviews.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === "specs" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-2">Description</h3>
                  <p className="text-sm text-charcoal leading-relaxed max-w-3xl">
                    {product.description}
                  </p>
                </div>

                {/* Dimensions */}
                {(product.dimensions.width || product.dimensions.depth || product.dimensions.height) && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-3">
                      Dimensions
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
                      {product.dimensions.width && (
                        <div className="p-3 bg-stone/40 rounded border border-border text-center">
                          <p className="text-[10px] uppercase text-warm-gray tracking-wider mb-1">Width</p>
                          <p className="text-sm font-medium text-charcoal">{product.dimensions.width}</p>
                        </div>
                      )}
                      {product.dimensions.depth && (
                        <div className="p-3 bg-stone/40 rounded border border-border text-center">
                          <p className="text-[10px] uppercase text-warm-gray tracking-wider mb-1">Depth</p>
                          <p className="text-sm font-medium text-charcoal">{product.dimensions.depth}</p>
                        </div>
                      )}
                      {product.dimensions.height && (
                        <div className="p-3 bg-stone/40 rounded border border-border text-center">
                          <p className="text-[10px] uppercase text-warm-gray tracking-wider mb-1">Height</p>
                          <p className="text-sm font-medium text-charcoal">{product.dimensions.height}</p>
                        </div>
                      )}
                      {product.dimensions.seatHeight && (
                        <div className="p-3 bg-stone/40 rounded border border-border text-center">
                          <p className="text-[10px] uppercase text-warm-gray tracking-wider mb-1">Seat Height</p>
                          <p className="text-sm font-medium text-charcoal">{product.dimensions.seatHeight}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Key Features */}
                {product.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-3">
                      Key Highlights & Materials
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-charcoal">
                          <Check className="w-4 h-4 text-walnut shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 text-xs text-charcoal">
                        <Sparkles className="w-4 h-4 text-walnut shrink-0" />
                        <span>Materials: {product.materials.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="space-y-6 max-w-3xl text-sm text-charcoal">
                <div className="p-4 rounded-lg bg-stone/30 border border-border">
                  <h4 className="font-serif text-lg text-charcoal mb-2 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-walnut" />
                    Kathmandu Valley Delivery
                  </h4>
                  <p className="text-xs leading-relaxed text-warm-gray">
                    We deliver across Kathmandu, Lalitpur, and Bhaktapur within 2–4 business days. White-glove assembly, room placement, and unboxing packaging removal are provided at zero extra cost for orders above Rs. 50,000.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-stone/30 border border-border">
                  <h4 className="font-serif text-lg text-charcoal mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-walnut" />
                    Outside Valley Dispatch (All Nepal)
                  </h4>
                  <p className="text-xs leading-relaxed text-warm-gray">
                    Secure transport crate shipping is available to Pokhara, Chitwan, Butwal, Biratnagar, Dharan, Nepalgunj, and major highway hubs. Delivery typically completes within 4–7 business days.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <span className="font-serif text-2xl font-bold text-charcoal mr-2">
                      {product.rating} / 5.0
                    </span>
                    <span className="text-xs text-warm-gray">Based on {product.reviewsCount} customer reviews</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-lg bg-white border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-charcoal">{rev.author}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                            Verified Buyer
                          </span>
                        </div>
                        <span className="text-[10px] text-warm-gray">{rev.date}</span>
                      </div>
                      <p className="text-[11px] text-warm-gray mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-walnut" />
                        {rev.location}
                      </p>
                      <p className="text-xs text-charcoal leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14 sm:mt-20 pt-8 sm:pt-12 border-t border-border">
            <div className="text-center mb-8 sm:mb-10">
              <p className="section-eyebrow">Complementary Pieces</p>
              <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                You May Also Admire
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
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: "0.75rem",
                  borderRadius: "50%",
                  zIndex: 310,
                }}
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
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: "0.75rem",
                  borderRadius: "50%",
                  zIndex: 310,
                }}
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
