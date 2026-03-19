```
 ██████╗██╗      ██████╗██████╗     ██████╗ ██╗██████╗ ███████╗██╗     ██╗███╗   ██╗███████╗
██╔════╝██║     ██╔════╝██╔══██╗    ██╔══██╗██║██╔══██╗██╔════╝██║     ██║████╗  ██║██╔════╝
██║     ██║     ██║     ██║  ██║    ██████╔╝██║██████╔╝█████╗  ██║     ██║██╔██╗ ██║█████╗  
██║     ██║     ██║     ██║  ██║    ██╔═══╝ ██║██╔═══╝ ██╔══╝  ██║     ██║██║╚██╗██║██╔══╝  
╚██████╗██║     ╚██████╗██████╔╝    ██║     ██║██║     ███████╗███████╗██║██║ ╚████║███████╗
 ╚═════╝╚═╝      ╚═════╝╚═════╝     ╚═╝     ╚═╝╚═╝     ╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝
                          CI/CD Dashboard — Portfolio Project
```

<div align="center">

[![CI](https://github.com/wajihulqammar/cicd-pipeline-project/actions/workflows/ci.yml/badge.svg)](https://github.com/wajihulqammar/cicd-pipeline-project/actions/workflows/ci.yml)
[![CD](https://github.com/wajihulqammar/cicd-pipeline-project/actions/workflows/cd.yml/badge.svg)](https://github.com/wajihulqammar/cicd-pipeline-project/actions/workflows/cd.yml)
[![Node](https://img.shields.io/badge/Node-20_LTS-5FA04E?logo=node.js)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)](https://docker.com)
[![Railway](https://img.shields.io/badge/Railway-deployed-C8A4FF?logo=railway)](https://railway.app)
[![License](https://img.shields.io/badge/License-MIT-white)](LICENSE)

**A production-grade CI/CD Pipeline Dashboard built to showcase DevOps skills.**  
Automated deployments from `git push` to live URL in under 2 minutes.

[**🚀 Live Demo**](https://cicd-pipeline-project-production.up.railway.app/) · [**📋 Actions**](https://github.com/wajihulqammar/cicd-pipeline-project/actions) · [**🐳 Docker Hub**](#)

</div>

---

## ✨ Features

- **Automated CI/CD Pipeline** — every push triggers test → build → deploy automatically
- **Docker Containerization** — multi-stage production builds under 200MB
- **Zero-Downtime Deployments** — Railway handles rolling updates seamlessly
- **Slack Notifications** — instant alerts on deploy success or failure with full context
- **Health Checks** — automated `/api/health` endpoint verified after every deploy
- **Pipeline Activity Feed** — live dashboard showing deployment history and step progress
- **Security Hardened** — non-root Docker user, security headers, no sensitive data exposed

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 14 (App Router) | SSR, RSC, file-based routing |
| Language | TypeScript (strict) | Type safety across the codebase |
| Styling | Tailwind CSS | Utility-first dark theme UI |
| Container | Docker (multi-stage) | Consistent build + minimal image |
| CI/CD | GitHub Actions | Automated test → build → deploy |
| Hosting | Railway (free tier) | Zero-config cloud deployment |
| Alerts | Slack Webhooks | Real-time deploy notifications |
| Runtime | Node.js 20 LTS | Production server runtime |

---

## 📁 Project Structure

```
cicd-pipeline-project/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Test + build on every push
│       └── cd.yml              # Deploy to Railway on main push
├── app/
│   ├── api/
│   │   └── health/
│   │       └── route.ts        # Health check endpoint
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── HeroSection.tsx     # Hero with typewriter terminal
│   │   ├── StatsRow.tsx        # 4 pipeline metric cards
│   │   ├── PipelineActivity.tsx # Expandable deploy feed
│   │   ├── TechStack.tsx       # Tools grid + pipeline flow
│   │   └── Footer.tsx          # Minimal footer
│   ├── globals.css             # Base styles + animations
│   ├── layout.tsx              # Root layout + metadata
│   └── page.tsx                # Main page assembly
├── docker/
│   ├── Dockerfile.dev          # Development image (hot reload)
│   └── Dockerfile.prod         # Production multi-stage image
├── docker-compose.yml          # Local development setup
├── next.config.js              # Next.js config (standalone output)
├── tailwind.config.ts          # Custom dark theme colors
├── tsconfig.json               # TypeScript strict config
├── jest.config.js              # Test configuration
├── .env.example                # Environment variable template
└── README.md
```

---

## 🚀 Pipeline Flow

```
Developer                 GitHub                  Railway
    │                       │                        │
    │  git push origin main  │                        │
    │──────────────────────►│                        │
    │                       │                        │
    │              ci.yml triggers                    │
    │                       │                        │
    │                  ┌────┴────┐                   │
    │                  │ Checkout│                   │
    │                  └────┬────┘                   │
    │                  ┌────┴────┐                   │
    │                  │npm ci   │                   │
    │                  └────┬────┘                   │
    │                  ┌────┴────┐                   │
    │                  │npm test │                   │
    │                  └────┬────┘                   │
    │                  ┌────┴────┐                   │
    │                  │npm build│                   │
    │                  └────┬────┘                   │
    │                  ┌────┴──────┐                 │
    │                  │Docker build│                │
    │                  └────┬──────┘                 │
    │                       │                        │
    │              cd.yml triggers                    │
    │                       │                        │
    │                  ┌────┴──────┐                 │
    │                  │railway up │────────────────►│
    │                  └────┬──────┘                 │
    │                       │          Deploy        │
    │                       │◄───────────────────────│
    │                  ┌────┴─────────┐              │
    │                  │Health check  │              │
    │                  │curl live URL │              │
    │                  └────┬─────────┘              │
    │                  ┌────┴──────────┐             │
    │                  │Slack notify   │             │
    │                  │✅ Deployed!   │             │
    │                  └───────────────┘             │
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Docker & Docker Compose (optional)
- Git

### Option A — Run with Docker (Recommended)

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/cicd-pipeline-project.git
cd cicd-pipeline-project

# Copy environment variables
cp .env.example .env

# Start with Docker Compose
docker-compose up --build

# App is running at:
open http://localhost:3000
```

### Option B — Run without Docker

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/cicd-pipeline-project.git
cd cicd-pipeline-project

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev

# App is running at:
open http://localhost:3000
```

---

## 🌐 Deployment Guide (Railway Free Tier)

### Step 1 — Create Railway account

1. Go to [railway.app](https://railway.app) — sign up free (no credit card needed)
2. Connect your GitHub account

### Step 2 — Install Railway CLI

```bash
npm install -g @railway/cli
railway login
```

### Step 3 — Initialize and deploy

```bash
# In your project directory
railway init

# Deploy manually (first time)
railway up

# Note your live URL from the Railway dashboard
```

### Step 4 — Set environment variables on Railway

In Railway Dashboard → Your Project → Variables:

```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Step 5 — Get your Railway token

Railway Dashboard → Account Settings → Tokens → Create Token → Copy it

### Step 6 — Add GitHub Secrets

Go to: `GitHub Repo → Settings → Secrets and variables → Actions → New repository secret`

| Secret Name | Value |
|-------------|-------|
| `RAILWAY_TOKEN` | Your Railway API token |
| `RAILWAY_SERVICE_URL` | `https://your-app.railway.app` |
| `SLACK_WEBHOOK_URL` | Your Slack incoming webhook URL |

### Step 7 — Verify pipeline

```bash
# Make any small change
echo "# trigger" >> README.md
git add . && git commit -m "ci: trigger pipeline test"
git push origin main

# Watch it deploy:
# GitHub → Actions tab → CD — Deploy to Railway
```

---

## 🔔 Slack Notifications Setup

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **Create New App** → **From scratch**
3. Name it `Deploy Bot`, select your workspace
4. Go to **Incoming Webhooks** → Toggle ON
5. Click **Add New Webhook to Workspace**
6. Select your `#deployments` channel
7. Copy the webhook URL
8. Add it to GitHub Secrets as `SLACK_WEBHOOK_URL`

**Success notification looks like:**
```
🚀 Deployment Successful
Project:  cicd-pipeline-project
Branch:   main
Commit:   feat: add dark mode toggle
Author:   alex.dev
Duration: 1m 34s
Live URL: https://your-app.railway.app
```

---

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | `development` or `production` |
| `NEXT_PUBLIC_APP_URL` | No | Public URL of your app |
| `RAILWAY_TOKEN` | CI/CD only | Railway API token for deployments |
| `RAILWAY_SERVICE_URL` | CI/CD only | Live URL for health checks |
| `SLACK_WEBHOOK_URL` | CI/CD only | Slack webhook for notifications |
| `GITHUB_TOKEN` | Optional | For live GitHub stats integration |

---

## 🐳 Docker Commands Reference

```bash
# Development
docker-compose up --build              # Start dev server
docker-compose down                    # Stop all services
docker-compose logs -f app             # Tail logs

# Production build
docker build -f docker/Dockerfile.prod -t cicd-dashboard .
docker run -p 3000:3000 cicd-dashboard

# Check image size
docker images cicd-dashboard
```

---

## 🧪 Testing

```bash
npm test                    # Run all tests
npm test -- --watch         # Watch mode
npm test -- --coverage      # With coverage report
```

---

## 🐛 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `RAILWAY_TOKEN: not found` | Secret not set | Add token in GitHub Secrets |
| `Health check failed` | App not starting | Check Railway logs, verify PORT=3000 |
| `Docker build fails` | Missing standalone output | Ensure `output: "standalone"` in next.config.js |
| `npm ci fails in CI` | package-lock.json missing | Commit `package-lock.json` to the repo |
| `Slack notification 403` | Wrong webhook URL | Regenerate webhook in Slack app settings |
| `next: command not found` | node_modules not mounted | Run `docker-compose down -v && docker-compose up --build` |

---


## 📋 "Zero to Live" Checklist

- [ ] Clone the repository
- [ ] Run locally with `npm run dev` or `docker-compose up --build`
- [ ] Create Railway account at railway.app
- [ ] Install Railway CLI: `npm i -g @railway/cli`
- [ ] Run `railway login` and `railway init`
- [ ] Run `railway up` for first manual deploy
- [ ] Copy your live URL from Railway dashboard
- [ ] Get Railway API token from account settings
- [ ] Set up Slack app and get webhook URL
- [ ] Add 3 secrets to GitHub: `RAILWAY_TOKEN`, `RAILWAY_SERVICE_URL`, `SLACK_WEBHOOK_URL`
- [ ] Push a change to `main` branch
- [ ] Watch GitHub Actions → CD pipeline run
- [ ] Confirm Slack notification received
- [ ] Share on LinkedIn 🎉


---

## 📄 License

MIT © 2024 — Built as a DevOps portfolio project.

---

<div align="center">
Built with ❤️ to showcase DevOps skills
<br/>
<a href="https://github.com/wajihulqammar/cicd-pipeline-project">⭐ Star this repo if it helped you!</a>
</div>

