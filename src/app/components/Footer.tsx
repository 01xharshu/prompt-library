"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="w-full bg-[#faf9f6] border-t border-neutral-200/60 text-neutral-900 font-sans relative overflow-hidden z-20">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-grid opacity-[0.15]" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-20 relative z-10">
        
        {/* Upper Segment: Asymmetric Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Hero Column: Large statement and Newsletter input */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <h3 className="font-serif-custom text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-tight font-bold max-w-md">
              Unleash the craft of <em className="italic font-bold text-neutral-400">engineered prompts.</em>
            </h3>
            
            <div className="space-y-3 max-w-sm">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5 select-none">
                <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                Join the weekly dispatch
              </span>
              
              <form onSubmit={handleSubscribe} className="flex relative">
                <input
                  type="email"
                  placeholder="Enter email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-neutral-200 rounded-full pl-5 pr-14 py-3 text-xs focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all font-sans"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bg-neutral-950 text-white rounded-full p-2 hover:bg-neutral-800 transition-all active:scale-95 duration-200 cursor-pointer"
                >
                  {subscribed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </form>
              <p className="text-[10px] text-neutral-400 font-light leading-relaxed select-none">
                Get one masterfully curated prompt template in your inbox every Thursday. Zero spam.
              </p>
            </div>

            {/* Product Hunt Badge */}
            <div className="pt-4">
              <a href="https://www.producthunt.com/products/promptlib?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-promptlib" target="_blank" rel="noopener noreferrer">
                <img alt="PromptLib - Pinterest for Image Prompts | Product Hunt" width="250" height="54" src="/ph-badge.svg" />
              </a>
            </div>
          </div>

          {/* Links Column Group */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 w-full">
            
            {/* Platform Links */}
            <div className="space-y-4 text-left">
              <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest select-none">
                Platform
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/prompts" className="text-neutral-500 hover:text-neutral-950 text-xs font-light transition-colors">
                    Explore Library
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-neutral-500 hover:text-neutral-950 text-xs font-light transition-colors">
                    Philosophy
                  </Link>
                </li>
                <li>
                  <a href="#how-it-works" className="text-neutral-500 hover:text-neutral-950 text-xs font-light transition-colors">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect Links */}
            <div className="space-y-4 text-left">
              <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest select-none">
                Connect
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="https://x.com/heyaharshu" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-950 text-xs font-light transition-colors">
                    X / Twitter
                  </a>
                </li>
                <li>
                  <a href="https://github.com/01xharshu" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-950 text-xs font-light transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/heyaharshu" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-950 text-xs font-light transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Lower Segment: System Info & Copyright */}
        <div className="mt-20 pt-8 border-t border-neutral-200/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-serif-custom text-xl font-bold tracking-tight text-neutral-950">
              PromptLib<span className="text-neutral-400 font-sans font-light">.</span>
            </Link>
            <span className="text-[10px] text-neutral-400 font-sans tracking-wider select-none uppercase hidden sm:block">
              © {new Date().getFullYear()} PROMPTLIB
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-sans text-neutral-500 select-none uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </div>
            <a href="https://github.com/01xharshu" target="_blank" rel="noreferrer" className="text-[10px] font-sans text-neutral-400 hover:text-neutral-900 transition-colors uppercase">
              GitHub
            </a>
            <a href="https://x.com/heyaharshu" target="_blank" rel="noreferrer" className="text-[10px] font-sans text-neutral-400 hover:text-neutral-900 transition-colors uppercase">
              X / Twitter
            </a>
            <a href="https://linkedin.com/in/heyaharshu" target="_blank" rel="noreferrer" className="text-[10px] font-sans text-neutral-400 hover:text-neutral-900 transition-colors uppercase">
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
