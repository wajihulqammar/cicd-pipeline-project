"use client";

import { useEffect, useState } from "react";
import { CheckCircle, GitBranch, Zap } from "lucide-react";

const TYPING_STRINGS = [
  "git push origin main",
  "docker build -t app .",
  "railway up --detach",
  "All systems operational.",
];

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const current = TYPING_STRINGS[lineIndex];
    const speed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setTypedText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypedText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else if (!isDeleting && charIndex === current.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setLineIndex((i) => (i + 1) % TYPING_STRINGS.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, lineIndex]);

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background pointer-events-none" />

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-2 mb-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-1.5 px-3 py-1 bg-card border border-border rounded-full">
            <CheckCircle className="w-3 h-3 text-success" />
            <span className="text-xs font-medium text-success">
              All Systems Operational
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-card border border-border rounded-full">
            <GitBranch className="w-3 h-3 text-muted" />
            <span className="text-xs text-muted font-mono">main</span>
          </div>
        </div>

        {/* Heading */}
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-5 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          CI/CD Pipeline
          <br />
          <span className="text-muted font-light">Dashboard</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-muted text-base sm:text-lg max-w-lg leading-relaxed mb-8 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Automated deployments from commit to production. Built with Docker,
          GitHub Actions & Railway.
        </p>

        {/* Terminal typewriter */}
        <div
          className={`font-mono text-sm bg-card border border-border rounded-lg px-4 py-3 w-fit flex items-center gap-3 mb-10 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-success select-none">$</span>
          <span className="text-white">{typedText}</span>
          <span className="w-0.5 h-4 bg-white animate-pulse" />
        </div>

        {/* Quick stats pills */}
        <div
          className={`flex flex-wrap gap-3 transition-all duration-700 delay-[400ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {[
            { icon: Zap, label: "Avg deploy", value: "94s" },
            { icon: CheckCircle, label: "Success rate", value: "98.6%" },
            { icon: GitBranch, label: "Total runs", value: "247" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-md text-xs"
            >
              <Icon className="w-3 h-3 text-muted" />
              <span className="text-muted">{label}:</span>
              <span className="text-white font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
