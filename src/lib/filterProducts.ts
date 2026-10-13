import { Product } from "@/types/product";

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
  trendingOnly?: boolean;
  newOnly?: boolean;
  onSaleOnly?: boolean;
  searchQuery?: string;
  sortBy?: "featured" | "price-low" | "price-high" | "rating" | "newest";
}

export function filterAndSortProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  let filtered = [...products];

  // Category filter
  if (options.category && options.category !== "All") {
    filtered = filtered.filter((p) => p.category === options.category);
  }

  // Price range
  if (typeof options.minPrice === "number") {
    filtered = filtered.filter((p) => p.price >= options.minPrice!);
  }
  if (typeof options.maxPrice === "number") {
    filtered = filtered.filter((p) => p.price <= options.maxPrice!);
  }

  // Min rating
  if (typeof options.minRating === "number" && options.minRating > 0) {
    filtered = filtered.filter((p) => p.rating >= options.minRating!);
  }

  // Stock availability
  if (options.inStockOnly) {
    filtered = filtered.filter((p) => p.availability === "In Stock");
  }

  // Trending
  if (options.trendingOnly) {
    filtered = filtered.filter((p) => p.isTrending);
  }

  // New arrivals
  if (options.newOnly) {
    filtered = filtered.filter((p) => p.isNew);
  }

  // On sale
  if (options.onSaleOnly) {
    filtered = filtered.filter(
      (p) => p.compareAtPrice && p.compareAtPrice > p.price
    );
  }

  // Search query
  if (options.searchQuery && options.searchQuery.trim() !== "") {
    const q = options.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sorting
  switch (options.sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case "featured":
    default:
      // Keep curated order or rank trending/bestsellers higher
      filtered.sort((a, b) => {
        const scoreA = (a.isBestseller ? 2 : 0) + (a.isTrending ? 1 : 0);
        const scoreB = (b.isBestseller ? 2 : 0) + (b.isTrending ? 1 : 0);
        return scoreB - scoreA;
      });
      break;
  }

  return filtered;
}
