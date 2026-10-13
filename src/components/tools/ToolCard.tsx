"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { useToolModal, ToolType } from "@/context/ToolModalContext";

interface ToolCardProps {
  title: string;
  tagline: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge: string;
  previewSnippet: React.ReactNode;
  toolKey?: ToolType;
}

export function ToolCard({
  title,
  tagline,
  description,
  href,
  icon: Icon,
  badge,
  previewSnippet,
  toolKey,
}: ToolCardProps) {
  const { openToolModal } = useToolModal();

  const handleLaunch = () => {
    if (toolKey) {
      openToolModal(toolKey);
    } else {
      window.location.href = href;
    }
  };

  return (
    <div
      onClick={handleLaunch}
      className="bg-white rounded-3xl border border-[#E7DED3] p-7 flex flex-col justify-between hover:border-[#D9C3AA] hover:shadow-xl transition-all duration-300 group cursor-pointer"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EADBCB]/50 text-[#F97316] flex items-center justify-center group-hover:bg-[#F97316] group-hover:text-white transition-colors">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#1E1E1E] text-white">
            {badge}
          </span>
        </div>

        {/* Subtitle & Title */}
        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C7A68] block">
          {tagline}
        </span>
        <h3 className="font-serif text-2xl font-medium text-[#1E1E1E] mt-1 group-hover:text-[#F97316] transition-colors">
          {title}
        </h3>
        <p className="text-xs text-[#6B5E4E] mt-2 leading-relaxed font-sans">
          {description}
        </p>

        {/* Interactive preview box */}
        <div className="mt-6 p-4 rounded-2xl bg-[#FDF8F1] border border-[#E7DED3]">
          {previewSnippet}
        </div>
      </div>

      {/* Action button */}
      <div className="pt-6 mt-6 border-t border-[#E7DED3]">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleLaunch();
          }}
          className="inline-flex items-center justify-between w-full py-3 px-5 rounded-xl bg-[#1E1E1E] text-[#FDF8F1] text-xs font-semibold group-hover:bg-[#F97316] transition-colors shadow-xs"
        >
          <span>Launch Tool</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
