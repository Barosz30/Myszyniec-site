# Twój Myszyniec 🌲

**Nieoficjalny, lokalny portal społecznościowy o Myszyńcu** — stolicy Kurpiów
(woj. mazowieckie, powiat ostrołęcki). Newsy, pogoda, wydarzenia i sprawy ważne
dla regionu w jednym, czytelnym miejscu. Mobile-first, po polsku, z sercem dla
kultury i gwary kurpiowskiej. *Witôjcie u nôs!*

## ✨ Co w środku

- **Strona główna** — hero + kafelki (Pogoda / Newsy / Wydarzenia / Kontakt), skrót
  pogody, najnowsze newsy, najbliższe wydarzenia, kurpiowskie ciekawostki.
- **O Myszyńcu** — historia, ciekawostki, podstawowe dane i mapa (OpenStreetMap).
- **Newsy** — lista i strony artykułów z plików Markdown (data, źródło, tagi).
- **Pogoda** — aktualne warunki + prognoza na 5 dni z [Open-Meteo](https://open-meteo.com/)
  (bez klucza API).
- **Wydarzenia** — kalendarz lokalnych imprez z pliku JSON.
- **Ważne dla regionu** — alerty (placeholder pod IMGW), komunikaty drogowe,
  numery alarmowe, zdrowie, apteki.
- **Kontakt / O portalu** — formularz (mailto na MVP) + informacja, że to portal
  nieoficjalny.
- **SEO**: metadane, Open Graph (dynamiczny obrazek), `sitemap.xml`, `robots.txt`,
  `manifest.webmanifest`.
- **Dostępność i UX**: semantyczny HTML, aria-labels, „przejdź do treści”, focus-visible,
  tryb ciemny, `prefers-reduced-motion`.

## 🧱 Stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- Treści w **Markdown/JSON** w katalogu [`content/`](./content) — edycja bez CMS
- Markdown renderowany przez `remark` (+ `remark-gfm`)

> Architektura jest przygotowana pod późniejsze podłączenie CMS (np. Sanity/Strapi):
> wystarczy podmienić implementacje funkcji w [`src/lib/content.ts`](./src/lib/content.ts),
> a komponenty i strony pozostaną bez zmian.

## 🚀 Uruchomienie lokalne

Wymagania: **Node.js 18.18+** (zalecane 20+), `npm`.

```bash
npm install          # instalacja zależności
cp .env.example .env.local   # (opcjonalnie) skopiuj zmienne środowiskowe
npm run dev          # serwer deweloperski → http://localhost:3000
```

Inne komendy:

```bash
npm run build        # produkcyjny build
npm run start        # uruchomienie buildu produkcyjnego
npm run lint         # ESLint
```

## 🔑 Zmienne środowiskowe

Na MVP **nie są wymagane żadne klucze** — pogoda działa bez klucza (Open-Meteo).
Zobacz [`.env.example`](./.env.example):

| Zmienna                | Wymagana | Opis                                                        |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | nie      | Adres produkcyjny portalu (SEO, sitemap, OpenGraph).        |
| `OPENWEATHER_API_KEY`  | nie      | Tylko jeśli zamienisz Open-Meteo na OpenWeatherMap.         |

## ☁️ Deploy na Vercel

1. Wypchnij repozytorium na GitHub/GitLab.
2. W [Vercel](https://vercel.com/new) zaimportuj projekt — framework wykryje się
   automatycznie (Next.js), bez dodatkowej konfiguracji.
3. W ustawieniach projektu (Environment Variables) ustaw `NEXT_PUBLIC_SITE_URL`
   na docelową domenę (np. `https://twoj-myszyniec.pl`).
4. Deploy. Gotowe — `sitemap.xml` i `robots.xml` wygenerują się automatycznie.

> Strony pogodowe odświeżają dane co ~30 min (ISR, `revalidate = 1800`).

## ✏️ Jak edytować treści

Wszystkie treści żyją w katalogu [`content/`](./content). Po zmianach w trybie
`npm run dev` strona przeładuje się automatycznie. W produkcji wystarczy nowy commit
(redeploy).

### ➕ Dodać news

Utwórz nowy plik `content/news/moj-news.md` (nazwa pliku = adres URL, czyli `slug`):

```markdown
---
title: "Tytuł newsa"
date: "2026-06-20"            # format RRRR-MM-DD (sortowanie malejąco)
excerpt: "Krótki zajawka widoczna na liście."
source: "Nazwa źródła"        # opcjonalnie
sourceUrl: "https://..."      # opcjonalnie — link do oryginału
author: "Imię autora"         # opcjonalnie
tags: ["kultura", "miasto"]   # opcjonalnie
---

Treść artykułu w **Markdown**. Można używać nagłówków, list, linków, cytatów itd.
```

Gotowe — news pojawi się na `/newsy` i pod `/newsy/moj-news`.

### 📅 Dodać wydarzenie

Dopisz obiekt do tablicy w [`content/events.json`](./content/events.json):

```json
{
  "id": "unikalny-identyfikator",
  "title": "Nazwa wydarzenia",
  "start": "2026-08-23T11:00:00+02:00",
  "end": "2026-08-23T20:00:00+02:00",
  "location": "Miejsce",
  "description": "Krótki opis.",
  "category": "Kultura",
  "url": "https://..."
}
```

`category` koloruje etykietę (np. `Kultura`, `Sport`, `Religia`, `Społeczność`).
Wydarzenia są automatycznie dzielone na **nadchodzące** i **minione**.

### 📝 Zmienić tekst „O Myszyńcu”

Edytuj [`content/about.md`](./content/about.md):

- pola w nagłówku (frontmatter) — dane w tabeli (gmina, ludność, powierzchnia…)
  oraz lista źródeł,
- treść poniżej `---` — historia, ciekawostki itd. (Markdown).

### 🚨 Zmienić numery alarmowe / alerty / komunikaty drogowe

Edytuj [`content/region.json`](./content/region.json) (sekcje: `alerts`,
`roadNotices`, `emergency`, `health`, `pharmacies`).

## 🗂️ Struktura projektu

```
content/                 # ← treści (edytowalne bez kodu)
  about.md               #   strona „O Myszyńcu”
  events.json            #   wydarzenia
  region.json            #   alerty, drogi, numery alarmowe
  news/*.md              #   artykuły (każdy = osobny plik)
src/
  app/                   # strony (App Router) + sitemap/robots/manifest/og
  components/            # komponenty wielokrotnego użytku
    WeatherCard.tsx, ForecastList.tsx, WeatherIcon.tsx
    NewsList.tsx, EventCard.tsx
    Header.tsx, Footer.tsx, ThemeToggle.tsx, ...
  lib/
    site.ts              # konfiguracja portalu (nazwa, nav, kontakt, geo)
    content.ts           # ładowanie treści z /content
    weather.ts           # integracja z Open-Meteo
    kurpie.ts            # wstawki w gwarze kurpiowskiej
    format.ts, types.ts
```

## 🎨 Motyw i dostępność

- Paleta inspirowana naturą Kurpiowszczyzny: **zieleń puszczy, błękit nieba,
  ciepły bursztyn**. Kolory zdefiniowane jako zmienne CSS w
  [`src/app/globals.css`](./src/app/globals.css) — łatwo je zmienić w jednym miejscu.
- **Tryb ciemny** przełącznikiem w nagłówku (zapamiętywany w `localStorage`,
  bez „mignięcia” dzięki skryptowi inicjującemu).

## 🐤 O gwarze kurpiowskiej

Portal zawiera lekkie akcenty w **gwarze kurpiowskiej** (np. „Witôjcie u nôs!”).
Zebrane są w [`src/lib/kurpie.ts`](./src/lib/kurpie.ts).
Pisownię i znaczenia warto zweryfikować z lokalnymi znawcami (np. Związek Kurpiów) —
zob. komentarze `TODO` w kodzie.

## ⚠️ Uwagi o danych

To portal **nieoficjalny i społecznościowy**. Część danych (np. numery telefonów,
terminy wydarzeń, dane o bazylice) to **przykłady / placeholdery** oznaczone
komentarzami `TODO` — przed publikacją należy je zweryfikować w wiarygodnych
źródłach. Dane historyczne i statystyczne opierają się na publicznych źródłach
wymienionych na stronie [`/o-myszyncu`](./content/about.md).

---

Zrobione z myślą o mieszkańcach. *Ostańcie z Boziem!* 🌲
