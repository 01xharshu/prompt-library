"use client";

import React from "react";
import Navbar from "./components/Navbar";
import LoyaltyFeature from "./components/LoyaltyFeature";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative font-sans overflow-x-hidden bg-white">
      <Navbar />

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative w-full min-h-[90vh] overflow-hidden flex items-center bg-white text-neutral-900">

        {/* Clean grid lines pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none hero-grid opacity-60" />

        {/* Subtle top light radial gradient for depth */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-100/50 via-transparent to-transparent pointer-events-none" />

        {/* Left-aligned content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-20 sm:pt-24 pb-16 flex items-center">

          {/* Text block — left side */}
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <h1 className="font-serif-custom text-4xl sm:text-6xl md:text-[3.8rem] lg:text-[4.4rem] text-neutral-950 leading-[1.1] tracking-tight font-bold mb-8">
              A <em className="italic font-bold text-neutral-400">prompt</em> needs more than words. <br className="hidden lg:block"/>It needs a <span className="text-neutral-500">craft.</span>
            </h1>

            <p className="text-base sm:text-xl text-neutral-600 font-light leading-relaxed max-w-md mb-10">
              Copy production-ready AI prompts, curated directly from social media platforms and top creators.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a 
                href="/prompts" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-neutral-900 text-white text-sm font-semibold border border-neutral-900 shadow-sm hover:shadow-md hover:bg-neutral-800 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                Browse Prompts
              </a>
            </div>
          </div>
        </div>

        {/* Hero image — right side, positioned absolutely */}
        <div className="hidden md:block absolute right-0 bottom-0 w-[55%] lg:w-[50%] z-10 pointer-events-none select-none drop-shadow-2xl">
          <img
            src="/top-part.png"
            alt="Renaissance artist crafting prompts"
            className="w-full h-auto object-contain object-bottom"
          />
        </div>

        {/* White gradient fade at bottom — merges hero into features section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[180px] z-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 0%, white 100%)" }}
        />
      </section>

      {/* ═══ VIDEO DEMO SECTION ═══ */}
      <section className="relative w-full z-30 flex flex-col justify-center items-center pt-4 sm:pt-8 pb-20 px-4 sm:px-8 -mt-6 sm:-mt-10">
        <div className="w-full max-w-5xl rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] bg-white border border-neutral-200">
          <video
            src="/demo-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Hunt Banner Card */}
        <div className="mt-14 w-full max-w-4xl bg-white/60 backdrop-blur-md border border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#da552f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#da552f]"></span>
              </span>
              <h3 className="font-bold tracking-tight text-neutral-900 text-lg sm:text-xl">We are live on Product Hunt!</h3>
            </div>
            <p className="text-sm text-neutral-500 max-w-md leading-relaxed">
              Join the community and support our launch. We'd love to hear your feedback on the new curated prompt library.
            </p>
          </div>
          
          <div className="flex-shrink-0 hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-sm rounded-xl overflow-hidden">
            <a href="https://www.producthunt.com/products/promptlib?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-promptlib" target="_blank" rel="noopener noreferrer">
              <img alt="PromptLib - Pinterest for Image Prompts | Product Hunt" width="250" height="54" src="/ph-badge.svg" className="block" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ENDURING LOYALTY FEATURE SECTION ═══ */}
      <LoyaltyFeature />

      {/* ═══ VISUAL WORKFLOW GUIDE SECTION ═══ */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}