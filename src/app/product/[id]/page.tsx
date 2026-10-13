"use client";

import React, { useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { Product, ProductVariant } from "@/types/product";
import { formatUSD } from "@/lib/pricing";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/products/ProductCard";
import {
  Star,
  ShoppingBag,
  Heart,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  PackagePlus,
  ArrowLeft,
  Share2,
  ExternalLink,
} from "lucide-react";

function ProductDetailContent() {
  const params = useParams();
  const productId = params?.id as string;

  const product = PRODUCTS.find((p) => p.id === productId || p.handle === productId);

  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | number>(
    product?.variants?.[0]?.id || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-medium text-[#1E1E1E]">Product Not Found</h2>
        <p className="text-sm text-[#6B5E4E] mt-2 mb-6">
          The requested product could not be located in Krendora&apos;s live inventory.
        </p>
        <Link
          href="/shop"
          className="px-6 py-2.5 rounded-full bg-[#1E1E1E] text-white text-xs font-semibold"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const currentImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImage = currentImages[selectedImageIndex] || product.image;

  const activeVariant = product.variants?.find((v) => String(v.id) === String(selectedVariantId)) || product.variants?.[0];
  const activePrice = activeVariant?.price || product.price;
  const activeCompareAt = activeVariant?.compareAtPrice || product.compareAtPrice;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
      setIsCartOpen(true);
    }, 400);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-[#FDF8F1] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Breadcrumb Back */}
        <div className="flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#6B5E4E] hover:text-[#1E1E1E] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
          </Link>
          {product.originalUrl && (
            <a
              href={product.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#8C7A68] hover:text-[#F97316] transition-colors"
            >
              <span>View on original krendora.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Product Imagery with Gallery Thumbnails (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-[#E7DED3] shadow-md group">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-contain p-4 group-hover:scale-102 transition-transform duration-500 ease-out"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isTrending && (
                  <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-[#1E1E1E] text-white rounded-full">
                    Trending Item
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-[#6B5E4E] text-[#FDF8F1] rounded-full">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all z-10 ${
                  isFavorited
                    ? "bg-[#F97316] text-white shadow-lg"
                    : "bg-white/80 text-[#1E1E1E] hover:bg-white shadow-sm"
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-white" : ""}`} />
              </button>
            </div>

            {/* Gallery Thumbnails */}
            {currentImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {currentImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-white border transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? "border-[#F97316] ring-2 ring-[#F97316]/30"
                        : "border-[#E7DED3] hover:border-[#D9C3AA]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Buying Flow (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#8C7A68]">
                  {product.category}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs text-[#6B5E4E] hover:text-[#1E1E1E] py-1 px-2 rounded-lg border border-[#E7DED3] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? "Link Copied!" : "Share"}</span>
                </button>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#1E1E1E] mt-2 leading-tight">
                {product.name}
              </h1>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mt-3 text-xs text-[#6B5E4E]">
                <div className="flex items-center text-[#F97316]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F97316]" />
                  ))}
                </div>
                <span className="font-semibold text-[#1E1E1E]">{product.rating}</span>
                <span>•</span>
                <span>{product.reviewCount} verified customer reviews</span>
              </div>
            </div>

            {/* Price Block */}
            <div className="p-4 bg-white rounded-2xl border border-[#E7DED3] flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
                  {formatUSD(activePrice)}
                </span>
                {activeCompareAt && activeCompareAt > activePrice && (
                  <span className="text-sm text-[#8C7A68] line-through ml-3">
                    {formatUSD(activeCompareAt)}
                  </span>
                )}
                <p className="text-[11px] text-[#6B5E4E] mt-0.5">
                  Free US shipping on orders over $35 · 30-day hassle-free returns.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {product.availability}
              </span>
            </div>

            {/* Variant Selector (if variants exist) */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1E1E1E]">
                  Select Option:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`text-xs px-3.5 py-2 rounded-xl font-medium border transition-colors ${
                        String(selectedVariantId) === String(variant.id)
                          ? "bg-[#1E1E1E] text-white border-[#1E1E1E]"
                          : "bg-white text-[#1E1E1E] border-[#E7DED3] hover:bg-[#EADBCB]/40"
                      }`}
                    >
                      {variant.title} — {formatUSD(variant.price)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2 text-xs sm:text-sm text-[#6B5E4E] leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Feature List */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E1E1E]">
                  Key Highlights & Specs
                </h4>
                <ul className="space-y-2 text-xs text-[#6B5E4E]">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#F97316] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Add to Cart Controls */}
            <div className="pt-4 border-t border-[#E7DED3] space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#6B5E4E]">
                  Quantity
                </label>
                <div className="flex items-center border border-[#D9C3AA] rounded-xl bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2 text-sm text-[#1E1E1E] hover:bg-[#EADBCB]/50 rounded-l-xl transition-colors font-semibold"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-[#1E1E1E]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-2 text-sm text-[#1E1E1E] hover:bg-[#EADBCB]/50 rounded-r-xl transition-colors font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 py-4 px-6 rounded-2xl bg-[#1E1E1E] hover:bg-[#F97316] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isAdding ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                    </>
                  )}
                </button>

                <Link
                  href="/tools/bundle-builder"
                  className="py-4 px-5 rounded-2xl border border-[#D9C3AA] bg-white hover:bg-[#EADBCB]/40 text-[#1E1E1E] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <PackagePlus className="w-4 h-4 text-[#F97316]" />
                  <span>Bundle & Save 10%</span>
                </Link>
              </div>
            </div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E7DED3] text-xs text-[#6B5E4E]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#F97316]" />
                <span>Free US Shipping over $35</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#218653]" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#6B5E4E]" />
                <span>No Return Needed for &lt;$50</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span>1–2 Day US Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-[#E7DED3] space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7A68]">
                  More from {product.category}
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1E1E1E] mt-1">
                  You Might Also Like
                </h3>
              </div>
              <Link
                href={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-semibold text-[#F97316] hover:underline"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDF8F1] flex items-center justify-center p-12">
          <div className="w-8 h-8 rounded-full border-2 border-[#F97316] border-t-transparent animate-spin" />
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
