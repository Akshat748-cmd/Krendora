"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { filterAndSortProducts, FilterOptions } from "@/lib/filterProducts";
import {
  SlidersHorizontal,
  Search,
  Sparkles,
  PackagePlus,
  ArrowRight,
  Filter,
} from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();

  const [category, setCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<FilterOptions["sortBy"]>("featured");

  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("q");
    const filter = searchParams.get("filter");

    if (cat && CATEGORIES.includes(cat as any)) {
      setCategory(cat);
    }
    if (q) {
      setSearchQuery(q);
    }
    if (filter) {
      setFilterType(filter);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(PRODUCTS, {
      category,
      searchQuery,
      sortBy,
      newOnly: filterType === "new",
      onSaleOnly: filterType === "sale",
      trendingOnly: filterType === "trending",
    });
  }, [category, searchQuery, sortBy, filterType]);

  return (
    <div className="bg-[#FDF8F1] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8C7A68]">
            KRENDORA DEPARTMENT CATALOGUE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1E1E1E]">
            All Products
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E4E] leading-relaxed">
            Curated, well-priced, and genuinely useful tools for your home, car, and daily routine.
            Free US shipping on all orders over $35.
          </p>
        </div>

        {/* Discovery Tools Promotional Banner */}
        <div className="bg-linear-to-r from-[#EADBCB]/80 via-[#FDF8F1] to-[#EADBCB]/80 rounded-2xl border border-[#D9C3AA] p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F97316] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold text-[#1E1E1E]">
                Need tailored recommendations?
              </h3>
              <p className="text-xs text-[#6B5E4E]">
                Try our 3 shopping tools: AI Shopping Concierge, Smart Finder, or Custom Bundle Builder.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/tools/ai-assistant"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#D9C3AA] text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-white transition-colors"
            >
              AI Assistant
            </Link>
            <Link
              href="/tools/product-finder"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#D9C3AA] text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-white transition-colors"
            >
              Smart Finder
            </Link>
            <Link
              href="/tools/bundle-builder"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F97316] text-white hover:bg-[#EA580C] transition-colors"
            >
              Build Bundle (10% Off)
            </Link>
          </div>
        </div>

        {/* Controls Bar: Category Pills + Search + Sort */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E7DED3]">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-xs px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors font-medium ${
                    category === cat
                      ? "bg-[#1E1E1E] text-white"
                      : "bg-[#FAF6F0] text-[#1E1E1E] hover:bg-[#EADBCB]/50 border border-[#E7DED3]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right: Search & Sort */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A68]" />
                <input
                  type="text"
                  placeholder="Filter pieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#E7DED3] text-xs text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as FilterOptions["sortBy"])}
                className="bg-[#FAF6F0] border border-[#E7DED3] text-xs font-semibold text-[#1E1E1E] rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
              >
                <option value="featured">Curated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>

          {/* Quick Sub-Filter Pills */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8C7A68] font-medium">Quick Filter:</span>
            {[
              { id: "all", label: "All Items" },
              { id: "trending", label: "🔥 Trending" },
              { id: "new", label: "✨ New Releases" },
              { id: "sale", label: "🏷️ Offers" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  filterType === f.id
                    ? "bg-[#1E1E1E] text-white font-medium"
                    : "bg-white border border-[#E7DED3] text-[#6B5E4E] hover:text-[#1E1E1E]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          emptyMessage="No pieces found matching your current filter selection."
          onResetFilters={() => {
            setCategory("All");
            setSearchQuery("");
            setFilterType("all");
          }}
        />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
