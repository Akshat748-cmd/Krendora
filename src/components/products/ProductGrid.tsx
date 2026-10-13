"use client";

import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { SearchX } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  onResetFilters?: () => void;
  compact?: boolean;
}

export function ProductGrid({
  products,
  emptyMessage = "No matching pieces found in the current collection.",
  onResetFilters,
  compact = false,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="w-full py-16 px-6 text-center bg-white/60 rounded-2xl border border-dashed border-[#D9C3AA] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#EADBCB]/40 flex items-center justify-center text-[#6B5E4E] mb-4">
          <SearchX className="w-8 h-8 opacity-75" />
        </div>
        <h3 className="font-serif text-xl font-medium text-[#1E1E1E]">No Products Found</h3>
        <p className="text-sm text-[#6B5E4E] max-w-md mt-1 mb-6 leading-relaxed">
          {emptyMessage}
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-6 py-2.5 rounded-full bg-[#1E1E1E] text-[#FDF8F1] text-xs font-semibold hover:bg-[#F97316] transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} compact={compact} />
      ))}
    </div>
  );
}
