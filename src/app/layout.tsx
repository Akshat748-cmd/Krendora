import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToolModalProvider } from "@/context/ToolModalContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartToast } from "@/components/cart/Toast";
import { ToolModal } from "@/components/tools/ToolModal";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krendora — The Modern Department Store",
  description:
    "Curated, well-priced, practical products across kitchen, home, car, and tools. Free US shipping on orders over $35 with 30-day returns.",
  icons: {
    icon: "/assets/krendora/favicon.png",
  },
};

import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FDF8F1] text-[#1E1E1E]">
        <CartProvider>
          <WishlistProvider>
            <ToolModalProvider>
              <Suspense fallback={<div className="h-16 bg-[#FDF8F1]" />}>
                <Header />
              </Suspense>
              <main className="flex-1">{children}</main>
              <Footer />
              <ToolModal />
              <Suspense fallback={null}>
                <CartDrawer />
                <CartToast />
              </Suspense>
            </ToolModalProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
