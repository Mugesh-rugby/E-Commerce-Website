export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export const categories = [
  { id: "all", label: "All", icon: "✦" },
  { id: "electronics", label: "Electronics", icon: "◈" },
  { id: "apparel", label: "Apparel", icon: "◇" },
  { id: "footwear", label: "Footwear", icon: "◉" },
  { id: "accessories", label: "Accessories", icon: "◎" },
  { id: "home", label: "Home", icon: "▣" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Arc Studio Monitor Headphones",
    price: 349,
    originalPrice: 429,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    ],
    category: "electronics",
    rating: 4.8,
    reviewCount: 324,
    description: "Studio-grade sound engineered for the discerning listener. The Arc delivers breathtaking audio fidelity with 40mm neodymium drivers and active noise cancellation that anticipates your environment.",
    details: [
      "40mm neodymium dynamic drivers",
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Foldable design with premium carry case",
      "Hi-Res Audio certified",
    ],
    tags: ["audio", "wireless", "premium", "noise-cancelling"],
    isNew: false,
    isFeatured: true,
    inStock: true,
    colors: ["#1c1917", "#e7e5e4", "#c9a96e"],
  },
  {
    id: "2",
    name: "Meridian Smartwatch Pro",
    price: 499,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&q=80",
    ],
    category: "electronics",
    rating: 4.7,
    reviewCount: 218,
    description: "Time elevated. The Meridian Pro combines Swiss watchmaking precision with cutting-edge health monitoring. Track your journey with surgical accuracy and understated elegance.",
    details: [
      "Always-on AMOLED display",
      "ECG + Blood oxygen monitoring",
      "GPS + Cellular connectivity",
      "7-day battery life",
      "Sapphire crystal glass",
    ],
    tags: ["wearable", "fitness", "luxury", "smart"],
    isNew: true,
    isFeatured: true,
    inStock: true,
    colors: ["#292524", "#a8a29e", "#c9a96e", "#1d4ed8"],
  },
  {
    id: "3",
    name: "Forma Merino Crewneck",
    price: 185,
    originalPrice: 220,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
    ],
    category: "apparel",
    rating: 4.9,
    reviewCount: 156,
    description: "Woven from 100% ultra-fine Merino wool, the Forma Crewneck is a masterclass in understated luxury. Temperature-regulating, naturally odor-resistant, and designed to last a lifetime.",
    details: [
      "100% Extra-fine Merino Wool",
      "Seamless construction",
      "Machine washable",
      "Available in 8 colorways",
      "Ethically sourced fibers",
    ],
    tags: ["merino", "sustainable", "minimal", "premium"],
    isNew: false,
    isFeatured: true,
    inStock: true,
    colors: ["#1c1917", "#f5f5f4", "#c084fc", "#86efac"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "4",
    name: "Stratum Runner",
    price: 279,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
    ],
    category: "footwear",
    rating: 4.6,
    reviewCount: 489,
    description: "Born from marathon track data and designed with biomechanical precision. The Stratum delivers propulsive energy return and cloud-like cushioning for every stride.",
    details: [
      "Carbon fiber propulsion plate",
      "Responsive foam midsole",
      "Engineered mesh upper",
      "Heel-to-toe drop: 8mm",
      "Weight: 245g (M10)",
    ],
    tags: ["running", "performance", "carbon", "speed"],
    isNew: true,
    isFeatured: false,
    inStock: true,
    colors: ["#1c1917", "#ef4444", "#3b82f6"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
  },
  {
    id: "5",
    name: "Lumen Desk Lamp",
    price: 229,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a35f32ece?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    category: "home",
    rating: 4.8,
    reviewCount: 92,
    description: "Architect-designed and tuned by lighting experts. The Lumen sculpts your workspace with precision light — adjustable color temperature from warm amber to cool daylight, all in a gravity-defying form.",
    details: [
      "2700K–6500K color temperature",
      "Wireless charging base (15W)",
      "Touch-sensitive dimmer",
      "Articulating arm with 360° rotation",
      "USB-C port integrated",
    ],
    tags: ["lighting", "design", "workspace", "minimal"],
    isNew: false,
    isFeatured: true,
    inStock: true,
    colors: ["#1c1917", "#f5f5f4"],
  },
  {
    id: "6",
    name: "Crest Leather Wallet",
    price: 145,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    ],
    category: "accessories",
    rating: 4.7,
    reviewCount: 203,
    description: "Handcrafted from a single piece of full-grain vegetable-tanned leather. The Crest wallet develops a rich patina over years of use, becoming uniquely yours with time.",
    details: [
      "Full-grain vegetable-tanned leather",
      "Holds 8 cards + cash",
      "RFID blocking technology",
      "Handstitched with waxed thread",
      "Lifetime repair guarantee",
    ],
    tags: ["leather", "handmade", "minimal", "RFID"],
    isNew: false,
    isFeatured: false,
    inStock: true,
    colors: ["#78716c", "#1c1917", "#92400e"],
  },
  {
    id: "7",
    name: "Volt Mechanical Keyboard",
    price: 389,
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&q=80",
    ],
    category: "electronics",
    rating: 4.9,
    reviewCount: 167,
    description: "Precision-engineered for those who live at the keyboard. The Volt features custom POM switches with a satisfying tactile bump, gasket-mounted PCB, and aircraft-grade aluminum chassis.",
    details: [
      "Custom POM linear switches",
      "Gasket-mounted PCB for flex",
      "Aluminum + polycarbonate body",
      "Per-key RGB with 16M colors",
      "Hot-swappable switch sockets",
    ],
    tags: ["keyboard", "mechanical", "gaming", "productivity"],
    isNew: true,
    isFeatured: false,
    inStock: true,
    colors: ["#1c1917", "#f5f5f4", "#c9a96e"],
  },
  {
    id: "8",
    name: "Terra Loafer",
    price: 315,
    originalPrice: 380,
    images: [
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80",
    ],
    category: "footwear",
    rating: 4.5,
    reviewCount: 88,
    description: "The modern loafer, redefined. Hand-lasted on traditional forms with Italian calfskin uppers and a Goodyear-welted natural crepe sole that provides exceptional durability and comfort.",
    details: [
      "Italian calfskin leather upper",
      "Goodyear welted construction",
      "Natural crepe rubber sole",
      "Hand-lasting process",
      "Cedar shoe trees included",
    ],
    tags: ["leather", "dress", "italian", "sustainable"],
    isNew: false,
    isFeatured: false,
    inStock: true,
    colors: ["#92400e", "#1c1917", "#d6d3d1"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
  },
  {
    id: "9",
    name: "Solstice Sunglasses",
    price: 265,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80",
      "https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=800&q=80",
    ],
    category: "accessories",
    rating: 4.6,
    reviewCount: 134,
    description: "Cut from a single sheet of 8mm Italian acetate, the Solstice frames are a study in sculptural elegance. CR-39 lenses with polarization and UV400 protection wrap around your vision perfectly.",
    details: [
      "8mm Italian Mazzucchelli acetate",
      "CR-39 polarized lenses",
      "UV400 protection",
      "Spring-loaded titanium hinges",
      "Includes leather hard case",
    ],
    tags: ["eyewear", "italian", "polarized", "luxury"],
    isNew: true,
    isFeatured: false,
    inStock: true,
    colors: ["#1c1917", "#78716c", "#92400e", "#14532d"],
  },
  {
    id: "10",
    name: "Nomad Backpack 26L",
    price: 295,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80",
    ],
    category: "accessories",
    rating: 4.8,
    reviewCount: 271,
    description: "Engineered for the modern nomad. Weather-resistant 420D nylon ripstop, a floating laptop sleeve for 16\" machines, and a magnetic water bottle pocket that opens and closes with one hand.",
    details: [
      "420D recycled nylon ripstop",
      "Floating 16\" laptop sleeve",
      "YKK AquaGuard zippers",
      "26L capacity",
      "Lifetime warranty",
    ],
    tags: ["travel", "laptop", "waterproof", "sustainable"],
    isNew: false,
    isFeatured: true,
    inStock: true,
    colors: ["#1c1917", "#57534e", "#1d4ed8"],
  },
  {
    id: "11",
    name: "Apex Wireless Earbuds",
    price: 199,
    originalPrice: 249,
    images: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800&q=80",
    ],
    category: "electronics",
    rating: 4.5,
    reviewCount: 412,
    description: "Sound that surrounds you. The Apex earbuds feature adaptive transparency, spatial audio, and a custom acoustic architecture that makes every track feel intimate and alive.",
    details: [
      "Custom 11mm acoustic drivers",
      "Adaptive ANC + Transparency",
      "Spatial audio with head tracking",
      "6+24 hours battery",
      "IPX5 water resistance",
    ],
    tags: ["earbuds", "wireless", "ANC", "spatial-audio"],
    isNew: false,
    isFeatured: false,
    inStock: true,
    colors: ["#1c1917", "#f5f5f4", "#c9a96e"],
  },
  {
    id: "12",
    name: "Sculpt Studio Chair",
    price: 895,
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    ],
    category: "home",
    rating: 4.9,
    reviewCount: 67,
    description: "Designed with orthopedic engineers and sitting scientists. The Sculpt Chair's dynamic lumbar support adapts in real-time to your posture, eliminating the compromise between comfort and form.",
    details: [
      "Adaptive dynamic lumbar support",
      "Breathable 3D knit mesh",
      "8-way adjustable armrests",
      "Polished aluminum base",
      "12-year warranty",
    ],
    tags: ["ergonomic", "office", "design", "premium"],
    isNew: true,
    isFeatured: false,
    inStock: false,
    colors: ["#1c1917", "#f5f5f4", "#78716c"],
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    author: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    date: "2024-11-12",
    title: "Transforms how I listen to music",
    body: "I've tried a dozen premium headphones over the years, and the Arc is the first that makes me genuinely emotional about music again. The soundstage is extraordinary — instruments have space and air around them.",
  },
  {
    id: "r2",
    productId: "1",
    author: "Sophia Laurent",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    date: "2024-10-28",
    title: "Worth every penny",
    body: "The ANC is the best I've encountered — it doesn't create that pressure feeling that plagues other headphones. Build quality is exceptional, and the ear cups are the most comfortable I've worn.",
  },
  {
    id: "r3",
    productId: "1",
    author: "James Okoye",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80",
    rating: 4,
    date: "2024-10-15",
    title: "Near perfect, minor Bluetooth quirks",
    body: "Outstanding sound quality and comfort. The only minor issue is occasional Bluetooth reconnection latency when switching between devices, but firmware updates have been improving this.",
  },
];

export const heroProducts = products.filter(p => p.isFeatured).slice(0, 3);
export const featuredProducts = products.filter(p => p.isFeatured);
export const newArrivals = products.filter(p => p.isNew);

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, count);
}

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter(r => r.productId === productId);
}
