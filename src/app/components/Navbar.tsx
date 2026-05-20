import React from "react";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 flex items-center justify-between">
      {/* Brand Logo / Title */}
      <div className="flex items-center gap-2 select-none">
        <span className="text-white font-serif-custom text-2xl font-black tracking-tight">
          PromptLib<span className="text-white/60 font-sans text-xs ml-1 font-bold">.</span>
        </span>
      </div>
    </nav>
  );
}
