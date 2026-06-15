import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import type {
  EmergencyContact,
  EventItem,
  NewsArticle,
  NewsFrontmatter,
  NewsListItem,
  RegionAlert,
  RoadNotice,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const NEWS_DIR = path.join(CONTENT_DIR, "news");

async function markdownToHtml(markdown: string): Promise<string> {
  // remark-rehype + rehype-sanitize zapewniają, że surowy HTML/skrypty w plikach
  // treści NIE trafią do strony (ochrona przed XSS od osób edytujących treść).
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function listNewsSlugs(): string[] {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs
    .readdirSync(NEWS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export function getNewsSlugs(): string[] {
  return listNewsSlugs();
}

function isValidNewsFrontmatter(data: Record<string, unknown>): boolean {
  if (typeof data.title !== "string" || data.title.trim() === "") return false;
  if (typeof data.date !== "string") return false;
  return !Number.isNaN(new Date(data.date).getTime());
}

export function getAllNews(): NewsListItem[] {
  return listNewsSlugs()
    .map((slug): NewsListItem | null => {
      try {
        const fullPath = path.join(NEWS_DIR, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        if (!isValidNewsFrontmatter(data)) {
          console.error(
            `[content] Pomijam news ${slug}.md — brak poprawnego pola title lub date.`,
          );
          return null;
        }
        return { slug, ...(data as NewsFrontmatter) };
      } catch (error) {
        // Jeden wadliwy plik (np. błąd we frontmatter) nie może wywrócić całej
        // listy newsów, strony głównej ani sitemapy — pomijamy go i logujemy.
        console.error(`[content] Pomijam wadliwy news ${slug}.md:`, error);
        return null;
      }
    })
    .filter((item): item is NewsListItem => item !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const fullPath = path.join(NEWS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const html = await markdownToHtml(content);
    return {
      slug,
      ...(data as NewsFrontmatter),
      html,
      readingTimeMin: estimateReadingTime(content),
    };
  } catch (error) {
    console.error(`[content] Nie udało się wczytać newsa ${slug}.md:`, error);
    return null;
  }
}

export async function getAboutContent(): Promise<{
  data: Record<string, unknown>;
  html: string;
}> {
  const fullPath = path.join(CONTENT_DIR, "about.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const html = await markdownToHtml(content);
  return { data, html };
}

function readJson<T>(relativePath: string, fallback: T): T {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  if (!fs.existsSync(fullPath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8")) as T;
  } catch (error) {
    // Uszkodzony/niepoprawny JSON nie może wywrócić całej strony (np. literówka
    // w content/events.json). Logujemy i zwracamy bezpieczną wartość domyślną.
    // Testy w tests/content-data.test.ts wyłapią takie błędy jeszcze przed wdrożeniem.
    console.error(`[content] Nie udało się sparsować ${relativePath}:`, error);
    return fallback;
  }
}

export function getEvents(): EventItem[] {
  const events = readJson<unknown>("events.json", []);
  if (!Array.isArray(events)) return [];
  return [...(events as EventItem[])].sort((a, b) => (a.start < b.start ? -1 : 1));
}

const warsawClockParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Warsaw",
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Moment zakończenia wydarzenia (epoch ms). Gdy brak pola `end`, wydarzenie
 * pozostaje „nadchodzące" do końca dnia jego rozpoczęcia (wg strefy Europe/Warsaw),
 * a nie znika zaraz po godzinie startu.
 */
export function eventEndTime(e: EventItem): number {
  if (e.end) return new Date(e.end).getTime();
  const start = new Date(e.start);
  const parts = warsawClockParts.formatToParts(start);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? "0");
  const msIntoDay = ((get("hour") * 60 + get("minute")) * 60 + get("second")) * 1000;
  return start.getTime() + (MS_PER_DAY - msIntoDay);
}

export function getUpcomingEvents(limit?: number): EventItem[] {
  const now = Date.now();
  const upcoming = getEvents().filter((e) => eventEndTime(e) >= now);
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export function getPastEvents(): EventItem[] {
  const now = Date.now();
  return getEvents()
    .filter((e) => eventEndTime(e) < now)
    .reverse();
}

type RegionData = {
  alerts: RegionAlert[];
  roadNotices: RoadNotice[];
  emergency: EmergencyContact[];
  pharmacies: EmergencyContact[];
  health: EmergencyContact[];
};

// Awaryjne numery alarmowe — używane, gdy content/region.json jest pusty,
// uszkodzony lub nie zawiera numerów. Bezpieczeństwo: 112 nie może „zniknąć"
// przez literówkę w pliku treści.
const DEFAULT_EMERGENCY: EmergencyContact[] = [
  { name: "Numer alarmowy (ogólny)", phone: "112", note: "Zawsze, gdy zagrożone jest życie lub zdrowie" },
  { name: "Pogotowie ratunkowe", phone: "999" },
  { name: "Straż pożarna", phone: "998" },
  { name: "Policja", phone: "997" },
];

export function getRegionData(): RegionData {
  const raw = readJson<Partial<RegionData> | null>("region.json", null);
  const asArray = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);
  const emergency = asArray<EmergencyContact>(raw?.emergency);
  return {
    alerts: asArray<RegionAlert>(raw?.alerts),
    roadNotices: asArray<RoadNotice>(raw?.roadNotices),
    emergency: emergency.length > 0 ? emergency : DEFAULT_EMERGENCY,
    pharmacies: asArray<EmergencyContact>(raw?.pharmacies),
    health: asArray<EmergencyContact>(raw?.health),
  };
}
