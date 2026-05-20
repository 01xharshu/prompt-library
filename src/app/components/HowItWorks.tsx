"use client";

import React, { useState } from "react";
import { Search, Copy, Sparkles, ArrowRight, Code, FileText, Layout, Eye } from "lucide-react";

interface Step {
  id: number;
  num: string;
  tag: string;
  title: string;
  shortDesc: string;
  description: string;
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const steps: Step[] = [
    {
      id: 1,
      num: "01",
      tag: "Discover",
      title: "Discover the Craft",
      shortDesc: "Browse the curated library",
      description: "Explore our curated feed of highly optimized prompt templates. Use search and filter badges to narrow down exact formulas built by creators who have shipped before.",
    },
    {
      id: 2,
      num: "02",
      tag: "Select & Copy",
      title: "Select & Copy",
      shortDesc: "Inspect and export templates",
      description: "Click cards to inspect variables, templates, and outputs. Export prompts instantly using copy plain text, or download structured TXT and formatted DOC documents.",
    },
    {
      id: 3,
      num: "03",
      tag: "Run & Create",
      title: "Run & Create",
      shortDesc: "Deploy in AI engines",
      description: "Paste your customized prompt templates directly into ChatGPT, Claude, or Midjourney. Fill in variables to generate production-ready assets and clean output.",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText('Act as a frontend developer. Code a [Type] button component with glassmorphism using Tailwind CSS.');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-white text-neutral-900 font-sans py-20 border-t border-neutral-100 relative">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-grid opacity-30" />
      
      <div className="max-w-7xl mx-auto px-8 sm:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase mb-4 select-none">
            Workflow Guide
          </div>
          <h2 className="font-serif-custom text-4xl sm:text-5xl text-neutral-950 tracking-tight leading-tight font-bold mb-6">
            Get Started in <em className="italic font-bold text-neutral-400">3 Steps</em>
          </h2>
          <p className="text-neutral-500 font-light leading-relaxed text-sm">
            PromptLib bridges the gap between raw input and masterfully engineered results. Follow this simple path to elevate your outputs.
          </p>
        </div>

        {/* Master Card Container */}
        <div className="w-full bg-white rounded-[2.5rem] border border-neutral-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-8 md:p-12 lg:p-16 flex flex-col gap-8">
          
          {/* Horizontal Step Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-neutral-100 pb-8 gap-4">
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left border cursor-pointer ${
                    isActive 
                      ? "bg-[#faf8f5] border-neutral-200/60 shadow-sm" 
                      : "bg-transparent border-transparent hover:bg-neutral-50/50"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all ${
                    isActive ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-400"
                  }`}>
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-base tracking-tight leading-snug">{step.title}</h3>
                    <p className="text-[11px] text-neutral-400 font-light mt-0.5 leading-none">{step.shortDesc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Lower Workspace Area */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[350px]">
            
            {/* Details Panel (Left) */}
            <div className="w-full lg:w-[35%] flex flex-col justify-between py-2">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] block">
                  Step {steps[activeStep - 1].num} / {steps[activeStep - 1].tag}
                </span>
                <h3 className="text-2xl font-serif-custom text-neutral-950 tracking-tight leading-tight">
                  {steps[activeStep - 1].title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">
                  {steps[activeStep - 1].description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100">
                <a 
                  href="/prompts" 
                  className="btn-pill btn-pill-white flex items-center justify-center gap-2 text-xs font-bold uppercase py-2.5 px-6 border border-neutral-200/80 shadow-sm cursor-pointer inline-flex w-fit"
                >
                  Explore Feed
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </a>
              </div>
            </div>

            {/* Mockup Workspace Preview (Right) */}
            <div className="w-full lg:w-[65%] rounded-[1.8rem] border border-neutral-200/40 p-6 md:p-8 flex items-center justify-center relative overflow-hidden min-h-[340px] select-none">
              
              {/* Background Image Container */}
              <div className="absolute inset-0 z-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-[1.02]" 
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005198143-e528346d9a99?q=80&w=2564&auto=format&fit=crop')" }}
                />
                {/* Soft Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Overlapping Glass Card Stack Container */}
              <div className="relative w-full max-w-sm z-10 flex justify-center">
                
                {/* 1. Large Frosted Glass Background Card (Behind, perfectly centered) */}
                <div className="absolute -inset-4 rounded-[1.6rem] bg-white/5 backdrop-blur-[20px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-0" />
     
                {/* 2. Dynamic Mockup Card (Front, perfectly concentric) */}
                <div className="relative z-10 w-full">
                  {/* Workspace Step 1 */}
                  {activeStep === 1 && (
                    <div className="bg-white rounded-[1.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.16)] p-5 border border-white/40 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300 backdrop-blur-sm bg-white/95">
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Search Engine</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-400" />
                          <div className="w-2 h-2 rounded-full bg-amber-400" />
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                      </div>
                      <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-3 flex items-center gap-3">
                        <Search className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                        <span className="text-xs text-neutral-400 font-sans truncate">Search prompts...</span>
                      </div>
                      
                      {/* Grid of mini cards */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#fcfbf9] rounded-xl border border-neutral-200/40 p-2.5 flex flex-col justify-between h-[64px]">
                          <span className="text-[7px] font-bold text-neutral-400 uppercase tracking-wider">UI Design</span>
                          <h4 className="text-[9.5px] font-bold text-neutral-800 leading-tight">Glassmorphic pill</h4>
                        </div>
                        <div className="bg-[#fcfbf9] rounded-xl border border-neutral-200/40 p-2.5 flex flex-col justify-between h-[64px]">
                          <span className="text-[7px] font-bold text-neutral-400 uppercase tracking-wider">Coding</span>
                          <h4 className="text-[9.5px] font-bold text-neutral-800 leading-tight">API route setup</h4>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Workspace Step 2 */}
                  {activeStep === 2 && (
                    <div className="bg-white rounded-[1.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.16)] p-5 border border-white/40 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300 backdrop-blur-sm bg-white/95">
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Prompt Card Details</span>
                        <span className="text-[9px] text-neutral-500 bg-amber-50 border border-amber-200/60 text-amber-800 font-bold px-2 py-0.5 rounded-full">[Type]</span>
                      </div>
                      <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-4">
                        <p className="text-[11px] text-neutral-600 font-sans leading-relaxed">
                          Act as a frontend developer. Code a <span className="bg-[#e8e2d7] text-neutral-900 px-1 py-0.5 rounded font-bold">[Type]</span> button component with glassmorphism using Tailwind CSS.
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1 text-[9px] font-bold py-1.5 px-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-default" title="Download Text">
                            <FileText className="w-3.5 h-3.5 text-neutral-500" />
                            TXT
                          </button>
                          <button className="flex items-center gap-1 text-[9px] font-bold py-1.5 px-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-default" title="Download Document">
                            <Layout className="w-3.5 h-3.5 text-neutral-500" />
                            DOC
                          </button>
                        </div>
                        <button 
                          onClick={handleCopy}
                          className="flex items-center gap-2 py-2 px-4 rounded-xl bg-neutral-950 text-white text-[10px] font-bold shadow-md cursor-pointer active:scale-95 transition-all"
                        >
                          {copied ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          {copied ? "Copied!" : "Copy Prompt"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Workspace Step 3 */}
                  {activeStep === 3 && (
                    <div className="bg-white rounded-[1.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.16)] p-5 border border-white/40 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300 backdrop-blur-sm bg-white/95">
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">ChatGPT Run</span>
                        <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-bold">
                          <Sparkles className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500 animate-pulse" />
                          Active
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200/40 text-[10px] text-neutral-500 font-sans">
                          &gt; Paste prompt with variables...
                        </div>
                        <div className="bg-neutral-950 text-white rounded-xl p-3 text-[10px] leading-relaxed shadow-sm font-sans flex items-start gap-2 border border-neutral-800">
                          <span className="w-4 h-4 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-[8px] font-black">AI</span>
                          <p>Component generated! Ready to ship.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
