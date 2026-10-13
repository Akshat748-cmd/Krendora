"use client";

import React from "react";
import Link from "next/link";
import { Truck, Check, Mail, Clock } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#FDF8F1] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="border-b border-[#E7DED3] pb-8 text-center space-y-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7A68]">
            Customer Care
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1E1E]">
            Shipping Policy
          </h1>
          <p className="text-xs text-[#6B5E4E]">Official delivery terms for Krendora</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E7DED3] p-8 sm:p-12 shadow-xs space-y-8 text-sm text-[#1E1E1E] leading-relaxed">
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#1E1E1E]">Shipping Destinations & Rates</h2>
            <p className="text-[#6B5E4E]">
              We ship to all <strong>50 US states and Washington, DC</strong>. We do not currently ship internationally.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E7DED3] space-y-1">
                <span className="font-semibold text-[#1E1E1E] text-base">Orders Over $35</span>
                <p className="text-[#218653] font-bold text-sm">FREE Standard Shipping</p>
                <p className="text-xs text-[#6B5E4E]">Automatically applied at checkout.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E7DED3] space-y-1">
                <span className="font-semibold text-[#1E1E1E] text-base">Orders Under $35</span>
                <p className="text-[#1E1E1E] font-bold text-sm">$4.99 Flat Rate</p>
                <p className="text-xs text-[#6B5E4E]">Covers fast insured delivery anywhere in the US.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E7DED3] space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#1E1E1E]">Dispatch & Delivery Timeline</h2>
            <ul className="space-y-2.5 text-[#6B5E4E]">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <span><strong>Dispatch:</strong> Orders ship within <strong>1–2 business days</strong> of purchase.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <span><strong>Delivery:</strong> Typically takes <strong>7–14 business days</strong> depending on your location.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <span><strong>Tracking:</strong> You&apos;ll receive a tracking number by email once your order ships.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-[#E7DED3] space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#1E1E1E]">Tracking Assistance</h2>
            <p className="text-[#6B5E4E]">
              If you don&apos;t receive tracking within 3 business days of ordering, please email{" "}
              <a href="mailto:support@krendora.com" className="text-[#F97316] font-semibold underline">
                support@krendora.com
              </a>{" "}
              and we&apos;ll resolve it immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
