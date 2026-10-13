"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { filterAndSortProducts, FilterOptions } from "@/lib/filterProducts";
import { formatUSD } from "@/lib/pricing";
import {
  SlidersHorizontal,
  RotateCcw,
  Star,
  Check,
  Search,
  Filter,
  X,
  TrendingUp,
  Tag,
} from "lucide-react";

export default function ProductFinderPage() {
  const [category, setCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(45);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [trendingOnly, setTrendingOnly] = useState<boolean>(false);
  const [newOnly, setNewOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<FilterOptions["sortBy"]>("featured");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const resetAllFilters = () => {
    setCategory("All");
    setMaxPrice(45);
    setMinRating(0);
    setInStockOnly(false);
    setTrendingOnly(false);
    setNewOnly(false);
    setOnSaleOnly(false);
    setSortBy("featured");
    setSearchQuery("");
  };

  const hasActiveFilters =
    category !== "All" ||
    maxPrice < 45 ||
    minRating > 0 ||
    inStockOnly ||
    trendingOnly ||
    newOnly ||
    onSaleOnly ||
    searchQuery.trim().length > 0;

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(PRODUCTS, {
      category,
      maxPrice,
      minRating,
      inStockOnly,
      trendingOnly,
      newOnly,
      onSaleOnly,
      searchQuery,
      sortBy,
    });
  }, [
    category,
    maxPrice,
    minRating,
    inStockOnly,
    trendingOnly,
    newOnly,
    onSaleOnly,
    searchQuery,
    sortBy,
  ]);

  return (
    <div className="bg-[#FDF8F1] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Header */}
        <div className="pb-8 border-b border-[#E7DED3] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-[#F97316]/10 text-[#F97316]">
                <SlidersHorizontal className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8C7A68]">
                Interactive Tool • Krendora Engine
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1E1E1E]">
              Smart Product Finder
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5E4E] mt-1 max-w-xl">
              Filter Krendora&apos;s live 21-item catalogue in real-time by budget, customer satisfaction ratings,
              bestseller status, and special offers.
            </p>
          </div>

          {/* Quick Active stats and mobile filter button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 py-2 px-4 rounded-xl bg-white border border-[#D9C3AA] text-xs font-semibold text-[#1E1E1E]"
            >
              <Filter className="w-3.5 h-3.5 text-[#F97316]" />
              Filters {hasActiveFilters && "(Active)"}
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="flex items-center gap-1.5 text-xs text-[#F97316] hover:text-[#EA580C] py-2 px-3 rounded-xl border border-[#F97316]/30 bg-[#F97316]/5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

            <div className="text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-[#E7DED3] text-[#1E1E1E]">
              Showing <strong className="text-[#F97316]">{filteredProducts.length}</strong> of{" "}
              {PRODUCTS.length} products
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="pt-8 flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 bg-white rounded-3xl border border-[#E7DED3] p-6 space-y-6 shadow-xs sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7DED3]">
              <h2 className="font-serif text-base font-semibold text-[#1E1E1E] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#F97316]" /> Filter Catalogue
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-[#6B5E4E] hover:text-[#F97316]"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#6B5E4E]">
                Keyword Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A68]" />
                <input
                  type="text"
                  placeholder="E.g. scrubber, car, cable..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF6F0] border border-[#E7DED3] text-xs text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                />
              </div>
            </div>

            {/* Category Segmented Controls */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#6B5E4E]">
                Department
              </label>
              <div className="flex flex-col gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-left text-xs px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                      category === cat
                        ? "bg-[#1E1E1E] text-[#FDF8F1] font-semibold"
                        : "text-[#1E1E1E] hover:bg-[#EADBCB]/40"
                    }`}
                  >
                    <span>{cat}</span>
                    {category === cat && <Check className="w-3.5 h-3.5 text-[#F97316]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range Slider */}
            <div className="space-y-3 pt-3 border-t border-[#E7DED3]">
              <div className="flex justify-between items-center text-xs font-semibold">
                <label className="uppercase tracking-wider text-[#6B5E4E]">Max Budget</label>
                <span className="text-[#F97316] font-bold">{formatUSD(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="17"
                max="45"
                step="1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#F97316] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8C7A68]">
                <span>$17</span>
                <span>$30</span>
                <span>$45</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2.5 pt-3 border-t border-[#E7DED3]">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#6B5E4E]">
                Minimum Rating
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 4.0, 4.5, 4.8].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 ${
                      minRating === rate
                        ? "bg-[#F97316] text-white"
                        : "bg-[#FAF6F0] text-[#1E1E1E] hover:bg-[#EADBCB]/50 border border-[#E7DED3]"
                    }`}
                  >
                    {rate === 0 ? (
                      "All"
                    ) : (
                      <>
                        <span>{rate}</span>
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Toggle Checkboxes */}
            <div className="space-y-3 pt-3 border-t border-[#E7DED3]">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#6B5E4E]">
                Status & Badges
              </label>

              <label className="flex items-center gap-2.5 text-xs text-[#1E1E1E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-[#F97316]"
                />
                <span>Ready to Ship (In Stock)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-[#1E1E1E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={trendingOnly}
                  onChange={(e) => setTrendingOnly(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-[#F97316]"
                />
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#F97316]" /> Trending Products
                </span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-[#1E1E1E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-[#F97316]"
                />
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#218653]" /> Special Discounts
                </span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <main className="flex-1 min-w-0 w-full space-y-6">
            <div className="bg-white rounded-2xl border border-[#E7DED3] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap text-xs text-[#6B5E4E]">
                <span>Active Filters:</span>
                {category !== "All" && (
                  <span className="bg-[#EADBCB]/50 px-2.5 py-1 rounded-full text-[#1E1E1E] font-medium flex items-center gap-1">
                    {category}
                    <button onClick={() => setCategory("All")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {maxPrice < 45 && (
                  <span className="bg-[#EADBCB]/50 px-2.5 py-1 rounded-full text-[#1E1E1E] font-medium flex items-center gap-1">
                    ≤ {formatUSD(maxPrice)}
                    <button onClick={() => setMaxPrice(45)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className="bg-[#EADBCB]/50 px-2.5 py-1 rounded-full text-[#1E1E1E] font-medium flex items-center gap-1">
                    {minRating}+ Stars
                    <button onClick={() => setMinRating(0)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {trendingOnly && (
                  <span className="bg-[#EADBCB]/50 px-2.5 py-1 rounded-full text-[#1E1E1E] font-medium flex items-center gap-1">
                    Trending
                    <button onClick={() => setTrendingOnly(false)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {onSaleOnly && (
                  <span className="bg-[#EADBCB]/50 px-2.5 py-1 rounded-full text-[#1E1E1E] font-medium flex items-center gap-1">
                    On Sale
                    <button onClick={() => setOnSaleOnly(false)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {!hasActiveFilters && (
                  <span className="text-[#8C7A68] italic">Displaying all 21 Krendora products</span>
                )}
              </div>

              {/* Sort By Selector */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#6B5E4E]">
                  Sort By:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as FilterOptions["sortBy"])}
                  className="bg-[#FAF6F0] border border-[#D9C3AA] text-xs font-semibold text-[#1E1E1E] rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                >
                  <option value="featured">Curated Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Additions</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            <ProductGrid
              products={filteredProducts}
              emptyMessage="No pieces match your selected filter criteria. Try adjusting the price ceiling or clearing specific tags."
              onResetFilters={resetAllFilters}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
