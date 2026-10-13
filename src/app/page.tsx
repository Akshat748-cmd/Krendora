"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ToolCard } from "@/components/tools/ToolCard";
import { formatUSD } from "@/lib/pricing";
import { useCart } from "@/context/CartContext";
import { useToolModal } from "@/context/ToolModalContext";
import {
  Sparkles,
  SlidersHorizontal,
  PackagePlus,
  ArrowRight,
  Star,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Check,
  Truck,
  RotateCcw,
  Tag,
  LayoutGrid,
  Armchair,
  CookingPot,
  Dumbbell,
  Smartphone,
  Wrench,
  PawPrint,
  Gift,
} from "lucide-react";

export default function HomePage() {
  const { addToCart, setIsCartOpen } = useCart();
  const { openToolModal } = useToolModal();
  const [heroAdded, setHeroAdded] = useState(false);

  // Top flagship product: Cordless Electric Spin Scrubber ($29.99)
  const heroFeaturedProduct = PRODUCTS[0];

  const handleHeroQuickAdd = () => {
    addToCart(heroFeaturedProduct, 1);
    setHeroAdded(true);
    setTimeout(() => setHeroAdded(false), 2000);
  };

  const trendingProducts = PRODUCTS.filter((p) => p.isTrending).slice(0, 4);
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  // Category quick pills as shown in reference design
  const quickCategories = [
    { name: "Home & Living", icon: Armchair, href: "/shop?category=Home+%26+Kitchen" },
    { name: "Kitchen", icon: CookingPot, href: "/shop?category=Home+%26+Kitchen" },
    { name: "Health & Fitness", icon: Dumbbell, href: "/shop?category=Fitness+%26+Wellness" },
    { name: "Car Accessories", icon: Smartphone, href: "/shop?category=Car+%26+Auto" },
    { name: "Tools & DIY", icon: Wrench, href: "/shop?category=Home+%26+Kitchen" },
    { name: "Pet Supplies", icon: PawPrint, href: "/shop?category=Home+%26+Kitchen" },
    { name: "Gift Ideas", icon: Gift, href: "/shop?category=Lifestyle+%26+Travel" },
  ];

  const testimonials = [
    {
      quote:
        "The Cordless Electric Spin Scrubber cut my bathroom deep-cleaning time in half. The adjustable extension handle reached every high tile effortlessly.",
      author: "Jessica M.",
      role: "Verified Buyer, Tampa, FL",
      item: "Cordless Electric Spin Scrubber",
      rating: 5,
    },
    {
      quote:
        "The LED Car Sun Visor Mirror Light is rechargeable and fits securely onto my visor. The 3 dimmable color modes are perfect for daily touch-ups on the go.",
      author: "David L.",
      role: "Verified Buyer, Austin, TX",
      item: "LED Car Sun Visor Mirror Light",
      rating: 5,
    },
    {
      quote:
        "Used the vacuum compression bags with the rechargeable pump for an international trip. Condensed three bulky jackets down into a tiny carry-on cube.",
      author: "Amanda S.",
      role: "Verified Buyer, Denver, CO",
      item: "Vacuum Compression Bag Set",
      rating: 5,
    },
  ];

  return (
    <div className="bg-[#FDF8F1] min-h-screen">
      {/* 1. HERO SECTION (With sunlit interior & leaf shadows background) */}
      <section
        className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-16 border-b border-[#E7DED3] bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/krendora/header-bg.png')",
          backgroundPosition: "center 40%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Soft atmospheric overlay for clear typography while showing warm sunlight and shadows */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8F1]/85 via-[#FDF8F1]/70 to-[#FDF8F1]/40 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Headline, CTAs & Trust Badges */}
            <div className="lg:col-span-6 space-y-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4EC] border border-[#E7DED3] text-[11px] font-semibold uppercase tracking-wider text-[#1E1E1E]">
                <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                <span>The Modern Department Store • Miami, FL</span>
              </div>

              {/* Large Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-normal text-[#1E1E1E] leading-[1.1] tracking-tight">
                One Good Item <br />
                <span className="italic font-serif text-[#F97316]">at a Time.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-[#6B5E4E] leading-relaxed max-w-xl font-sans">
                We curate well-priced, genuinely useful products across kitchen, home, car, and tools.
                Every piece is chosen for one reason: it works. Free US shipping on all orders over $35 with 30-day hassle-free returns.
              </p>

              {/* CTAs matching screenshot */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
                <Link
                  href="/shop"
                  className="py-3.5 px-7 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold tracking-wide uppercase transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Shop All Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => openToolModal("ai-assistant")}
                  className="py-3.5 px-6 rounded-full bg-white hover:bg-[#FAF4EC] text-[#1E1E1E] text-xs font-semibold tracking-wide uppercase border border-[#E7DED3] transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <LayoutGrid className="w-4 h-4 text-[#F97316]" />
                  <span>Explore Shopping Tools</span>
                </button>
              </div>

              {/* Trust Badges matching screenshot */}
              <div className="pt-6 border-t border-[#E7DED3] flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-[#1E1E1E]">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#F97316]" />
                  <span className="font-medium">Free US Shipping Over $35</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#F97316]" />
                  <span className="font-medium">30-Day Hassle-Free Returns</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4 text-[#F97316]" />
                  <span className="font-medium">Save Up to 10% in Bundles</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Showcase Image with Floating Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 sm:aspect-5/4 w-full rounded-3xl overflow-hidden shadow-xl border border-[#E7DED3] bg-white group">
                <Image
                  src={heroFeaturedProduct.image}
                  alt={heroFeaturedProduct.name}
                  fill
                  priority
                  className="object-contain p-6 sm:p-8 group-hover:scale-102 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Floating Product Card (Exact match to screenshot) */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-20">
                  <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#E7DED3] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-[#F97316] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> FEATURED PICK
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-[#1E1E1E] font-bold">
                        <Star className="w-3.5 h-3.5 fill-[#F97316] text-[#F97316]" />
                        <span>4.8</span>
                        <span className="text-[#8C7A68] font-normal">(124)</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#1E1E1E] line-clamp-1">
                        Cordless Electric Spin Scrubber – ...
                      </h4>
                      <p className="text-[11px] text-[#6B5E4E] line-clamp-1">
                        Rechargeable · 4 heads · Multi-surface
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E7DED3]/60">
                      <span className="text-base font-bold text-[#1E1E1E]">
                        $29.99
                      </span>
                      <button
                        onClick={handleHeroQuickAdd}
                        className={`text-xs font-semibold py-2 px-4 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs ${
                          heroAdded
                            ? "bg-[#218653] text-white"
                            : "bg-[#18181B] hover:bg-[#F97316] text-white"
                        }`}
                      >
                        {heroAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Quick Pills Row (Exact match to screenshot bottom bar) */}
          <div className="mt-12 pt-8 border-t border-[#E7DED3]">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {quickCategories.map((c) => (
                <Link
                  key={c.name}
                  href={c.href}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white border border-[#E7DED3] hover:border-[#D9C3AA] hover:shadow-md transition-all whitespace-nowrap shrink-0 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#FAF4EC] flex items-center justify-center text-[#F97316] shrink-0 group-hover:bg-[#F97316] group-hover:text-white transition-colors">
                    <c.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-[#1E1E1E] group-hover:text-[#F97316] transition-colors">
                    {c.name}
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#8C7A68] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE SHOPPING TOOLS SECTION */}
      <section id="tools-section" className="py-20 border-b border-[#E7DED3] bg-[#FAF6F0]/60">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F97316]">
              THREE USEFUL SHOPPING TOOLS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1E1E]">
              Smarter Ways to Find Exactly What You Need
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E4E] leading-relaxed">
              Designed to improve product discovery across Krendora&apos;s department catalogue.
              Try conversational assistance, real-time budget filtering, or custom bundle savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ToolCard
              title="AI Shopping Assistant"
              tagline="Conversational Concierge"
              description="Ask in plain language by budget, category, or gift occasion. Surfaces real Krendora items with direct cart actions."
              href="/tools/ai-assistant"
              toolKey="ai-assistant"
              icon={Sparkles}
              badge="Interactive"
              previewSnippet={
                <div className="space-y-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-[#E7DED3] text-[#1E1E1E]">
                    &ldquo;Find car accessories under $25&rdquo;
                  </div>
                  <div className="bg-[#EADBCB]/40 p-2.5 rounded-xl text-[#6B5E4E] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#218653]" />
                    <span>Returned Phone Mount ($24.99) & Mirror Light ($24.99)</span>
                  </div>
                </div>
              }
            />

            <ToolCard
              title="Smart Product Finder"
              tagline="Real-Time Catalogue Filters"
              description="Instantly adjust budget sliders, departments, minimum ratings, and availability across all 21 products without page reloads."
              href="/tools/product-finder"
              toolKey="product-finder"
              icon={SlidersHorizontal}
              badge="Live Filters"
              previewSnippet={
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between font-semibold text-[#1E1E1E]">
                    <span>Budget Ceiling:</span>
                    <span className="text-[#F97316]">≤ $25.00</span>
                  </div>
                  <div className="w-full bg-[#E7DED3] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#F97316] w-3/5 h-full rounded-full" />
                  </div>
                  <div className="flex gap-1.5 text-[10px]">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#E7DED3]">4.8+ Stars</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#E7DED3]">In Stock</span>
                  </div>
                </div>
              }
            />

            <ToolCard
              title="Build Your Own Bundle"
              tagline="Tiered Multi-Buy Studio"
              description="Select multiple complementary items from our catalogue to unlock automatic 5% and 10% multi-buy discounts."
              href="/tools/bundle-builder"
              toolKey="bundle-builder"
              icon={PackagePlus}
              badge="Save 10%"
              previewSnippet={
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[#218653] font-semibold bg-[#218653]/10 p-2 rounded-xl">
                    <span>3 Items Selected</span>
                    <span>10% OFF Applied</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#6B5E4E]">
                    <span>Subtotal: $72.97</span>
                    <span className="font-bold text-[#1E1E1E]">Bundle Total: $65.67</span>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* 3. TRENDING PRODUCTS */}
      <section className="py-20 border-b border-[#E7DED3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 rounded-md bg-[#1E1E1E] text-white">
                  <TrendingUp className="w-3 h-3" />
                </span>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8C7A68]">
                  CUSTOMER FAVORITES
                </span>
              </div>
              <h2 className="font-serif text-3xl font-medium text-[#1E1E1E]">
                Trending Products
              </h2>
            </div>
            <Link
              href="/shop?filter=trending"
              className="text-xs font-semibold text-[#F97316] hover:underline flex items-center gap-1"
            >
              See all trending →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROMOTIONAL BUNDLE BANNER */}
      <section className="py-16 border-b border-[#E7DED3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-r from-[#1E1E1E] to-[#2D2A26] rounded-3xl p-8 sm:p-12 text-[#FDF8F1] relative overflow-hidden shadow-2xl border border-[#444]">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#F97316] text-white inline-block">
                Multi-Buy Special
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
                Build Your Custom Bundle & Save 10%
              </h2>
              <p className="text-xs sm:text-sm text-[#D9C3AA] leading-relaxed max-w-xl">
                Combine the Cordless Electric Spin Scrubber with our Vacuum Compression Bags or Car Visor Mirror Light.
                Our bundle builder automatically calculates your tiered multi-buy discount.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/tools/bundle-builder"
                  className="py-3.5 px-6 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <PackagePlus className="w-4 h-4" />
                  <span>Launch Bundle Builder</span>
                </Link>
                <Link
                  href="/shop"
                  className="py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider border border-white/20 transition-colors"
                >
                  Browse Full Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BESTSELLERS */}
      <section className="py-20 border-b border-[#E7DED3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8C7A68]">
                DEPARTMENT BESTSELLERS
              </span>
              <h2 className="font-serif text-3xl font-medium text-[#1E1E1E] mt-1">
                Top Rated Everyday Essentials
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-[#F97316] hover:underline"
            >
              Shop All Bestsellers →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER TESTIMONIALS */}
      <section className="py-20 bg-[#FAF6F0]/60">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8C7A68]">
              VERIFIED REVIEWS
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#1E1E1E]">
              What Customers Are Saying
            </h2>
            <p className="text-xs text-[#6B5E4E]">
              Real feedback from shoppers across the United States.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-[#E7DED3] shadow-xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#F97316]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F97316]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#1E1E1E] leading-relaxed italic font-serif">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7DED3] text-xs">
                  <p className="font-semibold text-[#1E1E1E]">{t.author}</p>
                  <p className="text-[11px] text-[#6B5E4E]">{t.role}</p>
                  <span className="inline-block mt-2 text-[10px] text-[#F97316] font-medium bg-[#F97316]/10 px-2 py-0.5 rounded-full">
                    Purchased: {t.item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
