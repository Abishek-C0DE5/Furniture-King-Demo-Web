"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import { siteConfig } from "@/lib/config";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
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
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const progressPercent = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  const createWhatsAppOrderLink = () => {
    if (items.length === 0) return "#";
    const itemList = items
      .map(
        (i, idx) =>
          `${idx + 1}. *${i.product.name}* (Qty: ${i.quantity}${i.selectedColor ? `, Color: ${i.selectedColor}` : ""}) — ${formatPrice(i.product.price * i.quantity)}`
      )
      .join("\n");

    const message = `*NEW ORDER INQUIRY — FURNITURE KING NEPAL*\n\nHello, I would like to place an order for the following items:\n\n${itemList}\n\n*Subtotal:* ${formatPrice(subtotal)}${discount > 0 ? `\n*Discount:* -${formatPrice(discount)} (${appliedCoupon?.code})` : ""}\n*Delivery:* ${isFreeShipping ? "FREE (Kathmandu Valley)" : formatPrice(shippingCost)}\n*Estimated Total:* ${formatPrice(total)}\n\nPlease confirm availability and white-glove delivery schedule. Thank you!`;

    return `https://wa.me/${siteConfig.phoneIntl}?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      {/* Dark Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 z-50 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-ivory/50">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-walnut" />
            <h2 className="font-serif text-xl text-charcoal font-normal">Shopping Bag</h2>
            <span className="text-xs bg-walnut/10 text-walnut font-medium px-2 py-0.5 rounded-full">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>

          <button
            onClick={closeCart}
            className="p-2 text-charcoal hover:text-walnut hover:bg-stone/40 rounded-full transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-5 py-3 bg-amber-50/60 border-b border-amber-100">
          <div className="flex items-center gap-2 mb-1.5">
            <Truck className="w-4 h-4 text-walnut shrink-0" />
            <p className="text-xs text-charcoal">
              {isFreeShipping ? (
                <span className="font-medium text-emerald-800">
                  🎉 You qualify for <strong>FREE Kathmandu Valley White-Glove Delivery!</strong>
                </span>
              ) : (
                <span>
                  Add <strong className="text-walnut">{formatPrice(amountNeededForFreeShipping)}</strong> more for <strong>FREE Delivery</strong>
                </span>
              )}
            </p>
          </div>
          <div className="w-full bg-stone/60 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShipping ? "bg-emerald-600" : "bg-walnut"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Drawer Body (Items List) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-stone/40 flex items-center justify-center mb-4 text-warm-gray">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg text-charcoal mb-2">Your shopping bag is empty</h3>
              <p className="text-xs text-warm-gray max-w-xs mb-6">
                Explore our handcrafted royal furniture pieces crafted with seasoned hardwood and timeless elegance.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn-primary no-underline text-xs inline-flex items-center gap-2"
              >
                <span>Browse Collections</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor || "default"}`}
                className="flex gap-3.5 p-3 rounded-lg border border-border/80 bg-white hover:border-walnut/40 transition-colors"
              >
                {/* Product Thumbnail */}
                <Link
                  href={`/product/${item.product.slug}`}
                  onClick={closeCart}
                  className="w-20 h-20 relative shrink-0 rounded overflow-hidden bg-light-gray border border-border"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-serif text-sm text-charcoal hover:text-walnut transition-colors line-clamp-1 no-underline"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                        className="text-warm-gray hover:text-rose-600 p-1 transition-colors"
                        aria-label={`Remove ${item.product.name} from bag`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-warm-gray capitalize mt-0.5">
                      {item.selectedColor ? `Finish: ${item.selectedColor}` : item.product.category}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-border/60">
                    {/* Stepper */}
                    <div className="flex items-center border border-border rounded overflow-hidden bg-ivory">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                        className="p-1 hover:bg-stone/50 text-charcoal transition-colors disabled:opacity-30"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold text-charcoal select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                        disabled={item.quantity >= (item.product.stockCount || 99)}
                        className="p-1 hover:bg-stone/50 text-charcoal transition-colors disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-xs font-semibold text-charcoal">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-warm-gray">
                          {formatPrice(item.product.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Summary & Actions) */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-border bg-ivory/40 space-y-3">
            {/* Cost Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-warm-gray">
                <span>Subtotal</span>
                <span className="font-medium text-charcoal">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Privilege Discount ({appliedCoupon?.code})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-warm-gray">
                <span>Delivery & Setup</span>
                <span>
                  {isFreeShipping ? (
                    <span className="text-emerald-700 font-medium">FREE</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-charcoal pt-2 border-t border-border">
                <span>Estimated Total</span>
                <span className="text-base text-walnut">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full justify-center no-underline text-center py-3 text-xs tracking-wider uppercase font-semibold shadow-md flex items-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Instant WhatsApp Order */}
            <a
              href={createWhatsAppOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center no-underline text-center py-2.5 text-xs font-semibold flex items-center gap-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Instant WhatsApp Order</span>
            </a>

            {/* View Full Cart Link */}
            <div className="text-center">
              <Link
                href="/cart"
                onClick={closeCart}
                className="text-[11px] text-warm-gray hover:text-walnut underline transition-colors"
              >
                View Full Cart & Apply Coupons
              </Link>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-warm-gray pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-walnut" />
              <span>Inspection on delivery • COD & QR payment available</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
