export interface ProductVariant {
  id: number | string;
  title: string;
  price: number;
  compareAtPrice?: number | null;
  available: boolean;
  sku?: string | null;
  option1?: string | null;
  option2?: string | null;
  option3?: string | null;
}

export interface ProductOption {
  name: string;
  position: number;
  values: string[];
}

export interface Product {
  id: string;
  shopifyId?: number;
  handle: string;
  name: string;
  title?: string;
  category: "Home & Kitchen" | "Car & Auto" | "Tech & Gadgets" | "Fitness & Wellness" | "Lifestyle & Travel" | string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  availability: "In Stock" | "Low Stock" | "Sold Out";
  tags: string[];
  features: string[];
  variants?: ProductVariant[];
  options?: ProductOption[];
  isTrending?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  bundleEligible?: boolean;
  originalUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  isBundlePart?: boolean;
  bundleId?: string;
}

export interface BundleTier {
  minItems: number;
  discountPercentage: number;
  label: string;
}

export const BUNDLE_TIERS: BundleTier[] = [
  { minItems: 1, discountPercentage: 0, label: "Add 1 more for 5% off" },
  { minItems: 2, discountPercentage: 5, label: "5% Bundle Discount applied" },
  { minItems: 3, discountPercentage: 10, label: "Maximum 10% Bundle Discount applied" },
];
