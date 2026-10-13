"use client";

import React from "react";

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#FDF8F1] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="border-b border-[#E7DED3] pb-8 text-center space-y-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7A68]">
            Legal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1E1E]">
            Terms of Service
          </h1>
          <p className="text-xs text-[#6B5E4E]">Official terms for krendora.com</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E7DED3] p-8 sm:p-12 shadow-xs space-y-8 text-sm text-[#6B5E4E] leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">1. Acceptance of Terms</h2>
            <p>
              By accessing or using krendora.com (the &ldquo;Site&rdquo;), you agree to these Terms of Service. If you do not agree, do not use the Site.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#E7DED3]">
            <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">2. Eligibility</h2>
            <p>
              You must be at least 18 years old to make a purchase. By placing an order, you represent that you meet this requirement.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#E7DED3]">
            <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">3. Products and Pricing</h2>
            <p>
              We make every effort to display products and prices accurately. Prices are in USD and exclude applicable taxes and shipping. We reserve the right to correct pricing errors and to cancel orders affected by such errors prior to shipment.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#E7DED3]">
            <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">4. Orders and Payment</h2>
            <p>
              Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel any order for any reason, including stock availability, pricing errors, or suspected fraud. Payment is processed at the time of purchase.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#E7DED3]">
            <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">5. Shipping and Delivery</h2>
            <p>
              Shipping policies, timeframes, and rates are outlined in our Shipping Policy. Risk of loss passes to you upon delivery by the carrier.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#E7DED3]">
            <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">6. Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to us at{" "}
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
