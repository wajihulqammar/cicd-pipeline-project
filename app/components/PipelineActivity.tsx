"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  GitCommit,
  GitBranch,
  Clock,
  User,
  ExternalLink,
} from "lucide-react";

interface PipelineRun {
  id: string;
  status: "success" | "failed" | "running";
  branch: string;
  commit: string;
  message: string;
  author: string;
  duration: string;
  timeAgo: string;
  steps: number;
  stepsDone: number;
}

const PIPELINE_DATA: PipelineRun[] = [
  {
    id: "run-247",
    status: "success",
    branch: "main",
    commit: "a3f9d12",
    message: "feat: add dark mode toggle and system preference detection",
    author: "alex.dev",
    duration: "1m 34s",
    timeAgo: "2 minutes ago",
    steps: 4,
    stepsDone: 4,
  },
  {
    id: "run-246",
    status: "running",
    branch: "feature/analytics",
    commit: "c7b2e81",
    message: "wip: integrate Posthog analytics dashboard",
    author: "sarah.codes",
    duration: "0m 47s",
    timeAgo: "5 minutes ago",
    steps: 4,
    stepsDone: 2,
  },
  {
    id: "run-245",
    status: "success",
    branch: "main",
    commit: "89fe347",
    message: "perf: optimize Docker image size with multi-stage build",
    author: "alex.dev",
    duration: "2m 11s",
    timeAgo: "1 hour ago",
    steps: 4,
    stepsDone: 4,
  },
  {
    id: "run-244",
    status: "failed",
    branch: "hotfix/auth-token",
    commit: "f12c9a5",
    message: "fix: resolve JWT expiry race condition on refresh",
    author: "mike.ops",
    duration: "0m 28s",
    timeAgo: "3 hours ago",
    steps: 4,
    stepsDone: 1,
  },
  {
    id: "run-243",
    status: "success",
    branch: "main",
    commit: "55da902",
    message: "ci: add Slack notifications for deploy events",
    author: "alex.dev",
    duration: "1m 52s",
    timeAgo: "5 hours ago",
    steps: 4,
    stepsDone: 4,
  },
  {
    id: "run-242",
    status: "success",
    branch: "feature/docker",
    commit: "3e6b7c4",
    message: "chore: upgrade Node to v20, update base Docker image",
    author: "sarah.codes",
    duration: "3m 05s",
    timeAgo: "Yesterday",
    steps: 4,
    stepsDone: 4,
  },
  {
    id: "run-241",
    status: "success",
    branch: "main",
    commit: "71af183",
    message: "docs: update README with deployment guide",
    author: "alex.dev",
    duration: "1m 08s",
    timeAgo: "Yesterday",
    steps: 4,
    stepsDone: 4,
  },
];

const STEPS = ["Checkout", "Build", "Test", "Deploy"];

function StatusIcon({ status }: { status: PipelineRun["status"] }) {
  if (status === "success")
    return <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />;
  if (status === "failed")
    return <XCircle className="w-4 h-4 text-error flex-shrink-0" />;
  return (
    <Loader2 className="w-4 h-4 text-warning flex-shrink-0 animate-spin" />
  );
}

function StatusBadge({ status }: { status: PipelineRun["status"] }) {
  const styles = {
    success: "text-success bg-success/10 border-success/20",
    failed: "text-error bg-error/10 border-error/20",
    running: "text-warning bg-warning/10 border-warning/20",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function StepProgress({
  steps,
  stepsDone,
  status,
}: {
  steps: number;
  stepsDone: number;
  status: PipelineRun["status"];
}) {
  return (
    <div className="flex items-center gap-1.5">
      {STEPS.slice(0, steps).map((step, i) => {
        const done = i < stepsDone;
        const active = i === stepsDone && status === "running";
        return (
          <div key={step} className="flex items-center gap-1">
            <div
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                done
                  ? "bg-success"
                  : active
                  ? "bg-warning animate-pulse"
                  : "bg-border"
              }`}
            />
            {i < steps - 1 && (
              <div
                className={`w-5 h-px ${done ? "bg-success/40" : "bg-border"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function PipelineActivity() {
  const [filter, setFilter] = useState<"all" | "success" | "failed" | "running">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    filter === "all"
      ? PIPELINE_DATA
      : PIPELINE_DATA.filter((r) => r.status === filter);

  return (
    <section className="px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-semibold text-muted uppercase tracking-widest">
              Pipeline Activity
            </h2>
            <div className="h-px w-12 bg-border" />
            <span className="text-xs text-muted font-mono">{filtered.length} runs</span>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-card border border-border rounded-lg">
            {(["all", "success", "failed", "running"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all duration-150 ${
                  filter === f
                    ? "bg-white text-black"
                    : "text-muted hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Feed */}
        <div className="bg-card border border-border rounded-xl overflow-hidden divide-y divide-border">
          {filtered.map((run, i) => (
            <div
              key={run.id}
              className={`group hover:bg-card-hover transition-all duration-200 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Main row */}
              <button
                onClick={() =>
                  setExpanded(expanded === run.id ? null : run.id)
                }
                className="w-full text-left px-5 py-4"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5">
                    <StatusIcon status={run.status} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm text-white leading-snug font-medium line-clamp-1">
                        {run.message}
                      </p>
                      <StatusBadge status={run.status} />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        <span className="font-mono">{run.branch}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitCommit className="w-3 h-3" />
                        <span className="font-mono text-white/60">
                          {run.commit}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {run.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {run.timeAgo}
                      </span>
                      <span className="ml-auto hidden sm:flex items-center gap-1 text-white/40">
                        {run.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded steps */}
              {expanded === run.id && (
                <div className="px-5 pb-4 pt-1 bg-background/40 border-t border-border">
                  <div className="flex items-center gap-6 mb-3">
                    <span className="text-xs text-muted">Steps</span>
                    <StepProgress
                      steps={run.steps}
                      stepsDone={run.stepsDone}
                      status={run.status}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {STEPS.map((step, idx) => {
                      const done = idx < run.stepsDone;
                      const active = idx === run.stepsDone && run.status === "running";
                      const failed = run.status === "failed" && idx === run.stepsDone;
                      return (
                        <div
                          key={step}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${
                            done
                              ? "border-success/20 bg-success/5 text-success"
                              : active
                              ? "border-warning/30 bg-warning/5 text-warning"
                              : failed
                              ? "border-error/20 bg-error/5 text-error"
                              : "border-border bg-card text-muted"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : active ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : failed ? (
                            <XCircle className="w-3 h-3" />
                          ) : (
                            <div className="w-3 h-3 rounded-full border border-current opacity-30" />
                          )}
                          {step}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted font-mono">
                      Run #{run.id} · {run.duration}
                    </span>
                    <button className="flex items-center gap-1 text-xs text-muted hover:text-white transition-colors">
                      <ExternalLink className="w-3 h-3" />
                      View logs
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
