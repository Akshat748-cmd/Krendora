"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToolModal, ToolType } from "@/context/ToolModalContext";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Truck,
  Sparkles,
  SlidersHorizontal,
  PackagePlus,
  User,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { openToolModal } = useToolModal();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
    setCollectionsDropdownOpen(false);
    setToolsDropdownOpen(false);
  }, [pathname]);

  const categories = [
    { name: "Home & Living", href: "/shop?category=Home+%26+Kitchen" },
    { name: "Kitchen", href: "/shop?category=Home+%26+Kitchen" },
    { name: "Health & Fitness", href: "/shop?category=Fitness+%26+Wellness" },
    { name: "Car Accessories", href: "/shop?category=Car+%26+Auto" },
    { name: "Tools & DIY", href: "/shop?category=Home+%26+Kitchen" },
    { name: "Tech & Gadgets", href: "/shop?category=Tech+%26+Gadgets" },
    { name: "Lifestyle & Travel", href: "/shop?category=Lifestyle+%26+Travel" },
  ];

  const collections = [
    { name: "Clean Sweep Daily", href: "/shop?collection=clean-sweep-daily" },
    { name: "ManCave Pro", href: "/shop?collection=mancave-pro" },
    { name: "Desk Gear Labs", href: "/shop?collection=desk-gear-labs" },
    { name: "Home Rep Club", href: "/shop?collection=home-rep-club" },
    { name: "Room Within", href: "/shop?collection=room-within" },
    { name: "Curious Kids Lab", href: "/shop?collection=curious-kids-lab" },
  ];

  const tools = [
    {
      name: "AI Shopping Assistant",
      desc: "Conversational recommendations by budget & style",
      href: "/tools/ai-assistant",
      key: "ai-assistant" as ToolType,
      icon: Sparkles,
      badge: "Interactive",
    },
    {
      name: "Smart Product Finder",
      desc: "Live filters across prices, ratings & categories",
      href: "/tools/product-finder",
      key: "product-finder" as ToolType,
      icon: SlidersHorizontal,
      badge: "Real-time",
    },
    {
      name: "Build Your Own Bundle",
      desc: "Multi-buy discounts: 5% off for 2, 10% off for 3+",
      href: "/tools/bundle-builder",
      key: "bundle-builder" as ToolType,
      icon: PackagePlus,
      badge: "Save 10%",
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR (Exactly as in photo: < [Truck] Free US Shipping ... | 30-Day Hassle-Free Returns | Save Up to 10% in Bundles >) */}
      <div className="bg-[#18181B] text-[#FFFFFF] text-[11px] sm:text-[12px] py-2 px-3 sm:px-6 border-b border-[#27272A]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Left Arrow */}
          <button
            type="button"
            className="text-white/70 hover:text-white p-1 transition-colors"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Centered Announcement Text */}
          <div className="flex items-center justify-center gap-2 font-normal text-center overflow-hidden">
            <Truck className="w-4 h-4 shrink-0 text-white" />
            <span className="truncate">
              Free US Shipping on Orders Over $35 &nbsp;|&nbsp; 30-Day Hassle-Free Returns &nbsp;|&nbsp; Save Up to 10% in Bundles
            </span>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            className="text-white/70 hover:text-white p-1 transition-colors"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo Left | Nav Links | Search Bar | Account | Wishlist | Cart Badge) */}
      <header className="sticky top-0 z-40 bg-[#FDF8F1] border-b border-[#E7DED3] transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 lg:gap-6">
          {/* Left Group: Logo + Navigation Links */}
          <div className="flex items-center gap-6 xl:gap-8 min-w-0">
            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-[#1E1E1E] hover:text-[#F97316] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Logo Wordmark: Exactly as in photo "Krendora" in serif */}
            <Link href="/" className="inline-block shrink-0">
              <span className="font-serif text-[26px] sm:text-[28px] font-normal tracking-tight text-[#1E1E1E] hover:text-[#F97316] transition-colors">
                Krendora
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[13px] font-normal text-[#1E1E1E]">
              <Link
                href="/shop"
                className={`hover:text-[#F97316] transition-colors whitespace-nowrap ${
                  pathname === "/shop" ? "font-medium text-[#1E1E1E]" : ""
                }`}
              >
                Shop All
              </Link>

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                onMouseLeave={() => setCategoriesDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-[#F97316] transition-colors py-1 whitespace-nowrap"
                  onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                >
                  <span>Categories</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B5E4E]" />
                </button>

                {categoriesDropdownOpen && (
                  <div className="absolute top-full left-0 w-52 pt-2 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-[#E7DED3] p-2 space-y-0.5">
                      {categories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          className="block px-3 py-2 text-xs text-[#1E1E1E] hover:bg-[#FAF4EC] hover:text-[#F97316] rounded-xl transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Collections Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCollectionsDropdownOpen(true)}
                onMouseLeave={() => setCollectionsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-[#F97316] transition-colors py-1 whitespace-nowrap"
                  onClick={() => setCollectionsDropdownOpen(!collectionsDropdownOpen)}
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B5E4E]" />
                </button>

                {collectionsDropdownOpen && (
                  <div className="absolute top-full left-0 w-56 pt-2 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-[#E7DED3] p-2 space-y-0.5">
                      {collections.map((coll) => (
                        <Link
                          key={coll.name}
                          href={coll.href}
                          className="block px-3 py-2 text-xs text-[#1E1E1E] hover:bg-[#FAF4EC] hover:text-[#F97316] rounded-xl transition-colors"
                        >
                          {coll.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Shopping Tools Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setToolsDropdownOpen(true)}
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 hover:text-[#F97316] transition-colors py-1 whitespace-nowrap ${
                    pathname.startsWith("/tools") ? "font-medium text-[#F97316]" : ""
                  }`}
                  onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                >
                  <span>Shopping Tools</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B5E4E]" />
                </button>

                {toolsDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 pt-2 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-[#E7DED3] p-2.5 space-y-1">
                      {tools.map((tool) => (
                        <button
                          key={tool.href}
                          type="button"
                          onClick={() => {
                            openToolModal(tool.key);
                            setToolsDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF4EC] transition-colors group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#FAF4EC] text-[#F97316] flex items-center justify-center shrink-0 group-hover:bg-[#F97316] group-hover:text-white transition-colors">
                            <tool.icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-[#1E1E1E] group-hover:text-[#F97316] transition-colors">
                                {tool.name}
                              </span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#1E1E1E] text-white">
                                {tool.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#6B5E4E] line-clamp-1 mt-0.5 font-normal">
                              {tool.desc}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`hover:text-[#F97316] transition-colors whitespace-nowrap ${
                  pathname === "/about" ? "font-medium text-[#1E1E1E]" : ""
                }`}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={`hover:text-[#F97316] transition-colors whitespace-nowrap ${
                  pathname === "/contact" ? "font-medium text-[#1E1E1E]" : ""
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right Group: Search Pill + Account + Wishlist + Cart */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 shrink-0">
            {/* Search Pill Input (As in screenshot: rounded-full pill with magnifying glass & 'Search products...') */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden sm:block w-48 md:w-60 lg:w-72"
            >
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3.5 text-[#8C7A68] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-[#FAF4EC] hover:bg-[#F5EDE1] focus:bg-white border border-[#E7DED3] text-xs text-[#1E1E1E] placeholder-[#8C7A68] focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-all"
                />
              </div>
            </form>

            {/* Mobile Search Icon Trigger */}
            <button
              onClick={() => {
                const q = prompt("Search Krendora products:");
                if (q) window.location.href = `/shop?q=${encodeURIComponent(q)}`;
              }}
              className="sm:hidden p-1.5 text-[#1E1E1E] hover:text-[#F97316] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User / Account Icon */}
            <button
              onClick={() => setAccountModalOpen(true)}
              className="p-1.5 text-[#1E1E1E] hover:text-[#F97316] transition-colors"
              aria-label="Account"
            >
              <User className="w-[21px] h-[21px] stroke-[1.6]" />
            </button>

            {/* Heart / Wishlist Icon */}
            <Link
              href="/shop"
              className="relative p-1.5 text-[#1E1E1E] hover:text-[#F97316] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-[21px] h-[21px] stroke-[1.6]" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#F97316] text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with Circular Orange Badge (Exact as in photo: orange circle with number on top right of shopping bag) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-[#1E1E1E] hover:text-[#F97316] transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-[21px] h-[21px] stroke-[1.6]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F97316] text-white text-[10px] font-bold flex items-center justify-center leading-none shadow-xs">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FDF8F1] shadow-2xl z-10 flex flex-col p-6 border-r border-[#E7DED3]">
            <div className="flex items-center justify-between pb-5 border-b border-[#E7DED3]">
              <span className="font-serif text-2xl tracking-tight text-[#1E1E1E]">
                Krendora
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#6B5E4E] hover:text-[#1E1E1E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-5 space-y-6 text-sm">
              <div className="space-y-2.5">
                <Link href="/shop" className="block font-medium text-[#1E1E1E] hover:text-[#F97316]">
                  Shop All
                </Link>
                <Link href="/about" className="block font-medium text-[#1E1E1E] hover:text-[#F97316]">
                  About
                </Link>
                <Link href="/contact" className="block font-medium text-[#1E1E1E] hover:text-[#F97316]">
                  Contact
                </Link>
              </div>

              <div className="pt-4 border-t border-[#E7DED3] space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A68]">
                  Categories
                </span>
                <div className="space-y-1.5 text-xs text-[#1E1E1E]">
                  {categories.map((c) => (
                    <Link key={c.name} href={c.href} className="block py-1 hover:text-[#F97316]">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7DED3] space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A68]">
                  3 Shopping Tools
                </span>
                <div className="space-y-2">
                  {tools.map((t) => (
                    <button
                      key={t.href}
                      type="button"
                      onClick={() => {
                        openToolModal(t.key);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2 p-2 rounded-xl bg-white border border-[#E7DED3] text-xs font-medium text-[#1E1E1E] hover:border-[#F97316] transition-colors"
                    >
                      <t.icon className="w-4 h-4 text-[#F97316]" />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7DED3] text-xs text-[#6B5E4E]">
              <p>Free US shipping on orders over $35</p>
              <p className="text-[11px] text-[#8C7A68] mt-0.5">30-day hassle-free returns</p>
            </div>
          </div>
        </div>
      )}

      {/* Account Demo Modal */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setAccountModalOpen(false)}
          />
          <div className="relative bg-[#FDF8F1] w-full max-w-sm rounded-2xl shadow-2xl border border-[#D9C3AA] p-6 z-10 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-[#FAF4EC] border border-[#E7DED3] flex items-center justify-center mx-auto mb-3 text-[#1E1E1E]">
              <User className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1E1E1E]">
              Krendora Customer Profile
            </h3>
            <p className="text-xs text-[#6B5E4E] mt-1 mb-4">
              Signed in as: customer@krendora.com
            </p>
            <div className="p-3 bg-white rounded-xl border border-[#E7DED3] text-left text-xs space-y-1.5 mb-4">
              <div className="flex justify-between">
                <span className="text-[#6B5E4E]">Status:</span>
                <span className="font-semibold text-[#218653]">Active Shopper</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B5E4E]">Items in Bag:</span>
                <span className="font-semibold">{totalItems} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B5E4E]">Intro Discount Code:</span>
                <span className="font-mono font-semibold text-[#F97316]">WELCOME5</span>
              </div>
            </div>
            <button
              onClick={() => setAccountModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#1E1E1E] text-white text-xs font-semibold hover:bg-[#F97316] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
