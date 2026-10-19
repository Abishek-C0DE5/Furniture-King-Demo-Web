"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import { siteConfig } from "@/lib/config";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  QrCode,
  Building,
  Check,
  ArrowRight,
  ArrowLeft,
  Lock,
  Phone,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, appliedCoupon, clearCart } = useCart();

  const [deliveryZone, setDeliveryZone] = useState<"valley" | "outside">("valley");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "qr" | "bank">("cod");

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Kathmandu",
    address: "",
    landmark: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const shippingCost = deliveryZone === "valley" ? (subtotal >= 50000 || subtotal === 0 ? 0 : 1500) : 3500;
  const finalTotal = Math.max(0, subtotal - discount + shippingCost);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMessage("Please complete all required fields (Full Name, Phone Number, and Street Address).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const orderId = `FKN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

      const orderData = {
        orderId,
        createdAt: new Date().toISOString(),
        customer: formData,
        deliveryZone,
        deliveryFee: shippingCost,
        items,
        subtotal,
        discount,
        couponCode: appliedCoupon?.code || null,
        total: finalTotal,
        paymentMethod,
        status: "Confirmed (Pending White-Glove Dispatch)",
      };

      // Store in localStorage for the order-success page
      localStorage.setItem("fk-latest-order", JSON.stringify(orderData));

      // Clear cart
      clearCart();

      // Redirect to order confirmation
      router.push(`/order-success?orderId=${orderId}`);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to process order. Please try again or contact us on WhatsApp.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-ivory">
        <div className="text-center bg-white p-8 rounded-lg border border-border shadow-md max-w-md w-full">
          <Truck className="w-12 h-12 text-walnut mx-auto mb-3" />
          <h2 className="font-serif text-2xl text-charcoal mb-2">No Items to Checkout</h2>
          <p className="text-xs text-warm-gray mb-6">
            Your shopping bag is empty. Please add items to your cart before proceeding to checkout.
          </p>
          <Link href="/shop" className="btn-primary no-underline inline-flex items-center gap-2 text-xs">
            <span>Browse Furniture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 sm:pb-24" style={{ background: "var(--color-ivory)" }}>
      {/* Checkout Header */}
      <div className="py-8 sm:py-10 px-4 sm:px-6 lg:px-12 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs text-charcoal hover:text-walnut no-underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shopping Bag</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure 256-bit Encrypted Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Form Details (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Customer Contact */}
              <div className="bg-white rounded-lg border border-border p-5 sm:p-7 shadow-xs">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border">
                  <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-serif text-lg text-charcoal font-semibold">Contact Information</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-charcoal font-semibold mb-1">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Suman Shakya"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="form-input w-full text-xs py-2.5 px-3 border border-border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal font-semibold mb-1">
                      Phone Number (Mobile) <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9841XXXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input w-full text-xs py-2.5 px-3 border border-border rounded"
                    />
                    <p className="text-[10px] text-warm-gray mt-1">Our delivery team calls this number prior to arrival.</p>
                  </div>

                  <div>
                    <label className="block text-charcoal font-semibold mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. suman@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input w-full text-xs py-2.5 px-3 border border-border rounded"
                    />
                    <p className="text-[10px] text-warm-gray mt-1">For receiving digital invoice and tracking link.</p>
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping & Delivery Address */}
              <div className="bg-white rounded-lg border border-border p-5 sm:p-7 shadow-xs">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border">
                  <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-serif text-lg text-charcoal font-semibold">Delivery Location & Room Placement</h2>
                </div>

                {/* Delivery Zone Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  <div
                    onClick={() => setDeliveryZone("valley")}
                    className={`p-3.5 rounded border cursor-pointer transition-all ${
                      deliveryZone === "valley"
                        ? "border-walnut bg-amber-50/40 ring-1 ring-walnut"
                        : "border-border hover:border-walnut/50 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-charcoal">Kathmandu Valley</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        {subtotal >= 50000 ? "FREE" : "Rs. 1,500"}
                      </span>
                    </div>
                    <p className="text-[11px] text-warm-gray">
                      Kathmandu, Lalitpur, Bhaktapur. Includes room placement & assembly.
                    </p>
                  </div>

                  <div
                    onClick={() => setDeliveryZone("outside")}
                    className={`p-3.5 rounded border cursor-pointer transition-all ${
                      deliveryZone === "outside"
                        ? "border-walnut bg-amber-50/40 ring-1 ring-walnut"
                        : "border-border hover:border-walnut/50 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-charcoal">Outside Valley (Nepal)</span>
                      <span className="text-[10px] bg-stone text-charcoal font-bold px-1.5 py-0.5 rounded">
                        Rs. 3,500
                      </span>
                    </div>
                    <p className="text-[11px] text-warm-gray">
                      Pokhara, Chitwan, Butwal, Biratnagar, etc. via secure wooden transport crates.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-charcoal font-semibold mb-1">
                      City / District <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Lalitpur"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="form-input w-full text-xs py-2.5 px-3 border border-border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal font-semibold mb-1">
                      Prominent Landmark / Tole <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      required
                      placeholder="e.g. Near Bhatbhateni, Jhamsikhel"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="form-input w-full text-xs py-2.5 px-3 border border-border rounded"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-charcoal font-semibold mb-1">
                      Detailed Street Address & House / Apartment No. <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      placeholder="House No., Ward No., Street Name, Floor details..."
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-input w-full text-xs py-2.5 px-3 border border-border rounded"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-charcoal font-semibold mb-1">
                      Delivery Instructions & Notes (Optional)
                    </label>
                    <input
                      type="text"
                      name="notes"
                      placeholder="e.g. Please deliver on Saturday; narrow staircase; elevator available"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="form-input w-full text-xs py-2.5 px-3 border border-border rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white rounded-lg border border-border p-5 sm:p-7 shadow-xs">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border">
                  <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="font-serif text-lg text-charcoal font-semibold">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 rounded border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-walnut bg-amber-50/40 ring-1 ring-walnut"
                        : "border-border hover:border-walnut/50 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Banknote className="w-5 h-5 text-walnut" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-charcoal">
                            Cash on Delivery (Pay After Inspection)
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            Recommended
                          </span>
                        </div>
                        <p className="text-[11px] text-warm-gray mt-0.5">
                          Inspect your furniture piece upon delivery and assembly before handing cash or cheque to our delivery team.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fonepay / eSewa / Khalti QR */}
                  <div
                    onClick={() => setPaymentMethod("qr")}
                    className={`p-4 rounded border cursor-pointer transition-all ${
                      paymentMethod === "qr"
                        ? "border-walnut bg-amber-50/40 ring-1 ring-walnut"
                        : "border-border hover:border-walnut/50 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <QrCode className="w-5 h-5 text-walnut" />
                      <div className="flex-1">
                        <span className="font-semibold text-xs text-charcoal block">
                          Fonepay / eSewa / Khalti QR
                        </span>
                        <p className="text-[11px] text-warm-gray mt-0.5">
                          Pay instantly via any Nepali mobile banking app or digital wallet with QR scan upon white-glove delivery.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bank Transfer */}
                  <div
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 rounded border cursor-pointer transition-all ${
                      paymentMethod === "bank"
                        ? "border-walnut bg-amber-50/40 ring-1 ring-walnut"
                        : "border-border hover:border-walnut/50 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-walnut" />
                      <div className="flex-1">
                        <span className="font-semibold text-xs text-charcoal block">
                          Direct Corporate Bank Transfer
                        </span>
                        <p className="text-[11px] text-warm-gray mt-0.5">
                          Direct transfer to Furniture King Nepal account (Nabil Bank / Global IME Bank). Account details sent on order confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-4 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Right Column: Order Review & Submit (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-lg border border-border p-5 sm:p-6 shadow-md space-y-4">
                  <h3 className="font-serif text-lg text-charcoal pb-3 border-b border-border">
                    Order Items ({items.length})
                  </h3>

                  {/* Items Mini List */}
                  <div className="max-h-60 overflow-y-auto divide-y divide-border pr-1 space-y-3">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.selectedColor || "default"}`} className="pt-3 first:pt-0 flex gap-3 items-center">
                        <div className="w-14 h-14 relative shrink-0 rounded overflow-hidden bg-light-gray border border-border">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="60px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-serif text-charcoal truncate">{item.product.name}</p>
                          <p className="text-[10px] text-warm-gray">
                            Qty: {item.quantity} • {item.selectedColor || "Standard Finish"}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-charcoal">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financials Breakdown */}
                  <div className="pt-3 border-t border-border space-y-2 text-xs">
                    <div className="flex justify-between text-warm-gray">
                      <span>Subtotal</span>
                      <span className="font-medium text-charcoal">{formatPrice(subtotal)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Privilege Discount ({appliedCoupon?.code})</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-warm-gray">
                      <span>White-Glove Delivery</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="text-emerald-700 font-semibold">FREE</span>
                        ) : (
                          formatPrice(shippingCost)
                        )}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-border flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-charcoal">Grand Total</span>
                      <span className="font-serif text-2xl font-bold text-walnut">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>

                  {/* Place Order CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center py-3.5 text-xs tracking-wider uppercase font-semibold flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Placing Your Order...</span>
                    ) : (
                      <>
                        <span>Confirm & Place Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-warm-gray">
                    By placing your order, you agree to Furniture King Nepal terms of white-glove inspection & delivery.
                  </p>

                  {/* Assurance icons */}
                  <div className="pt-3 border-t border-border space-y-2 text-[11px] text-warm-gray">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-walnut shrink-0" />
                      <span>5-Year Structural Hardwood Warranty</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-walnut shrink-0" />
                      <span>Dispatch within 2–4 business days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-walnut shrink-0" />
                      <span>Complimentary room assembly included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
