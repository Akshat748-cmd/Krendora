import { BUNDLE_TIERS } from "@/types/product";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const formatUSD = formatPrice;
// Backward compatibility alias so existing components compile seamlessly
export const formatINR = formatPrice;

export function getBundleDiscountPercentage(itemCount: number): number {
  if (itemCount >= 3) return 10;
  if (itemCount === 2) return 5;
  return 0;
}

export function calculateBundlePricing(itemsTotal: number, itemCount: number) {
  const discountPercent = getBundleDiscountPercentage(itemCount);
  const discountAmount = Number(((itemsTotal * discountPercent) / 100).toFixed(2));
  const total = Number((itemsTotal - discountAmount).toFixed(2));
  
  return {
    subtotal: itemsTotal,
    discountPercent,
    discountAmount,
    total,
    savingsText: discountPercent > 0 ? `You saved ${formatPrice(discountAmount)} (${discountPercent}% OFF)` : null,
  };
}
