export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareToPrice?: number;
  images: string[];
  category: string;
  brand: string;
  stock: number;
  rating: number;
  reviewCount: number;
  features: string[];
  specs: Record<string, string>;
  isNew?: boolean;
}

export const mockCategories = [
  "Processors",
  "Graphics Cards",
  "Motherboards",
  "Memory",
  "Storage",
  "Power Supplies",
  "Cases",
  "Cooling",
];

export const mockBrands = [
  "ASUS",
  "MSI",
  "Gigabyte",
  "Corsair",
  "NVIDIA",
  "AMD",
  "Intel",
  "Samsung",
  "NZXT",
];

export const mockProducts: Product[] = [
  {
    id: "prod_1",
    name: "NVIDIA GeForce RTX 4090 Founders Edition",
    slug: "nvidia-geforce-rtx-4090-fe",
    description: "The ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics.",
    price: 1599.99,
    images: [
      "https://images.unsplash.com/photo-1691453215284-884814d48a1c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Graphics Cards",
    brand: "NVIDIA",
    stock: 5,
    rating: 4.9,
    reviewCount: 124,
    features: ["Ada Lovelace Architecture", "24GB GDDR6X", "DLSS 3"],
    specs: {
      "Core Clock": "2.23 GHz",
      "Boost Clock": "2.52 GHz",
      "CUDA Cores": "16384",
      "Memory": "24 GB GDDR6X",
      "TDP": "450W"
    },
    isNew: true
  },
  {
    id: "prod_2",
    name: "AMD Ryzen 9 7950X3D",
    slug: "amd-ryzen-9-7950x3d",
    description: "16-Core, 32-Thread Desktop Processor with AMD 3D V-Cache Technology.",
    price: 699.00,
    compareToPrice: 799.00,
    images: [
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Processors",
    brand: "AMD",
    stock: 12,
    rating: 4.8,
    reviewCount: 89,
    features: ["16 Cores / 32 Threads", "Socket AM5", "PCIe 5.0 Support"],
    specs: {
      "Base Clock": "4.2 GHz",
      "Boost Clock": "5.7 GHz",
      "L3 Cache": "128MB",
      "TDP": "120W"
    }
  },
  {
    id: "prod_3",
    name: "Intel Core i9-14900K",
    slug: "intel-core-i9-14900k",
    description: "24-Core (8 P-cores + 16 E-cores) Desktop Processor. Unlock your gaming potential.",
    price: 589.99,
    images: [
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Processors",
    brand: "Intel",
    stock: 20,
    rating: 4.7,
    reviewCount: 56,
    features: ["24 Cores / 32 Threads", "Up to 6.0 GHz", "Intel UHD Graphics 770"],
    specs: {
      "P-Core Base": "3.2 GHz",
      "Boost Clock": "6.0 GHz",
      "Cache": "36MB",
      "TDP": "125W"
    }
  },
  {
    id: "prod_4",
    name: "Corsair Vengeance RGB 64GB (2x32GB) DDR5",
    slug: "corsair-vengeance-rgb-64gb-ddr5",
    description: "Push the limits of your RAM with high-performance DDR5, unlocking faster frequencies.",
    price: 219.99,
    images: [
      "https://images.unsplash.com/photo-1541029053896-18012015fa7d?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Memory",
    brand: "Corsair",
    stock: 45,
    rating: 4.9,
    reviewCount: 231,
    features: ["DDR5 6000MHz", "Custom RGB Lighting", "Intel XMP 3.0"],
    specs: {
      "Capacity": "64GB (2 x 32GB)",
      "Speed": "6000 MT/s",
      "CAS Latency": "30",
      "Voltage": "1.4V"
    }
  },
  {
    id: "prod_5",
    name: "Samsung 990 PRO 2TB NVMe SSD",
    slug: "samsung-990-pro-2tb",
    description: "Blistering fast PCIe 4.0 NVMe SSD for gaming and heavy workloads.",
    price: 169.99,
    compareToPrice: 199.99,
    images: [
      "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Storage",
    brand: "Samsung",
    stock: 100,
    rating: 4.9,
    reviewCount: 840,
    features: ["PCIe Gen4 x4", "Up to 7450 MB/s Read", "Heatsink Available"],
    specs: {
      "Capacity": "2TB",
      "Interface": "PCIe Gen 4.0 x4, NVMe 2.0",
      "Sequential Read": "7,450 MB/s",
      "Sequential Write": "6,900 MB/s"
    }
  },
  {
    id: "prod_6",
    name: "NZXT H9 Flow Dual-Chamber ATX Case",
    slug: "nzxt-h9-flow",
    description: "The H9 Flow is designed to cool off high-powered GPUs with its expansive thermal capabilities.",
    price: 159.99,
    images: [
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Cases",
    brand: "NZXT",
    stock: 8,
    rating: 4.8,
    reviewCount: 112,
    features: ["Dual-Chamber Design", "Uninterrupted Glass Panel", "Includes 4x 120mm Fans"],
    specs: {
      "Form Factor": "Mid-Tower",
      "Motherboard Support": "Mini-ITX, Micro-ATX, ATX",
      "Max GPU Length": "435mm",
      "Dimensions": "466 x 290 x 495 mm"
    }
  },
  {
    id: "prod_7",
    name: "Corsair RM1000x 1000W 80+ Gold",
    slug: "corsair-rm1000x",
    description: "Fully modular ATX power supply, trusted by gamers and professionals.",
    price: 189.99,
    images: [
      "https://images.unsplash.com/photo-1517400508447-fd8ce5b248a3?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Power Supplies",
    brand: "Corsair",
    stock: 25,
    rating: 4.8,
    reviewCount: 405,
    features: ["1000W Power", "80 PLUS Gold", "Fully Modular"],
    specs: {
      "Type": "ATX12V",
      "Efficiency": "80 PLUS Gold",
      "Modular": "Fully",
      "Fan Size": "135mm"
    }
  },
  {
    id: "prod_8",
    name: "ASUS ROG Strix B650E-F Gaming WiFi",
    slug: "asus-rog-strix-b650e-f",
    description: "AMD B650E AM5 ATX motherboard with PCIe 5.0, robust power delivery, and WiFi 6E.",
    price: 259.99,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Motherboards",
    brand: "ASUS",
    stock: 15,
    rating: 4.6,
    reviewCount: 78,
    features: ["AM5 Socket", "PCIe 5.0 Ready", "WiFi 6E"],
    specs: {
      "Chipset": "AMD B650E",
      "Memory": "4x DDR5, Max 192GB",
      "Form Factor": "ATX",
      "Network": "Intel 2.5Gb Ethernet + WiFi 6E"
    }
  }
];

export const mockOrders = [
  {
    id: "ord_1001",
    userId: "usr_1",
    status: "DELIVERED",
    totalAmount: 1819.98,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    items: [
      { productId: "prod_1", name: "NVIDIA GeForce RTX 4090 Founders Edition", quantity: 1, unitPrice: 1599.99 },
      { productId: "prod_4", name: "Corsair Vengeance RGB 64GB DDR5", quantity: 1, unitPrice: 219.99 }
    ]
  },
  {
    id: "ord_1002",
    userId: "usr_1",
    status: "PROCESSING",
    totalAmount: 749.00,
    createdAt: new Date().toISOString(),
    items: [
      { productId: "prod_2", name: "AMD Ryzen 9 7950X3D", quantity: 1, unitPrice: 699.00 },
      { productId: "prod_5", name: "Samsung 990 PRO 2TB NVMe SSD", quantity: 1, unitPrice: 50.00 } // discounted
    ]
  }
];
