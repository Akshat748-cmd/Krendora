"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatUSD } from "@/lib/pricing";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, Star, ShoppingBag, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => {
      setIsAdding(false);
    }, 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-[#E7DED3] overflow-hidden hover:border-[#D9C3AA] hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#EADBCB]/25">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isTrending && (
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase bg-[#1E1E1E] text-white rounded-full backdrop-blur-md">
              Trending
            </span>
          )}
          {product.isBestseller && !product.isTrending && (
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase bg-[#6B5E4E] text-[#FDF8F1] rounded-full">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase bg-[#F97316] text-white rounded-full">
              New
            </span>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase bg-emerald-800 text-emerald-100 rounded-full">
              Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            isFavorited
              ? "bg-[#F97316] text-white shadow-md scale-105"
              : "bg-white/80 text-[#6B5E4E] hover:text-[#1E1E1E] hover:bg-white backdrop-blur-sm"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`} />
        </button>

        {/* Quick Add overlay button on desktop */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block z-10">
          <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
              isAdding
                ? "bg-[#218653] text-white"
                : "bg-[#1E1E1E] hover:bg-[#F97316] text-[#FDF8F1]"
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added to Bag
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#6B5E4E] mb-1">
            <span className="tracking-wide uppercase text-[10px] font-semibold text-[#8C7A68]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#F97316]">
              <Star className="w-3.5 h-3.5 fill-[#F97316]" />
              <span className="font-semibold text-xs text-[#1E1E1E]">{product.rating}</span>
              <span className="text-[10px] text-[#6B5E4E]">({product.reviewCount})</span>
            </div>
          </div>

          <Link
            href={`/product/${product.id}`}
            className="font-serif text-sm sm:text-base font-medium text-[#1E1E1E] hover:text-[#F97316] line-clamp-2 transition-colors mt-0.5 leading-snug"
          >
            {product.name}
          </Link>

          {!compact && (
            <p className="text-xs text-[#6B5E4E] line-clamp-2 mt-1.5 leading-relaxed font-sans">
              {product.shortDescription || product.description}
            </p>
          )}
        </div>

        {/* Price & Mobile Add Button */}
        <div className="pt-3 mt-3 border-t border-[#E7DED3]/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#1E1E1E]">
              {formatUSD(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-[#8C7A68] line-through">
                {formatUSD(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`sm:hidden p-2 rounded-lg transition-colors ${
              isAdding
                ? "bg-[#218653] text-white"
                : "bg-[#1E1E1E] text-white hover:bg-[#F97316]"
            }`}
            aria-label="Add to bag"
          >
            {isAdding ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
