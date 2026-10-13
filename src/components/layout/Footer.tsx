"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, SlidersHorizontal, PackagePlus, ArrowRight, CheckCircle2, ShieldCheck, Mail, MapPin } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1E1E1E] text-[#FDF8F1] pt-16 pb-12 border-t border-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#2E2E2E]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.16em] text-[#FDF8F1] block">
              Krendora
            </span>
            <p className="text-xs text-[#D9C3AA] max-w-sm leading-relaxed">
              The modern department store. Curated, well-priced, practical products for the way people actually shop today — online, looking for one good item at a time.
            </p>
            <div className="space-y-2 pt-2 text-xs text-[#D9C3AA]/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                <span>1480 NW North River Dr, Miami, FL 33125</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                <a href="mailto:support@krendora.com" className="hover:text-white transition-colors">
                  support@krendora.com
                </a>
                <span>·</span>
                <a href="mailto:hello@krendora.com" className="hover:text-white transition-colors">
                  hello@krendora.com
                </a>
              </div>
            </div>
          </div>

          {/* 3 Shopping Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#F97316]">
              Shopping Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D9C3AA]">
              <li>
                <Link
                  href="/tools/ai-assistant"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                  AI Shopping Assistant
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/product-finder"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#F97316]" />
                  Smart Product Finder
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/bundle-builder"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <PackagePlus className="w-3.5 h-3.5 text-[#F97316]" />
                  Build Your Own Bundle
                </Link>
              </li>
            </ul>
          </div>

          {/* Terms & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#FDF8F1]">
              Terms & Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D9C3AA]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping-policy" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/refund-policy" className="hover:text-white transition-colors">
                  Refund & Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Join Our Email List */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#FDF8F1]">
              Join our email list
            </h4>
            <p className="text-xs text-[#D9C3AA] leading-relaxed">
              Get exclusive deals and early access — plus <strong>5% off your first order</strong> with code <span className="text-[#F97316] font-mono font-semibold">WELCOME5</span>.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#2A2A2A] rounded-xl text-xs text-[#218653] flex items-center gap-2 border border-[#218653]/30">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You&apos;re subscribed! Use code WELCOME5 at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A2A2A] border border-[#444] text-xs text-white placeholder-[#888] focus:outline-none focus:border-[#F97316]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-lg transition-colors flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7A68] gap-4">
          <p>© 2026 Krendora. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap text-xs text-[#D9C3AA]/70">
            <span>Free US Shipping over $35</span>
            <span>·</span>
            <span>30-Day Hassle-Free Returns</span>
            <span>·</span>
            <span>Fast Dispatch</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
