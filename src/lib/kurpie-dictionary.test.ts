import { describe, expect, it } from "vitest";
import {
  filterKurpieDictionary,
  getKurpieDictionary,
} from "./kurpie-dictionary";

describe("kurpie dictionary", () => {
  it("loads non-empty dictionary entries", () => {
    const entries = getKurpieDictionary();
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.id.trim()).not.toBe("");
      expect(entry.polish.trim()).not.toBe("");
      expect(entry.kurpie.trim()).not.toBe("");
    }
  });

  it("filters by polish or kurpie text", () => {
    const entries = getKurpieDictionary();
    const byPolish = filterKurpieDictionary(entries, "piękny", "wszystkie");
    expect(byPolish.some((e) => e.kurpie.includes("psiekny"))).toBe(true);

    const byKurpie = filterKurpieDictionary(entries, "psiekny", "wszystkie");
    expect(byKurpie.some((e) => e.polish.includes("piękny"))).toBe(true);
  });

  it("filters by category", () => {
    const entries = getKurpieDictionary();
    const greetings = filterKurpieDictionary(entries, "", "powitania");
    expect(greetings.length).toBeGreaterThan(0);
    expect(greetings.every((e) => e.category === "powitania")).toBe(true);
  });
});
