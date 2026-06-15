import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatDateTime,
  formatDay,
  formatMonthShort,
  formatWeekday,
  isToday,
} from "./format";

describe("format helpers (Europe/Warsaw)", () => {
  it("formats a date in Polish", () => {
    expect(formatDate("2026-06-15T10:00:00Z")).toBe("15 czerwca 2026");
  });

  it("uses Warsaw timezone, not the server timezone", () => {
    // 23:30 UTC on 1 Jan = 00:30 on 2 Jan in Warsaw (UTC+1 in winter)
    const formatted = formatDateTime("2026-01-01T23:30:00Z");
    expect(formatted).toContain("2 stycznia 2026");
    expect(formatted).toContain("00:30");
  });

  it("returns a short weekday", () => {
    // 2026-06-15 is a Monday
    expect(formatWeekday("2026-06-15T10:00:00Z").toLowerCase()).toContain("pon");
  });

  it("isToday is true for the current instant and false for a past date", () => {
    expect(isToday(new Date().toISOString())).toBe(true);
    expect(isToday("2000-01-01T12:00:00Z")).toBe(false);
  });

  it("formats the day/month badge in Warsaw timezone", () => {
    // 23:30 UTC on 1 Jan = 2 Jan 00:30 in Warsaw → badge should read day 02
    expect(formatDay("2026-01-01T23:30:00Z")).toBe("02");
    expect(formatMonthShort("2026-08-23T11:00:00+02:00").toLowerCase()).toContain(
      "sie",
    );
  });
});
