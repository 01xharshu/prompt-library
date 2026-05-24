"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Download, Heart, ArrowLeft, X, Check, Search, Filter, Dices, ExternalLink } from "lucide-react";
import Link from "next/link";

import promptData from "@/data/prompts.json";
import SavedSidebar from "../components/SavedSidebar";
import Footer from "../components/Footer";

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
  const [imgSrc, setImgSrc] = useState(item.imagePath);
  const [imgError, setImgError] = useState(false);
  const hasTriedFallback = React.useRef(false);

  // Reset image source when item changes
  React.useEffect(() => {
    setImgSrc(item.imagePath);
    setImgError(false);
    hasTriedFallback.current = false;
  }, [item.imagePath]);

  return (
    <div
      onClick={() => setActivePrompt(item)}
      className="break-inside-avoid mb-6 rounded-[1.8rem] border border-neutral-100 bg-[#f6f6f8] border-[10px] border-white shadow-[0_16px_36px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] cursor-pointer group transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_24px_48px_rgba(0,0,0,0.14),0_8px_20px_rgba(0,0,0,0.05)] relative overflow-hidden"
    >
      {/* Aspect-ratio preserving wrapper */}
      <div
        className="w-full bg-neutral-100/70 rounded-[1.2rem] overflow-hidden relative"
        style={{
          aspectRatio: aspectRatio && aspectRatio > 0 ? `${aspectRatio}` : "4/3",
          transition: "aspect-ratio 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        {imgSrc && !imgError ? (
          <img
            src={imgSrc}
            alt={item.title}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"

            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalWidth && img.naturalHeight && img.naturalHeight > 0) {
                const ratio = img.naturalWidth / img.naturalHeight;
                if (!isNaN(ratio) && isFinite(ratio) && ratio > 0) {
                  setAspectRatio(ratio);
                }
              }
            }}
            onError={() => {
              if (!hasTriedFallback.current) {
                hasTriedFallback.current = true;
                setImgSrc("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600");
                setAspectRatio(1.5);
              } else {
                // Both original and fallback failed — show placeholder
                setImgError(true);
              }
            }}
          />
        ) : (
          /* Placeholder when image completely fails */
          <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
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
  const [savedPromptIds, setSavedPromptIds] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Stack of active prompts for backward navigation history
  interface ActivePromptState {
    item: PromptItem;
    isExpanded: boolean;
    feed: PromptItem[];
  }
  const [activePromptStack, setActivePromptStack] = useState<ActivePromptState[]>([]);
  const touchStartY = React.useRef(0);

  const currentActive = activePromptStack[activePromptStack.length - 1];
  const activePrompt = currentActive ? currentActive.item : null;
  const isExpanded = currentActive ? currentActive.isExpanded : false;

  const generateShuffledFeed = (currentItemId: string) => {
    // Exclude the currently active prompt to avoid redundancy
    const baseList = prompts.filter(p => p.id !== currentItemId);
    const shuffled = [...baseList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleOpenPrompt = (item: PromptItem) => {
    setActivePromptStack([{ item, isExpanded: false, feed: generateShuffledFeed(item.id) }]);
  };

  const handlePushPrompt = (item: PromptItem) => {
    setActivePromptStack(prev => [...prev, { item, isExpanded: false, feed: generateShuffledFeed(item.id) }]);
  };

  const handleGoBack = () => {
    setActivePromptStack(prev => prev.slice(0, -1));
  };

  const setTopExpanded = (val: boolean) => {
    setActivePromptStack(prev => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      next[next.length - 1] = {
        ...next[next.length - 1],
        isExpanded: val
      };
      return next;
    });
  };

  // Copied Alert State (tracks which item id has just been copied)
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Search and Layout states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVibe, setActiveVibe] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Vibe Extraction Logic
  const VIBE_KEYWORDS = ["3d", "anime", "cinematic", "cyberpunk", "minimalist", "neon", "photorealistic", "abstract", "vintage", "fantasy"];

  const availableVibes = React.useMemo(() => {
    const vibes = new Set<string>();
    prompts.forEach(p => {
      const text = p.promptText.toLowerCase();
      VIBE_KEYWORDS.forEach(v => {
        if (text.includes(v)) vibes.add(v.charAt(0).toUpperCase() + v.slice(1));
      });
    });
    return Array.from(vibes);
  }, [prompts]);



  // Clear filters helper
  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveVibe(null);
  };

  // Select dynamic columns class
  const getColumnClass = () => {
    return "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]";
  };

  // Filtered prompts list
  const filteredPrompts = prompts.filter(item => {
    const queryMatch = !searchQuery.trim() || (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.promptText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const vibeMatch = !activeVibe || item.promptText.toLowerCase().includes(activeVibe.toLowerCase());

    return queryMatch && vibeMatch;
  });

  const activeFiltersCount = (searchQuery.trim() ? 1 : 0) + (activeVibe ? 1 : 0);

  // Fetch prompts from GitHub JSON API with local fallback
  useEffect(() => {
    const IMAGE_BASE_URL = "https://01xharshu.github.io/image-prompt-api/";

    const fetchPrompts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://raw.githubusercontent.com/01xharshu/image-prompt-api/main/data/prompts.json?t=${Date.now()}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch live prompts (Status ${response.status})`);
        }
        const data = await response.json();

        // Map simplified API shape (id, image, prompt) to rich PromptItem layout
        const mappedData = data.map((item: any, index: number) => {
          const promptText = item.prompt || "";
          const id = String(item.id || index + 1);

          // Normalize image URL: handle both absolute URLs and relative paths from the API
          let imagePath = "";
          if (item.image) {
            const rawImage = item.image.trim();
            if (rawImage.startsWith("http://") || rawImage.startsWith("https://")) {
              // Already an absolute URL — use as-is
              imagePath = rawImage;
            } else {
              // Relative path (e.g. "images/image13.jpg") — resolve against the GitHub Pages base
              const relativePath = rawImage.startsWith("/") ? rawImage.slice(1) : rawImage;
              imagePath = `${IMAGE_BASE_URL}${relativePath}`;
            }
          }

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

        // Shuffle the fetched array automatically
        for (let i = mappedData.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [mappedData[i], mappedData[j]] = [mappedData[j], mappedData[i]];
        }
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
        // Shuffle fallback array automatically
        for (let i = localMapped.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [localMapped[i], localMapped[j]] = [localMapped[j], localMapped[i]];
        }
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
    setSavedPromptIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
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
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 30) {
      setTopExpanded(true);
    } else if (scrollTop <= 5) {
      setTopExpanded(false);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!isExpanded && e.deltaY > 0) {
      setTopExpanded(true);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isExpanded) {
      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY.current - touchEndY;
      if (diffY > 10) { // Swiped up
        setTopExpanded(true);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-neutral-900 font-sans overflow-x-hidden">
      <div className={`transition-all duration-500 ease-in-out ${isSidebarOpen ? "lg:pr-[420px]" : ""}`}>

        {/* Back to Home Button (Top Left) */}
        <div className="absolute sm:fixed top-4 left-4 sm:top-8 sm:left-8 z-40 select-none">
          <Link
            href="/"
            className="btn-pill btn-pill-white flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase py-2 px-4 sm:px-6 border border-neutral-200/80 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-500" />
            Home
          </Link>
        </div>

        {/* Saved Prompts Toggle Button (Top Right) */}
        <div className={`absolute sm:fixed top-4 right-4 sm:top-8 sm:right-8 z-40 select-none transition-all duration-300 ${isSidebarOpen ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"}`}>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="btn-pill btn-pill-white flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase py-2 px-4 sm:px-6 border border-neutral-200/80 shadow-sm relative cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            Saved
          </button>
        </div>

        {/* D. Page Header Block */}
        <header className="w-full max-w-6xl mx-auto px-6 pt-20 sm:pt-28 pb-10 sm:pb-14 flex flex-col items-center justify-center text-center select-none relative z-20">
          <h1 className="font-serif-custom text-5xl sm:text-6xl md:text-7xl text-neutral-950 tracking-tight leading-tight font-bold mb-4">
            Copy. Paste. <em className="italic font-bold text-neutral-400">Generate.</em>
          </h1>
          <p className="text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase max-w-lg mt-2 select-none">
            Curated Prompts from Social Media & Top Creators
          </p>
        </header>

        {/* Search and Filters Control Panel */}
        <section className="w-full max-w-6xl mx-auto px-6 mb-8 flex flex-col items-center justify-center gap-4 select-none relative z-20">
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            {/* Search Pill */}
            <div className="pill-search-container w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pill-search-input"
              />
              <button className="pill-search-btn" title="Search">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-semibold transition-all active:scale-95 shadow-sm hover:shadow-md ${showFilters || activeVibe
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300"
                }`}
            >
              <Filter className="w-4 h-4" />
              Filter
              {activeVibe && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-neutral-900 text-[10px] ml-1 font-bold shadow-sm">
                  1
                </span>
              )}
            </button>

            {/* Clear Filters (only if filters are active) */}
            {(searchQuery.trim() || activeVibe) && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-3 rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-500 shadow-sm hover:bg-neutral-50 transition-all active:scale-95"
                title="Clear Filters"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>

          {/* Vibes Filter Vertical Slide - Animates in when showFilters is true */}
          <AnimatePresence>
            {showFilters && availableVibes.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: -10 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full overflow-hidden"
              >
                <div className="w-full flex items-center justify-start sm:justify-center overflow-x-auto pb-4 pt-2 gap-2 no-scrollbar px-2">
                  {availableVibes.map(vibe => (
                    <button
                      key={vibe}
                      onClick={() => setActiveVibe(activeVibe === vibe ? null : vibe)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border ${activeVibe === vibe
                          ? "bg-neutral-900 text-white border-neutral-900 shadow-md"
                          : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                        }`}
                    >
                      {vibe}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* E. Pinterest Masonry Feed Grid */}
        <main className="w-full max-w-7xl mx-auto px-6 pb-40 relative z-20">

          {loading ? (
            /* Premium Masonry Loading Skeletons */
            <div className={getColumnClass()}>
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
                  className={`break-inside-avoid mb-6 rounded-[1.8rem] bg-neutral-50 border-[10px] border-white shadow-[0_16px_36px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] relative overflow-hidden animate-pulse ${skele.height}`}
                >
                  <div className="w-full h-full bg-neutral-200/50" />
                  <div className="absolute bottom-5 left-5 right-5 space-y-2">
                    <div className="h-2 w-1/4 bg-neutral-300/80 rounded" />
                    <div className="h-4 w-3/4 bg-neutral-300/80 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPrompts.length === 0 ? (
            /* Empty Search Results State */
            <div className="flex flex-col items-center justify-center py-20 text-center select-none animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6 text-neutral-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">No Prompts Found</h3>
              <p className="text-neutral-500 text-sm max-w-md mb-8">
                We couldn't find any prompts matching "{searchQuery}". Try adjusting your keywords or clearing the search.
              </p>
              <button
                onClick={clearAllFilters}
                className="btn-pill btn-pill-black px-8 py-3 text-sm font-semibold transition-all duration-200"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className={getColumnClass()}>
              {filteredPrompts.map((item) => (
                <PromptCard
                  key={item.id}
                  item={item}
                  copiedId={copiedId}
                  copyToClipboard={copyToClipboard}
                  setActivePrompt={handleOpenPrompt}
                />
              ))}
            </div>
          )}
        </main>



        {/* G. Dynamic Sub-Window Detail Overlay View (Breadcrumbed and Reload-Free) */}
        <AnimatePresence>
          {activePrompt && (
            <motion.div
              id="prompt-detail-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 z-50 transition-all duration-500 select-none overflow-y-auto ${isExpanded
                  ? "bg-white backdrop-blur-none flex items-start justify-center p-0"
                  : "bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10"
                }`}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  handleGoBack();
                }
              }}
              onScroll={handleScroll}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className={`w-full bg-white relative pointer-events-auto transition-all duration-500 ${isExpanded
                    ? "max-w-7xl min-h-screen rounded-none border-none shadow-none overflow-x-hidden flex flex-col"
                    : "max-w-5xl min-h-0 rounded-[2.5rem] sm:border border-neutral-200/85 shadow-2xl overflow-x-hidden flex flex-col"
                  }`}
                onClick={(e) => e.stopPropagation()} // Prevent close on background click
              >

                {/* Close Button top-right (Fixed for Mobile) */}
                <button
                  onClick={handleGoBack}
                  className="fixed sm:absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md sm:bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/60 flex items-center justify-center text-neutral-700 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Detail section wrapper */}
                <div className="flex flex-col md:flex-row w-full border-b border-neutral-100">
                  {/* Left Column: Visual presentation */}
                  <div className="w-full md:w-1/2 p-6 flex items-center justify-center bg-neutral-50 select-none border-b md:border-b-0 md:border-r border-neutral-200/60">
                    <img
                      src={activePrompt.imagePath}
                      alt={activePrompt.title}
                      className="w-full h-auto max-h-[70vh] object-contain rounded-[1.5rem] shadow-[0_12px_30px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-neutral-200/60"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.dataset.fallback) {
                          img.dataset.fallback = "true";
                          img.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600";
                        }
                      }}
                    />
                  </div>

                  {/* Right Column: Breadcrumbs and Prompt Editor Box */}
                  <div className="w-full md:w-1/2 p-5 sm:p-8 flex flex-col justify-between text-neutral-900">

                    {/* Upper Details Block */}
                    <div>
                      {/* Breadcrumb Navigation - clickable return to index feed */}
                      <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-6 select-none">
                        <button
                          onClick={handleGoBack}
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

                      {/* Title */}
                      <h2 className="font-serif-custom text-3xl md:text-4xl text-neutral-950 font-bold tracking-tight leading-tight mb-6">
                        {activePrompt.title}
                      </h2>

                      {/* Code Editor Box containing prompt */}
                      <div className="mb-6">
                        <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl p-5 font-sans text-sm text-neutral-800 select-all max-h-[220px] overflow-y-auto whitespace-pre-wrap break-words leading-relaxed no-scrollbar">
                          {activePrompt.promptText}
                        </div>
                      </div>
                    </div>

                    {/* Lower Action buttons grid */}
                    <div>
                      <h4 className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-3 select-none">
                        Prompt Actions
                      </h4>

                      <div className="grid grid-cols-2 gap-3 select-none mb-3">

                        {/* Copy Prompt Text */}
                        <button
                          onClick={() => copyToClipboard(activePrompt.promptText, activePrompt.id)}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-neutral-200 bg-white text-[10px] sm:text-xs font-bold text-neutral-700 shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                          {copiedId === activePrompt.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy<span className="hidden sm:inline"> Prompt</span>
                            </>
                          )}
                        </button>

                        {/* Toggle Save state */}
                        <button
                          onClick={() => toggleSave(activePrompt.id)}
                          className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border bg-white text-[10px] sm:text-xs font-bold shadow-sm hover:shadow-md transition-all active:scale-95 ${savedPromptIds.includes(activePrompt.id)
                              ? "border-[#c5a044]/30 text-[#c5a044]"
                              : "border-neutral-200 text-neutral-700"
                            }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${savedPromptIds.includes(activePrompt.id) ? "fill-current" : ""}`} />
                          {savedPromptIds.includes(activePrompt.id) ? "Saved" : "Save"}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 select-none mb-3">
                        {/* Open in ChatGPT */}
                        <button
                          onClick={() => {
                            copyToClipboard(activePrompt.promptText, activePrompt.id);
                            window.open(`https://chatgpt.com/?q=${encodeURIComponent(activePrompt.promptText)}`, "_blank");
                          }}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-neutral-200 bg-white text-[10px] sm:text-xs font-bold text-[#10a37f] shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Open in </span>ChatGPT
                        </button>

                        {/* Open in Gemini */}
                        <button
                          onClick={() => {
                            copyToClipboard(activePrompt.promptText, activePrompt.id);
                            window.open("https://gemini.google.com/app", "_blank");
                          }}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-neutral-200 bg-white text-[10px] sm:text-xs font-bold text-[#1d4ed8] shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Open in </span>Gemini
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 select-none">
                        {/* Download TXT file */}
                        <button
                          onClick={() => downloadAsTxt(activePrompt.title, activePrompt.promptText)}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-neutral-200 bg-white text-[10px] sm:text-xs font-bold text-neutral-700 shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Download </span>TXT
                        </button>

                        {/* Download DOC file */}
                        <button
                          onClick={() => downloadAsDoc(activePrompt.title, activePrompt.promptText)}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-neutral-200 bg-white text-[10px] sm:text-xs font-bold text-neutral-700 shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Download </span>DOC
                        </button>

                      </div>
                    </div>

                  </div>
                </div>

                {/* Lower Section: Pinterest-style feed (More Prompts / Continue Browsing) */}
                {isExpanded && (
                  <div className="w-full p-6 sm:p-8 md:p-10 bg-white border-t border-neutral-100 animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 select-none">
                      <div>
                        <h3 className="font-serif-custom text-2xl sm:text-3xl font-bold text-neutral-950">
                          Explore More Prompts
                        </h3>
                        <p className="text-xs text-neutral-400 font-light mt-1">
                          Continue browsing and discover other curated prompt templates
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-neutral-50 border border-neutral-200/50 rounded-full px-3 py-1 w-fit">
                        {currentActive?.feed.length || 0} Prompts
                      </span>
                    </div>

                    {/* Pinterest Masonry Grid */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
                      {currentActive?.feed.map((item) => (
                        <PromptCard
                          key={item.id}
                          item={item}
                          copiedId={copiedId}
                          copyToClipboard={copyToClipboard}
                          setActivePrompt={(newItem) => {
                            handlePushPrompt(newItem);
                            const backdropElement = document.getElementById("prompt-detail-modal-backdrop");
                            if (backdropElement) {
                              backdropElement.scrollTo({ top: 0, behavior: "smooth" });
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ FOOTER ═══ */}
        <Footer />

      </div>

      <SavedSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        savedIds={savedPromptIds}
        prompts={prompts}
        onRemove={handleRemoveSaved}
        onSelect={(item) => {
          setIsSidebarOpen(false);
          handleOpenPrompt(item);
        }}
        copyToClipboard={copyToClipboard}
        copiedId={copiedId}
      />
    </div>
  );
}
