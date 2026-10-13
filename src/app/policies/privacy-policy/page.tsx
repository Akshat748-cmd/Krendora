"use client";

import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FDF8F1] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="border-b border-[#E7DED3] pb-8 text-center space-y-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7A68]">
            Legal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1E1E]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#6B5E4E]">How Krendora collects and protects your information</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E7DED3] p-8 sm:p-12 shadow-xs space-y-8 text-sm text-[#6B5E4E] leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">1. Information We Collect</h2>
            <p>
              When you visit krendora.com or place an order, we collect information you provide directly, including your name, shipping address, email address, phone number, and payment information. We also automatically collect device details, browser information, and cookies for optimal checkout performance.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#E7DED3]">
            <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">2. How We Use Your Information</h2>
            <p>
              We use your information to process and fulfill your orders, send order confirmations and tracking updates, respond to your customer service requests, prevent fraud, and improve your shopping experience.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#E7DED3]">
            <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">3. Sharing of Personal Information</h2>
            <p>
              We only share your information with trusted third parties who help us operate our store and fulfill your orders (such as payment processors, shipping carriers, and fraud prevention services). We do not sell your personal information.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#E7DED3]">
            <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">4. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have rights regarding your personal information, including the right to access, correct, or delete data we hold about you. To exercise these rights, please contact us at{" "}
              <a href="mailto:privacy@krendora.com" className="text-[#F97316] underline font-medium">
                privacy@krendora.com
              </a>{" "}
              or{" "}
              <a href="mailto:support@krendora.com" className="text-[#F97316] underline font-medium">
                support@krendora.com
              </a>.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#E7DED3]">
            <h2 className="font-serif text-lg font-semibold text-[#1E1E1E]">5. Contact Us</h2>
            <p>
              If you have questions about our privacy practices, please contact us at:<br />
              <strong>Krendora</strong><br />
              1480 NW North River Dr, Miami, FL 33125, United States<br />
              Email: support@krendora.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
