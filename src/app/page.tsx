"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Download, Heart, X, Check } from "lucide-react";

import promptData from "@/data/prompts.json";
import Navbar from "./components/Navbar";
import LoyaltyFeature from "./components/LoyaltyFeature";

interface PromptItem {
  id: string;
  title: string;
  category: string;
  description: string;
  promptText: string;
  imagePath: string;
  aspectRatio: string;
  views: string;
  saves: string;
  author: {
    name: string;
    avatar: string;
  };
}

// Helper utility to safely extract text from JSON fields that might be rich-text objects or ASTs
const extractText = (val: any): string => {
  if (!val) return "";
  if (typeof val === "string" || typeof val === "number") return String(val);
  if (Array.isArray(val)) return val.map(extractText).join(" ");
  if (typeof val === "object") {
    // Traverse standard rich-text CMS object structures
    if (val.children) return extractText(val.children);
    if (val.text) return extractText(val.text);
    if (val.value) return extractText(val.value);
    return ""; // Fallback for unknown objects to prevent crashes
  }
  return String(val);
};

export default function Home() {
  const [promptsCount, setPromptsCount] = useState(142854);
  const [savedPromptIds, setSavedPromptIds] = useState<string[]>([]);
  const [activePrompt, setActivePrompt] = useState<PromptItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Load saved prompt IDs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("saved-prompt-ids");
    if (saved) {
      try {
        setSavedPromptIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved prompt IDs:", e);
      }
    }
  }, []);

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const tick = () => {
      timeoutId = setTimeout(() => {
        setPromptsCount(p => p + Math.floor(Math.random() * 3) + 1);
        tick();
      }, Math.random() * 4000 + 3500);
    };
    tick();
    return () => clearTimeout(timeoutId);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSave = (id: string) => {
    setSavedPromptIds(p => {
      const next = p.includes(id) ? p.filter(x => x !== id) : [...p, id];
      localStorage.setItem("saved-prompt-ids", JSON.stringify(next));
      return next;
    });
  };

  const handleRemoveSaved = (id: string) => {
    setSavedPromptIds(prev => {
      const next = prev.filter(x => x !== id);
      localStorage.setItem("saved-prompt-ids", JSON.stringify(next));
      return next;
    });
  };

  const downloadAsTxt = (title: string, text: string) => {
    const el = document.createElement("a");
    el.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    el.download = `${title.replace(/\s+/g, "_").toLowerCase()}.txt`;
    el.click();
  };

  const downloadAsDoc = (title: string, text: string) => {
    const html = `<html><head><style>body{font-family:Arial;font-size:12pt}</style></head><body><h2>${title}</h2><p style="white-space:pre-wrap">${text}</p></body></html>`;
    const el = document.createElement("a");
    el.href = URL.createObjectURL(new Blob(["\ufeff" + html], { type: "application/msword" }));
    el.download = `${title.replace(/\s+/g, "_").toLowerCase()}.doc`;
    el.click();
  };

  return (
    <div className="relative font-sans overflow-x-hidden bg-white">
      <Navbar />

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative w-full min-h-[90vh] overflow-hidden flex items-center">

        {/* Background Image & Overlays matching the reference */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499956827185-0d63ee78a910?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 z-0 bg-teal-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal-900/70 to-blue-900/60 mix-blend-overlay" />
        <div className="absolute inset-0 z-0 bg-pattern" />

        {/* Background grid lines */}
        <div className="absolute inset-0 z-0 pointer-events-none hero-grid" />

        {/* Left-aligned content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 pt-32 sm:pt-40 pb-20 flex items-center">

          {/* Text block — left side */}
          <div className="w-full md:w-1/2 flex flex-col items-start">

            {/* Live counter pill */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-sm mb-8 select-none">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span className="text-xs font-bold text-white tracking-wide">
                {promptsCount.toLocaleString()} prompts curated
              </span>
            </div>

            <h1 className="font-serif-custom text-5xl sm:text-6xl md:text-[4.2rem] lg:text-[4.8rem] text-white leading-[1.05] tracking-tight mb-6 drop-shadow-md">
              A <em className="italic">prompt</em> needs more than words. It needs a <span className="text-white/90">craft.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-100 font-light leading-relaxed max-w-md mb-10 opacity-95">
              Copy production-ready AI prompts, guided by creators who've shipped before.
            </p>

            {/* CTA buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <a href="#prompts" className="btn-pill btn-pill-white px-10 py-4 text-[1.05rem]">
                Browse Prompts
              </a>
              <a href="/prompts" className="btn-pill btn-pill-glass px-10 py-4 text-[1.05rem]">
                Full Library
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

        {/* White gradient fade at bottom — merges hero into white cards section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[180px] z-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 0%, white 100%)" }}
        />
      </section>

      {/* ═══ PROMPT CARDS SECTION ═══ */}
      <section id="prompts" className="relative bg-white text-neutral-900 pb-32">

        {/* Background grid lines continue */}
        <div className="absolute inset-0 z-0 pointer-events-none hero-grid opacity-50" />

        <main className="relative z-30 w-full max-w-4xl mx-auto px-4 sm:px-5 py-6 my-2 transform -translate-y-12 sm:-translate-y-20">

          {/* Cumulative Giant Frosted Glass Backing Card (Behind all layers, z-10 - ultra-snug layout framing) */}
          <div className="absolute -inset-1.5 sm:-inset-2 rounded-[2.2rem] bg-white/45 backdrop-blur-[16px] border border-neutral-200/60 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.06)] z-10 pointer-events-none" />

          {/* Cards Grid Container (Layered above frosted backplate, z-20) */}
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {promptData.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={(e) => toggleFlip(item.id, e)}
                className="relative z-30 group cursor-pointer select-none [perspective:1000px]"
              >
                {/* Main Flipping Visual Card Container (z-40) */}
                <div 
                  className={`relative z-40 w-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    flippedCards[item.id] ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* FRONT SIDE: Image */}
                  <div className="[backface-visibility:hidden] rounded-2xl overflow-hidden bg-white border border-neutral-200/60 shadow-[0_12px_30px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12),0_6px_16px_rgba(0,0,0,0.04)]">
                    <img
                      src={item.imagePath}
                      alt={extractText(item.title)}
                      className="w-full h-auto object-cover rounded-2xl"
                    />
                  </div>

                  {/* BACK SIDE: Prompt Details (Reduced padding to p-4 for compact spacing) */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-white border border-neutral-200/80 p-4 flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03),inset_0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
                    <div className="flex-1 flex flex-col min-h-0 select-text">
                      <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-400 mb-1 block select-none">
                        {extractText(item.category)}
                      </span>
                      <h3 className="text-sm font-bold text-neutral-900 leading-tight mb-2 select-none">
                        {extractText(item.title)}
                      </h3>
                      <div 
                        className="flex-1 text-[11px] text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-3 font-mono overflow-y-auto min-h-0 whitespace-pre-wrap select-text selection:bg-neutral-200 cursor-text"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {extractText(item.promptText)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-4 select-none">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(extractText(item.promptText), item.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all active:scale-95"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePrompt(item as PromptItem);
                        }}
                        className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-all"
                        title="Expand Details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h6v6" />
                          <path d="M10 14 21 3" />
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>

      {/* ═══ ENDURING LOYALTY FEATURE SECTION ═══ */}
      <LoyaltyFeature />

      {/* ═══ DETAIL MODAL ═══ */}
      <AnimatePresence>
        {activePrompt && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
            onClick={() => setActivePrompt(null)}
          >
            <motion.div
              key="modal-content"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="max-w-5xl w-full rounded-3xl bg-white border border-neutral-200 shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePrompt(null)}
                className="absolute top-5 right-5 z-50 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-neutral-600 transition-all hover:scale-110 active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full md:w-1/2 p-6 flex items-center justify-center bg-neutral-50 border-b md:border-b-0 md:border-r border-neutral-100">
                <img src={activePrompt.imagePath} alt={extractText(activePrompt.title)} className="w-full h-auto max-h-[65vh] object-contain rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-neutral-200/60" />
              </div>

              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between text-neutral-900">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-5 select-none">
                    <button onClick={() => setActivePrompt(null)} className="hover:text-neutral-900 transition-colors">Library</button>
                    <span>/</span><span>{extractText(activePrompt.category)}</span><span>/</span>
                    <span className="text-neutral-700 truncate max-w-[120px]">{extractText(activePrompt.title)}</span>
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-neutral-950 leading-tight mb-1">
                    {extractText(activePrompt.title)}
                  </h2>
                  <div className="flex items-center gap-2 mb-5 select-none">
                    <div className="w-5 h-5 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[9px] font-black text-neutral-600">
                      {extractText(activePrompt.author.avatar)}
                    </div>
                    <span className="text-xs text-neutral-500">
                      by <span className="text-neutral-800 font-medium">{extractText(activePrompt.author.name)}</span>
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-5">
                    {extractText(activePrompt.description)}
                  </p>

                  <div className="relative mb-5">
                    <span className="absolute top-2.5 right-3 text-[8px] font-bold tracking-widest uppercase text-neutral-400 select-none">Prompt</span>
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 font-mono text-[13px] text-neutral-800 select-all max-h-[200px] overflow-y-auto whitespace-pre-wrap break-words leading-relaxed">
                      {extractText(activePrompt.promptText)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 select-none">
                  <button onClick={() => copyToClipboard(extractText(activePrompt.promptText), activePrompt.id)} className="btn-pill btn-pill-black text-xs">
                    {copiedId === activePrompt.id ? <><Check className="w-3.5 h-3.5 text-emerald-400" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy Plain</>}
                  </button>
                  <button onClick={() => toggleSave(activePrompt.id)} className={`btn-pill text-xs ${savedPromptIds.includes(activePrompt.id) ? "btn-pill-gold" : "btn-pill-white"}`}>
                    <Heart className={`w-3.5 h-3.5 ${savedPromptIds.includes(activePrompt.id) ? "fill-current" : ""}`} />
                    {savedPromptIds.includes(activePrompt.id) ? "Saved" : "Save"}
                  </button>
                  <button onClick={() => downloadAsTxt(extractText(activePrompt.title), extractText(activePrompt.promptText))} className="btn-pill btn-pill-white text-xs">
                    <Download className="w-3.5 h-3.5" />Download TXT
                  </button>
                  <button onClick={() => downloadAsDoc(extractText(activePrompt.title), extractText(activePrompt.promptText))} className="btn-pill btn-pill-white text-xs">
                    <Download className="w-3.5 h-3.5" />Download DOC
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}