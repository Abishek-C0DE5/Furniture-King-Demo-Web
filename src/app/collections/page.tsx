import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { categories, getAllRooms } from "@/lib/products";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Collections | ${siteConfig.businessName}`,
  description: "Browse Furniture King Nepal collections curated by living space, category, and interior style.",
};

const roomHighlights = [
  {
    name: "Living Room",
    slug: "living-room",
    description: "Centerpieces designed for relaxed conversation, luxury lounging, and everyday entertaining.",
    image: "/Photos/487312245_657080413939892_396357785909587725_n.jpg",
    items: "Sofas, Loveseats, Coffee Tables, Accent Chairs",
  },
  {
    name: "Bedroom",
    slug: "bedroom",
    description: "Serene bedroom furniture crafted with durable solid hardwoods and rich natural textures.",
    image: "/Photos/520813632_749533304694602_5302357473682948902_n.jpg",
    items: "King & Queen Beds, Nightstands, Dressers, Wardrobes",
  },
  {
    name: "Dining Room",
    slug: "dining-room",
    description: "Heirloom-grade dining tables and comfortable seating built for family feasts and celebrations.",
    image: "/Photos/523779865_749533121361287_3602915158766384796_n.jpg",
    items: "6-Seater Tables, Dining Chairs, Sideboards",
  },
  {
    name: "Workspace & Office",
    slug: "workspace",
    description: "Ergonomic, distinguished desks and functional storage tailored for focus and productivity.",
    image: "/Photos/524156982_749533244694608_1871295132924487615_n.jpg",
    items: "Executive Desks, Study Sets, Bookshelves",
  },
];

export default function CollectionsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-walnut font-medium mb-3 block">
            Curated Spaces
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.2,
            }}
            className="text-charcoal mb-4"
          >
            Furniture Collections
          </h1>
          <p className="text-warm-gray leading-relaxed">
            Discover tailored furniture for every corner of your home and commercial spaces. Explore by room or browse specialized categories.
          </p>
        </div>

        {/* Room Showcase */}
        <div className="mb-20">
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-2xl text-charcoal mb-8 border-b border-soft-beige pb-4"
          >
            Explore by Living Space
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roomHighlights.map((room) => (
              <div
                key={room.slug}
                className="group relative overflow-hidden rounded-xl border border-soft-beige bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-ivory">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs uppercase tracking-wider text-white/80 block mb-1">
                      {room.items}
                    </span>
                    <h3
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-2xl font-normal text-white mb-2"
                    >
                      {room.name}
                    </h3>
                    <p className="text-sm text-white/90 line-clamp-2 mb-4">
                      {room.description}
                    </p>
                    <Link
                      href={`/shop?room=${encodeURIComponent(room.name === "Workspace & Office" ? "Workspace" : room.name)}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-soft-beige underline underline-offset-4"
                    >
                      Browse {room.name} Catalog
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-2xl text-charcoal mb-8 border-b border-soft-beige pb-4"
          >
            Product Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className="group block p-6 rounded-xl border border-soft-beige bg-white hover:border-walnut/40 hover:shadow-sm transition-all no-underline"
              >
                <div className="relative h-48 w-full rounded-lg overflow-hidden bg-ivory mb-4">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-xl text-charcoal group-hover:text-walnut transition-colors mb-1"
                    >
                      {cat.name}
                    </h3>
                    <p className="text-xs text-warm-gray">{cat.description}</p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center text-charcoal group-hover:bg-walnut group-hover:text-white transition-all shrink-0 ml-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
