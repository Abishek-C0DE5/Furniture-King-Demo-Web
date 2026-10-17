export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  categoryId: string;
  category: string;
  description: string;
  shortDescription: string;
  images: string[];
  materials: string[];
  colors: string[];
  dimensions: {
    width?: string;
    depth?: string;
    height?: string;
    seatHeight?: string;
  };
  features: string[];
  room: string;
  style: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  room?: string;
}

export const categories: Category[] = [
  {
    id: "sofas-seating",
    name: "Sofas & Seating",
    slug: "sofas-seating",
    description: "Comfortable and elegant sofas, loveseats, and accent chairs",
    image: "/Photos/487312245_657080413939892_396357785909587725_n.jpg",
    room: "Living Room",
  },
  {
    id: "beds-bedroom",
    name: "Beds & Bedroom",
    slug: "beds-bedroom",
    description: "Beautiful bed frames, headboards, and bedroom sets",
    image: "/Photos/520813632_749533304694602_5302357473682948902_n.jpg",
    room: "Bedroom",
  },
  {
    id: "dining",
    name: "Dining Furniture",
    slug: "dining",
    description: "Dining tables, chairs, and complete dining sets",
    image: "/Photos/523779865_749533121361287_3602915158766384796_n.jpg",
    room: "Dining Room",
  },
  {
    id: "wardrobes-storage",
    name: "Wardrobes & Storage",
    slug: "wardrobes-storage",
    description: "Wardrobes, cabinets, shelving, and storage solutions",
    image: "/Photos/523775115_749533064694626_2599700634884058977_n.jpg",
  },
  {
    id: "tables-living",
    name: "Tables & Living Room",
    slug: "tables-living",
    description: "Coffee tables, side tables, console tables, and TV units",
    image: "/Photos/487297686_657078867273380_5111974539386840409_n.jpg",
    room: "Living Room",
  },
  {
    id: "office",
    name: "Office Furniture",
    slug: "office",
    description: "Desks, office chairs, and workspace essentials",
    image: "/Photos/487297686_657078867273380_5111974539386840409_n.jpg",
    room: "Workspace",
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "royal-carved-sofa-set",
    name: "Royal Carved Sofa Set",
    sku: "FK-SOF-001",
    categoryId: "sofas-seating",
    category: "Sofas & Seating",
    description:
      "An exquisite hand-carved wooden sofa set featuring intricate floral motifs on the frame. The set includes a three-seater sofa, two single-seater chairs, and a glass-top coffee table. Upholstered in premium damask fabric with gold-toned carved wooden accents.",
    shortDescription: "Hand-carved wooden sofa set with damask upholstery",
    images: [
      "/Photos/487312245_657080413939892_396357785909587725_n.jpg",
      "/Photos/486115684_651321481182452_2819366713137830601_n.jpg",
    ],
    materials: ["Solid Wood", "Damask Fabric", "Glass"],
    colors: ["Ivory & Gold", "Dark Walnut"],
    dimensions: {
      width: "Sofa: 210 cm",
      depth: "85 cm",
      height: "105 cm",
      seatHeight: "45 cm",
    },
    features: [
      "Hand-carved wooden frame",
      "Premium damask upholstery",
      "Includes coffee table",
      "Gold-finish accents",
    ],
    room: "Living Room",
    style: "Classic",
    isFeatured: true,
    isNewArrival: false,
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
  },
  {
    id: "2",
    slug: "classic-tufted-loveseat",
    name: "Classic Tufted Loveseat",
    sku: "FK-SOF-002",
    categoryId: "sofas-seating",
    category: "Sofas & Seating",
    description:
      "A stunning loveseat with ornate hand-carved golden frame and button-tufted backrest. The piece features baroque-inspired scrollwork and elegant floral patterned cushion fabric. A true statement piece for your living room.",
    shortDescription: "Baroque-style tufted loveseat with carved golden frame",
    images: [
      "/Photos/486115684_651321481182452_2819366713137830601_n.jpg",
    ],
    materials: ["Carved Wood", "Premium Upholstery", "Gold Leaf Finish"],
    colors: ["Cream & Gold"],
    dimensions: {
      width: "155 cm",
      depth: "75 cm",
      height: "110 cm",
      seatHeight: "42 cm",
    },
    features: [
      "Button-tufted backrest",
      "Hand-carved baroque scrollwork",
      "Gold leaf finish frame",
      "Damask patterned cushion",
    ],
    room: "Living Room",
    style: "Baroque",
    isFeatured: true,
    isNewArrival: false,
    createdAt: "2025-02-10",
    updatedAt: "2025-02-10",
  },
  {
    id: "3",
    slug: "colonial-wooden-seating-set",
    name: "Colonial Wooden Seating Set",
    sku: "FK-SOF-003",
    categoryId: "sofas-seating",
    category: "Sofas & Seating",
    description:
      "A distinguished seating set in rich dark wood with vibrant red velvet cushions. Features a two-seater bench and two matching chairs with turned spindle backs and gold medallion accents. Includes a round glass-top coffee table.",
    shortDescription: "Dark wood seating set with red velvet cushions",
    images: [
      "/Photos/486130443_651321494515784_5244541923420412931_n.jpg",
    ],
    materials: ["Solid Dark Wood", "Velvet", "Glass"],
    colors: ["Dark Mahogany & Red"],
    dimensions: {
      width: "Bench: 130 cm",
      depth: "60 cm",
      height: "90 cm",
      seatHeight: "44 cm",
    },
    features: [
      "Turned spindle back design",
      "Gold medallion accents",
      "Rich velvet cushioning",
      "Matching coffee table included",
    ],
    room: "Living Room",
    style: "Colonial",
    isFeatured: true,
    isNewArrival: false,
    createdAt: "2025-03-05",
    updatedAt: "2025-03-05",
  },
  {
    id: "4",
    slug: "executive-leather-chair-set",
    name: "Executive Leather Chair Set",
    sku: "FK-CHR-001",
    categoryId: "sofas-seating",
    category: "Sofas & Seating",
    description:
      "A pair of distinguished executive armchairs in dark brown leather with carved wooden frames. Features padded armrests and high backs for exceptional comfort. Accompanied by an ornate carved side table with gold-leaf details.",
    shortDescription: "Leather armchairs with carved wood and side table",
    images: [
      "/Photos/487297686_657078867273380_5111974539386840409_n.jpg",
    ],
    materials: ["Solid Wood", "Genuine Leather", "Gold Leaf"],
    colors: ["Dark Brown & Walnut"],
    dimensions: {
      width: "65 cm each",
      depth: "60 cm",
      height: "105 cm",
      seatHeight: "46 cm",
    },
    features: [
      "Genuine leather upholstery",
      "Hand-carved wooden frame",
      "Padded armrests",
      "Includes decorative side table",
    ],
    room: "Living Room",
    style: "Traditional",
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
  },
  {
    id: "5",
    slug: "royal-canopy-swing",
    name: "Royal Canopy Swing",
    sku: "FK-SWG-001",
    categoryId: "sofas-seating",
    category: "Sofas & Seating",
    description:
      "A magnificent indoor swing with an ornate carved wooden canopy supported by fluted columns. Upholstered in luxurious floral brocade fabric with chain suspension. A stunning traditional centerpiece for your living space.",
    shortDescription: "Hand-carved canopy swing with brocade upholstery",
    images: [
      "/Photos/487949718_657077367273530_502994373561440933_n.jpg",
    ],
    materials: ["Solid Teak Wood", "Brocade Fabric", "Brass Chains"],
    colors: ["Honey Teak & Cream"],
    dimensions: {
      width: "160 cm",
      depth: "80 cm",
      height: "210 cm",
    },
    features: [
      "Hand-carved canopy with geometric patterns",
      "Fluted decorative columns",
      "Brass chain suspension",
      "Premium brocade cushioning",
    ],
    room: "Living Room",
    style: "Traditional",
    isFeatured: true,
    isNewArrival: true,
    createdAt: "2025-06-01",
    updatedAt: "2025-06-01",
  },
  {
    id: "6",
    slug: "gold-royal-dining-set-eight-seater",
    name: "Gold Royal Dining Set — Eight Seater",
    sku: "FK-DIN-001",
    categoryId: "dining",
    category: "Dining Furniture",
    description:
      "An opulent eight-seater dining set with marble-top table and tufted high-back chairs. Each chair features an ornate golden crown carving at the top and floral print seat cushions. The table has gold-finished turned legs and detailed apron carvings.",
    shortDescription: "Marble-top dining table with golden tufted chairs",
    images: [
      "/Photos/523918079_749533938027872_7963866855478984573_n.jpg",
    ],
    materials: ["Marble", "Solid Wood", "Gold Finish", "Premium Fabric"],
    colors: ["Gold & Ivory"],
    dimensions: {
      width: "240 cm",
      depth: "110 cm",
      height: "78 cm (table)",
    },
    features: [
      "Italian marble table top",
      "Eight tufted high-back chairs",
      "Gold crown carvings on chairs",
      "Turned gold-finish legs",
    ],
    room: "Dining Room",
    style: "Royal",
    isFeatured: true,
    isNewArrival: true,
    createdAt: "2025-07-20",
    updatedAt: "2025-07-20",
  },
  {
    id: "7",
    slug: "platinum-tufted-dining-set",
    name: "Platinum Tufted Dining Set — Eight Seater",
    sku: "FK-DIN-002",
    categoryId: "dining",
    category: "Dining Furniture",
    description:
      "An elegant eight-seater dining set featuring a marble-top table with ornate gold-detail apron. The high-back chairs have button-tufted upholstery in warm taupe fabric with carved leaf crown accents in dark wood and gold.",
    shortDescription: "Marble dining table with taupe tufted chairs",
    images: [
      "/Photos/524309944_749533201361279_7055694723605919085_n.jpg",
    ],
    materials: ["Marble", "Hardwood", "Premium Fabric", "Gold Accent"],
    colors: ["Taupe & Dark Walnut"],
    dimensions: {
      width: "245 cm",
      depth: "115 cm",
      height: "78 cm (table)",
    },
    features: [
      "Marble table top",
      "Button-tufted high-back chairs",
      "Carved leaf crown details",
      "Gold-accent table apron",
    ],
    room: "Dining Room",
    style: "Classic",
    isFeatured: true,
    isNewArrival: false,
    createdAt: "2025-04-10",
    updatedAt: "2025-04-10",
  },
  {
    id: "8",
    slug: "ivory-royal-dining-set",
    name: "Ivory Royal Dining Set — Six Seater",
    sku: "FK-DIN-003",
    categoryId: "dining",
    category: "Dining Furniture",
    description:
      "A stunning six-seater dining set in ivory and champagne gold tones. Features a marble-top table with carved ornamental legs and tufted high-back chairs with golden crown carvings and floral print seat cushions.",
    shortDescription: "Ivory marble dining set with champagne gold accents",
    images: [
      "/Photos/523779865_749533121361287_3602915158766384796_n.jpg",
    ],
    materials: ["Marble", "Solid Wood", "Champagne Gold Finish", "Jacquard Fabric"],
    colors: ["Ivory & Champagne Gold"],
    dimensions: {
      width: "200 cm",
      depth: "100 cm",
      height: "76 cm (table)",
    },
    features: [
      "Marble table top",
      "Six tufted high-back chairs",
      "Carved ornamental table legs",
      "Jacquard floral seat cushions",
    ],
    room: "Dining Room",
    style: "Royal",
    isFeatured: false,
    isNewArrival: true,
    createdAt: "2025-08-05",
    updatedAt: "2025-08-05",
  },
  {
    id: "9",
    slug: "royal-white-tufted-bed",
    name: "Royal White Tufted Bed",
    sku: "FK-BED-001",
    categoryId: "beds-bedroom",
    category: "Beds & Bedroom",
    description:
      "A stunning king-size bed frame with a sweeping golden curved frame and white button-tufted headboard and footboard. The ornate carved crown and floral motifs add a regal touch. Comes with a matching carved bedside table with three drawers.",
    shortDescription: "Golden-framed tufted bed with matching bedside table",
    images: [
      "/Photos/520813632_749533304694602_5302357473682948902_n.jpg",
    ],
    materials: ["Hardwood", "Leatherette", "Gold Finish"],
    colors: ["White & Gold"],
    dimensions: {
      width: "200 cm",
      depth: "220 cm",
      height: "145 cm (headboard)",
    },
    features: [
      "Button-tufted headboard & footboard",
      "Carved golden crown detail",
      "Sweeping curved frame",
      "Matching bedside table included",
    ],
    room: "Bedroom",
    style: "Royal",
    isFeatured: true,
    isNewArrival: true,
    createdAt: "2025-09-01",
    updatedAt: "2025-09-01",
  },
  {
    id: "10",
    slug: "ornate-console-mirror-set",
    name: "Ornate Console & Mirror Set",
    sku: "FK-CON-001",
    categoryId: "tables-living",
    category: "Tables & Living Room",
    description:
      "A breathtaking console table with an ornate carved mirror. Both pieces feature intricate baroque scrollwork in dual-tone walnut and gold. The shapely cabriole legs and carved stretcher base add to the grandeur. Perfect as an entryway or hallway statement piece.",
    shortDescription: "Baroque console table with matching carved mirror",
    images: [
      "/Photos/523775115_749533064694626_2599700634884058977_n.jpg",
    ],
    materials: ["Solid Wood", "Mirror Glass", "Gold Leaf"],
    colors: ["Walnut & Gold"],
    dimensions: {
      width: "120 cm (console)",
      depth: "45 cm",
      height: "220 cm (with mirror)",
    },
    features: [
      "Hand-carved baroque scrollwork",
      "Matching mirror frame",
      "Dual-tone walnut and gold finish",
      "Cabriole legs with stretcher base",
    ],
    room: "Living Room",
    style: "Baroque",
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-02-20",
    updatedAt: "2025-02-20",
  },
  {
    id: "11",
    slug: "carved-wooden-divan",
    name: "Carved Wooden Divan",
    sku: "FK-SOF-004",
    categoryId: "sofas-seating",
    category: "Sofas & Seating",
    description:
      "A beautifully carved wooden divan with plush cushioning, perfect for a traditional Nepali living room. Features turned legs, carved backrest, and comfortable seating for two to three people.",
    shortDescription: "Traditional carved wooden divan with plush cushions",
    images: [
      "/Photos/487312346_657080707273196_3274471344750132711_n.jpg",
    ],
    materials: ["Solid Wood", "Foam Cushion", "Premium Fabric"],
    colors: ["Walnut Brown"],
    dimensions: {
      width: "180 cm",
      depth: "70 cm",
      height: "85 cm",
      seatHeight: "40 cm",
    },
    features: [
      "Hand-carved backrest",
      "Turned decorative legs",
      "Comfortable plush cushioning",
      "Seats 2-3 people",
    ],
    room: "Living Room",
    style: "Traditional",
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-04-01",
    updatedAt: "2025-04-01",
  },
  {
    id: "12",
    slug: "decorative-corner-shelf",
    name: "Decorative Corner Shelf",
    sku: "FK-SHL-001",
    categoryId: "wardrobes-storage",
    category: "Wardrobes & Storage",
    description:
      "An elegant multi-tier corner shelf in dark wood with turned spindle columns and brass finial accents. Features intricate jali-work panels on each shelf. Perfect for displaying decor items, photo frames, and small plants.",
    shortDescription: "Multi-tier corner shelf with jali-work panels",
    images: [
      "/Photos/486130443_651321494515784_5244541923420412931_n.jpg",
    ],
    materials: ["Solid Wood", "Brass"],
    colors: ["Dark Mahogany"],
    dimensions: {
      width: "55 cm",
      depth: "55 cm",
      height: "150 cm",
    },
    features: [
      "Four-tier design",
      "Jali-work shelf panels",
      "Turned spindle columns",
      "Brass finial accents",
    ],
    room: "Living Room",
    style: "Traditional",
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-03-20",
    updatedAt: "2025-03-20",
  },
  {
    id: "13",
    slug: "minimalist-coffee-table",
    name: "Minimalist Coffee Table",
    sku: "FK-TBL-001",
    categoryId: "tables-living",
    category: "Tables & Living Room",
    description:
      "A sleek, modern coffee table with a tempered glass top and clean-lined wooden base. The understated design makes it a versatile addition to any contemporary or transitional living space.",
    shortDescription: "Glass-top coffee table with clean wooden base",
    images: [
      "/Photos/487312245_657080413939892_396357785909587725_n.jpg",
    ],
    materials: ["Tempered Glass", "Solid Wood"],
    colors: ["Walnut & Clear Glass"],
    dimensions: {
      width: "120 cm",
      depth: "60 cm",
      height: "45 cm",
    },
    features: [
      "Tempered glass top",
      "Solid wood lower shelf",
      "Clean contemporary lines",
      "Sturdy construction",
    ],
    room: "Living Room",
    style: "Modern",
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-05-10",
    updatedAt: "2025-05-10",
  },
  {
    id: "14",
    slug: "classic-study-desk",
    name: "Classic Study Desk",
    sku: "FK-DSK-001",
    categoryId: "office",
    category: "Office Furniture",
    description:
      "A solid wood study desk with a spacious writing surface, multiple drawers for organization, and hand-carved detailing along the apron. Ideal for a home office or study room.",
    shortDescription: "Solid wood study desk with carved detailing",
    images: [
      "/Photos/487297686_657078867273380_5111974539386840409_n.jpg",
    ],
    materials: ["Solid Wood"],
    colors: ["Dark Walnut"],
    dimensions: {
      width: "140 cm",
      depth: "65 cm",
      height: "76 cm",
    },
    features: [
      "Spacious writing surface",
      "Multiple storage drawers",
      "Hand-carved apron detailing",
      "Sturdy construction",
    ],
    room: "Workspace",
    style: "Classic",
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-05-20",
    updatedAt: "2025-05-20",
  },
  {
    id: "15",
    slug: "upholstered-king-bed",
    name: "Upholstered King Bed",
    sku: "FK-BED-002",
    categoryId: "beds-bedroom",
    category: "Beds & Bedroom",
    description:
      "A luxurious king-size bed with a tall, button-tufted upholstered headboard in neutral fabric. The solid wood frame ensures durability while the padded headboard provides a comfortable backrest for reading.",
    shortDescription: "King bed with tall tufted upholstered headboard",
    images: [
      "/Photos/520813632_749533304694602_5302357473682948902_n.jpg",
    ],
    materials: ["Hardwood Frame", "Premium Fabric", "High-Density Foam"],
    colors: ["Neutral Beige & Wood"],
    dimensions: {
      width: "195 cm",
      depth: "215 cm",
      height: "135 cm (headboard)",
    },
    features: [
      "Tall button-tufted headboard",
      "Solid wood frame",
      "Padded headboard for reading comfort",
      "King-size mattress compatible",
    ],
    room: "Bedroom",
    style: "Modern Classic",
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-06-15",
    updatedAt: "2025-06-15",
  },
  {
    id: "16",
    slug: "carved-wooden-bedside-table",
    name: "Carved Wooden Bedside Table",
    sku: "FK-BED-003",
    categoryId: "beds-bedroom",
    category: "Beds & Bedroom",
    description:
      "A compact bedside table with three drawers and intricate carved floral details on the front panels. Finished in champagne gold to complement royal bedroom sets.",
    shortDescription: "Three-drawer bedside table with carved floral details",
    images: [
      "/Photos/520813632_749533304694602_5302357473682948902_n.jpg",
    ],
    materials: ["Solid Wood", "Gold Finish"],
    colors: ["Champagne Gold"],
    dimensions: {
      width: "50 cm",
      depth: "40 cm",
      height: "65 cm",
    },
    features: [
      "Three storage drawers",
      "Carved floral front panels",
      "Champagne gold finish",
      "Complements royal bed sets",
    ],
    room: "Bedroom",
    style: "Royal",
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-06-20",
    updatedAt: "2025-06-20",
  },
  {
    id: "17",
    slug: "modern-tv-console",
    name: "Modern TV Console",
    sku: "FK-TVC-001",
    categoryId: "tables-living",
    category: "Tables & Living Room",
    description:
      "A contemporary TV console with a low-profile design, featuring open shelving and closed cabinets for media equipment and accessories. Clean lines and warm wood tones suit modern living rooms.",
    shortDescription: "Low-profile TV console with mixed storage options",
    images: [
      "/Photos/487312346_657080707273196_3274471344750132711_n.jpg",
    ],
    materials: ["Engineered Wood", "Solid Wood Veneer"],
    colors: ["Warm Walnut"],
    dimensions: {
      width: "180 cm",
      depth: "40 cm",
      height: "50 cm",
    },
    features: [
      "Low-profile contemporary design",
      "Open and closed storage",
      "Cable management slots",
      "Warm wood veneer finish",
    ],
    room: "Living Room",
    style: "Modern",
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-07-01",
    updatedAt: "2025-07-01",
  },
  {
    id: "18",
    slug: "ergonomic-office-chair",
    name: "Ergonomic Office Chair",
    sku: "FK-OFC-001",
    categoryId: "office",
    category: "Office Furniture",
    description:
      "A professional ergonomic office chair with adjustable height, lumbar support, and padded armrests. The breathable mesh back keeps you comfortable during long working hours.",
    shortDescription: "Adjustable ergonomic chair with lumbar support",
    images: [
      "/Photos/487297686_657078867273380_5111974539386840409_n.jpg",
    ],
    materials: ["Steel Frame", "Mesh", "Premium Fabric", "Nylon Base"],
    colors: ["Black & Dark Gray"],
    dimensions: {
      width: "65 cm",
      depth: "60 cm",
      height: "110-120 cm",
      seatHeight: "42-52 cm",
    },
    features: [
      "Adjustable height",
      "Lumbar support system",
      "Breathable mesh backrest",
      "Padded armrests",
    ],
    room: "Workspace",
    style: "Modern",
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-07-10",
    updatedAt: "2025-07-10",
  },
  {
    id: "19",
    slug: "wooden-bookshelf",
    name: "Wooden Bookshelf",
    sku: "FK-SHL-002",
    categoryId: "wardrobes-storage",
    category: "Wardrobes & Storage",
    description:
      "A tall solid wood bookshelf with five spacious shelves and a classic design. Perfect for organizing books, displaying collectibles, or storing files in a home office.",
    shortDescription: "Five-shelf solid wood bookshelf",
    images: [
      "/Photos/486130443_651321494515784_5244541923420412931_n.jpg",
    ],
    materials: ["Solid Wood"],
    colors: ["Dark Mahogany"],
    dimensions: {
      width: "90 cm",
      depth: "35 cm",
      height: "180 cm",
    },
    features: [
      "Five spacious shelves",
      "Solid wood construction",
      "Classic design",
      "Versatile storage",
    ],
    room: "Workspace",
    style: "Classic",
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-07-25",
    updatedAt: "2025-07-25",
  },
  {
    id: "20",
    slug: "accent-lounge-chair",
    name: "Accent Lounge Chair",
    sku: "FK-CHR-002",
    categoryId: "sofas-seating",
    category: "Sofas & Seating",
    description:
      "A sophisticated accent lounge chair with a curved backrest and turned wooden legs. Upholstered in soft fabric with a carved wood frame. An ideal reading or relaxation chair for bedrooms and living rooms.",
    shortDescription: "Curved accent chair with carved wood frame",
    images: [
      "/Photos/486190486_651321937849073_8563416009321755336_n.jpg",
    ],
    materials: ["Solid Wood", "Premium Fabric", "Foam"],
    colors: ["Cream & Walnut"],
    dimensions: {
      width: "70 cm",
      depth: "72 cm",
      height: "95 cm",
      seatHeight: "43 cm",
    },
    features: [
      "Curved backrest design",
      "Carved wood frame",
      "Comfortable fabric upholstery",
      "Turned wooden legs",
    ],
    room: "Living Room",
    style: "Transitional",
    isFeatured: false,
    isNewArrival: true,
    createdAt: "2025-09-10",
    updatedAt: "2025-09-10",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNewArrival);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.materials.some((m) => m.toLowerCase().includes(q)) ||
      p.sku.toLowerCase().includes(q) ||
      p.room.toLowerCase().includes(q) ||
      p.style.toLowerCase().includes(q)
  );
}

export function getProductsByRoom(room: string): Product[] {
  return products.filter((p) => p.room.toLowerCase() === room.toLowerCase());
}

export function getAllStyles(): string[] {
  return [...new Set(products.map((p) => p.style))];
}

export function getAllMaterials(): string[] {
  const mats = new Set<string>();
  products.forEach((p) => p.materials.forEach((m) => mats.add(m)));
  return [...mats];
}

export function getAllRooms(): string[] {
  return [...new Set(products.map((p) => p.room))];
}
