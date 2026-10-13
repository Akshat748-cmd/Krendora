"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatUSD } from "@/lib/pricing";
import confetti from "canvas-confetti";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  CheckCircle2,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (promoCode.trim().toUpperCase() === "WELCOME5") {
      setPromoApplied(true);
      try {
        confetti({ particleCount: 40, spread: 50 });
      } catch (e) {}
    } else {
      setPromoError("Invalid code. Try code: WELCOME5 for 5% off!");
    }
  };

  const promoDiscount = promoApplied ? Number((subtotal * 0.05).toFixed(2)) : 0;
  const freeShippingThreshold = 35;
  const freeShippingUnlocked = subtotal >= freeShippingThreshold;
  const shippingCost = freeShippingUnlocked ? 0 : 4.99;
  const grandTotal = Math.max(0, Number((subtotal - promoDiscount + shippingCost).toFixed(2)));

  const handleCompleteOrder = () => {
    setOrderConfirmed(true);
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch (e) {}
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  if (items.length === 0 && !orderConfirmed) {
    return (
      <div className="bg-[#FDF8F1] min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#EADBCB]/50 flex items-center justify-center text-[#6B5E4E] mb-4">
          <ShoppingBag className="w-10 h-10 opacity-70" />
        </div>
        <h1 className="font-serif text-3xl font-medium text-[#1E1E1E]">Your Bag is Empty</h1>
        <p className="text-sm text-[#6B5E4E] max-w-sm mt-2 mb-8 leading-relaxed">
          Explore Krendora&apos;s department catalogue of practical home, auto, and lifestyle essentials.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/shop"
            className="px-8 py-3.5 rounded-full bg-[#1E1E1E] text-white text-xs font-semibold hover:bg-[#F97316] transition-colors"
          >
            Explore Catalogue
          </Link>
          <Link
            href="/tools/bundle-builder"
            className="px-8 py-3.5 rounded-full bg-white border border-[#D9C3AA] text-[#1E1E1E] text-xs font-semibold hover:bg-[#EADBCB]/50 transition-colors"
          >
            Build a Bundle (Save up to 10%)
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDF8F1] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-[#E7DED3] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8C7A68]">
              Checkout Simulation
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1E1E1E] mt-1">
              Shopping Bag ({totalItems} items)
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#218653] bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
            <span>Krendora Live Inventory Sync</span>
          </div>
        </div>

        {orderConfirmed ? (
          <div className="bg-white rounded-3xl border border-[#D9C3AA] p-12 text-center max-w-2xl mx-auto shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-[#218653]/15 text-[#218653] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl font-medium text-[#1E1E1E]">
              Order Successfully Simulated!
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E4E] leading-relaxed max-w-md mx-auto">
              Thank you for exploring the Krendora e-commerce experience. Your simulated order details have been processed.
            </p>
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E7DED3] text-xs text-left max-w-sm mx-auto space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#6B5E4E]">Simulated Order ID:</span>
                <span className="font-mono font-semibold">KREN-2026-9810</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B5E4E]">Total Amount:</span>
                <span className="font-semibold text-[#F97316]">{formatUSD(grandTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B5E4E]">Shipping Destination:</span>
                <span className="text-[#1E1E1E]">United States (Standard 7–14 days)</span>
              </div>
            </div>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/shop"
                className="px-6 py-3 rounded-full bg-[#1E1E1E] text-white text-xs font-semibold hover:bg-[#F97316] transition-colors"
              >
                Shop More Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Items Table */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl border border-[#E7DED3] p-5 shadow-xs flex flex-col sm:flex-row items-center gap-5 hover:border-[#D9C3AA] transition-colors"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#EADBCB]/20 shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <Link
                      href={`/product/${item.product.id}`}
                      className="font-serif text-sm font-semibold text-[#1E1E1E] hover:text-[#F97316] transition-colors leading-snug line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-[11px] text-[#6B5E4E] mt-1 uppercase font-medium">{item.product.category}</p>
                    {item.isBundlePart && (
                      <span className="inline-block text-[10px] font-semibold text-[#F97316] bg-[#F97316]/10 px-2.5 py-0.5 rounded-full mt-1.5">
                        Bundle Item
                      </span>
                    )}
                  </div>

                  {/* Quantity & Subtotal */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-[#D9C3AA] rounded-xl bg-[#FAF6F0]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-[#1E1E1E] hover:bg-[#EADBCB]/50 rounded-l-xl transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#1E1E1E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-[#1E1E1E] hover:bg-[#EADBCB]/50 rounded-r-xl transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#1E1E1E] w-20 text-right">
                      {formatUSD(item.product.price * item.quantity)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#6B5E4E] hover:text-red-500 p-2 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="bg-white rounded-3xl border border-[#D9C3AA] p-6 shadow-lg space-y-6">
                <h3 className="font-serif text-lg font-semibold text-[#1E1E1E] pb-4 border-b border-[#E7DED3]">
                  Order Summary
                </h3>

                {/* Promo Code Box */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#6B5E4E] flex items-center justify-between">
                    <span>Discount Code</span>
                    <span className="text-[10px] text-[#F97316] font-mono">Code: WELCOME5</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-[#FAF6F0] border border-[#D9C3AA] text-xs uppercase text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1E1E1E] text-white text-xs font-semibold rounded-xl hover:bg-[#F97316] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-[11px] text-[#218653] font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Code WELCOME5 applied (5% OFF)!
                    </p>
                  )}
                  {promoError && <p className="text-[11px] text-red-500">{promoError}</p>}
                </form>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4 border-t border-[#E7DED3] text-xs">
                  <div className="flex justify-between text-[#6B5E4E]">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-[#1E1E1E]">{formatUSD(subtotal)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-[#218653] font-semibold">
                      <span>Promo Discount (5%)</span>
                      <span>-{formatUSD(promoDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#6B5E4E]">
                    <span>US Shipping</span>
                    <span className="font-semibold text-[#1E1E1E]">
                      {freeShippingUnlocked ? (
                        <span className="text-[#218653]">FREE (over $35)</span>
                      ) : (
                        formatUSD(4.99)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#1E1E1E] pt-3 border-t border-[#E7DED3]">
                    <span>Estimated Total</span>
                    <span className="text-xl text-[#F97316]">{formatUSD(grandTotal)}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={handleCompleteOrder}
                  className="w-full py-4 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Simulate Order Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <p className="text-[11px] text-[#8C7A68]">
                    Free US shipping over $35 · 30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
