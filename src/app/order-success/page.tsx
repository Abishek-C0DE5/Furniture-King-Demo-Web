"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/products";
import { siteConfig } from "@/lib/config";
import {
  CheckCircle2,
  Truck,
  MapPin,
  Calendar,
  Phone,
  ShieldCheck,
  ArrowRight,
  Printer,
  ShoppingBag,
} from "lucide-react";

interface OrderData {
  orderId: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    landmark: string;
    notes?: string;
  };
  deliveryZone: "valley" | "outside";
  deliveryFee: number;
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      images: string[];
      sku: string;
      category: string;
    };
    quantity: number;
    selectedColor?: string;
  }>;
  subtotal: number;
  discount: number;
  couponCode?: string | null;
  total: number;
  paymentMethod: "cod" | "qr" | "bank";
  status: string;
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("orderId");
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fk-latest-order");
      if (stored) {
        const parsed: OrderData = JSON.parse(stored);
        if (!orderIdParam || parsed.orderId === orderIdParam) {
          setOrder(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load order details", e);
    }
  }, [orderIdParam]);

  const createWhatsAppConfirmationLink = () => {
    if (!order) return "#";
    const itemsText = order.items
      .map(
        (i, idx) =>
          `${idx + 1}. *${i.product.name}* (Qty: ${i.quantity}${i.selectedColor ? `, Finish: ${i.selectedColor}` : ""}) — ${formatPrice(i.product.price * i.quantity)}`
      )
      .join("\n");

    const text = `*ORDER CONFIRMATION RECEIPT — FURNITURE KING NEPAL*\n\n*Order ID:* ${order.orderId}\n*Customer:* ${order.customer.fullName}\n*Phone:* ${order.customer.phone}\n*Delivery Address:* ${order.customer.address}, ${order.customer.landmark}, ${order.customer.city}\n\n*Ordered Items:*\n${itemsText}\n\n*Subtotal:* ${formatPrice(order.subtotal)}${order.discount > 0 ? `\n*Discount:* -${formatPrice(order.discount)} (${order.couponCode})` : ""}\n*Delivery Fee:* ${order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}\n*Total Amount:* ${formatPrice(order.total)}\n*Payment Method:* ${order.paymentMethod.toUpperCase()}\n\nPlease verify this order for white-glove dispatch. Thank you!`;

    return `https://wa.me/${siteConfig.phoneIntl}?text=${encodeURIComponent(text)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-12 bg-ivory">
      <div className="max-w-4xl mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-xl border border-border shadow-lg p-6 sm:p-10 mb-8">
          {/* Header Banner */}
          <div className="text-center pb-8 border-b border-border">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-walnut mb-1">
              Order Confirmed & Scheduled
            </p>
            <h1
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-2xl sm:text-4xl text-charcoal mb-2"
            >
              Thank You{order ? `, ${order.customer.fullName}` : ""}!
            </h1>
            <p className="text-xs sm:text-sm text-warm-gray max-w-lg mx-auto">
              Your royal furniture order has been received. Our team will contact you to coordinate white-glove delivery & room assembly.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 bg-stone/40 px-3.5 py-1.5 rounded-full text-xs text-charcoal font-medium">
              <span>Order Reference:</span>
              <strong className="text-walnut font-mono">{order?.orderId || orderIdParam || "FKN-2026-CONFIRMED"}</strong>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-border text-xs">
            <div className="p-3.5 bg-ivory rounded border border-border/80">
              <div className="flex items-center gap-2 text-walnut font-semibold mb-1">
                <Truck className="w-4 h-4" />
                <span>Estimated Delivery</span>
              </div>
              <p className="text-charcoal font-medium">
                {order?.deliveryZone === "outside" ? "4–7 Business Days" : "2–4 Business Days"}
              </p>
              <p className="text-[11px] text-warm-gray mt-0.5">White-glove unboxing included</p>
            </div>

            <div className="p-3.5 bg-ivory rounded border border-border/80">
              <div className="flex items-center gap-2 text-walnut font-semibold mb-1">
                <Phone className="w-4 h-4" />
                <span>Delivery Contact</span>
              </div>
              <p className="text-charcoal font-medium">{order?.customer.phone || siteConfig.phone}</p>
              <p className="text-[11px] text-warm-gray mt-0.5">Our driver calls 1 hour prior</p>
            </div>

            <div className="p-3.5 bg-ivory rounded border border-border/80">
              <div className="flex items-center gap-2 text-walnut font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Payment Mode</span>
              </div>
              <p className="text-charcoal font-medium uppercase">
                {order?.paymentMethod === "cod"
                  ? "Cash on Delivery (COD)"
                  : order?.paymentMethod === "qr"
                  ? "Fonepay / eSewa QR"
                  : "Direct Bank Transfer"}
              </p>
              <p className="text-[11px] text-warm-gray mt-0.5">Pay upon physical inspection</p>
            </div>
          </div>

          {/* Delivery Address Details */}
          {order && (
            <div className="py-6 border-b border-border text-xs">
              <div className="flex items-center gap-2 text-charcoal font-semibold mb-2">
                <MapPin className="w-4 h-4 text-walnut" />
                <span>Delivery Address & Destination</span>
              </div>
              <p className="text-charcoal leading-relaxed">
                {order.customer.address}, Landmark: {order.customer.landmark}, {order.customer.city}
              </p>
              {order.customer.notes && (
                <p className="text-warm-gray text-[11px] mt-1 italic">
                  Note: &quot;{order.customer.notes}&quot;
                </p>
              )}
            </div>
          )}

          {/* Purchased Items List */}
          {order && order.items.length > 0 && (
            <div className="py-6 border-b border-border">
              <h3 className="font-serif text-lg text-charcoal mb-4">Purchased Items</h3>
              <div className="divide-y divide-border/80">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 relative shrink-0 rounded overflow-hidden bg-light-gray border border-border">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-serif text-sm font-semibold text-charcoal">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-warm-gray">
                          Qty: {item.quantity} • {item.selectedColor || "Standard Finish"}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-charcoal">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Summary */}
              <div className="mt-4 pt-4 border-t border-dashed border-border space-y-1.5 text-xs text-warm-gray">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-charcoal">{formatPrice(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({order.couponCode})</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}</span>
                </div>
                <div className="pt-2 border-t border-border flex justify-between text-sm font-bold text-charcoal">
                  <span>Total Amount</span>
                  <span className="font-serif text-xl text-walnut">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={createWhatsAppConfirmationLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp no-underline flex-1 justify-center py-3 text-xs font-semibold flex items-center gap-2 shadow-xs text-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Sync Order on WhatsApp</span>
            </a>

            <button
              onClick={handlePrint}
              className="btn-outline justify-center py-3 text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>

            <Link
              href="/shop"
              className="btn-primary no-underline justify-center py-3 text-xs font-semibold flex items-center gap-2 text-center"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-ivory">
          <p className="text-sm text-warm-gray">Loading Order Confirmation...</p>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
