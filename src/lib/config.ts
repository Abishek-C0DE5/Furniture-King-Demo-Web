// Site-wide configuration — edit these values to update business info across the site
export const siteConfig = {
  businessName: "Furniture King Nepal",
  tagline: "Furniture that makes a house feel like home.",
  description:
    "Explore thoughtfully selected furniture for living, dining, sleeping and working spaces.",
  phone: "986-4835160",
  phoneIntl: "+9779864835160",
  email: "furnitureking91@gmail.com",
  website: "https://furnitureking.com.np/",
  whatsapp: "https://wa.me/9779864835160",
  instagram: "https://www.instagram.com/furniture_king_nepal/",
  tiktok: "https://www.tiktok.com/@furniturekingpvtltd",
  announcementText:
    "Discover premium furniture for every room — Chat with us for inquiries",
  heroEyebrow: "FURNITURE KING NEPAL",
  heroHeadline: "Furniture that makes a house feel like home.",
  heroSubtext:
    "Explore thoughtfully selected furniture for living, dining, sleeping and working spaces.",
  heroCTAPrimary: "Explore Furniture",
  heroCTASecondary: "Chat With Us",
};

export function getWhatsAppLink(productName?: string, productUrl?: string) {
  let message = "Hello Furniture King Nepal";
  if (productName && productUrl) {
    message = `Hello Furniture King Nepal, I am interested in ${productName}. Please share more information about availability, options, and purchasing. Product: ${productUrl}`;
  } else {
    message +=
      ", I would like to enquire about your furniture collection. Please help me with more information.";
  }
  return `https://wa.me/9779864835160?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop Furniture", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];
