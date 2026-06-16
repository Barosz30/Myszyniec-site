import { describe, expect, it } from "vitest";
import { safeExternalUrl } from "./url";

describe("safeExternalUrl", () => {
  it("allows http, https and mailto", () => {
    expect(safeExternalUrl("https://www.myszyniec.pl/")).toBe(
      "https://www.myszyniec.pl/",
    );
    expect(safeExternalUrl("http://example.com/")).toBe("http://example.com/");
    expect(safeExternalUrl("mailto:kontakt@twoj-myszyniec.pl")).toBe(
      "mailto:kontakt@twoj-myszyniec.pl",
    );
  });

  it("rejects dangerous schemes", () => {
    expect(safeExternalUrl("javascript:alert(1)")).toBeUndefined();
    expect(safeExternalUrl("data:text/html,<script>alert(1)</script>")).toBeUndefined();
    expect(safeExternalUrl("vbscript:msgbox(1)")).toBeUndefined();
  });

  it("rejects empty, nullish and malformed values", () => {
    expect(safeExternalUrl(undefined)).toBeUndefined();
    expect(safeExternalUrl(null)).toBeUndefined();
    expect(safeExternalUrl("")).toBeUndefined();
    expect(safeExternalUrl("nie-jest-url")).toBeUndefined();
  });
});
