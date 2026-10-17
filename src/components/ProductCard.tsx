"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  return (
    <div className="product-card" id={`product-card-${product.id}`}>
      <div className="product-card-image">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={450}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </Link>

        {/* Favorite */}
        <button
          className={`fav-btn ${isFavorite ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(product.id);
          }}
          aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isFavorite ? "#E53E3E" : "var(--color-charcoal)"} strokeWidth="2">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill={isFavorite ? "#E53E3E" : "none"}
            />
          </svg>
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-5">
          {product.isFeatured && <span className="badge badge-featured">Featured</span>}
          {product.isNewArrival && <span className="badge badge-new">New</span>}
        </div>
      </div>

      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <Link href={`/product/${product.slug}`} className="no-underline">
          <h3 className="product-card-name">{product.name}</h3>
        </Link>
        <p className="product-card-desc">{product.shortDescription}</p>
        <div className="mt-3 flex gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="btn-outline no-underline"
            style={{ padding: "0.5rem 1rem", fontSize: "0.72rem" }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
