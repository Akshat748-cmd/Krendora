"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useToolModal, ToolType } from "@/context/ToolModalContext";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { Product } from "@/types/product";
import { formatUSD, calculateBundlePricing } from "@/lib/pricing";
import { useCart } from "@/context/CartContext";
import { filterAndSortProducts } from "@/lib/filterProducts";
import confetti from "canvas-confetti";
import {
  X,
  Sparkles,
  SlidersHorizontal,
  PackagePlus,
  Send,
  ShoppingBag,
  Bot,
  User,
  Star,
  Check,
  Plus,
  Trash2,
  ArrowRight,
  RotateCcw,
  Tag,
  CheckCircle2,
} from "lucide-react";

export function ToolModal() {
  const { isOpen, activeTool, setActiveTool, closeToolModal } = useToolModal();

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeToolModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeToolModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeToolModal}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#FDF8F1] rounded-3xl shadow-2xl border border-[#E7DED3] flex flex-col overflow-hidden z-10 transition-all scale-100">
        {/* Top Header Bar with Segmented Tabs & Close Button */}
        <div className="px-5 sm:px-8 py-4 border-b border-[#E7DED3] bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Segmented Tool Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF4EC] rounded-2xl border border-[#E7DED3] overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTool("ai-assistant")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTool === "ai-assistant"
                  ? "bg-[#1E1E1E] text-white shadow-sm"
                  : "text-[#6B5E4E] hover:text-[#1E1E1E] hover:bg-white/60"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
              <span>AI Assistant</span>
            </button>

            <button
              onClick={() => setActiveTool("product-finder")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTool === "product-finder"
                  ? "bg-[#1E1E1E] text-white shadow-sm"
                  : "text-[#6B5E4E] hover:text-[#1E1E1E] hover:bg-white/60"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Product Finder</span>
            </button>

            <button
              onClick={() => setActiveTool("bundle-builder")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTool === "bundle-builder"
                  ? "bg-[#1E1E1E] text-white shadow-sm"
                  : "text-[#6B5E4E] hover:text-[#1E1E1E] hover:bg-white/60"
              }`}
            >
              <PackagePlus className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Bundle Studio</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#F97316] text-white font-bold">
                10% OFF
              </span>
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={closeToolModal}
            className="p-2 rounded-full text-[#6B5E4E] hover:text-[#1E1E1E] hover:bg-[#FAF4EC] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Active Tool View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeTool === "ai-assistant" && <AIAssistantModalView />}
          {activeTool === "product-finder" && <ProductFinderModalView />}
          {activeTool === "bundle-builder" && <BundleBuilderModalView />}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 1. AI SHOPPING ASSISTANT MODAL VIEW
// -------------------------------------------------------------------------
interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
}

function AIAssistantModalView() {
  const { addToCart, setIsCartOpen } = useCart();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "assistant",
      text: "Hi! I am your Krendora shopping concierge. Ask me for recommendations by budget (e.g. \"under $25\"), department (cleaning, car, fitness, tools), or practical gifts. I search our real 21-item catalogue instantly.",
      timestamp: "Just now",
      recommendedProducts: PRODUCTS.filter((p) => p.isTrending || p.isBestseller).slice(0, 3),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Find useful gadgets under $25",
    "Show me car and auto accessories",
    "Best home and cleaning tools",
    "Recommend workout and fitness gear",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const qLower = query.toLowerCase();
      let matched: Product[] = [];
      let reply = "";

      if (qLower.includes("under 25") || qLower.includes("under $25") || qLower.includes("cheap") || qLower.includes("budget")) {
        matched = PRODUCTS.filter((p) => p.price <= 25).slice(0, 4);
        reply = `Here are our best practical items under $25, including top customer favorites:`;
      } else if (qLower.includes("car") || qLower.includes("auto") || qLower.includes("drive")) {
        matched = PRODUCTS.filter((p) => p.category === "Car & Auto").slice(0, 4);
        reply = `Here is our top-rated car gear, built for everyday convenience:`;
      } else if (qLower.includes("clean") || qLower.includes("bathroom") || qLower.includes("home") || qLower.includes("scrub")) {
        matched = PRODUCTS.filter((p) => p.category === "Home & Kitchen").slice(0, 4);
        reply = `Here are our most popular home essentials, including our flagship Cordless Spin Scrubber:`;
      } else if (qLower.includes("fit") || qLower.includes("gym") || qLower.includes("workout")) {
        matched = PRODUCTS.filter((p) => p.category === "Fitness & Wellness").slice(0, 4);
        reply = `Here is our fitness & wellness lineup:`;
      } else {
        matched = PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(qLower) ||
            p.description.toLowerCase().includes(qLower) ||
            p.category.toLowerCase().includes(qLower)
        ).slice(0, 4);

        if (matched.length === 0) {
          matched = PRODUCTS.filter((p) => p.isBestseller).slice(0, 3);
          reply = `I couldn't find an exact match for "${query}", but here are our top overall bestsellers:`;
        } else {
          reply = `I found ${matched.length} great match${matched.length > 1 ? "es" : ""} for your request:`;
        }
      }

      const assistantMsg: ChatMessage = {
        id: "assistant-" + Date.now(),
        sender: "assistant",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        recommendedProducts: matched,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickAdd = (product: Product) => {
    addToCart(product, 1);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[65vh] max-h-[620px] bg-white rounded-2xl border border-[#E7DED3] overflow-hidden shadow-xs">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#FAF6F0]/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-[#1E1E1E] text-[#F97316] flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-xl space-y-2.5 ${msg.sender === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === "user"
                    ? "bg-[#F97316] text-white rounded-tr-xs"
                    : "bg-white text-[#1E1E1E] border border-[#E7DED3] rounded-tl-xs"
                }`}
              >
                {msg.text}
              </div>

              {/* Recommended Products Carousel */}
              {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                  {msg.recommendedProducts.map((p) => {
                    const isAdded = addedIds.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        className="bg-white p-3 rounded-xl border border-[#E7DED3] hover:border-[#D9C3AA] transition-all flex flex-col justify-between shadow-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#FAF4EC] shrink-0 border border-[#E7DED3]/60">
                            <Image src={p.image} alt={p.name} fill className="object-contain p-1" sizes="48px" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <Link href={`/product/${p.handle}`} className="text-xs font-semibold text-[#1E1E1E] hover:text-[#F97316] line-clamp-1">
                              {p.name}
                            </Link>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="w-3 h-3 fill-[#F97316] text-[#F97316]" />
                              <span className="text-[10px] font-bold text-[#1E1E1E]">{p.rating}</span>
                              <span className="text-[10px] text-[#8C7A68]">({p.reviewCount})</span>
                            </div>
                            <span className="text-xs font-bold text-[#1E1E1E] mt-0.5 block">{formatUSD(p.price)}</span>
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-[#E7DED3]/60 flex items-center justify-between gap-2">
                          <Link href={`/product/${p.handle}`} className="text-[11px] text-[#6B5E4E] hover:text-[#1E1E1E] font-medium">
                            Details
                          </Link>
                          <button
                            onClick={() => handleQuickAdd(p)}
                            className={`text-[11px] font-semibold py-1 px-2.5 rounded-lg transition-colors flex items-center gap-1 ${
                              isAdded ? "bg-[#218653] text-white" : "bg-[#1E1E1E] hover:bg-[#F97316] text-white"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3 h-3" /> Added
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3 h-3" /> Add
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <span className={`text-[10px] text-[#8C7A68] block ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-full bg-[#EADBCB] text-[#1E1E1E] flex items-center justify-center shrink-0 shadow-xs">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#6B5E4E]">
            <div className="w-8 h-8 rounded-full bg-[#1E1E1E] text-[#F97316] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white px-4 py-2.5 rounded-2xl border border-[#E7DED3] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      <div className="px-4 py-2 bg-white border-t border-[#E7DED3]/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-semibold text-[#8C7A68] uppercase tracking-wider shrink-0">Try:</span>
        {suggestedPrompts.map((p) => (
          <button
            key={p}
            onClick={() => handleSend(p)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-[#FAF4EC] hover:bg-[#F5EDE1] text-[#1E1E1E] border border-[#E7DED3] whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-[#E7DED3] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask e.g. 'Show me kitchen gadgets under $30'..."
          className="flex-1 bg-[#FAF4EC] border border-[#E7DED3] rounded-xl px-4 py-2.5 text-xs text-[#1E1E1E] placeholder-[#8C7A68] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

// -------------------------------------------------------------------------
// 2. SMART PRODUCT FINDER MODAL VIEW
// -------------------------------------------------------------------------
function ProductFinderModalView() {
  const { addToCart } = useCart();
  const [category, setCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(45);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return filterAndSortProducts(PRODUCTS, {
      category,
      maxPrice,
      minRating,
      inStockOnly,
      sortBy: "featured",
    });
  }, [category, maxPrice, minRating, inStockOnly]);

  const handleAdd = (p: Product) => {
    addToCart(p, 1);
    setAddedIds((prev) => [...prev, p.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== p.id));
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#E7DED3] shadow-xs space-y-4">
        {/* Category Pills */}
        <div>
          <label className="text-[11px] font-semibold text-[#8C7A68] uppercase tracking-wider block mb-2">
            Department:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
                  category === cat
                    ? "bg-[#F97316] text-white"
                    : "bg-[#FAF4EC] text-[#1E1E1E] hover:bg-[#F5EDE1] border border-[#E7DED3]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders & Toggles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 border-t border-[#E7DED3]/60 items-center">
          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#1E1E1E]">Max Budget:</span>
              <span className="font-bold text-[#F97316]">{formatUSD(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#F97316] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8C7A68] mt-0.5">
              <span>$10</span>
              <span>$50</span>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="text-xs font-semibold text-[#1E1E1E] block mb-1.5">Min Customer Rating:</label>
            <div className="flex gap-1.5">
              {[0, 4.5, 4.7, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    minRating === r
                      ? "bg-[#1E1E1E] text-white"
                      : "bg-[#FAF4EC] text-[#1E1E1E] hover:bg-[#F5EDE1] border border-[#E7DED3]"
                  }`}
                >
                  {r === 0 ? "Any" : `${r}★+`}
                </button>
              ))}
            </div>
          </div>

          {/* Availability & Reset */}
          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#1E1E1E]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-[#F97316] rounded"
              />
              <span>In Stock Only</span>
            </label>

            <button
              onClick={() => {
                setCategory("All");
                setMaxPrice(45);
                setMinRating(0);
                setInStockOnly(false);
              }}
              className="text-xs text-[#8C7A68] hover:text-[#F97316] flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-[#1E1E1E]">
          Found {filtered.length} matching products
        </span>
        <span className="text-[11px] text-[#8C7A68]">Live catalogue results</span>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => {
          const isAdded = addedIds.includes(p.id);
          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-[#E7DED3] p-4 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <div className="relative aspect-square w-full rounded-xl bg-[#FAF4EC] overflow-hidden mb-3 border border-[#E7DED3]/60">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform"
                    sizes="200px"
                  />
                  {p.isBestseller && (
                    <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#F97316] text-white">
                      Bestseller
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#8C7A68] uppercase font-semibold">{p.category}</span>
                <Link
                  href={`/product/${p.handle}`}
                  className="font-serif text-sm font-medium text-[#1E1E1E] hover:text-[#F97316] line-clamp-1 mt-0.5 block"
                >
                  {p.name}
                </Link>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#F97316] text-[#F97316]" />
                  <span className="font-bold text-[#1E1E1E]">{p.rating}</span>
                  <span className="text-[10px] text-[#8C7A68]">({p.reviewCount})</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E7DED3]/60 flex items-center justify-between">
                <span className="text-sm font-bold text-[#1E1E1E]">{formatUSD(p.price)}</span>
                <button
                  onClick={() => handleAdd(p)}
                  className={`text-xs font-semibold py-1.5 px-3 rounded-xl transition-colors flex items-center gap-1 ${
                    isAdded ? "bg-[#218653] text-white" : "bg-[#1E1E1E] hover:bg-[#F97316] text-white"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 3. BUILD YOUR OWN BUNDLE MODAL VIEW
// -------------------------------------------------------------------------
function BundleBuilderModalView() {
  const { addBundleToCart, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([
    PRODUCTS[0], // Cordless Electric Spin Scrubber ($29.99)
    PRODUCTS[1], // LED Car Sun Visor Mirror Light ($24.99)
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  const eligibleProducts = PRODUCTS.filter((p) => p.bundleEligible);
  const displayed =
    selectedCategory === "All"
      ? eligibleProducts
      : eligibleProducts.filter((p) => p.category === selectedCategory);

  const isSelected = (id: string) => selectedProducts.some((p) => p.id === id);

  const toggleProduct = (p: Product) => {
    if (isSelected(p.id)) {
      setSelectedProducts((prev) => prev.filter((item) => item.id !== p.id));
    } else {
      const nextList = [...selectedProducts, p];
      setSelectedProducts(nextList);
      if (nextList.length === 3) {
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        } catch (e) {}
      }
    }
  };

  const rawSubtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const pricing = calculateBundlePricing(rawSubtotal, selectedProducts.length);

  const handleAddBundle = () => {
    if (selectedProducts.length === 0) return;
    addBundleToCart(selectedProducts);
    setIsSuccess(true);
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
    setTimeout(() => {
      setIsSuccess(false);
      setIsCartOpen(true);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Product Picker (7 cols) */}
      <div className="lg:col-span-7 space-y-4">
        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {["All", "Home & Kitchen", "Car & Auto", "Fitness & Wellness", "Tech & Gadgets"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[#F97316] text-white"
                  : "bg-white text-[#1E1E1E] hover:bg-[#FAF4EC] border border-[#E7DED3]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
          {displayed.map((p) => {
            const checked = isSelected(p.id);
            return (
              <div
                key={p.id}
                onClick={() => toggleProduct(p)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 select-none ${
                  checked
                    ? "bg-[#FAF4EC] border-[#F97316] shadow-xs"
                    : "bg-white border-[#E7DED3] hover:border-[#D9C3AA]"
                }`}
              >
                <div className="relative w-14 h-14 rounded-xl bg-white overflow-hidden shrink-0 border border-[#E7DED3]/60">
                  <Image src={p.image} alt={p.name} fill className="object-contain p-1" sizes="56px" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-[#8C7A68] font-semibold uppercase">{p.category}</span>
                  <h4 className="text-xs font-semibold text-[#1E1E1E] line-clamp-1">{p.name}</h4>
                  <span className="text-xs font-bold text-[#1E1E1E]">{formatUSD(p.price)}</span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                    checked
                      ? "bg-[#F97316] border-[#F97316] text-white"
                      : "border-[#D9C3AA] text-transparent hover:border-[#F97316]"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Bundle Summary & Discount Tier (5 cols) */}
      <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E7DED3] shadow-xs flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#E7DED3]">
            <h3 className="font-serif text-lg font-bold text-[#1E1E1E]">Your Custom Bundle</h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#1E1E1E] text-white">
              {selectedProducts.length} items
            </span>
          </div>

          {/* Tier Tracker */}
          <div className="mt-4 p-3 rounded-2xl bg-[#FAF4EC] border border-[#E7DED3] space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#1E1E1E]">Tier Status:</span>
              <span className={pricing.discountPercent > 0 ? "text-[#218653]" : "text-[#8C7A68]"}>
                {pricing.discountPercent > 0 ? `${pricing.discountPercent}% Discount Active!` : "Add 2+ items for 5% off"}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#E7DED3] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#218653] h-full transition-all duration-300"
                style={{
                  width: selectedProducts.length >= 3 ? "100%" : selectedProducts.length === 2 ? "66%" : selectedProducts.length === 1 ? "33%" : "0%",
                }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-[#8C7A68]">
              <span className={selectedProducts.length >= 2 ? "font-bold text-[#218653]" : ""}>2 items: 5% OFF</span>
              <span className={selectedProducts.length >= 3 ? "font-bold text-[#218653]" : ""}>3+ items: 10% OFF</span>
            </div>
          </div>

          {/* Selected Items List */}
          <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
            {selectedProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#FAF6F0]">
                <span className="text-[#1E1E1E] font-medium line-clamp-1 flex-1 pr-2">{p.name}</span>
                <span className="font-bold text-[#1E1E1E] shrink-0">{formatUSD(p.price)}</span>
                <button
                  onClick={() => toggleProduct(p)}
                  className="ml-2 text-[#8C7A68] hover:text-[#DC2626] p-0.5"
                  aria-label="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {selectedProducts.length === 0 && (
              <p className="text-xs text-[#8C7A68] italic py-4 text-center">
                Select items from the left to build your bundle.
              </p>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart CTA */}
        <div className="pt-4 border-t border-[#E7DED3] space-y-3">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-[#6B5E4E]">
              <span>Original Subtotal:</span>
              <span className={pricing.discountPercent > 0 ? "line-through text-[#8C7A68]" : ""}>
                {formatUSD(pricing.subtotal)}
              </span>
            </div>
            {pricing.discountPercent > 0 && (
              <div className="flex justify-between text-[#218653] font-semibold">
                <span>Bundle Discount ({pricing.discountPercent}%):</span>
                <span>-{formatUSD(pricing.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-[#1E1E1E] pt-1 border-t border-[#E7DED3]/60">
              <span>Bundle Total:</span>
              <span className="text-[#F97316]">{formatUSD(pricing.total)}</span>
            </div>
          </div>

          <button
            onClick={handleAddBundle}
            disabled={selectedProducts.length === 0}
            className={`w-full py-3.5 rounded-2xl text-xs font-bold tracking-wide uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
              isSuccess
                ? "bg-[#218653] text-white"
                : selectedProducts.length > 0
                ? "bg-[#F97316] hover:bg-[#EA580C] text-white"
                : "bg-[#E7DED3] text-[#8C7A68] cursor-not-allowed"
            }`}
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4" /> Added Bundle to Bag!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add Bundle to Bag
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
