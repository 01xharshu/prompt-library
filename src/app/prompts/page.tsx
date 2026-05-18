"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Download, Heart, ArrowLeft, X, Check } from "lucide-react";
import Link from "next/link";

import promptData from "@/data/prompts.json";

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

interface PromptCardProps {
  item: PromptItem;
  copiedId: string | null;
  copyToClipboard: (text: string, id: string) => void;
  setActivePrompt: (item: PromptItem) => void;
}

function PromptCard({ item, copiedId, copyToClipboard, setActivePrompt }: PromptCardProps) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={() => setActivePrompt(item)}
      className="break-inside-avoid mb-6 rounded-[1.8rem] border border-neutral-100 bg-[#f6f6f8] border-[10px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] cursor-pointer group transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] relative overflow-hidden"
    >
      {/* Aspect-ratio preserving wrapper */}
      <div
        className="w-full bg-neutral-100/70 rounded-[1.2rem] overflow-hidden relative"
        style={{
          aspectRatio: aspectRatio ? `${aspectRatio}` : "4/3",
          transition: "aspect-ratio 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <img
          src={item.imagePath}
          alt={item.title}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight) {
              setAspectRatio(img.naturalWidth / img.naturalHeight);
              setLoaded(true);
            }
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600";
            setAspectRatio(1.5);
            setLoaded(true);
          }}
        />

        {!loaded && (
          <div className="absolute inset-0 bg-neutral-100/80 animate-pulse rounded-[1.2rem]" />
        )}
      </div>

      {/* Hover UI overlay ON the card */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 rounded-[1.8rem]">

        {/* Top: Quick Copy Button */}
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Avoid opening the modal!
              copyToClipboard(item.promptText, item.id);
            }}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95"
            title="Copy Prompt"
          >
            {copiedId === item.id ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Bottom: Truncated Title */}
        <div className="text-left select-none">
          {item.category && (
            <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-300 mb-1 block">
              {item.category}
            </span>
          )}
          <h3 className="text-base font-black text-white tracking-tight leading-tight">
            {item.title.length > 25 ? `${item.title.substring(0, 22)}..` : item.title}
          </h3>
        </div>

      </div>
    </div>
  );
}

export default function PromptsFeed() {
  // Mapped Live Prompts State
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Saved Prompts Tracker State
  const [savedPromptIds, setSavedPromptIds] = useState<string[]>(["portrait"]);

  // Active Detail Window State
  const [activePrompt, setActivePrompt] = useState<PromptItem | null>(null);

  // Copied Alert State (tracks which item id has just been copied)
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch prompts from GitHub JSON API with local fallback
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://cdn.jsdelivr.net/gh/01xharshu/image-prompt-api@main/data/prompts.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch live prompts (Status ${response.status})`);
        }
        const data = await response.json();

        // Map simplified API shape (id, image, prompt) to rich PromptItem layout
        const mappedData = data.map((item: any) => {
          const promptText = item.prompt || "";
          const id = String(item.id || Math.random());
          const imagePath = item.image || "";

          let title = "AI Prompt Asset";
          let category = item.category || "";
          let description = "A high-quality generated AI prompt.";
          let avatar = "AI";
          let authorName = "Prompt Architect";

          const lowerPrompt = promptText.toLowerCase();
          if (lowerPrompt.includes("discord")) {
            title = "Inflatable Discord Logo";
            description = "Generates a realistic 3D inflatable logo of Discord, designed as a soft, air-filled pillow icon with a soft fabric texture.";
            avatar = "DC";
            authorName = "Discord Designer";
          } else if (lowerPrompt.includes("figma")) {
            title = "Translucent Figma Logo";
            description = "Generates a 3D glass translucent Figma logo with slightly rounded edges on a clean white background.";
            avatar = "FG";
            authorName = "Figma Artist";
          } else {
            // Intelligent fallback parsing
            const words = promptText.split(/\s+/).filter(Boolean);
            if (words.length > 0) {
              const cleanWords = words.slice(0, 4).map((w: string) => w.replace(/[^a-zA-Z0-9]/g, ""));
              title = cleanWords.filter(Boolean).join(" ");
              if (title.length > 0) {
                title = title.charAt(0).toUpperCase() + title.slice(1);
              } else {
                title = "AI Design Prompt";
              }
            }
            description = promptText.length > 120 ? promptText.substring(0, 120) + "..." : promptText;
          }

          return {
            id,
            title,
            category,
            description,
            promptText,
            imagePath,
            aspectRatio: "aspect-square",
            views: "1,245",
            saves: "418",
            author: {
              name: authorName,
              avatar: avatar
            }
          };
        });

        setPrompts(mappedData);
      } catch (err: any) {
        console.error("Failed to load live prompts feed:", err);
        setError(err.message || "Network error fetching prompts library.");

        // Graceful fallback to gorgeous local prompts so page is never broken!
        const localMapped = promptData.map((item: any) => ({
          id: item.id || String(Math.random()),
          title: item.title || "AI Prompt Asset",
          category: item.category || "",
          description: item.description || "",
          promptText: item.promptText || "",
          imagePath: item.imagePath || "",
          aspectRatio: item.aspectRatio || "aspect-square",
          views: item.views || "1,200",
          saves: item.saves || "350",
          author: item.author || { name: "Local Creator", avatar: "LC" }
        }));
        setPrompts(localMapped);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  // Copy Plain Text Prompt
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Toggle Save Prompt
  const toggleSave = (id: string) => {
    setSavedPromptIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Download Prompt as a .txt file
  const downloadAsTxt = (title: string, promptText: string) => {
    const file = new Blob([promptText], { type: 'text/plain;charset=utf-8' });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/\s+/g, "_")}_prompt.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download Prompt as a .doc file
  const downloadAsDoc = (title: string, promptText: string) => {
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><title>Prompt Export</title><style>body { font-family: Arial, sans-serif; font-size: 12pt; }</style></head><body>";
    const footer = "</body></html>";
    const htmlContent = header + "<h2>" + title + "</h2><p style='white-space: pre-wrap;'>" + promptText + "</p>" + footer;

    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = url;
    element.download = `${title.toLowerCase().replace(/\s+/g, "_")}_prompt.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="relative min-h-screen bg-white text-neutral-900 font-sans overflow-x-hidden">

      {/* Back to Home Button (Top Left) */}
      <div className="absolute sm:fixed top-6 left-6 sm:top-8 sm:left-8 z-40 select-none">
        <Link
          href="/"
          className="btn-scalloped btn-scalloped-white flex items-center gap-2 text-xs font-bold uppercase py-2.5 px-6 border border-neutral-200/80 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-neutral-500" />
          Gateway
        </Link>
      </div>

      {/* D. Page Header Block */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-28 pb-14 flex flex-col items-center justify-center text-center select-none relative z-20">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase text-neutral-950 leading-[0.9] mb-4">
          Copy. Paste. <span className="text-neutral-400">Generate.</span>
        </h1>
        <p className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-neutral-500 font-bold max-w-lg mt-1 select-none">
          Curated Production-Ready AI Prompts
        </p>
      </header>

      {/* E. Pinterest Masonry Feed Grid */}
      <main className="w-full max-w-7xl mx-auto px-6 pb-40 relative z-20">

        {loading ? (
          /* Premium Masonry Loading Skeletons */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]">
            {[
              { height: "h-72" },
              { height: "h-96" },
              { height: "h-64" },
              { height: "h-80" },
              { height: "h-96" },
              { height: "h-72" },
              { height: "h-80" },
              { height: "h-64" }
            ].map((skele, idx) => (
              <div
                key={idx}
                className={`break-inside-avoid mb-6 rounded-[1.8rem] bg-neutral-50 border-[10px] border-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.06)] relative overflow-hidden animate-pulse ${skele.height}`}
              >
                <div className="w-full h-full bg-neutral-200/50" />
                <div className="absolute bottom-5 left-5 right-5 space-y-2">
                  <div className="h-2 w-1/4 bg-neutral-300/80 rounded" />
                  <div className="h-4 w-3/4 bg-neutral-300/80 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]">
            {prompts.map((item) => (
              <PromptCard
                key={item.id}
                item={item}
                copiedId={copiedId}
                copyToClipboard={copyToClipboard}
                setActivePrompt={setActivePrompt}
              />
            ))}
          </div>
        )}
      </main>



      {/* G. Dynamic Sub-Window Detail Overlay View (Breadcrumbed and Reload-Free) */}
      <AnimatePresence>
        {activePrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 select-none overflow-y-auto"
            onClick={() => setActivePrompt(null)}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="max-w-5xl w-full rounded-[2.5rem] bg-white border border-neutral-200/85 shadow-2xl overflow-hidden flex flex-col md:flex-row relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()} // Prevent close on background click
            >

              {/* Close Button top-right */}
              <button
                onClick={() => setActivePrompt(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/60 flex items-center justify-center text-neutral-700 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Visual presentation */}
              <div className="w-full md:w-1/2 p-6 flex items-center justify-center bg-neutral-50 select-none border-b md:border-b-0 md:border-r border-neutral-200/60">
                <img
                  src={activePrompt.imagePath}
                  alt={activePrompt.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-[1.5rem] shadow-lg border border-neutral-200/60"
                />
              </div>

              {/* Right Column: Breadcrumbs and Prompt Editor Box */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between text-neutral-900">

                {/* Upper Details Block */}
                <div>
                  {/* Breadcrumb Navigation - clickable return to index feed */}
                  <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-6 select-none">
                    <button
                      onClick={() => setActivePrompt(null)}
                      className="hover:text-neutral-900 transition-colors cursor-pointer"
                    >
                      Library
                    </button>
                    {activePrompt.category && (
                      <>
                        <span>/</span>
                        <span className="text-neutral-400">{activePrompt.category}</span>
                      </>
                    )}
                    <span>/</span>
                    <span className="text-neutral-900 truncate max-w-[130px]">{activePrompt.title}</span>
                  </div>

                  {/* Title & Creator badge */}
                  <h2 className="text-3xl font-black tracking-tight uppercase text-neutral-950 leading-tight mb-2">
                    {activePrompt.title}
                  </h2>

                  <div className="flex items-center gap-2 mb-6 select-none">
                    <div className="w-6 h-6 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[10px] font-black text-neutral-700">
                      {activePrompt.author.avatar}
                    </div>
                    <span className="text-xs text-neutral-500 font-light">
                      Created by <span className="text-neutral-900 font-medium">{activePrompt.author.name}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6 select-text">
                    {activePrompt.description}
                  </p>

                  {/* Code Editor Box containing prompt */}
                  <div className="relative mb-6">
                    <span className="absolute top-3 right-4 text-[9px] font-bold tracking-widest uppercase text-neutral-400 select-none">
                      Prompt Text
                    </span>
                    <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl p-5 font-mono text-sm text-neutral-800 select-all max-h-[220px] overflow-y-auto whitespace-pre-wrap break-words leading-relaxed">
                      {activePrompt.promptText}
                    </div>
                  </div>
                </div>

                {/* Lower Action buttons grid */}
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-3 select-none">
                    Prompt Actions
                  </h4>

                  <div className="grid grid-cols-2 gap-3 select-none">

                    {/* Copy Plain Text */}
                    <button
                      onClick={() => copyToClipboard(activePrompt.promptText, activePrompt.id)}
                      className="btn-scalloped btn-scalloped-black text-xs"
                    >
                      {copiedId === activePrompt.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Plain
                        </>
                      )}
                    </button>

                    {/* Toggle Save state */}
                    <button
                      onClick={() => toggleSave(activePrompt.id)}
                      className={`btn-scalloped text-xs ${savedPromptIds.includes(activePrompt.id) ? "btn-scalloped-gold" : "btn-scalloped-white"
                        }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${savedPromptIds.includes(activePrompt.id) ? "fill-current" : ""}`} />
                      {savedPromptIds.includes(activePrompt.id) ? "Saved" : "Save"}
                    </button>

                    {/* Download TXT file */}
                    <button
                      onClick={() => downloadAsTxt(activePrompt.title, activePrompt.promptText)}
                      className="btn-scalloped btn-scalloped-white text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download TXT
                    </button>

                    {/* Download DOC file */}
                    <button
                      onClick={() => downloadAsDoc(activePrompt.title, activePrompt.promptText)}
                      className="btn-scalloped btn-scalloped-white text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download DOC
                    </button>

                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
