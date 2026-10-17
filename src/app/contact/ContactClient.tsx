"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig, getWhatsAppLink } from "@/lib/config";
import { categories, products } from "@/lib/products";

export default function ContactClient() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState(initialProduct);
  const [category, setCategory] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState(
    initialProduct
      ? `Hello, I am interested in inquiring about the "${initialProduct}". Please let me know about its availability and options.`
      : ""
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) {
      errs.name = "Please enter your full name.";
    }
    if (!phone.trim() || phone.trim().length < 7) {
      errs.phone = "Please provide a valid phone or WhatsApp number.";
    }
    if (!message.trim() || message.trim().length < 5) {
      errs.message = "Please write a brief description of what you are looking for.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleWhatsAppHandoff = () => {
    let text = `Hello Furniture King Nepal,\nName: ${name || "Customer"}\nPhone: ${phone || "Not specified"}`;
    if (product) text += `\nInterested Product: ${product}`;
    if (category) text += `\nCategory: ${category}`;
    if (preferredTime) text += `\nPreferred Contact Time: ${preferredTime}`;
    text += `\nMessage: ${message || "I would like to inquire about your furniture collection."}`;

    const url = `https://wa.me/9779864835160?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            email,
            product,
            category,
            preferredTime,
            message,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setSubmitted(true);
        } else {
          setSubmitError(data.error || "Unable to submit inquiry. Please use WhatsApp directly.");
        }
      } catch (err) {
        setSubmitError("Network error. Please use direct WhatsApp or call us below.");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Left Column: Direct Contact Info */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-2xl sm:text-3xl text-charcoal mb-4"
          >
            Direct Contact Options
          </h2>
          <p className="text-warm-gray text-sm leading-relaxed mb-6">
            We are here to assist with product inquiries, measurements, availability, and ordering guidance. Reach us through your preferred channel.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="space-y-4">
          {/* WhatsApp Card */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-5 rounded-xl border border-soft-beige bg-white hover:border-walnut/50 hover:shadow-xs transition-all no-underline group"
          >
            <div className="w-12 h-12 rounded-lg bg-green-50 text-green-700 flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-green-800 font-semibold block">
                Instant Chat (Primary)
              </span>
              <p className="font-semibold text-charcoal group-hover:text-walnut transition-colors">
                Chat on WhatsApp
              </p>
              <p className="text-xs text-warm-gray mt-1">
                Fastest way to get answers, photos, and live product status.
              </p>
            </div>
          </a>

          {/* Phone Card */}
          <a
            href={`tel:${siteConfig.phoneIntl}`}
            className="flex items-start gap-4 p-5 rounded-xl border border-soft-beige bg-white hover:border-walnut/50 hover:shadow-xs transition-all no-underline group"
          >
            <div className="w-12 h-12 rounded-lg bg-ivory text-charcoal flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-warm-gray font-medium block">
                Direct Call
              </span>
              <p className="font-semibold text-charcoal group-hover:text-walnut transition-colors">
                {siteConfig.phone}
              </p>
              <p className="text-xs text-warm-gray mt-1">
                Speak directly with our team for prompt telephone support.
              </p>
            </div>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-start gap-4 p-5 rounded-xl border border-soft-beige bg-white hover:border-walnut/50 hover:shadow-xs transition-all no-underline group"
          >
            <div className="w-12 h-12 rounded-lg bg-ivory text-charcoal flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-warm-gray font-medium block">
                Email Inquiry
              </span>
              <p className="font-semibold text-charcoal group-hover:text-walnut transition-colors break-all">
                {siteConfig.email}
              </p>
              <p className="text-xs text-warm-gray mt-1">
                Ideal for architectural lists, bulk orders, and formal requests.
              </p>
            </div>
          </a>
        </div>

        {/* Social Media Links */}
        <div className="pt-4 border-t border-soft-beige">
          <h3 className="text-xs uppercase tracking-wider text-warm-gray font-semibold mb-3">
            Follow Our Latest Designs
          </h3>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-soft-beige text-xs font-medium text-charcoal hover:border-walnut transition-all no-underline"
            >
              <span>Instagram</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <a
              href={siteConfig.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-soft-beige text-xs font-medium text-charcoal hover:border-walnut transition-all no-underline"
            >
              <span>TikTok</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Inquiry Form */}
      <div className="lg:col-span-7">
        <div className="p-8 sm:p-10 rounded-2xl border border-soft-beige bg-white shadow-xs">
          <span className="text-xs uppercase tracking-widest text-walnut font-medium mb-2 block">
            Online Inquiry
          </span>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-2xl text-charcoal mb-2 font-normal"
          >
            Send Us an Inquiry
          </h2>
          <p className="text-warm-gray text-xs sm:text-sm mb-6 leading-relaxed">
            Fill in your details below and our team will get in touch with you. You can also send the inquiry directly through WhatsApp.
          </p>

          {submitted ? (
            <div className="p-6 rounded-xl bg-green-50/80 border border-green-200 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="font-semibold text-charcoal text-lg">Inquiry Successfully Received!</h3>
              <p className="text-sm text-charcoal/80 max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. We have logged your request. Our team will review the details and contact you via phone or WhatsApp shortly.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleWhatsAppHandoff}
                  className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-all inline-flex items-center gap-2"
                >
                  <span>Also Send via WhatsApp</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                  }}
                  className="px-4 py-2.5 rounded-lg border border-soft-beige text-xs text-charcoal hover:bg-ivory transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {submitError && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  {submitError}
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-charcoal mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Shrestha"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-soft-beige bg-ivory/30 text-sm text-charcoal focus:outline-none focus:border-walnut transition-colors"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-charcoal mb-1">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-soft-beige bg-ivory/30 text-sm text-charcoal focus:outline-none focus:border-walnut transition-colors"
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email & Preferred Contact Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-charcoal mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-soft-beige bg-ivory/30 text-sm text-charcoal focus:outline-none focus:border-walnut transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-xs font-semibold text-charcoal mb-1">
                    Preferred Contact Time
                  </label>
                  <select
                    id="preferredTime"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-soft-beige bg-ivory/30 text-sm text-charcoal focus:outline-none focus:border-walnut transition-colors"
                  >
                    <option value="">Anytime during business hours</option>
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Product / Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="product" className="block text-xs font-semibold text-charcoal mb-1">
                    Specific Product (Optional)
                  </label>
                  <input
                    id="product"
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="e.g. Royal Carved Sofa Set"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-soft-beige bg-ivory/30 text-sm text-charcoal focus:outline-none focus:border-walnut transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-xs font-semibold text-charcoal mb-1">
                    Category of Interest
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-soft-beige bg-ivory/30 text-sm text-charcoal focus:outline-none focus:border-walnut transition-colors"
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-charcoal mb-1">
                  Your Requirements / Questions <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what pieces you are interested in, questions on dimensions, custom finishes, or delivery details..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-soft-beige bg-ivory/30 text-sm text-charcoal focus:outline-none focus:border-walnut transition-colors"
                />
                {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto btn-primary justify-center cursor-pointer disabled:opacity-50"
                >
                  {isPending ? "Sending Inquiry..." : "Submit Inquiry"}
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppHandoff}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg border border-green-600 text-green-700 hover:bg-green-50 text-xs font-medium tracking-wide uppercase transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Or Send via WhatsApp</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <p className="text-[11px] text-warm-gray leading-tight pt-2">
                * We value your privacy. Your contact details will only be used to respond to your furniture inquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
