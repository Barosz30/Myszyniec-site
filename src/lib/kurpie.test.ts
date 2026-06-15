import { describe, expect, it } from "vitest";
import {
  KURPIE_FACTS,
  KURPIE_PHRASES,
  dailyKurpieFact,
  randomKurpiePhrase,
} from "./kurpie";

describe("kurpie helpers", () => {
  it("has non-empty phrases with translations", () => {
    expect(KURPIE_PHRASES.length).toBeGreaterThan(0);
    for (const p of KURPIE_PHRASES) {
      expect(p.phrase.trim()).not.toBe("");
      expect(p.meaning.trim()).not.toBe("");
    }
  });

  it("dailyKurpieFact returns one of the defined facts", () => {
    expect(KURPIE_FACTS).toContain(dailyKurpieFact());
  });

  it("randomKurpiePhrase returns a defined phrase", () => {
    expect(KURPIE_PHRASES).toContainEqual(randomKurpiePhrase());
  });
});
