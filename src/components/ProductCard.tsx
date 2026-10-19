"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { Heart, ArrowRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
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
          <div className="product-card-image relative overflow-hidden">
            <Link href={`/product/${product.slug}`} className="block w-full h-full">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={600}
                height={450}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
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
              className="absolute top-3 left-3 flex flex-col gap-1 z-5"
              style={{ transform: "translateZ(20px)" }}
            >
              {product.isFeatured && <span className="badge badge-featured">Featured</span>}
              {product.isNewArrival && <span className="badge badge-new">New</span>}
            </div>
          </div>

          <div className="product-card-body">
            <p className="product-card-category">{product.category}</p>
            <Link href={`/product/${product.slug}`} className="no-underline group">
              <h3 className="product-card-name group-hover:text-walnut transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="product-card-desc mb-3 line-clamp-2">{product.shortDescription}</p>
            <Link
              href={`/product/${product.slug}`}
              className="btn-outline no-underline w-full justify-between inline-flex items-center text-xs"
              style={{ padding: "0.5rem 0.85rem" }}
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
