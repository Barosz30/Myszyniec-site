import fs from "node:fs";
import path from "node:path";
import type { KurpieDictionaryEntry } from "./kurpie-dictionary-shared";

export type {
  KurpieDictionaryCategory,
  KurpieDictionaryEntry,
} from "./kurpie-dictionary-shared";

export {
  KURPIE_DICTIONARY_CATEGORIES,
  defaultKurpieAudioPath,
  filterKurpieDictionary,
} from "./kurpie-dictionary-shared";

const DICTIONARY_PATH = path.join(
  process.cwd(),
  "content",
  "kurpie-dictionary.json",
);

function isValidEntry(value: unknown): value is KurpieDictionaryEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.id === "string" &&
    entry.id.trim() !== "" &&
    typeof entry.polish === "string" &&
    entry.polish.trim() !== "" &&
    typeof entry.kurpie === "string" &&
    entry.kurpie.trim() !== ""
  );
}

export function getKurpieDictionary(): KurpieDictionaryEntry[] {
  if (!fs.existsSync(DICTIONARY_PATH)) return [];

  try {
    const raw = JSON.parse(fs.readFileSync(DICTIONARY_PATH, "utf8")) as {
      entries?: unknown[];
    };

    return (raw.entries ?? [])
      .filter(isValidEntry)
      .map((entry) => ({
        ...entry,
        audio: entry.audio?.trim() || undefined,
      }))
      .sort((a, b) =>
        a.polish.localeCompare(b.polish, "pl", { sensitivity: "base" }),
      );
  } catch (error) {
    console.error("[kurpie-dictionary] Nie udało się wczytać słownika:", error);
    return [];
  }
}
