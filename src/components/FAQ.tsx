"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How can I buy a product?",
    a: "Browse our furniture collection, find a piece you like, and click the 'Chat to Buy' button on the product page. This will open WhatsApp with a pre-filled message including the product details. Our team will respond with availability, options, and next steps.",
  },
  {
    q: "How do I ask about availability?",
    a: "You can enquire about any product's availability by contacting us through WhatsApp, phone, or email. Our team will confirm whether the item is currently in stock and provide expected timelines if it needs to be arranged.",
  },
  {
    q: "Can I request more product photos?",
    a: "Yes. If you would like to see additional photos or specific angles of any product, please contact our team via WhatsApp or email. We will share detailed photographs to help you make an informed decision.",
  },
  {
    q: "How can I check product dimensions?",
    a: "Each product page displays the available dimensions including width, depth, and height. If you need exact measurements or have questions about whether a piece will fit your space, please contact us and we will be happy to assist.",
  },
  {
    q: "Can I ask about a different size or material?",
    a: "Please contact our team to discuss your specific requirements. We can help you explore available options for sizes, materials, and finishes depending on the product.",
  },
  {
    q: "How do I find out about delivery?",
    a: "Please contact our team to confirm delivery options, timelines, and any associated details for your area. Delivery arrangements are discussed on a case-by-case basis.",
  },
  {
    q: "How do I contact Furniture King Nepal?",
    a: "You can reach us through WhatsApp at +977 986-4835160, by phone at the same number, or by email at furnitureking91@gmail.com. You can also visit our website or follow us on Instagram and TikTok.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={i} className="faq-item">
          <button
            className="faq-button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-content-${i}`}
          >
            <span>{faq.q}</span>
            <ChevronDown
              className="w-5 h-5 shrink-0 transition-transform duration-300"
              style={{
                transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
          <div
            id={`faq-content-${i}`}
            className={`faq-content ${openIndex === i ? "open" : ""}`}
            role="region"
            aria-labelledby={`faq-button-${i}`}
          >
            <p>{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
