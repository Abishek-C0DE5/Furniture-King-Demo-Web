"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { products as initialProducts, categories as initialCategories, Product, Category } from "@/lib/products";
import { siteConfig } from "@/lib/config";
import { Lock, Star, Check, X, ArrowRight, ExternalLink } from "lucide-react";

interface InquiryItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  category?: string;
  preferredTime?: string;
  message: string;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"products" | "inquiries" | "siteConfig" | "categories">("products");

  // In-memory / state managed editable items
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [categoriesList, setCategoriesList] = useState<Category[]>(initialCategories);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Editable settings
  const [heroHeading, setHeroHeading] = useState(siteConfig.heroHeadline);
  const [heroSubtext, setHeroSubtext] = useState(siteConfig.heroSubtext);
  const [phone, setPhone] = useState(siteConfig.phone);
  const [email, setEmail] = useState(siteConfig.email);
  const [announcement, setAnnouncement] = useState(siteConfig.announcementText);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // New product form modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("sofas-seating");
  const [newProductRoom, setNewProductRoom] = useState("Living Room");
  const [newProductDesc, setNewProductDesc] = useState("");
  const [newProductDimensions, setNewProductDimensions] = useState("W: 200cm × D: 90cm × H: 85cm");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo master PIN: "1234" or configured via env
    if (adminPin === "1234" || adminPin === "furnitureking") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid access PIN. (Demo PIN: 1234 or furnitureking)");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch received inquiries from API
      setLoadingInquiries(true);
      fetch("/api/inquiry")
        .then((res) => res.json())
        .then((data) => {
          if (data?.inquiries) {
            setInquiries(data.inquiries);
          }
        })
        .catch(() => {})
        .finally(() => setLoadingInquiries(false));
    }
  }, [isAuthenticated]);

  const toggleFeatured = (id: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  const deleteProduct = (id: string) => {
    if (confirm("Are you sure you want to remove this product from the demo catalog?")) {
      setProductsList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const matchedCat = categoriesList.find((c) => c.id === newProductCategory);
    const catName = matchedCat ? matchedCat.name : "Custom Category";
    const slug = newProductName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newProd: Product = {
      id: "prod-" + Date.now(),
      slug,
      name: newProductName.trim(),
      sku: "FKN-" + Math.floor(100 + Math.random() * 900),
      categoryId: newProductCategory,
      category: catName,
      description: newProductDesc || "Premium quality handcrafted furniture piece.",
      shortDescription: newProductDesc.slice(0, 80) || "Elegant furniture designed for comfortable modern living.",
      images: [
        "/Photos/487312245_657080413939892_396357785909587725_n.jpg",
        "/Photos/487110252_657079973939936_4420901078227985058_n.jpg",
      ],
      materials: ["Solid Seasoned Hardwood", "Premium Upholstery"],
      colors: ["Natural Wood Finish", "Warm Beige"],
      dimensions: {
        width: "200 cm",
        depth: "90 cm",
        height: "85 cm",
      },
      features: [
        "Seasoned solid hardwood frame",
        "High-density ergonomic resilience",
        "Reinforced joint construction",
      ],
      room: newProductRoom,
      style: "Contemporary",
      isFeatured: true,
      isNewArrival: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProductsList([newProd, ...productsList]);
    setIsAddModalOpen(false);
    setNewProductName("");
    setNewProductDesc("");
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-md mx-auto p-8 rounded-2xl border border-soft-beige bg-white shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-ivory text-walnut flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-walnut" />
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)" }} className="text-2xl text-charcoal mb-2 font-normal">
            Showroom Admin Portal
          </h1>
          <p className="text-xs text-warm-gray mb-6">
            Enter administrator access PIN to view catalog management, live inquiries, and showroom settings.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Enter Access PIN (Demo: 1234)"
                className="w-full text-center px-4 py-2.5 rounded-lg border border-soft-beige bg-ivory/40 text-sm tracking-widest focus:outline-none focus:border-walnut"
                autoFocus
              />
            </div>
            {authError && <p className="text-xs text-red-600">{authError}</p>}
            <button type="submit" className="w-full btn-primary justify-center cursor-pointer">
              Access Admin Workspace
            </button>
            <p className="text-[11px] text-warm-gray pt-2">
              Protected route for authorized Furniture King Nepal staff.
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-soft-beige pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span className="text-xs uppercase tracking-wider text-green-700 font-semibold">
                Admin Active (Demo Mode)
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-serif)" }} className="text-3xl text-charcoal mt-1">
              Store Management Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs px-3.5 py-2 rounded-lg border border-soft-beige bg-white hover:bg-ivory text-charcoal no-underline inline-flex items-center gap-1.5"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs px-3.5 py-2 rounded-lg bg-soft-beige text-charcoal hover:bg-soft-beige/80 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-soft-beige mb-8 pb-3">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer ${
              activeTab === "products"
                ? "bg-walnut text-white"
                : "bg-white text-charcoal hover:bg-ivory border border-soft-beige"
            }`}
          >
            Catalog Products ({productsList.length})
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer ${
              activeTab === "inquiries"
                ? "bg-walnut text-white"
                : "bg-white text-charcoal hover:bg-ivory border border-soft-beige"
            }`}
          >
            Inquiries Received ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("siteConfig")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer ${
              activeTab === "siteConfig"
                ? "bg-walnut text-white"
                : "bg-white text-charcoal hover:bg-ivory border border-soft-beige"
            }`}
          >
            Showroom & Hero Settings
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer ${
              activeTab === "categories"
                ? "bg-walnut text-white"
                : "bg-white text-charcoal hover:bg-ivory border border-soft-beige"
            }`}
          >
            Categories ({categoriesList.length})
          </button>
        </div>

        {/* Tab 1: Products */}
        {activeTab === "products" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-charcoal">Catalog Inventory</h2>
                <p className="text-xs text-warm-gray">
                  Manage products, mark featured items, or add new furniture showcases.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="btn-primary text-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>Add New Furniture Piece</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-soft-beige bg-white shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-ivory/60 border-b border-soft-beige text-warm-gray font-semibold uppercase tracking-wider">
                    <th className="p-3.5">Image & Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Room</th>
                    <th className="p-3.5">Featured</th>
                    <th className="p-3.5">SKU</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-soft-beige">
                  {productsList.map((product) => (
                    <tr key={product.id} className="hover:bg-ivory/30 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-ivory shrink-0 border border-soft-beige">
                          <Image
                            src={product.images[0] || "/Photos/487312245_657080413939892_396357785909587725_n.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-charcoal text-sm">{product.name}</p>
                          <p className="text-[11px] text-warm-gray line-clamp-1">{product.shortDescription}</p>
                        </div>
                      </td>
                      <td className="p-3.5 text-charcoal">{product.category}</td>
                      <td className="p-3.5 text-warm-gray">{product.room}</td>
                      <td className="p-3.5">
                        <button
                          onClick={() => toggleFeatured(product.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-colors cursor-pointer ${
                            product.isFeatured
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}
                        >
                          {product.isFeatured ? (
                            <span className="inline-flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              Featured
                            </span>
                          ) : (
                            "Standard"
                          )}
                        </button>
                      </td>
                      <td className="p-3.5 font-mono text-warm-gray">{product.sku}</td>
                      <td className="p-3.5 text-right space-x-2">
                        <Link
                          href={`/product/${product.slug}`}
                          target="_blank"
                          className="text-walnut hover:underline font-medium text-xs"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800 text-xs cursor-pointer ml-3"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Inquiries */}
        {activeTab === "inquiries" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-charcoal">Customer Inquiries</h2>
              <p className="text-xs text-warm-gray">
                Logged inquiries submitted via website form and WhatsApp handoff requests.
              </p>
            </div>

            {loadingInquiries ? (
              <p className="text-xs text-warm-gray py-8 text-center">Loading inquiries...</p>
            ) : inquiries.length === 0 ? (
              <div className="p-12 text-center rounded-xl border border-soft-beige bg-white">
                <p className="text-sm text-warm-gray">No inquiries logged yet during this server session.</p>
                <p className="text-xs text-warm-gray/80 mt-1">
                  Test the Contact form or product detail &ldquo;Chat to Buy&rdquo; to see submissions appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-5 rounded-xl border border-soft-beige bg-white shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 border-b border-soft-beige/50 pb-2">
                      <div>
                        <span className="font-semibold text-charcoal text-sm">{inq.name}</span>
                        <span className="text-xs text-warm-gray ml-2">Phone: {inq.phone}</span>
                        {inq.email && <span className="text-xs text-warm-gray ml-2">({inq.email})</span>}
                      </div>
                      <span className="text-[11px] text-warm-gray">
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3 text-warm-gray">
                      {inq.product && (
                        <div>
                          <strong>Interested Product:</strong> {inq.product}
                        </div>
                      )}
                      {inq.category && (
                        <div>
                          <strong>Category:</strong> {inq.category}
                        </div>
                      )}
                      {inq.preferredTime && (
                        <div>
                          <strong>Preferred Time:</strong> {inq.preferredTime}
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-lg bg-ivory/50 text-xs text-charcoal">
                      <p className="font-medium text-warm-gray mb-1">Inquiry Message:</p>
                      <p>{inq.message}</p>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-700 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <span>Reply on WhatsApp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Site & Hero Settings */}
        {activeTab === "siteConfig" && (
          <div className="max-w-2xl bg-white p-8 rounded-2xl border border-soft-beige shadow-xs">
            <h2 className="text-xl font-semibold text-charcoal mb-1">Showroom & Hero Configuration</h2>
            <p className="text-xs text-warm-gray mb-6">
              Update editable texts, announcement message, and official contact phone/email across the website.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Top Announcement Strip</label>
                <input
                  type="text"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-soft-beige bg-ivory/30 text-xs text-charcoal focus:outline-none focus:border-walnut"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Hero Main Headline</label>
                <input
                  type="text"
                  value={heroHeading}
                  onChange={(e) => setHeroHeading(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-soft-beige bg-ivory/30 text-xs text-charcoal focus:outline-none focus:border-walnut"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Hero Subtext</label>
                <textarea
                  rows={2}
                  value={heroSubtext}
                  onChange={(e) => setHeroSubtext(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-soft-beige bg-ivory/30 text-xs text-charcoal focus:outline-none focus:border-walnut"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Showroom Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-soft-beige bg-ivory/30 text-xs text-charcoal focus:outline-none focus:border-walnut"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Inquiry Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-soft-beige bg-ivory/30 text-xs text-charcoal focus:outline-none focus:border-walnut"
                  />
                </div>
              </div>

              {settingsSaved && (
                <p className="text-xs text-green-700 font-medium inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-700" />
                  <span>Settings saved in current runtime session.</span>
                </p>
              )}

              <button type="submit" className="btn-primary text-xs cursor-pointer">
                Save Showroom Settings
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Categories */}
        {activeTab === "categories" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-charcoal">Categories Overview</h2>
              <p className="text-xs text-warm-gray">Active showroom collections and room classifications.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesList.map((cat) => (
                <div key={cat.id} className="p-5 rounded-xl border border-soft-beige bg-white">
                  <div className="relative h-32 rounded-lg overflow-hidden bg-ivory mb-3">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="300px" />
                  </div>
                  <h3 className="font-semibold text-charcoal text-base">{cat.name}</h3>
                  <p className="text-xs text-warm-gray mt-1">{cat.description}</p>
                  <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-medium bg-ivory text-walnut">
                    Room: {cat.room || "All Spaces"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal: Add Product */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 border-b border-soft-beige pb-3">
                <h3 style={{ fontFamily: "var(--font-serif)" }} className="text-xl text-charcoal font-normal">
                  Add Furniture Piece to Catalog
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-warm-gray hover:text-charcoal cursor-pointer p-1"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. Minimalist Oak Coffee Table"
                    className="w-full px-3.5 py-2 rounded-lg border border-soft-beige text-xs focus:outline-none focus:border-walnut"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Category</label>
                    <select
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-soft-beige text-xs focus:outline-none focus:border-walnut"
                    >
                      {categoriesList.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Room</label>
                    <select
                      value={newProductRoom}
                      onChange={(e) => setNewProductRoom(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-soft-beige text-xs focus:outline-none focus:border-walnut"
                    >
                      <option value="Living Room">Living Room</option>
                      <option value="Bedroom">Bedroom</option>
                      <option value="Dining Room">Dining Room</option>
                      <option value="Workspace">Workspace</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={newProductDesc}
                    onChange={(e) => setNewProductDesc(e.target.value)}
                    placeholder="Brief highlights of design, comfort, and materials..."
                    className="w-full px-3.5 py-2 rounded-lg border border-soft-beige text-xs focus:outline-none focus:border-walnut"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Dimensions Guide</label>
                  <input
                    type="text"
                    value={newProductDimensions}
                    onChange={(e) => setNewProductDimensions(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-soft-beige text-xs focus:outline-none focus:border-walnut"
                  />
                </div>

                <p className="text-[11px] text-warm-gray">
                  * In demo mode, newly created products are immediately added to the active catalog state with verified showroom imagery.
                </p>

                <div className="flex justify-end gap-3 pt-3 border-t border-soft-beige">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-soft-beige text-xs text-charcoal hover:bg-ivory cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs cursor-pointer">
                    Save to Catalog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
