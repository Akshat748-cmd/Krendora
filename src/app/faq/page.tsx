"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Mail, ArrowRight } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "Where do you ship?",
      a: "All 50 US states and DC. We do not ship internationally yet.",
    },
    {
      q: "How long does shipping take?",
      a: "Most orders arrive in 7–14 business days. Free shipping on orders over $35.",
    },
    {
      q: "Can I track my order?",
      a: "Yes — you'll get a tracking link by email once your order ships, usually within 1–2 business days of placing it.",
    },
    {
      q: "What's your return policy?",
      a: "30 days, any reason. Email support@krendora.com to start a return.",
    },
    {
      q: "Is there a phone number I can call?",
      a: "We do support by email only at this stage — it lets us reply faster and keep detailed records. Email support@krendora.com and we'll respond within one business day.",
    },
    {
      q: "Are your products safe / authentic?",
      a: "We work with established suppliers and inspect new products before listing. If anything you receive doesn't meet expectations, contact support and we'll make it right.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#FDF8F1] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-[#E7DED3] pb-8 text-center space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7A68]">
            Frequently Asked Questions
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1E1E]">
            Help & FAQ
          </h1>
          <p className="text-sm text-[#6B5E4E] max-w-md mx-auto leading-relaxed">
            Everything you need to know about Krendora shipping, tracking, and our 30-day return policy.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E7DED3] overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-medium text-[#1E1E1E] hover:text-[#F97316] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C7A68] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[#F97316]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#6B5E4E] leading-relaxed border-t border-[#FAF6F0] font-sans">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="p-8 bg-white rounded-3xl border border-[#D9C3AA] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">Still have a question?</h3>
            <p className="text-xs text-[#6B5E4E]">Our support team replies within one US business day.</p>
          </div>
          <a
            href="mailto:support@krendora.com"
            className="py-3 px-6 rounded-full bg-[#1E1E1E] hover:bg-[#F97316] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
