"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatUSD } from "@/lib/pricing";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
    clearCart,
  } = useCart();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 35;
  const freeShippingUnlocked = subtotal >= freeShippingThreshold;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[#1E1E1E]/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-[#FDF8F1] shadow-2xl flex flex-col border-l border-[#E7DED3]">
            {/* Header */}
            <div className="p-6 border-b border-[#E7DED3] flex items-center justify-between bg-white/70">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#F97316]" />
                <h2 className="text-lg font-serif font-medium tracking-tight text-[#1E1E1E]">
                  Your Shopping Bag ({totalItems})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#6B5E4E] hover:text-[#1E1E1E] rounded-full hover:bg-[#EADBCB]/40 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter: $35 Threshold */}
            <div className="bg-[#EADBCB]/30 px-6 py-3.5 border-b border-[#E7DED3]">
              <div className="flex justify-between text-xs text-[#1E1E1E] mb-2 font-medium">
                {freeShippingUnlocked ? (
                  <span className="text-[#218653] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> You have unlocked FREE US Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#F97316]">{formatUSD(freeShippingRemaining)}</strong> more for Free Shipping
                  </span>
                )}
                <span className="text-[#6B5E4E]">{shippingProgress}%</span>
              </div>
              <div className="w-full bg-[#E7DED3] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#F97316] h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EADBCB]/50 flex items-center justify-center text-[#6B5E4E]">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#1E1E1E] font-medium">Your bag is empty</h3>
                    <p className="text-sm text-[#6B5E4E] mt-1 max-w-xs">
                      Explore our department collection of practical home, auto, and lifestyle items.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E1E1E] text-[#FDF8F1] text-sm font-medium hover:bg-[#F97316] transition-colors"
                  >
                    Start Shopping <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3.5 bg-white rounded-xl border border-[#E7DED3] shadow-xs relative group"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#EADBCB]/30 shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/product/${item.product.id}`}
                            onClick={() => setIsCartOpen(false)}
                            className="text-xs font-semibold text-[#1E1E1E] hover:text-[#F97316] line-clamp-2 transition-colors leading-snug"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#6B5E4E]/60 hover:text-red-500 p-0.5 transition-colors"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-[#6B5E4E] mt-0.5 uppercase font-medium">{item.product.category}</p>
                        {item.isBundlePart && (
                          <span className="inline-block text-[9px] font-semibold text-[#F97316] bg-[#F97316]/10 px-2 py-0.5 rounded-full mt-1">
                            Bundle Item
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#E7DED3] rounded-lg bg-[#FDF8F1]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-[#1E1E1E] hover:bg-[#EADBCB]/50 rounded-l-md transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#1E1E1E]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-[#1E1E1E] hover:bg-[#EADBCB]/50 rounded-r-md transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-[#1E1E1E]">
                          {formatUSD(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#E7DED3] bg-white space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#6B5E4E]">
                    <span>Subtotal</span>
                    <span className="text-[#1E1E1E] font-medium">{formatUSD(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#6B5E4E]">
                    <span>US Shipping</span>
                    <span className="text-[#1E1E1E] font-medium">
                      {freeShippingUnlocked ? (
                        <span className="text-[#218653] font-semibold">FREE</span>
                      ) : (
                        formatUSD(4.99)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-[#1E1E1E] pt-2 border-t border-[#E7DED3]">
                    <span>Estimated Total</span>
                    <span className="text-lg text-[#F97316]">
                      {formatUSD(subtotal + (freeShippingUnlocked ? 0 : 4.99))}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full text-center py-3 px-4 rounded-xl border border-[#1E1E1E] text-xs font-semibold text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-[#FDF8F1] transition-colors"
                  >
                    View Bag Details
                  </Link>
                  <button
                    onClick={() => setCheckoutModalOpen(true)}
                    className="w-full py-3 px-4 rounded-xl bg-[#F97316] text-xs font-semibold text-white hover:bg-[#EA580C] shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    Checkout <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#6B5E4E] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#218653]" />
                  <span>30-Day Money-Back Guarantee · Fast US Dispatch</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Demo Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#1E1E1E]/75 backdrop-blur-sm"
            onClick={() => setCheckoutModalOpen(false)}
          />
          <div className="relative bg-[#FDF8F1] rounded-2xl max-w-md w-full p-8 shadow-2xl border border-[#D9C3AA] text-center z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#218653]/15 text-[#218653] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1E1E1E]">Order Checkout Simulation</h3>
            <p className="text-xs text-[#6B5E4E] mt-2 leading-relaxed">
              Your cart items were processed with the actual Krendora catalogue values.
            </p>
            <div className="my-5 p-4 bg-white rounded-xl border border-[#E7DED3] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#6B5E4E]">Items Count:</span>
                <span className="font-semibold text-[#1E1E1E]">{totalItems} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B5E4E]">Subtotal:</span>
                <span className="font-semibold text-[#1E1E1E]">{formatUSD(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B5E4E]">Shipping:</span>
                <span className="font-semibold text-[#1E1E1E]">{freeShippingUnlocked ? "FREE" : "$4.99"}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#E7DED3]">
                <span className="font-semibold text-[#1E1E1E]">Total:</span>
                <span className="font-bold text-[#F97316] text-sm">
                  {formatUSD(subtotal + (freeShippingUnlocked ? 0 : 4.99))}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  clearCart();
                  setCheckoutModalOpen(false);
                  setIsCartOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#1E1E1E] text-white font-medium text-xs hover:bg-[#F97316] transition-colors"
              >
                Complete Simulation & Clear Bag
              </button>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="w-full py-2 text-xs text-[#6B5E4E] hover:text-[#1E1E1E]"
              >
                Back to Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
