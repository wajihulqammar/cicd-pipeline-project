"use client";

import { useEffect, useRef, useState } from "react";

interface Tech {
  name: string;
  category: string;
  icon: string;
  color: string;
  description: string;
}

const TECH_STACK: Tech[] = [
  {
    name: "Next.js 14",
    category: "Frontend",
    icon: "▲",
    color: "#ffffff",
    description: "App Router, RSC, SSR",
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: "TS",
    color: "#3178c6",
    description: "Strict mode enabled",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    icon: "~",
    color: "#38bdf8",
    description: "Utility-first CSS",
  },
  {
    name: "Docker",
    category: "Container",
    icon: "🐳",
    color: "#2496ed",
    description: "Multi-stage builds",
  },
  {
    name: "GitHub Actions",
    category: "CI/CD",
    icon: "⚙",
    color: "#f0f6fc",
    description: "Automated pipelines",
  },
  {
    name: "Railway",
    category: "Hosting",
    icon: "🚂",
    color: "#c8a4ff",
    description: "Free tier deployment",
  },
  {
    name: "Node.js 20",
    category: "Runtime",
    icon: "⬡",
    color: "#5fa04e",
    description: "LTS version",
  },
  {
    name: "Slack API",
    category: "Notifications",
    icon: "#",
    color: "#e01e5a",
    description: "Webhook alerts",
  },
];

function TechCard({ tech, delay }: { tech: Tech; delay: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-card border border-border rounded-xl p-4 cursor-default relative overflow-hidden group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.97)",
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms, border-color 0.2s, background-color 0.2s`,
        borderColor: hovered ? `${tech.color}30` : undefined,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${tech.color}08, transparent 70%)`,
        }}
      />

      {/* Category */}
      <div className="text-xs text-muted mb-3 font-medium">{tech.category}</div>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg mb-3 font-mono"
        style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
      >
        {tech.icon}
      </div>

      {/* Name */}
      <div className="text-sm font-semibold text-white mb-1">{tech.name}</div>

      {/* Description */}
      <div className="text-xs text-muted">{tech.description}</div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="px-6 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xs font-semibold text-muted uppercase tracking-widest">
            Tech Stack
          </h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted">{TECH_STACK.length} tools</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TECH_STACK.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} delay={i * 60} />
          ))}
        </div>

        {/* Pipeline flow diagram */}
        <div className="mt-10 bg-card border border-border rounded-xl p-6">
          <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-6">
            Pipeline Flow
          </h3>
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {[
              { label: "Code Push", sub: "git push", color: "#888888" },
              { label: "CI Trigger", sub: "GitHub Actions", color: "#f0f6fc" },
              { label: "Build & Test", sub: "npm ci + jest", color: "#eab308" },
              { label: "Docker Build", sub: "multi-stage", color: "#2496ed" },
              { label: "Deploy", sub: "Railway", color: "#c8a4ff" },
              { label: "Notify", sub: "Slack webhook", color: "#e01e5a" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className="w-2 h-2 rounded-full mb-2 flex-shrink-0"
                    style={{ backgroundColor: step.color }}
                  />
                  <div
                    className="text-xs font-semibold mb-0.5 whitespace-nowrap"
                    style={{ color: step.color }}
                  >
                    {step.label}
                  </div>
                  <div className="text-xs text-muted whitespace-nowrap">
                    {step.sub}
                  </div>
                </div>
                {i < 5 && (
                  <div className="w-8 sm:w-12 h-px bg-border mx-2 flex-shrink-0 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-border rotate-45" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
