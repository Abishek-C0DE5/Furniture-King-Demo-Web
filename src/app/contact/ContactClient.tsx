"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig, getWhatsAppLink } from "@/lib/config";
import { categories, products } from "@/lib/products";
import { MessageCircle, Phone, Mail, ExternalLink, Check } from "lucide-react";

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
              <MessageCircle className="w-5 h-5 text-green-700" />
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
              <Phone className="w-5 h-5 text-walnut" />
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
              <Mail className="w-5 h-5 text-walnut" />
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
              <ExternalLink className="w-3 h-3 text-warm-gray" />
            </a>
            <a
              href={siteConfig.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-soft-beige text-xs font-medium text-charcoal hover:border-walnut transition-all no-underline"
            >
              <span>TikTok</span>
              <ExternalLink className="w-3 h-3 text-warm-gray" />
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
                <Check className="w-6 h-6" />
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
                  <MessageCircle className="w-4 h-4" />
                  <span>Also Send via WhatsApp</span>
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
                  <MessageCircle className="w-4 h-4" />
                  <span>Or Send via WhatsApp</span>
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
