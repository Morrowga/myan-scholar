# YourScholar 🇲🇲

Scholarships worldwide open to Myanmar citizens — with daily AI updates and full Burmese language guides.

## Stack
- **Frontend + Backend:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Daily search:** Claude Haiku (`claude-haiku-4-5`) with web search
- **Translation + guides:** Gemini 3.1 Flash-Lite (`gemini-3.1-flash-lite`)
- **Hosting:** Vercel (free)
- **Cron:** GitHub Actions (free)

**Monthly cost: ~$2–3** (Claude API only, everything else is free tier)

---

## Setup (step by step)

### 1. Supabase
1. Go to [supabase.com](https://supabase.com) → New project
2. In SQL Editor → New Query → paste contents of `supabase-schema.sql` → Run
3. Go to Project Settings → API → copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. API Keys
- **Anthropic:** [console.anthropic.com](https://console.anthropic.com) → API Keys → `ANTHROPIC_API_KEY`
- **Gemini:** [aistudio.google.com](https://aistudio.google.com) → Get API Key → `GEMINI_API_KEY`

### 3. Local development
```bash
cp .env.local.example .env.local
# Fill in all values in .env.local

npm install
npm run dev
# Open http://localhost:3000
```

### 4. Deploy to Vercel
```bash
npm i -g vercel
vercel
# Follow prompts, add all env vars from .env.local
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) — auto-deploys on every push.

### 5. GitHub Actions (daily cron)
In your GitHub repo → Settings → Secrets and variables → Actions → New repository secret:
- `SITE_URL` → your Vercel URL, e.g. `https://yourscholar.vercel.app`
- `CRON_SECRET` → same value as in your `.env.local`

The cron runs daily at 6:00 AM UTC (12:30 PM Myanmar time).
You can also trigger it manually from the Actions tab → Daily Scholarship Search → Run workflow.

---

## How it works

### Adding scholarships manually
1. Go to `/add` on your site
2. Enter your admin password
3. Fill in the form
4. Click Save → AI automatically generates:
   - Burmese translation of requirements
   - Step-by-step preparation guide in Burmese
   - Document checklist in Burmese
5. Scholarship is published immediately

### Daily AI job
Every day at 6 AM UTC:
1. GitHub Actions calls `POST /api/daily`
2. Claude Haiku searches the web for new scholarships open to Myanmar citizens
3. New ones (not already in DB) are saved
4. Gemini 3.1 Flash-Lite generates all Burmese content
5. Published automatically

### Buy Me a Coffee
Update the link in `app/[id]/page.tsx`:
```
href="https://buymeacoffee.com/your-username"
```

---

## Project structure
```
app/
  page.tsx              Homepage — scholarship listing with filters
  [id]/page.tsx         Individual scholarship detail with Burmese guide
  add/page.tsx          Your protected form to add scholarships manually
  api/
    scholarships/       GET (public list) + POST (add new)
    daily/              Called by GitHub Actions cron
lib/
  supabase.ts           DB client (public + admin)
  gemini.ts             Burmese content generation
  claude.ts             Daily scholarship search
  save-scholarship.ts   Shared save function (used by both manual + cron)
types/index.ts          TypeScript types
supabase-schema.sql     Run this in Supabase SQL editor once
.github/workflows/      GitHub Actions daily cron
```
