"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full max-w-7xl mx-auto px-8 sm:px-12 py-6 flex items-center justify-between">
      {/* Left section - Brand Logo / Title */}
      <div className="flex-1 flex items-center gap-2 select-none">
        <span className="text-white font-serif-custom text-2xl font-black tracking-tight">
          PromptLib<span className="text-white/60 font-sans text-xs ml-1 font-bold">.</span>
        </span>
      </div>

      {/* Center navigation links */}
      <div className="hidden md:flex items-center gap-8 text-white/90 text-[15px] font-medium tracking-wide select-none">
        <a href="#demo" className="hover:text-white transition-colors">
          Demo
        </a>
        <button className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
          Compare <ChevronDown className="w-4 h-4 ml-0.5 opacity-80" />
        </button>
        <a href="#pricing" className="hover:text-white transition-colors">
          Pricing
        </a>
      </div>

      {/* Right section - CTA Button */}
      <div className="flex-1 flex justify-end">
        <button className="btn-scalloped bg-white/10 text-white backdrop-blur-md border border-white/10 px-8 py-3 text-sm font-medium hover:bg-white/20 transition-all duration-300">
          Book a demo
        </button>
      </div>
    </nav>
  );
}
