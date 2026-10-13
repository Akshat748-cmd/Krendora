"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, Clock, Mail, MapPin, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#FDF8F1] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-[#E7DED3] pb-8 text-center space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7A68]">
            About Us
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1E1E]">
            The Modern Department Store
          </h1>
          <p className="text-sm text-[#6B5E4E] max-w-xl mx-auto leading-relaxed">
            Founded in 2026 in Miami, Florida for the way people actually shop today.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="bg-white rounded-3xl border border-[#E7DED3] p-8 sm:p-12 shadow-xs space-y-8 text-sm text-[#1E1E1E] leading-relaxed">
          <div className="space-y-4">
            <p className="text-base font-serif text-[#1E1E1E]">
              <strong>Krendora is the modern department store.</strong> Founded in 2026 in Miami, Florida for the way people actually shop today — online, often on a phone, looking for one good item at a time, not a cart full of stuff.
            </p>
            <p className="text-[#6B5E4E]">
              We curate thousands of well-priced, useful things across kitchen, home, outdoor, pet, decor, tools, and a dozen other categories. Every product is chosen for one reason: it works. We don&apos;t carry items we wouldn&apos;t buy ourselves.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E7DED3] space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">
              Behind the brand is a small US-based team focused on three things:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E7DED3] space-y-2">
                <span className="font-semibold text-[#1E1E1E] block">Selection</span>
                <p className="text-xs text-[#6B5E4E]">Broad enough to be useful, curated enough to be trustworthy.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E7DED3] space-y-2">
                <span className="font-semibold text-[#1E1E1E] block">Price</span>
                <p className="text-xs text-[#6B5E4E]">Sharp prices with free US shipping on orders over $35.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E7DED3] space-y-2">
                <span className="font-semibold text-[#1E1E1E] block">Service</span>
                <p className="text-xs text-[#6B5E4E]">Your messages get a real human reply within one business day.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E7DED3] text-[#6B5E4E]">
            <p>
              We partner with established suppliers worldwide to keep prices low and selection broad. Orders typically dispatch within 1–2 business days. Delivery to your US address takes 7–14 business days from there — we keep this transparent because surprise shipping times are the fastest way to lose your trust, and we&apos;d rather you know upfront.
            </p>
            <p>
              If something arrives that doesn&apos;t work for you, our{" "}
              <Link href="/policies/refund-policy" className="text-[#F97316] underline hover:text-[#EA580C]">
                30-day return policy
              </Link>{" "}
              keeps things simple. Most refunds under $50 don&apos;t even require sending the item back — we&apos;d rather you keep it or pass it along.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E7DED3] space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">
              Reach us anytime
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E7DED3] space-y-1">
                <span className="text-[#8C7A68] uppercase font-semibold">Order Help</span>
                <p>
                  <a href="mailto:support@krendora.com" className="font-bold text-[#F97316] text-sm hover:underline">
                    support@krendora.com
                  </a>
                </p>
                <p className="text-[#6B5E4E]">Tracking, returns, refunds, missing or damaged items.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E7DED3] space-y-1">
                <span className="text-[#8C7A68] uppercase font-semibold">General Questions</span>
                <p>
                  <a href="mailto:hello@krendora.com" className="font-bold text-[#1E1E1E] text-sm hover:underline">
                    hello@krendora.com
                  </a>
                </p>
                <p className="text-[#6B5E4E]">Pre-purchase inquiries, partnerships, and suggestions.</p>
              </div>
            </div>

            <div className="pt-4 text-xs text-[#6B5E4E] flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
              <div>
                <strong>Krendora Headquarters:</strong><br />
                1480 NW North River Dr, Miami, FL 33125, United States
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#1E1E1E] text-white text-xs font-semibold hover:bg-[#F97316] transition-colors"
          >
            <span>Explore the Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
