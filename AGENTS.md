# AGENTS.md

## Cursor Cloud specific instructions

**Project:** `Twój Myszyniec` — a single Next.js 16 (App Router) + React 19 + TypeScript
web app (Polish local news/community portal). Tailwind CSS v4. There is only one
service. Content lives as Markdown/JSON in `content/` and is read via `src/lib/content.ts`.

**Package manager: Yarn Classic (v1).** The repo uses `yarn.lock` (no `package-lock.json`).
Use `yarn`, not `npm`, so the lockfile stays consistent. Requires Node.js 20+ (tested on v22).

**Commands** (scripts defined in `package.json`, see `README.md` for full docs):
- `yarn install --frozen-lockfile` — install exactly per `yarn.lock` (used by the startup script).
- `yarn dev` — dev server at http://localhost:3000 (Turbopack, hot reload).
- `yarn lint` — ESLint (flat config in `eslint.config.mjs`).
- `yarn build` — production build (also runs `tsc`); `yarn start` runs the build.

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
