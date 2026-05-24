"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Trash2, Heart, ExternalLink, ChevronRight } from "lucide-react";

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

interface SavedSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  prompts: PromptItem[];
  onRemove: (id: string) => void;
  onSelect: (item: PromptItem) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
}

export default function SavedSidebar({
  isOpen,
  onClose,
  savedIds,
  prompts,
  onRemove,
  onSelect,
  copyToClipboard,
  copiedId,
}: SavedSidebarProps) {
  // Find all prompt objects that match the saved IDs
  const savedPrompts = prompts.filter((item) => savedIds.includes(item.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 cursor-pointer lg:hidden"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] bg-white shadow-2xl z-50 flex flex-col border-l border-neutral-100"
          >
            {/* Collapse Tab Button attached to left edge */}
            <button
              onClick={onClose}
              className="hidden lg:flex absolute left-0 top-24 -translate-x-full bg-white border-y border-l border-neutral-200/80 shadow-[-6px_4px_16px_rgba(0,0,0,0.06)] hover:bg-neutral-50 text-neutral-500 hover:text-neutral-800 transition-all rounded-l-xl py-3.5 px-2 items-center justify-center cursor-pointer group"
              title="Collapse Sidebar"
            >
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            {/* Sidebar Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <h2 className="font-bold text-neutral-900 text-lg">Saved Prompts</h2>
                <span className="bg-neutral-100 text-neutral-600 rounded-full px-2.5 py-0.5 text-xs font-bold">
                  {savedPrompts.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-neutral-600 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="Close Sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              {savedPrompts.length === 0 ? (
                /* Empty State */
                <div className="h-full flex flex-col items-center justify-center text-center p-4 select-none">
                  <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-6 text-rose-400">
                    <Heart className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-800 mb-2">No Saved Prompts</h3>
                  <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">
                    Click the heart icon on prompt cards to save them here for quick access and copying.
                  </p>
                </div>
              ) : (
                /* Prompts List */
                <div className="space-y-4">
                  {savedPrompts.map((item) => (
                    <div
                      key={item.id}
                      className="group p-4 bg-white border border-neutral-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-200 flex gap-4 relative overflow-hidden"
                    >
                      {/* Image Thumbnail */}
                      <div
                        onClick={() => onSelect(item)}
                        className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 cursor-pointer border border-neutral-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative group/thumb"
                      >
                        <img
                          src={item.imagePath}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Prompt Information & Actions */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div onClick={() => onSelect(item)} className="cursor-pointer">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5 block">
                            {item.category}
                          </span>
                          <h4 className="text-sm font-bold text-neutral-900 leading-snug truncate group-hover:text-neutral-950 transition-colors">
                            {item.title}
                          </h4>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-3 mt-2 select-none">
                          {/* Quick Copy Button */}
                          <button
                            onClick={() => copyToClipboard(item.promptText, item.id)}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-800 hover:text-neutral-950 transition-colors cursor-pointer"
                          >
                            {copiedId === item.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-600">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-neutral-500" />
                                <span>Copy Prompt</span>
                              </>
                            )}
                          </button>

                          {/* Quick Unsave Button */}
                          <button
                            onClick={() => onRemove(item.id)}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer ml-auto"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Footer removed */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
