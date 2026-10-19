"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories, searchProducts, getAllStyles, getAllRooms } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/hooks/useFavorites";
import { Search, X, SlidersHorizontal, Check } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialRoom = searchParams.get("room") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeRoom, setActiveRoom] = useState(initialRoom);
  const [activeStyle, setActiveStyle] = useState("");
  const [priceRange, setPriceRange] = useState<"all" | "under-50k" | "50k-100k" | "above-100k">("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const { isFavorite, toggle } = useFavorites();

  const styles = useMemo(() => getAllStyles(), []);
  const rooms = useMemo(() => getAllRooms(), []);

  const filteredProducts = useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : [...products];

    if (activeCategory) {
      result = result.filter((p) => p.categoryId === activeCategory);
    }
    if (activeRoom) {
      result = result.filter((p) => p.room === activeRoom);
    }
    if (activeStyle) {
      result = result.filter((p) => p.style === activeStyle);
    }

    // Price range filtering
    if (priceRange === "under-50k") {
      result = result.filter((p) => p.price < 50000);
    } else if (priceRange === "50k-100k") {
      result = result.filter((p) => p.price >= 50000 && p.price <= 100000);
    } else if (priceRange === "above-100k") {
      result = result.filter((p) => p.price > 100000);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, activeCategory, activeRoom, activeStyle, priceRange, sortBy]);

  const hasActiveFilters = activeCategory || activeRoom || activeStyle || priceRange !== "all";

  function clearAllFilters() {
    setActiveCategory("");
    setActiveRoom("");
    setActiveStyle("");
    setPriceRange("all");
    setSearchQuery("");
  }

  // Sync URL params changes
  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "");
    setSearchQuery(searchParams.get("search") || "");
    setActiveRoom(searchParams.get("room") || "");
  }, [searchParams]);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-ivory)" }}>
      {/* Page Header */}
      <div
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 text-center"
        style={{ background: "var(--color-charcoal)" }}
      >
        <p className="section-eyebrow" style={{ color: "var(--color-walnut)" }}>
          Furniture King Nepal
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--color-white)",
            marginBottom: "0.75rem",
          }}
        >
          Explore Luxury Furniture
        </h1>
        <p style={{ color: "var(--color-warm-gray)", maxWidth: "480px", margin: "0 auto", fontSize: "0.95rem" }}>
          Handcrafted royal furniture crafted with seasoned hardwood. White-glove delivery across Nepal.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs mb-6" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span style={{ color: "var(--color-border)" }}>/</span>
          <span style={{ color: "var(--color-charcoal)" }}>Shop</span>
          {activeCategory && (
            <>
              <span style={{ color: "var(--color-border)" }}>/</span>
              <span style={{ color: "var(--color-charcoal)" }}>
                {categories.find((c) => c.slug === activeCategory)?.name}
              </span>
            </>
          )}
        </nav>

        {/* Search & Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, wood, room, style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-warm-gray)" }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input flex-1 sm:flex-initial text-xs py-2 px-3 rounded border border-border bg-white"
              style={{ minWidth: "160px" }}
              aria-label="Sort products"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
              <option value="name-asc">Name: A to Z</option>
            </select>

            <button
              className="btn-outline lg:hidden inline-flex items-center gap-1.5 shrink-0"
              onClick={() => setShowFilters(!showFilters)}
              style={{ padding: "0.65rem 1rem", fontSize: "0.78rem" }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showFilters ? "Hide" : "Filters"}</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-walnut inline-block" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters — Desktop */}
          <aside
            className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-56 flex-shrink-0`}
          >
            <div className="sticky top-24">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="mb-4 text-xs font-semibold uppercase tracking-wider underline block"
                  style={{ color: "var(--color-walnut)", background: "none", border: "none", cursor: "pointer" }}
                >
                  Clear all filters
                </button>
              )}

              {/* Price Filter */}
              <div className="mb-6">
                <h4
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                  }}
                >
                  Price Range
                </h4>
                <div className="flex flex-col gap-1.5">
                  <button
                    className={`filter-chip ${priceRange === "all" ? "active" : ""}`}
                    onClick={() => setPriceRange("all")}
                    style={{ justifyContent: "flex-start" }}
                  >
                    All Prices
                  </button>
                  <button
                    className={`filter-chip ${priceRange === "under-50k" ? "active" : ""}`}
                    onClick={() => setPriceRange("under-50k")}
                    style={{ justifyContent: "flex-start" }}
                  >
                    Under Rs. 50,000
                  </button>
                  <button
                    className={`filter-chip ${priceRange === "50k-100k" ? "active" : ""}`}
                    onClick={() => setPriceRange("50k-100k")}
                    style={{ justifyContent: "flex-start" }}
                  >
                    Rs. 50,000 – Rs. 1,00,000
                  </button>
                  <button
                    className={`filter-chip ${priceRange === "above-100k" ? "active" : ""}`}
                    onClick={() => setPriceRange("above-100k")}
                    style={{ justifyContent: "flex-start" }}
                  >
                    Above Rs. 1,00,000
                  </button>
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                  }}
                >
                  Category
                </h4>
                <div className="flex flex-col gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`filter-chip ${activeCategory === cat.slug ? "active" : ""}`}
                      onClick={() =>
                        setActiveCategory(activeCategory === cat.slug ? "" : cat.slug)
                      }
                      style={{ justifyContent: "flex-start" }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Room */}
              <div className="mb-6">
                <h4
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                  }}
                >
                  Room
                </h4>
                <div className="flex flex-col gap-1.5">
                  {rooms.map((room) => (
                    <button
                      key={room}
                      className={`filter-chip ${activeRoom === room ? "active" : ""}`}
                      onClick={() => setActiveRoom(activeRoom === room ? "" : room)}
                      style={{ justifyContent: "flex-start" }}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div className="mb-6">
                <h4
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                  }}
                >
                  Style
                </h4>
                <div className="flex flex-col gap-1.5">
                  {styles.map((style) => (
                    <button
                      key={style}
                      className={`filter-chip ${activeStyle === style ? "active" : ""}`}
                      onClick={() => setActiveStyle(activeStyle === style ? "" : style)}
                      style={{ justifyContent: "flex-start" }}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Close / Apply Button */}
              <div className="lg:hidden pt-4 pb-2 border-t border-soft-beige">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full btn-primary justify-center text-xs"
                  style={{ padding: "0.75rem 1rem" }}
                >
                  View {filteredProducts.length} Results
                </button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <p
              className="mb-4"
              style={{ fontSize: "0.85rem", color: "var(--color-warm-gray)" }}
            >
              Showing {filteredProducts.length} piece{filteredProducts.length !== 1 ? "s" : ""}{" "}
              {searchQuery ? `for "${searchQuery}"` : ""}
            </p>

            {/* Active filter tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {priceRange !== "all" && (
                  <span
                    className="filter-chip active inline-flex items-center gap-1.5 cursor-pointer"
                    onClick={() => setPriceRange("all")}
                  >
                    <span>
                      {priceRange === "under-50k"
                        ? "Under Rs. 50k"
                        : priceRange === "50k-100k"
                        ? "Rs. 50k – 100k"
                        : "Above Rs. 100k"}
                    </span>
                    <X className="w-3.5 h-3.5" />
                  </span>
                )}
                {activeCategory && (
                  <span className="filter-chip active inline-flex items-center gap-1.5" onClick={() => setActiveCategory("")} style={{ cursor: "pointer" }}>
                    <span>{categories.find((c) => c.slug === activeCategory)?.name}</span>
                    <X className="w-3.5 h-3.5" />
                  </span>
                )}
                {activeRoom && (
                  <span className="filter-chip active inline-flex items-center gap-1.5" onClick={() => setActiveRoom("")} style={{ cursor: "pointer" }}>
                    <span>{activeRoom}</span>
                    <X className="w-3.5 h-3.5" />
                  </span>
                )}
                {activeStyle && (
                  <span className="filter-chip active inline-flex items-center gap-1.5" onClick={() => setActiveStyle("")} style={{ cursor: "pointer" }}>
                    <span>{activeStyle}</span>
                    <X className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="font-serif text-2xl text-charcoal mb-2">No furniture pieces matched your criteria</p>
                <p className="text-sm text-warm-gray mb-6">
                  Try broadening your price filters or searching for alternative terms.
                </p>
                <button onClick={clearAllFilters} className="btn-outline">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={isFavorite(product.id)}
                    onToggleFavorite={toggle}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-sm text-warm-gray">Loading Furniture King Catalog...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
