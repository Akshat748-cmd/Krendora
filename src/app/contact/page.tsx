"use client";

import React, { useState } from "react";
import { Mail, MapPin, Clock, CheckCircle2, Send, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", orderNumber: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FDF8F1] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-[#E7DED3] pb-8 text-center space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7A68]">
            Customer Support
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1E1E]">
            Contact Krendora
          </h1>
          <p className="text-sm text-[#6B5E4E] max-w-lg mx-auto leading-relaxed">
            The fastest way to reach us is email. We read every message and reply within one US business day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Details (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E7DED3] p-6 shadow-xs space-y-6">
              <h3 className="font-serif text-lg font-semibold text-[#1E1E1E]">
                Direct Contacts
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E7DED3] space-y-1">
                  <span className="text-[#8C7A68] uppercase font-semibold block">Order Support</span>
                  <a
                    href="mailto:support@krendora.com"
                    className="font-bold text-sm text-[#F97316] hover:underline block"
                  >
                    support@krendora.com
                  </a>
                  <p className="text-[#6B5E4E] mt-1 leading-relaxed">
                    Tracking, returns, refunds, missing or damaged items, order modifications. Please include your order number.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E7DED3] space-y-1">
                  <span className="text-[#8C7A68] uppercase font-semibold block">General Inquiries</span>
                  <a
                    href="mailto:hello@krendora.com"
                    className="font-bold text-sm text-[#1E1E1E] hover:underline block"
                  >
                    hello@krendora.com
                  </a>
                  <p className="text-[#6B5E4E] mt-1 leading-relaxed">
                    Pre-purchase questions, media inquiries, product suggestions, partnerships.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E7DED3] space-y-1">
                  <span className="text-[#8C7A68] uppercase font-semibold block">Headquarters</span>
                  <p className="font-medium text-[#1E1E1E]">Krendora</p>
                  <p className="text-[#6B5E4E]">
                    1480 NW North River Dr<br />
                    Miami, FL 33125<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-[#218653]">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Response guarantee: Within 1 US business day</span>
              </div>
            </div>
          </div>

          {/* Right Contact Form (7 cols) */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-3xl border border-[#E7DED3] p-8 shadow-xs">
              <h3 className="font-serif text-xl font-semibold text-[#1E1E1E] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#6B5E4E] mb-6">
                Fill in the details below and our Miami concierge team will get back to you directly.
              </p>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#218653]/15 text-[#218653] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-[#1E1E1E]">Message Received</h4>
                  <p className="text-xs text-[#6B5E4E] max-w-sm mx-auto leading-relaxed">
                    Thank you, {form.name || "Customer"}. We have received your inquiry and our support team will reply to <strong>{form.email}</strong> within 1 business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", orderNumber: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#1E1E1E] text-white text-xs font-semibold hover:bg-[#F97316] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#D9C3AA] text-xs text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#D9C3AA] text-xs text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">
                      Order Number (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="E.g. #1024 (if inquiring about an order)"
                      value={form.orderNumber}
                      onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#D9C3AA] text-xs text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#D9C3AA] text-xs text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#1E1E1E] hover:bg-[#F97316] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
