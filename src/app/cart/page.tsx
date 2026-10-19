"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import { siteConfig } from "@/lib/config";
import {
  ShoppingBag,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Tag,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    totalItems,
    subtotal,
    shippingCost,
    isFreeShipping,
    amountNeededForFreeShipping,
    shippingThreshold,
    discount,
    total,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponInput("");
    }
  };

  const createWhatsAppOrderLink = () => {
    if (items.length === 0) return "#";
    const itemList = items
      .map(
        (i, idx) =>
          `${idx + 1}. *${i.product.name}* (Qty: ${i.quantity}${i.selectedColor ? `, Color: ${i.selectedColor}` : ""}) — ${formatPrice(i.product.price * i.quantity)}`
      )
      .join("\n");

    const message = `*NEW ORDER INQUIRY — FURNITURE KING NEPAL*\n\nHello, I would like to place an order for the following pieces:\n\n${itemList}\n\n*Subtotal:* ${formatPrice(subtotal)}${discount > 0 ? `\n*Privilege Discount:* -${formatPrice(discount)} (${appliedCoupon?.code})` : ""}\n*Delivery:* ${isFreeShipping ? "FREE (Kathmandu Valley)" : formatPrice(shippingCost)}\n*Estimated Total:* ${formatPrice(total)}\n\nPlease schedule delivery and white-glove setup.`;

    return `https://wa.me/${siteConfig.phoneIntl}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen pb-16 sm:pb-24" style={{ background: "var(--color-ivory)" }}>
      {/* Page Header */}
      <div
        className="py-12 sm:py-14 px-4 sm:px-6 lg:px-12 text-center"
        style={{ background: "var(--color-charcoal)" }}
      >
        <p className="section-eyebrow" style={{ color: "var(--color-walnut)" }}>
          Your Curated Bag
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
            color: "var(--color-white)",
            marginBottom: "0.5rem",
          }}
        >
          Shopping Bag
        </h1>
        <p style={{ color: "var(--color-warm-gray)", maxWidth: "480px", margin: "0 auto", fontSize: "0.95rem" }}>
          Review your selected handcrafted furniture items before proceeding to white-glove delivery checkout.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs mb-8" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span style={{ color: "var(--color-border)" }}>/</span>
          <Link href="/shop">Shop</Link>
          <span style={{ color: "var(--color-border)" }}>/</span>
          <span style={{ color: "var(--color-charcoal)" }}>Shopping Bag ({totalItems})</span>
        </nav>

        {items.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-lg border border-border shadow-xs max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-stone/50 flex items-center justify-center mx-auto mb-4 text-warm-gray">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl text-charcoal mb-2">Your shopping bag is empty</h2>
            <p className="text-sm text-warm-gray mb-6 max-w-md mx-auto">
              You haven&apos;t added any luxury furniture pieces yet. Browse our master bedroom, living room, and dining collections.
            </p>
            <Link href="/shop" className="btn-primary no-underline inline-flex items-center gap-2">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Delivery Progress Bar */}
              <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-2.5 mb-2">
                  <Truck className="w-5 h-5 text-walnut" />
                  <p className="text-xs sm:text-sm text-charcoal">
                    {isFreeShipping ? (
                      <span className="font-semibold text-emerald-800 inline-flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>You qualify for FREE White-Glove Kathmandu Valley Delivery & Assembly!</span>
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-walnut">{formatPrice(amountNeededForFreeShipping)}</strong> more to your order for <strong>FREE Delivery</strong> (Threshold: {formatPrice(shippingThreshold)})
                      </span>
                    )}
                  </p>
                </div>
                <div className="w-full bg-stone/60 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isFreeShipping ? "bg-emerald-600" : "bg-walnut"
                    }`}
                    style={{
                      width: `${Math.min(100, Math.round((subtotal / shippingThreshold) * 100))}%`,
                    }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-lg border border-border overflow-hidden shadow-xs">
                <div className="p-4 sm:p-5 border-b border-border flex justify-between items-center bg-stone/20">
                  <h3 className="font-serif text-lg text-charcoal">
                    Items in Bag ({totalItems})
                  </h3>
                  <button
                    onClick={clearCart}
                    className="text-xs text-warm-gray hover:text-rose-600 underline transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor || "default"}`}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
                    >
                      <div className="flex gap-4 items-center">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="w-24 h-24 sm:w-28 sm:h-28 relative shrink-0 rounded overflow-hidden bg-light-gray border border-border"
                        >
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="120px"
                            className="object-cover"
                          />
                        </Link>

                        <div>
                          <p className="text-[11px] text-walnut uppercase tracking-wider font-semibold mb-1">
                            {item.product.category}
                          </p>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="font-serif text-base sm:text-lg text-charcoal hover:text-walnut transition-colors no-underline block"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-warm-gray mt-0.5">
                            Finish: <span className="text-charcoal font-medium">{item.selectedColor || "Standard Finish"}</span>
                          </p>
                          <p className="text-xs text-warm-gray mt-0.5">
                            SKU: {item.product.sku}
                          </p>
                          <div className="mt-2 text-xs font-bold text-charcoal sm:hidden">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-dashed border-border">
                        {/* Stepper */}
                        <div className="flex items-center border border-border rounded overflow-hidden bg-ivory">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)
                            }
                            className="px-2.5 py-1 text-charcoal hover:bg-stone/50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1 font-semibold text-xs text-charcoal select-none min-w-[32px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)
                            }
                            disabled={item.quantity >= (item.product.stockCount || 99)}
                            className="px-2.5 py-1 text-charcoal hover:bg-stone/50 transition-colors disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="hidden sm:block text-right">
                          <span className="font-serif text-base font-bold text-charcoal">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                          {item.quantity > 1 && (
                            <p className="text-[11px] text-warm-gray">
                              {formatPrice(item.product.price)} each
                            </p>
                          )}
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="text-warm-gray hover:text-rose-600 p-1 transition-colors text-xs inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Form */}
              <div className="p-4 sm:p-5 rounded-lg bg-white border border-border shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-walnut" />
                  <h4 className="font-serif text-base text-charcoal">Have a Privilege Voucher?</h4>
                </div>

                {appliedCoupon ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-emerald-900">
                        Voucher {appliedCoupon.code} applied!
                      </p>
                      <p className="text-emerald-700 text-[11px]">{appliedCoupon.description}</p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-700 font-medium underline hover:text-rose-900 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. ROYAL10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="form-input flex-1 text-xs py-2 px-3 border border-border rounded"
                    />
                    <button
                      type="submit"
                      className="btn-primary py-2 px-4 text-xs font-semibold uppercase tracking-wider shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponMsg && (
                  <p
                    className={`text-xs mt-2 ${
                      couponMsg.isError ? "text-rose-600" : "text-emerald-700"
                    }`}
                  >
                    {couponMsg.text}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-warm-gray">
                  <span>Available Demo Codes:</span>
                  <span
                    onClick={() => setCouponInput("ROYAL10")}
                    className="cursor-pointer bg-stone/50 hover:bg-stone text-charcoal px-2 py-0.5 rounded font-mono"
                  >
                    ROYAL10 (10% off)
                  </span>
                  <span
                    onClick={() => setCouponInput("FURNITUREKING")}
                    className="cursor-pointer bg-stone/50 hover:bg-stone text-charcoal px-2 py-0.5 rounded font-mono"
                  >
                    FURNITUREKING (Rs. 5,000 off)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Summary Column (4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-4">
                <div className="p-5 sm:p-6 rounded-lg bg-white border border-border shadow-md space-y-4">
                  <h3 className="font-serif text-xl text-charcoal pb-3 border-b border-border">
                    Order Summary
                  </h3>

                  <div className="space-y-2.5 text-xs text-warm-gray">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-medium text-charcoal">{formatPrice(subtotal)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Privilege Discount ({appliedCoupon?.code})</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Kathmandu Valley Delivery & Setup</span>
                      <span>
                        {isFreeShipping ? (
                          <span className="text-emerald-700 font-semibold">FREE</span>
                        ) : (
                          formatPrice(shippingCost)
                        )}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-border flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-charcoal">Estimated Total</span>
                      <span className="font-serif text-2xl font-bold text-walnut">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className="btn-primary w-full justify-center py-3.5 text-xs tracking-wider uppercase font-semibold flex items-center gap-2 shadow-md no-underline text-center"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Instant WhatsApp Order */}
                  <a
                    href={createWhatsAppOrderLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full justify-center py-3 text-xs font-semibold flex items-center gap-2 no-underline text-center shadow-xs"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Instant WhatsApp Order</span>
                  </a>

                  {/* Reassurance pills */}
                  <div className="pt-3 border-t border-border space-y-2 text-[11px] text-warm-gray">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-walnut shrink-0" />
                      <span>5-Year Hardwood Warranty on all frames</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-walnut shrink-0" />
                      <span>Cash on Delivery / QR verification upon delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-walnut shrink-0" />
                      <span>White-glove unboxing & assembly included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
