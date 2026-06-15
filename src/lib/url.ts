// Dopuszczamy wyłącznie bezpieczne schematy w linkach pochodzących z treści
// (frontmatter newsów, źródła w about.md, URL-e wydarzeń itp.). Blokuje to np.
// `javascript:` użyte przez osobę edytującą treść.
const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

export function safeExternalUrl(
  url: string | null | undefined,
): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url.trim());
    return ALLOWED_PROTOCOLS.has(parsed.protocol) ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
}
