export type NewsFrontmatter = {
  title: string;
  date: string; // ISO np. 2026-06-10
  excerpt?: string;
  source?: string; // nazwa źródła, np. "myszyniec.pl"
  sourceUrl?: string; // link do oryginału
  author?: string;
  tags?: string[];
  cover?: string; // ścieżka do obrazka w /public (opcjonalnie)
};

export type NewsArticle = NewsFrontmatter & {
  slug: string;
  html: string; // wyrenderowana treść Markdown
  readingTimeMin: number;
};

export type NewsListItem = NewsFrontmatter & {
  slug: string;
};

export type EventItem = {
  id: string;
  title: string;
  start: string; // ISO data/godzina
  end?: string;
  location?: string;
  description?: string;
  category?: string; // np. "Kultura", "Sport", "Religia"
  url?: string;
};

export type EmergencyContact = {
  name: string;
  phone: string;
  note?: string;
};

export type RegionAlert = {
  id: string;
  level: "info" | "warning" | "danger";
  title: string;
  body?: string;
  validUntil?: string;
  source?: string;
  sourceUrl?: string;
};

export type RoadNotice = {
  id: string;
  title: string;
  body?: string;
  status?: "planned" | "ongoing" | "done";
  date?: string;
};
