import { describe, expect, it } from "vitest";
import {
  getAboutContent,
  getAllNews,
  getEvents,
  getNewsBySlug,
  getNewsSlugs,
  getPastEvents,
  getRegionData,
  getUpcomingEvents,
} from "./content";

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
