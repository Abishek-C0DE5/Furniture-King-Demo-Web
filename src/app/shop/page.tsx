"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories, searchProducts, getAllStyles, getAllRooms } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/hooks/useFavorites";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialRoom = searchParams.get("room") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeRoom, setActiveRoom] = useState(initialRoom);
  const [activeStyle, setActiveStyle] = useState("");
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

    switch (sortBy) {
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
  }, [searchQuery, activeCategory, activeRoom, activeStyle, sortBy]);

  const hasActiveFilters = activeCategory || activeRoom || activeStyle;

  function clearAllFilters() {
    setActiveCategory("");
    setActiveRoom("");
    setActiveStyle("");
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
        className="py-14 lg:py-20 px-6 lg:px-12 text-center"
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
          Shop Furniture
        </h1>
        <p style={{ color: "var(--color-warm-gray)", maxWidth: "480px", margin: "0 auto" }}>
          Explore our full collection. Use filters to find exactly what you&apos;re looking for.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
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
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-warm-gray)"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, material, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-warm-gray)" }}
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input"
              style={{ width: "auto", minWidth: "140px" }}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="name-asc">Name A–Z</option>
            </select>

            <button
              className="btn-outline lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
              style={{ padding: "0.6rem 1rem", fontSize: "0.78rem" }}
            >
              Filters {hasActiveFilters ? "●" : ""}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters — Desktop */}
          <aside
            className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-56 flex-shrink-0`}
          >
            <div className="sticky top-24">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="mb-4 text-sm font-medium underline"
                  style={{ color: "var(--color-walnut)", background: "none", border: "none", cursor: "pointer" }}
                >
                  Clear all filters
                </button>
              )}

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
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <p
              className="mb-4"
              style={{ fontSize: "0.85rem", color: "var(--color-warm-gray)" }}
            >
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}{" "}
              {searchQuery ? `for "${searchQuery}"` : ""}
            </p>

            {/* Active filter tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeCategory && (
                  <span className="filter-chip active" onClick={() => setActiveCategory("")} style={{ cursor: "pointer" }}>
                    {categories.find((c) => c.slug === activeCategory)?.name} ✕
                  </span>
                )}
                {activeRoom && (
                  <span className="filter-chip active" onClick={() => setActiveRoom("")} style={{ cursor: "pointer" }}>
                    {activeRoom} ✕
                  </span>
                )}
                {activeStyle && (
                  <span className="filter-chip active" onClick={() => setActiveStyle("")} style={{ cursor: "pointer" }}>
                    {activeStyle} ✕
                  </span>
                )}
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={isFavorite(product.id)}
                    onToggleFavorite={toggle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  No furniture found
                </p>
                <p style={{ color: "var(--color-warm-gray)", marginBottom: "1.5rem" }}>
                  Try adjusting your search or filters to find what you&apos;re looking for.
                </p>
                <button onClick={clearAllFilters} className="btn-outline">
                  Clear Filters
                </button>
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
      <ShopContent />
    </Suspense>
  );
}
