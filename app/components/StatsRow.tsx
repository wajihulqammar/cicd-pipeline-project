"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, CheckCheck, Timer, Wifi } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  trend: "up" | "neutral";
  delay: number;
  accentColor: string;
}

function useCountUp(target: number, duration: number = 1200, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ icon: Icon, label, value, sub, trend, delay, accentColor }: StatCardProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-card border border-border rounded-xl p-5 hover:border-white/10 hover:bg-card-hover transition-all duration-300 group relative overflow-hidden"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, background-color 0.2s, border-color 0.2s`,
      }}
    >
      {/* Subtle top border glow */}
      <div
        className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)` }}
      />

      <div className="flex items-start justify-between mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <Icon className="w-4 h-4" style={{ color: accentColor }} />
        </div>
        {trend === "up" && (
          <span className="text-xs text-success font-medium px-2 py-0.5 bg-success/10 border border-success/20 rounded-full">
            ↑ good
          </span>
        )}
      </div>

      <div className="font-bold text-3xl tracking-tight text-white mb-1">
        {value}
      </div>
      <div className="text-xs font-medium text-white/80 mb-1">{label}</div>
      <div className="text-xs text-muted">{sub}</div>
    </div>
  );
}

const STATS = [
  {
    icon: Activity,
    label: "Pipeline Runs",
    value: "247",
    sub: "Last 30 days",
    trend: "up" as const,
    accentColor: "#ffffff",
  },
  {
    icon: CheckCheck,
    label: "Success Rate",
    value: "98.6%",
    sub: "3 failures this month",
    trend: "up" as const,
    accentColor: "#22c55e",
  },
  {
    icon: Timer,
    label: "Avg Deploy Time",
    value: "94s",
    sub: "Down from 142s",
    trend: "up" as const,
    accentColor: "#eab308",
  },
  {
    icon: Wifi,
    label: "Uptime",
    value: "99.9%",
    sub: "SLA: 99.5% — exceeded",
    trend: "up" as const,
    accentColor: "#3b82f6",
  },
];

export default function StatsRow() {
  return (
    <section className="px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xs font-semibold text-muted uppercase tracking-widest">
            Pipeline Metrics
          </h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted">Last 30 days</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
