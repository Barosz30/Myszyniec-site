# AGENTS.md

## Cursor Cloud specific instructions

**Project:** `Twój Myszyniec` — a single Next.js 16 (App Router) + React 19 + TypeScript
web app (Polish local news/community portal). Tailwind CSS v4. There is only one
service. Content lives as Markdown/JSON in `content/` and is read via `src/lib/content.ts`.

**Commands** (defined in `package.json`, see `README.md` for full docs):
- `npm run dev` — dev server at http://localhost:3000 (Turbopack, hot reload).
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`).
- `npm run build` — production build (also runs `tsc`); `npm run start` runs the build.

**Non-obvious notes:**
- **No env vars or API keys are required to run.** `.env.example` documents an optional
  `NEXT_PUBLIC_SITE_URL` (used for SEO/sitemap/OpenGraph, defaults are fine locally).
- **The Weather page (`/pogoda`) and homepage weather widget make live outbound HTTPS
  calls to the keyless Open-Meteo API** (`api.open-meteo.com`). With no network access
  these pages error/return stale data; everything else (news, events, etc.) is local.
- Weather pages use ISR (`revalidate = 1800`), so data refreshes ~every 30 min rather
  than on every request.
- To add content, edit files under `content/` (news = `.md` files in `content/news/`,
  events = `content/events.json`); `npm run dev` hot-reloads on change.
