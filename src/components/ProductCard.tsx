"use client";

import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice, calculateDiscount } from "@/lib/products";
import { Heart, ArrowRight, ShoppingBag, Star, Check } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  const { addToCart } = useCart();
  const discountPercent = calculateDiscount(product.originalPrice, product.price);

  return (
    <TiltCard
      maxTilt={6}
      perspective={1000}
      scale={1.02}
      glare={true}
      glareOpacity={0.15}
      className="h-full"
    >
      <div
        className="product-card h-full flex flex-col justify-between"
        id={`product-card-${product.id}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div>
          {/* Card Image Area */}
          <div className="product-card-image relative overflow-hidden group">
            <Link href={`/product/${product.slug}`} className="block w-full h-full">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={600}
                height={450}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </Link>

            {/* Favorite Button with 3D elevation */}
            <button
              className={`fav-btn ${isFavorite ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
              style={{ transform: "translateZ(25px)" }}
              aria-label={
                isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`
              }
            >
              <Heart
                className="w-4 h-4"
                fill={isFavorite ? "#E53E3E" : "none"}
                stroke={isFavorite ? "#E53E3E" : "var(--color-charcoal)"}
                strokeWidth={2}
              />
            </button>

            {/* Badges with 3D elevation */}
            <div
              className="absolute top-3 left-3 flex flex-col gap-1.5 z-5 pointer-events-none"
              style={{ transform: "translateZ(20px)" }}
            >
              {discountPercent > 0 && (
                <span className="bg-rose-700 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                  {discountPercent}% OFF
                </span>
              )}
              {product.isFeatured && <span className="badge badge-featured">Featured</span>}
              {product.isNewArrival && <span className="badge badge-new">New</span>}
            </div>

            {/* In-Stock Indicator */}
            {product.stockCount && product.stockCount <= 4 && (
              <div
                className="absolute bottom-2.5 left-2.5 z-5 bg-black/75 backdrop-blur-xs text-amber-300 text-[10px] font-medium px-2 py-0.5 rounded"
                style={{ transform: "translateZ(15px)" }}
              >
                Only {product.stockCount} left in stock
              </div>
            )}
          </div>

          {/* Card Body */}
          <div className="product-card-body flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="product-card-category mb-0">{product.category}</p>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1 text-[11px] text-warm-gray">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-charcoal">{product.rating}</span>
                    <span>({product.reviewsCount})</span>
                  </div>
                )}
              </div>

              <Link href={`/product/${product.slug}`} className="no-underline group block mb-1">
                <h3 className="product-card-name group-hover:text-walnut transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>

              <p className="product-card-desc mb-3 line-clamp-2">{product.shortDescription}</p>
            </div>

            {/* Price & Purchase Actions */}
            <div className="pt-2 border-t border-border/80">
              {/* Price Line */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-lg font-bold text-charcoal">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-warm-gray line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Action Buttons: Add to Cart + Details */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product, 1);
                  }}
                  className="btn-primary no-underline w-full justify-center inline-flex items-center gap-1.5 text-xs py-2 px-2 cursor-pointer shadow-xs"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>

                <Link
                  href={`/product/${product.slug}`}
                  className="btn-outline no-underline w-full justify-center inline-flex items-center gap-1 text-xs py-2 px-2"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
