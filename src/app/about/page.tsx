import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | PromptLib",
  description: "Learn more about PromptLib, a collection of highly-effective, production-ready prompts, custom instructions, and AI workflows created by Harsh Mishra.",
  keywords: ["about promptlib", "harsh mishra", "prompt engineering", "ai instructions"],
};

const AsteriskIcon = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#18181b" 
    strokeWidth="3.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2v20" />
    <path d="M2 12h20" />
    <path d="m4.9 4.9 14.2 14.2" />
    <path d="m4.9 19.1 14.2-14.2" />
  </svg>
);

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans relative overflow-x-hidden">
      <Navbar />
      
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-8 sm:px-12 pt-36 pb-20 flex justify-center">
        <div className="max-w-[600px] w-full flex flex-col gap-10">
          
          {/* Header Icon/Statement */}
          <div className="space-y-6">
            <div className="mb-2">
              <AsteriskIcon />
            </div>
            
            <h1 className="font-serif-custom text-4xl sm:text-5xl text-neutral-950 font-bold tracking-tight leading-tight">
              Don't start from<br />
              a blank prompt ever again.
            </h1>
          </div>

          {/* Letter Body */}
          <div className="space-y-6 text-neutral-500 font-light leading-relaxed text-sm">
            <p>
              I used to spend ~2-3 hours per day searching for prompt inspiration, system instructions, optimal workflows, and use-cases to get the best out of AI.
            </p>
            <p>
              During my experiments, I started to gather a repository of highly-effective prompts, custom instructions, and AI workflows curated directly from social media platforms and top creators. PromptLib is my attempt to share these assets with the world.
            </p>
            <p className="pt-2 text-neutral-950 font-bold">
              — <a href="https://x.com/heyaharshu" target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-950 transition-colors">Harsh Mishra</a>
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="bg-[#faf9f6] border border-neutral-200/50 rounded-[1.8rem] p-6 sm:p-8 flex flex-col gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
              <h3 className="font-serif-custom text-4xl text-neutral-950 font-bold tracking-tight">200+</h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                Write prompts faster. Find and use unique AI templates. Copy and paste them directly into ChatGPT, Claude, or Gemini!
              </p>
            </div>

            <div className="bg-[#faf9f6] border border-neutral-200/50 rounded-[1.8rem] p-6 sm:p-8 flex flex-col gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
              <h3 className="font-serif-custom text-4xl text-neutral-950 font-bold tracking-tight">50+</h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                See how the best build their AI experiences and don't get lost in the prompt engineering process.
              </p>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="bg-[#faf9f6] border border-neutral-200/50 rounded-[1.8rem] p-6 sm:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex flex-col items-center text-center gap-6">
            <p className="text-sm italic font-light text-neutral-600 max-w-md mx-auto leading-relaxed">
              "So much value in this! I was impressed you can just click copy, then paste in your AI tool and you have the whole workflow ready to go. Amazing work 🙌"
            </p>
            
            <div className="flex items-center gap-3 text-left">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" 
                alt="Avatar" 
                className="w-8 h-8 rounded-full object-cover border border-neutral-200"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-neutral-950">David Gutiérrez</span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-sans">Founder of AI Tools</span>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
