import fs from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  eventEndTime,
  getAboutContent,
  getAllNews,
  getEvents,
  getNewsBySlug,
  getNewsSlugs,
  getPastEvents,
  getRegionData,
  getUpcomingEvents,
} from "./content";
import type { EventItem } from "./types";

describe("news content", () => {
  it("lists news slugs", () => {
    const slugs = getNewsSlugs();
    expect(slugs.length).toBeGreaterThan(0);
  });

  it("returns all news sorted by date descending", () => {
    const news = getAllNews();
    expect(news.length).toBeGreaterThan(0);
    for (let i = 1; i < news.length; i++) {
      expect(news[i - 1].date >= news[i].date).toBe(true);
    }
    for (const item of news) {
      expect(item.title).toBeTruthy();
      expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("loads a single article with rendered HTML and reading time", async () => {
    const slug = getNewsSlugs()[0];
    const article = await getNewsBySlug(slug);
    expect(article).not.toBeNull();
    expect(article!.html).toContain("<");
    expect(article!.readingTimeMin).toBeGreaterThanOrEqual(1);
  });

  it("returns null for an unknown slug", async () => {
    expect(await getNewsBySlug("nie-istnieje-xyz")).toBeNull();
  });

  it("skips a single malformed markdown file instead of crashing the list", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const realRead = fs.readFileSync.bind(fs);
    vi.spyOn(fs, "readFileSync").mockImplementation(((p: string, enc: unknown) => {
      // Wstrzykujemy uszkodzony frontmatter dla pierwszego pliku
      if (String(p).endsWith(".md")) {
        return "---\n: : bad yaml\n: :\n---\nTreść" as unknown as string;
      }
      return realRead(p as string, enc as never);
    }) as typeof fs.readFileSync);

    expect(() => getAllNews()).not.toThrow();
    vi.restoreAllMocks();
  });
});

describe("about content", () => {
  it("returns frontmatter data and HTML", async () => {
    const { data, html } = await getAboutContent();
    expect(data.title).toBeTruthy();
    expect(html).toContain("<");
  });
});

describe("events", () => {
  it("returns events sorted by start ascending", () => {
    const events = getEvents();
    expect(events.length).toBeGreaterThan(0);
    for (let i = 1; i < events.length; i++) {
      expect(events[i - 1].start <= events[i].start).toBe(true);
    }
  });

  it("partitions into upcoming and past with no overlap", () => {
    const upcoming = getUpcomingEvents();
    const past = getPastEvents();
    const total = getEvents().length;
    expect(upcoming.length + past.length).toBe(total);
  });

  it("respects the limit argument for upcoming events", () => {
    const limited = getUpcomingEvents(1);
    expect(limited.length).toBeLessThanOrEqual(1);
  });
});

describe("eventEndTime", () => {
  it("uses the explicit end time when provided", () => {
    const e: EventItem = {
      id: "x",
      title: "x",
      start: "2026-08-23T11:00:00+02:00",
      end: "2026-08-23T20:00:00+02:00",
    };
    expect(eventEndTime(e)).toBe(new Date(e.end!).getTime());
  });

  it("keeps an end-less event alive until the end of its start day (Warsaw)", () => {
    // 11:00 czasu warszawskiego → do północy zostaje 13 godzin
    const e: EventItem = { id: "x", title: "x", start: "2026-08-23T11:00:00+02:00" };
    const diffHours = (eventEndTime(e) - new Date(e.start).getTime()) / 3_600_000;
    expect(diffHours).toBeCloseTo(13, 5);
  });
});

describe("region data", () => {
  it("always exposes the 112 emergency number", () => {
    const region = getRegionData();
    const numbers = region.emergency.map((c) => c.phone);
    expect(numbers).toContain("112");
  });

  it("has well-formed sections", () => {
    const region = getRegionData();
    expect(Array.isArray(region.alerts)).toBe(true);
    expect(Array.isArray(region.roadNotices)).toBe(true);
    expect(Array.isArray(region.pharmacies)).toBe(true);
    expect(Array.isArray(region.health)).toBe(true);
  });
});

describe("resilience to corrupt content files", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a safe fallback when JSON cannot be parsed", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("{ this is : not valid json" as never);

    expect(getEvents()).toEqual([]);
    const region = getRegionData();
    expect(region.emergency).toEqual([]);
    expect(region.alerts).toEqual([]);
  });

  it("returns a safe fallback for syntactically valid but wrong-shape JSON", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    // Poprawny JSON, ale nie tablica / nie obiekt o oczekiwanym kształcie
    vi.spyOn(fs, "readFileSync").mockReturnValue("null" as never);

    expect(getEvents()).toEqual([]);
    const region = getRegionData();
    expect(region.emergency).toEqual([]);
    expect(region.roadNotices).toEqual([]);
    expect(region.health).toEqual([]);
  });
});

describe("markdown sanitization (XSS protection)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("strips scripts, event handlers and javascript: links from rendered HTML", async () => {
    const malicious = [
      "# Tytuł",
      "",
      "<script>alert('xss')</script>",
      "",
      "[zły link](javascript:alert(1))",
      "",
      "<img src=x onerror=alert(1) />",
    ].join("\n");

    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(malicious as never);

    const article = await getNewsBySlug("dowolny");
    expect(article).not.toBeNull();
    expect(article!.html).not.toContain("<script");
    expect(article!.html.toLowerCase()).not.toContain("javascript:");
    expect(article!.html.toLowerCase()).not.toContain("onerror");
  });
});
