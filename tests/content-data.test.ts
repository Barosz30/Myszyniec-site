import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import type { EventItem } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

describe("content/news/*.md", () => {
  const files = fs
    .readdirSync(path.join(CONTENT_DIR, "news"))
    .filter((f) => f.endsWith(".md"));

  it("has at least one news file", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s has valid required frontmatter", (file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, "news", file), "utf8");
    const { data, content } = matter(raw);
    expect(typeof data.title).toBe("string");
    expect(String(data.title).trim()).not.toBe("");
    expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Number.isNaN(new Date(String(data.date)).getTime())).toBe(false);
    expect(content.trim().length).toBeGreaterThan(0);
  });
});

describe("content/events.json", () => {
  const events = JSON.parse(
    fs.readFileSync(path.join(CONTENT_DIR, "events.json"), "utf8"),
  ) as EventItem[];

  it("is a non-empty array", () => {
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  it("has unique ids and valid start dates", () => {
    const ids = new Set<string>();
    for (const e of events) {
      expect(e.id).toBeTruthy();
      expect(ids.has(e.id)).toBe(false);
      ids.add(e.id);
      expect(e.title).toBeTruthy();
      expect(Number.isNaN(new Date(e.start).getTime())).toBe(false);
      if (e.end) {
        expect(new Date(e.end).getTime()).toBeGreaterThanOrEqual(
          new Date(e.start).getTime(),
        );
      }
    }
  });
});

describe("content/region.json", () => {
  const region = JSON.parse(
    fs.readFileSync(path.join(CONTENT_DIR, "region.json"), "utf8"),
  );

  it("contains the required sections", () => {
    for (const key of ["alerts", "roadNotices", "emergency", "health", "pharmacies"]) {
      expect(Array.isArray(region[key])).toBe(true);
    }
  });

  it("includes core emergency numbers", () => {
    const phones = region.emergency.map((c: { phone: string }) => c.phone);
    expect(phones).toContain("112");
  });

  it("uses only known alert levels", () => {
    for (const alert of region.alerts) {
      expect(["info", "warning", "danger"]).toContain(alert.level);
    }
  });
});
