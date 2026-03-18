"use client";

import { useState, useEffect } from "react";
import { Github, Terminal, ExternalLink } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center flex-shrink-0">
            <Terminal className="w-4 h-4 text-black" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-white">
            pipeline<span className="text-muted">.dev</span>
          </span>
          <div className="hidden sm:flex items-center gap-1 ml-2 px-2 py-0.5 bg-success/10 border border-success/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
            <span className="text-success text-xs font-medium">live</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-muted hover:text-white text-xs font-medium transition-colors duration-200 rounded-md hover:bg-card border border-transparent hover:border-border"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Source</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-md hover:bg-white/90 transition-colors duration-200"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
