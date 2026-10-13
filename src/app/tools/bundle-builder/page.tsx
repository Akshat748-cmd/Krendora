"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { Product } from "@/types/product";
import { formatUSD, calculateBundlePricing } from "@/lib/pricing";
import { useCart } from "@/context/CartContext";
import confetti from "canvas-confetti";
import {
  PackagePlus,
  Check,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function BundleBuilderPage() {
  const { addBundleToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([
    // Pre-select 2 actual Krendora items
    PRODUCTS[0], // Cordless Electric Spin Scrubber ($29.99)
    PRODUCTS[1], // LED Car Sun Visor Mirror Light ($24.99)
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  const eligibleProducts = PRODUCTS.filter((p) => p.bundleEligible);

  const displayedProducts =
    selectedCategory === "All"
      ? eligibleProducts
      : eligibleProducts.filter((p) => p.category === selectedCategory);

  const isSelected = (productId: string) =>
    selectedProducts.some((p) => p.id === productId);

  const toggleProduct = (product: Product) => {
    if (isSelected(product.id)) {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      const nextList = [...selectedProducts, product];
      setSelectedProducts(nextList);
      if (nextList.length === 3) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch (e) {}
      }
    }
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const rawSubtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const pricing = calculateBundlePricing(rawSubtotal, selectedProducts.length);

  const handleAddBundleToCart = () => {
    if (selectedProducts.length === 0) return;
    addBundleToCart(selectedProducts);
    setIsSuccess(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}
    setTimeout(() => {
      setIsSuccess(false);
    }, 2500);
  };

  // Tier guidance calculation
  let tierProgress = 0;
  let tierHint = "";
  if (selectedProducts.length === 0) {
    tierProgress = 0;
    tierHint = "Select at least 2 items to unlock multi-buy bundle discounts";
  } else if (selectedProducts.length === 1) {
    tierProgress = 33;
    tierHint = "Add 1 more item to unlock 5% Bundle Discount!";
  } else if (selectedProducts.length === 2) {
    tierProgress = 66;
    tierHint = "5% Discount Applied! Add 1 more item to reach max 10% OFF";
  } else {
    tierProgress = 100;
    tierHint = "✨ Maximum 10% Bundle Discount Unlocked!";
  }

  return (
    <div className="bg-[#FDF8F1] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="pb-8 border-b border-[#E7DED3]">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-[#F97316]/10 text-[#F97316]">
              <PackagePlus className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8C7A68]">
              Interactive Tool • Multi-Buy Studio
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1E1E1E]">
            Build Your Own Bundle
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E4E] mt-1 max-w-2xl leading-relaxed">
            Curate a customized set of Krendora practical gadgets and home solutions.
            Unlock tiered multi-buy pricing: <strong>5% off for 2 items</strong>, and{" "}
            <strong>10% off for 3 or more pieces</strong>. Orders over $35 qualify for free US delivery.
          </p>
        </div>

        {/* Main Split Layout */}
        <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Area: Product Selector (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Category Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-4 py-2 rounded-xl whitespace-nowrap transition-colors font-medium ${
                    selectedCategory === cat
                      ? "bg-[#1E1E1E] text-white"
                      : "bg-white text-[#1E1E1E] border border-[#E7DED3] hover:bg-[#EADBCB]/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {displayedProducts.map((product) => {
                const selected = isSelected(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => toggleProduct(product)}
                    className={`cursor-pointer rounded-2xl p-4 bg-white border transition-all duration-300 flex flex-col justify-between group relative ${
                      selected
                        ? "border-[#F97316] ring-2 ring-[#F97316]/20 shadow-md"
                        : "border-[#E7DED3] hover:border-[#D9C3AA] hover:shadow-sm"
                    }`}
                  >
                    {selected && (
                      <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-[#F97316] text-white flex items-center justify-center shadow-sm">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div>
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#EADBCB]/20 mb-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, 300px"
                        />
                      </div>

                      <div className="flex items-center gap-1 text-[#F97316] text-[10px] mb-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-semibold">{product.rating}</span>
                        <span className="text-[#8C7A68]">({product.reviewCount})</span>
                      </div>

                      <h3 className="font-serif text-sm font-semibold text-[#1E1E1E] line-clamp-2 group-hover:text-[#F97316] transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-[#6B5E4E] line-clamp-1 mt-1 font-semibold uppercase">
                        {product.category}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E7DED3]/60 flex items-center justify-between">
                      <span className="text-sm font-bold text-[#1E1E1E]">
                        {formatUSD(product.price)}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleProduct(product);
                        }}
                        className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1 ${
                          selected
                            ? "bg-[#F97316] text-white"
                            : "bg-[#FAF6F0] text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-white border border-[#E7DED3]"
                        }`}
                      >
                        {selected ? (
                          <>
                            <Check className="w-3 h-3" /> In Bundle
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Area: Sticky Bundle Summary (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-5">
            <div className="bg-white rounded-3xl border border-[#D9C3AA] p-6 shadow-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7DED3]">
                <div className="flex items-center gap-2">
                  <PackagePlus className="w-5 h-5 text-[#F97316]" />
                  <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">
                    Bundle Summary
                  </h2>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EADBCB]/60 text-[#1E1E1E]">
                  {selectedProducts.length} Selected
                </span>
              </div>

              {/* Tier Progress Meter */}
              <div className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#E7DED3] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1E1E1E] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                    Tier Status
                  </span>
                  <span className="font-bold text-[#F97316]">
                    {pricing.discountPercent > 0
                      ? `${pricing.discountPercent}% OFF`
                      : "Standard"}
                  </span>
                </div>

                <div className="w-full bg-[#E7DED3] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-linear-to-r from-[#F97316] to-amber-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${tierProgress}%` }}
                  />
                </div>

                <p className="text-[11px] text-[#6B5E4E] leading-relaxed">
                  {tierHint}
                </p>

                <div className="grid grid-cols-3 text-[10px] text-center pt-1 font-semibold">
                  <span
                    className={
                      selectedProducts.length >= 1 ? "text-[#F97316]" : "text-[#8C7A68]"
                    }
                  >
                    1: Standard
                  </span>
                  <span
                    className={
                      selectedProducts.length >= 2 ? "text-[#F97316]" : "text-[#8C7A68]"
                    }
                  >
                    2: 5% OFF
                  </span>
                  <span
                    className={
                      selectedProducts.length >= 3 ? "text-[#218653]" : "text-[#8C7A68]"
                    }
                  >
                    3+: 10% OFF
                  </span>
                </div>
              </div>

              {/* Selected Items List */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {selectedProducts.length === 0 ? (
                  <div className="text-center py-6 text-xs text-[#8C7A68]">
                    No items selected yet. Tap products on the left to begin your custom bundle.
                  </div>
                ) : (
                  selectedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E7DED3] text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0 bg-white">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div className="truncate">
                          <p className="font-semibold text-[#1E1E1E] truncate">{p.name}</p>
                          <p className="text-[10px] text-[#8C7A68]">{formatUSD(p.price)}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => removeProduct(p.id)}
                        className="text-[#6B5E4E] hover:text-red-500 p-1 transition-colors"
                        aria-label={`Remove ${p.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2 pt-4 border-t border-[#E7DED3] text-xs">
                <div className="flex justify-between text-[#6B5E4E]">
                  <span>Items Subtotal</span>
                  <span className="font-medium text-[#1E1E1E]">
                    {formatUSD(pricing.subtotal)}
                  </span>
                </div>

                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between text-[#218653] font-semibold bg-[#218653]/10 p-2 rounded-lg">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" /> Multi-Buy Bundle ({pricing.discountPercent}%)
                    </span>
                    <span>-{formatUSD(pricing.discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-[#1E1E1E] pt-2 border-t border-[#E7DED3]">
                  <span>Final Bundle Total</span>
                  <span className="text-lg text-[#F97316]">
                    {formatUSD(pricing.total)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddBundleToCart}
                  disabled={selectedProducts.length === 0}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-xs tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2 ${
                    isSuccess
                      ? "bg-[#218653] text-white"
                      : "bg-[#1E1E1E] hover:bg-[#F97316] text-white disabled:opacity-40"
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Bundle Added to Bag!
                    </>
                  ) : (
                    <>
                      <PackagePlus className="w-4 h-4" /> Add Bundle to Shopping Bag
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C7A68]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#218653]" />
                  <span>Free US shipping when total reaches $35</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
