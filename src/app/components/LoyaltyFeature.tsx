"use client";

import React, { useState, useRef, useEffect } from "react";

interface Feature {
  id: number;
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function LoyaltyFeature() {
  const [activeId, setActiveId] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const features: Feature[] = [
    {
      id: 1,
      num: "01",
      title: "Interactive Prompt Engineering Playground",
      description: "Tweak, compose, and test your prompts inside a beautifully layered ChatGPT live-input workspace for immediate creative validation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: 2,
      num: "02",
      title: "Aesthetic Visual Pinterest-Style Prompt Feed",
      description: "Browse an immersive, dynamic grid layout that automatically adjusts to beautiful aspect ratios and custom context illustrations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      id: 3,
      num: "03",
      title: "Multi-Format Structured File Downloads",
      description: "Export engineered prompts instantly using Copy Plain text, download as standardized TXT, or download as formatted DOC documents.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
    },
    {
      id: 4,
      num: "04",
      title: "Persistent Local Drawer & Saved Collections",
      description: "Build your private folder of favorite high-performance prompts, completely preserved locally in your persistent cache drawer.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-transparent text-gray-900 font-sans selection:bg-gray-200 flex justify-center px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden bg-white rounded-[2.5rem] border border-neutral-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.03)] my-12">
        
        {/* Left Column: Content */}
        <div className="w-full lg:w-[45%] flex flex-col relative px-6 py-12 md:px-10 lg:py-16 justify-between min-h-[60vh] lg:min-h-[650px]">
          
          <div>
            {/* Header */}
            <div className="text-sm font-medium text-gray-500 tracking-wide mb-4 select-none">
              01 <span className="text-gray-300 mx-1">/</span> Capabilities
            </div>
            
            <h2 className="font-serif-custom text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-8 select-none">
              Engineered Library
            </h2>
 
            {/* Features List */}
            <div className="relative ml-2">
              {/* Global Line Track (Behind) */}
              <div className="absolute left-4 top-5 bottom-8 w-[1px] bg-gray-200"></div>
              
              {/* Active Solid Line Track - smoothly moves based on active feature */}
              <div 
                className="absolute left-4 w-[2px] bg-gray-800 -ml-[0.5px] transition-all duration-500"
                style={{
                  top: `${(activeId - 1) * 88 + 20}px`,
                  height: "44px"
                }}
              />
              
              {features.map((feat) => {
                const isActive = activeId === feat.id;
                return (
                  <div 
                    key={feat.id}
                    onClick={() => setActiveId(feat.id)}
                    className={`flex gap-6 mb-6 relative z-10 group cursor-pointer transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-45 hover:opacity-85"
                    }`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 transition-all duration-300 ${
                      isActive 
                        ? "bg-[#faf9f6] border-2 border-gray-800 text-gray-800 scale-110" 
                        : "bg-[#faf9f6] border border-gray-300 text-gray-400 group-hover:scale-105"
                    }`}>
                      {feat.icon}
                    </div>
                    <div className="pb-4 border-b border-gray-200/60 w-full">
                      <h3 className={`font-bold text-gray-900 text-[1.05rem] leading-snug transition-colors ${
                        isActive ? "text-gray-900" : "text-gray-800"
                      }`}>
                        {feat.title}
                      </h3>
                      {isActive && (
                        <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-sm transition-all duration-300">
                          {feat.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
 
            {/* Scalloped ticket button with custom responsive background cutout */}
            <button className="btn-scalloped btn-scalloped-white px-7 py-3 mt-6 text-xs font-semibold tracking-wide border border-gray-200">
              Read More
            </button>
          </div>
 
          {/* Scroll Indicator */}
          <div className="hidden lg:flex items-center gap-3 mt-8 pb-1 select-none">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Scroll</span>
            <div className="w-8 h-[2px] bg-gray-900"></div>
            <div className="w-4 h-[2px] bg-gray-300"></div>
          </div>
        </div>
 
        {/* Right Column: Image and ChatGPT Panel Overlay */}
        <div className="w-full lg:w-[55%] min-h-[45vh] lg:min-h-[650px] relative flex items-center justify-center p-6 sm:p-10 overflow-hidden">
          
          {/* Background Image Container (Reduced & framed with rounded corners) */}
          <div className="absolute inset-3 sm:inset-4 rounded-[2rem] overflow-hidden z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-[1.02]" 
              style={{ backgroundImage: "url('https://pbs.twimg.com/media/HGCCv44aoAIjwGL?format=jpg&name=4096x4096')" }}
            />
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-black/15"></div>
          </div>
          
          {/* Overlapping Glass Card Stack Container */}
          <div className="relative w-full max-w-lg select-none z-10 transition-transform duration-500 hover:scale-[1.01] transform -translate-y-2">
            
            {/* 1. Large Frosted Glass Background Card (Behind, perfectly centered on all sides) */}
            <div className="absolute -inset-4 sm:-inset-5 rounded-[1.6rem] bg-white/5 backdrop-blur-[20px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-0" />

            {/* 2. Main Interactive ChatGPT Input Card (Front, perfectly concentric) */}
            <div className="relative z-10">
              
              {/* ChatGPT Interface Container */}
              <div className="bg-white rounded-[1.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.16)] p-4 flex flex-col backdrop-blur-sm bg-white/95 border border-white/40">
                  
                  {/* Main Input wrapper */}
                  <div className="bg-[#f4f4f4] rounded-2xl flex flex-col focus-within:bg-white focus-within:shadow-[0_2px_15px_rgba(0,0,0,0.06)] focus-within:ring-1 focus-within:ring-gray-200 transition-all duration-300">
                      
                      {/* Textarea */}
                      <textarea 
                          ref={textareaRef}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-transparent resize-none outline-none text-gray-800 text-base px-4 py-4 placeholder-gray-500 rounded-2xl min-h-[56px] leading-relaxed" 
                          rows={1} 
                          placeholder="Message ChatGPT..."
                      />
                      
                      {/* Actions Bar */}
                      <div className="flex justify-between items-center px-3 pb-3 select-none">
                          
                          {/* Left Actions */}
                          <div className="flex items-center gap-1 text-gray-500">
                              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none cursor-pointer" title="Attach file">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                                  </svg>
                              </button>
                              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none cursor-pointer" title="Web search">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                                    <path d="M2 12h20"/>
                                  </svg>
                              </button>
                          </div>

                          {/* Right Actions */}
                          <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-gray-200 text-gray-500 rounded-lg transition-colors focus:outline-none cursor-pointer" title="Voice input">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                                    <line x1="12" x2="12" y1="19" y2="22"/>
                                  </svg>
                              </button>
                              <button className="p-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors focus:outline-none flex items-center justify-center h-9 w-9 cursor-pointer" title="Send message">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m5 12 7-7 7 7"/>
                                    <path d="M12 19V5"/>
                                  </svg>
                              </button>
                          </div>
                      </div>
                  </div>
                  
                  {/* Disclaimer Text */}
                  <div className="text-center mt-3 text-xs text-gray-400 font-medium select-none">
                      ChatGPT can make mistakes. Consider verifying important information.
                  </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
