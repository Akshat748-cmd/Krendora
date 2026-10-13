"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, X, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function CartToast() {
  const { toast, dismissToast, setIsCartOpen } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#1E1E1E] text-[#FDF8F1] px-5 py-4 rounded-xl shadow-2xl flex items-center gap-4 border border-[#D9C3AA]/30 max-w-sm">
        <div className="w-10 h-10 rounded-full bg-[#F97316]/20 flex items-center justify-center shrink-0 text-[#F97316]">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#FDF8F1]">{toast.message}</p>
          {toast.productName && (
            <p className="text-xs text-[#D9C3AA] truncate mt-0.5">{toast.productName}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              dismissToast();
              setIsCartOpen(true);
            }}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-md bg-[#F97316] text-white hover:bg-[#EA580C] transition-colors"
          >
            View Bag
          </button>
          <button
            onClick={dismissToast}
            className="text-[#D9C3AA] hover:text-white p-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
