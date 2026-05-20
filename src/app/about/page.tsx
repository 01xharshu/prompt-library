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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex justify-center py-20 px-6 sm:px-12 font-mono text-[15px] leading-relaxed text-zinc-600">
      <div className="max-w-[600px] w-full flex flex-col gap-8">
        
        {/* Header Icon */}
        <div className="mb-2">
          <AsteriskIcon />
        </div>

        {/* Letter Content */}
        <div className="space-y-6">
          <p className="text-zinc-900 font-bold text-[17px]">
            Don't start from<br />
            a blank prompt ever again.
          </p>

          <p>
            I used to spend ~2-3 hours per day searching for prompt inspiration, system instructions, optimal workflows, and use-cases to get the best out of AI.
          </p>

          <p>
            During my experiments I started to gather a lot of highly-effective prompts, custom instructions, and AI workflows. And now I want to share it with you through this library.
          </p>
          
          <p className="pt-2">
            — <a href="https://x.com/heyaharshu" target="_blank" rel="noreferrer" className="text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-colors">Harsh Mishra</a>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-[#fcfcfc] border border-zinc-100 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
            <h3 className="font-serif text-4xl text-zinc-900 tracking-tight">200+</h3>
            <p className="text-sm">
              Write prompts faster. Find and use unique AI templates. Copy and paste them directly into ChatGPT, Claude, or Gemini!
            </p>
          </div>

          <div className="bg-[#fcfcfc] border border-zinc-100 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
            <h3 className="font-serif text-4xl text-zinc-900 tracking-tight">50+</h3>
            <p className="text-sm">
              See how the best build their AI experiences and don't get lost in the prompt engineering process.
            </p>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="bg-[#fcfcfc] border border-zinc-100 rounded-2xl p-6 sm:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex flex-col items-center text-center gap-6">
          <p className="text-sm italic max-w-md mx-auto">
            "So much value in this! I was impressed you can just click copy, then paste in your AI tool and you have the whole workflow ready to go. Amazing work 🙌"
          </p>
          
          <div className="flex items-center gap-3 text-left">
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" 
              alt="Avatar" 
              className="w-8 h-8 rounded-full object-cover border border-zinc-200"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-900">David Gutiérrez</span>
              <span className="text-xs text-zinc-500">Founder of AI Tools</span>
            </div>
          </div>
        </div>
        
        {/* Footer Link */}
        <div className="flex justify-center mt-8">
           <a 
            href="/" 
            className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2"
          >
            Visit the Prompt Library 
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

      </div>
    </div>
  );
}
