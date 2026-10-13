"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import { formatUSD } from "@/lib/pricing";
import { useCart } from "@/context/CartContext";
import {
  Sparkles,
  Send,
  ShoppingBag,
  Bot,
  User,
  Check,
  Star,
  RefreshCw,
  Info,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
}

export default function AIAssistantPage() {
  const { addToCart } = useCart();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "assistant",
      text: "Welcome to Krendora Shopping Concierge. I am your smart discovery assistant for our live department store catalogue. Ask me for recommendations by budget (e.g. \"under $25\"), category (cleaning, car, gadgets, fitness), or gift ideas, and I'll find the best matching items.",
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
    "Help me build a product bundle",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  // Deterministic live catalogue retrieval engine
  const processQuery = (query: string): { responseText: string; matches: Product[] } => {
    const q = query.toLowerCase();

    // Check budget
    let maxBudget: number | null = null;
    const underMatch = q.match(/under\s*\$?(\d+(?:\.\d+)?)/i);
    const belowMatch = q.match(/below\s*\$?(\d+(?:\.\d+)?)/i);
    const budgetMatch = q.match(/budget\s*(?:of|is|:)?\s*\$?(\d+(?:\.\d+)?)/i);

    const budgetString = underMatch?.[1] || belowMatch?.[1] || budgetMatch?.[1];
    if (budgetString) {
      maxBudget = parseFloat(budgetString);
    }

    let candidates = [...PRODUCTS];

    if (maxBudget) {
      candidates = candidates.filter((p) => p.price <= maxBudget!);
    }

    if (q.includes("car") || q.includes("auto") || q.includes("vehicle") || q.includes("visor") || q.includes("strobe")) {
      const carMatches = candidates.filter((p) => p.category === "Car & Auto" || p.tags.some(t => t.includes("car")));
      if (carMatches.length > 0) candidates = carMatches;
    } else if (q.includes("clean") || q.includes("scrubber") || q.includes("kitchen") || q.includes("home") || q.includes("fridge") || q.includes("chopping") || q.includes("storage")) {
      const homeMatches = candidates.filter((p) => p.category === "Home & Kitchen" || p.tags.some(t => t.includes("home") || t.includes("kitchen")));
      if (homeMatches.length > 0) candidates = homeMatches;
    } else if (q.includes("fitness") || q.includes("workout") || q.includes("exercise") || q.includes("resistance") || q.includes("band") || q.includes("trainer")) {
      const fitMatches = candidates.filter((p) => p.category === "Fitness & Wellness" || p.tags.some(t => t.includes("fitness")));
      if (fitMatches.length > 0) candidates = fitMatches;
    } else if (q.includes("cable") || q.includes("usb") || q.includes("tech") || q.includes("gadget") || q.includes("charger") || q.includes("light")) {
      const techMatches = candidates.filter((p) => p.category === "Tech & Gadgets" || p.tags.some(t => t.includes("tech") || t.includes("usb")));
      if (techMatches.length > 0) candidates = techMatches;
    } else if (q.includes("bundle")) {
      candidates = candidates.filter((p) => p.bundleEligible);
    } else if (q.includes("trending")) {
      candidates = candidates.filter((p) => p.isTrending);
    }

    // Sort by rating desc
    candidates.sort((a, b) => b.rating - a.rating);

    const matches = candidates.slice(0, 3);

    let responseText = "";
    if (matches.length > 0) {
      if (maxBudget && q.includes("car")) {
        responseText = `Here are our best-rated car accessories under ${formatUSD(maxBudget)}. The ${matches[0].name.split("—")[0]} is especially popular for daily drivers.`;
      } else if (maxBudget) {
        responseText = `I found ${matches.length} highly-rated Krendora items under your ${formatUSD(maxBudget)} budget. All include free US shipping when your cart reaches $35.`;
      } else if (q.includes("clean") || q.includes("scrubber")) {
        responseText = `For home cleaning and organization, here are our top verified customer favorites:`;
      } else if (q.includes("bundle")) {
        responseText = `Here are versatile everyday items eligible for our Build Your Own Bundle discount. Add 2 for 5% off, or 3+ for a full 10% multi-buy discount!`;
      } else {
        responseText = `Based on your request, here are top picks directly from Krendora's live department catalogue:`;
      }
    } else {
      responseText = `I couldn't find items strictly matching all parameters${maxBudget ? ` under ${formatUSD(maxBudget)}` : ""}. Here are our top general bestsellers instead:`;
      return { responseText, matches: PRODUCTS.slice(0, 3) };
    }

    return { responseText, matches };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const { responseText, matches } = processQuery(query);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: responseText,
        timestamp: "Just now",
        recommendedProducts: matches,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="bg-[#FDF8F1] min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col h-[82vh] bg-white rounded-3xl border border-[#E7DED3] shadow-xl overflow-hidden">
        {/* Top Header */}
        <div className="p-6 border-b border-[#E7DED3] bg-[#FDF8F1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#1E1E1E] text-[#F97316] flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl font-medium text-[#1E1E1E]">
                  AI Shopping Assistant
                </h1>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#218653]/15 text-[#218653]">
                  Live Catalogue
                </span>
              </div>
              <p className="text-xs text-[#6B5E4E] mt-0.5 font-sans">
                Real-time recommendations powered by actual Krendora products
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setMessages([
                {
                  id: "msg-welcome-reset",
                  sender: "assistant",
                  text: "Chat refreshed. How can I assist with your discovery today?",
                  timestamp: "Just now",
                  recommendedProducts: PRODUCTS.filter((p) => p.isBestseller).slice(0, 3),
                },
              ]);
            }}
            className="flex items-center gap-1.5 text-xs text-[#6B5E4E] hover:text-[#1E1E1E] py-1.5 px-3 rounded-lg border border-[#E7DED3] hover:bg-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Chat</span>
          </button>
        </div>

        {/* Demo Notice Banner */}
        <div className="bg-[#EADBCB]/30 px-6 py-2 border-b border-[#E7DED3] flex items-center gap-2 text-[11px] text-[#6B5E4E]">
          <Info className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
          <span>
            Connected to all 21 live Krendora products. Try queries like &quot;gadgets under $25&quot;, &quot;car accessories&quot;, or &quot;cleaning tools&quot;.
          </span>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAF6F0]/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-[#1E1E1E] text-[#F97316] flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] space-y-3 ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-[#1E1E1E] text-[#FDF8F1] rounded-tr-xs"
                      : "bg-white text-[#1E1E1E] border border-[#E7DED3] rounded-tl-xs"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {msg.recommendedProducts.map((product) => {
                      const isAdded = addedIds.includes(product.id);
                      return (
                        <div
                          key={product.id}
                          className="bg-white rounded-xl border border-[#E7DED3] p-3 shadow-xs hover:border-[#D9C3AA] hover:shadow-md transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#EADBCB]/30 mb-2">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="200px"
                              />
                            </div>
                            <div className="flex items-center gap-1 text-[#F97316] text-[10px] mb-1">
                              <Star className="w-3 h-3 fill-[#F97316]" />
                              <span className="font-semibold">{product.rating}</span>
                              <span className="text-[#8C7A68]">({product.reviewCount})</span>
                            </div>
                            <Link
                              href={`/product/${product.id}`}
                              className="font-serif text-xs font-semibold text-[#1E1E1E] hover:text-[#F97316] line-clamp-2 block transition-colors leading-snug"
                            >
                              {product.name}
                            </Link>
                            <p className="text-[10px] text-[#6B5E4E] line-clamp-1 mt-1 font-semibold uppercase">
                              {product.category}
                            </p>
                          </div>

                          <div className="pt-2 mt-2 border-t border-[#E7DED3]/60 flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1E1E1E]">
                              {formatUSD(product.price)}
                            </span>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                                isAdded
                                  ? "bg-[#218653] text-white"
                                  : "bg-[#1E1E1E] text-white hover:bg-[#F97316]"
                              }`}
                              title="Add to bag"
                            >
                              {isAdded ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <ShoppingBag className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#EADBCB] text-[#1E1E1E] flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#1E1E1E] text-[#F97316] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-[#E7DED3] px-4 py-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-xs">
                <div className="w-2 h-2 rounded-full bg-[#F97316] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#F97316] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#F97316] animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-[#6B5E4E] ml-2">Searching Krendora inventory...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pill Bar */}
        <div className="p-3 bg-[#FDF8F1] border-t border-[#E7DED3] overflow-x-auto flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[#8C7A68] whitespace-nowrap px-2">
            Try asking:
          </span>
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="text-[11px] text-[#1E1E1E] bg-white hover:bg-[#1E1E1E] hover:text-white border border-[#D9C3AA] px-3 py-1.5 rounded-full whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white border-t border-[#E7DED3]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g., I need a car phone holder or travel storage under $30..."
              className="flex-1 py-3 px-4 rounded-xl bg-[#FAF6F0] border border-[#D9C3AA] text-sm text-[#1E1E1E] placeholder-[#8C7A68] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-3 bg-[#1E1E1E] hover:bg-[#F97316] disabled:opacity-40 text-white rounded-xl transition-colors shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
