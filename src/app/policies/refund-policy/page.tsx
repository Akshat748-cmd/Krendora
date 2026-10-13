"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Check, Mail } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#FDF8F1] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="border-b border-[#E7DED3] pb-8 text-center space-y-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7A68]">
            Customer Satisfaction
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1E1E]">
            Refund & Returns Policy
          </h1>
          <p className="text-xs text-[#6B5E4E]">30-Day Hassle-Free Returns</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E7DED3] p-8 sm:p-12 shadow-xs space-y-8 text-sm text-[#1E1E1E] leading-relaxed">
          <div className="space-y-4">
            <p className="text-base font-serif text-[#1E1E1E]">
              We accept returns within <strong>30 days of delivery for any reason</strong>. To start a return, email{" "}
              <a href="mailto:support@krendora.com" className="text-[#F97316] font-bold underline">
                support@krendora.com
              </a>{" "}
              with your order number and a brief description of the issue.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E7DED3] space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#1E1E1E]">Orders Under $50</h2>
            <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E7DED3] space-y-2 text-[#6B5E4E]">
              <p>
                We typically refund you <strong>without requiring the item back</strong> — you can keep it or pass it along to someone who could use it.
              </p>
              <p className="text-xs text-[#8C7A68]">
                This saves you time and shipping hassle, and lets us focus on getting future orders right.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E7DED3] space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#1E1E1E]">Orders $50 and Over</h2>
            <p className="text-[#6B5E4E]">
              We provide return instructions via email. Customers cover return shipping for buyer&apos;s-remorse returns (changed mind, didn&apos;t fit your space, etc.); we cover return shipping for defective items, wrong items, or items that arrived damaged.
            </p>
            <p className="text-[#6B5E4E]">
              Upon receiving the item back in resaleable condition — meaning unused, with original packaging where applicable — we refund the original payment method within <strong>5 business days</strong>. Original outbound shipping fees are non-refundable.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E7DED3] space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#1E1E1E]">Damaged or Defective Items</h2>
            <p className="text-[#6B5E4E]">
              Email us within 7 days of delivery with a photo of the issue and we&apos;ll replace it or refund you at no cost — no return required. You keep the damaged item or dispose of it as you see fit.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E7DED3] space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#1E1E1E]">When Refunds Appear</h2>
            <p className="text-[#6B5E4E]">
              Refunds typically show on your card within 5 business days after we process them. Some banks take an additional 3–5 business days to display the credit. If you don&apos;t see your refund after 10 business days total, please contact your card issuer first and copy us at{" "}
              <a href="mailto:support@krendora.com" className="text-[#F97316] underline font-medium">
                support@krendora.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
