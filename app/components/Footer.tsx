import { Github, ExternalLink, Terminal } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center flex-shrink-0">
              <Terminal className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="text-xs text-muted">
              pipeline.dev — CI/CD Portfolio Project
            </span>
          </div>

          {/* Center links */}
          <div className="flex items-center gap-5">
            {[
              { label: "GitHub", href: "https://github.com" },
              { label: "Railway", href: "https://railway.app" },
              { label: "Docs", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-white transition-colors duration-150 flex items-center gap-1"
              >
                {link.label}
                <ExternalLink className="w-2.5 h-2.5 opacity-50" />
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-white transition-colors duration-150"
            >
              <Github className="w-4 h-4" />
            </a>
            <span className="text-xs text-muted">MIT © {year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
