"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/Mac/i.test(navigator.userAgent));
    }
  }, []);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);

    const title = document.title || "PromptLib";
    const url = window.location.href;

    try {
      if ((window as any).sidebar && (window as any).sidebar.addPanel) {
        (window as any).sidebar.addPanel(title, url, "");
      } else if ((window as any).external && ("AddFavorite" in (window as any).external)) {
        (window as any).external.AddFavorite(url, title);
      }
    } catch (err) {
      // Modern browser programmatic bookmark fallback is handled by visual tooltip
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 w-full flex justify-center px-6 pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-6 sm:gap-12 glass-noise-pill rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.01)] px-5 py-2 sm:px-6 sm:py-2.5 transition-all duration-300">
        {/* Brand Logo / Title */}
        <Link href="/" className="flex items-center gap-2 select-none group">
          <span className="text-neutral-950 font-serif-custom text-xl font-bold tracking-tight">
            PromptLib<span className="text-neutral-400 font-sans text-xs ml-0.5 font-bold group-hover:text-neutral-950 transition-colors">.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link 
            href="/prompts" 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-950 transition-colors"
          >
            Library
          </Link>
          <Link 
            href="/about" 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-950 transition-colors"
          >
            About
          </Link>
        </div>

        {/* Action Button: Bookmark */}
        <div className="relative">
          {showTooltip && (
            <div className="absolute right-0 bottom-full mb-3 z-50 bg-neutral-950 text-white text-[10px] font-bold py-2 px-3.5 rounded-xl shadow-lg border border-neutral-800 flex items-center gap-1.5 whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200">
              Press <span className="bg-neutral-800 px-1 py-0.5 rounded border border-neutral-700">{isMac ? "Cmd + D" : "Ctrl + D"}</span> to bookmark
            </div>
          )}
          <button 
            onClick={handleBookmark}
            className="btn-pill btn-pill-black text-[10px] font-sans font-bold uppercase tracking-[0.2em] py-1.5 px-4 border border-neutral-950 shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            Bookmark
          </button>
        </div>
      </nav>
    </div>
  );
}
