"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { useFavorites } from "@/hooks/useFavorites";
import ProductCard from "@/components/ProductCard";
import { getWhatsAppLink } from "@/lib/config";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const handleInquireAllFavorites = () => {
    if (favoriteProducts.length === 0) return;
    const names = favoriteProducts.map((p) => p.name).join(", ");
    const text = `Hello Furniture King Nepal, I have shortlisted these pieces from your website: ${names}. Please let me know about their availability and details.`;
    const url = `https://wa.me/9779864835160?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-soft-beige pb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-walnut font-medium mb-2 block">
              Your Shortlist
            </span>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                lineHeight: 1.2,
              }}
              className="text-charcoal"
            >
              Saved Favorites
            </h1>
            <p className="text-warm-gray text-sm mt-2">
              {favoriteProducts.length === 1
                ? "1 furniture piece saved on this browser"
                : `${favoriteProducts.length} furniture pieces saved on this browser`}
            </p>
          </div>

          {favoriteProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleInquireAllFavorites}
                className="btn-primary no-underline text-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Enquire All on WhatsApp</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Product Grid or Empty State */}
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 px-6 rounded-2xl bg-white border border-soft-beige max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-ivory text-walnut flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-2xl text-charcoal mb-2 font-normal"
            >
              No Saved Pieces Yet
            </h2>
            <p className="text-warm-gray text-xs sm:text-sm mb-6 leading-relaxed">
              Click the heart icon on any sofa, bed, dining set, or storage piece to create your personalized shortlist.
            </p>
            <Link href="/shop" className="btn-primary no-underline inline-block">
              Explore Furniture Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
