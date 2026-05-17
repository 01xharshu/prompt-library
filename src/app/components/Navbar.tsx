"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 flex items-center justify-between">
        {/* Left section - Brand Logo / Title */}
        <div className="flex-1 flex items-center gap-2 select-none">
          <span className="text-white font-serif-custom text-2xl font-black tracking-tight">
            PromptLib<span className="text-white/60 font-sans text-xs ml-1 font-bold">.</span>
          </span>
        </div>

        {/* Center navigation links (Desktop only) */}
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

        {/* Right section - CTA Button (Desktop) & Hamburger Icon (Mobile) */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <button className="hidden sm:block btn-scalloped bg-white/10 text-white backdrop-blur-md border border-white/10 px-8 py-3 text-sm font-medium hover:bg-white/20 transition-all duration-300">
            Book a demo
          </button>
          
          {/* Hamburger Toggle Button (Mobile only) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all active:scale-95 z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Glassmorphic Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-xl md:hidden flex flex-col justify-center items-center p-6"
          >
            <div className="flex flex-col items-center gap-8 text-white text-xl font-bold tracking-wide">
              <a 
                href="#demo" 
                onClick={() => setIsOpen(false)}
                className="hover:text-white/80 transition-colors"
              >
                Demo
              </a>
              <button className="hover:text-white/80 transition-colors flex items-center gap-1 cursor-pointer text-xl font-bold">
                Compare <ChevronDown className="w-5 h-5 ml-0.5 opacity-80" />
              </button>
              <a 
                href="#pricing" 
                onClick={() => setIsOpen(false)}
                className="hover:text-white/80 transition-colors"
              >
                Pricing
              </a>
              <button 
                onClick={() => setIsOpen(false)}
                className="btn-scalloped bg-white text-black px-10 py-4 text-base font-semibold mt-4 shadow-lg active:scale-95"
              >
                Book a demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
