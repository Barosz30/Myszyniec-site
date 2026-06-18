export type KurpieDictionaryCategory =
  | "powitania"
  | "codzienne"
  | "rodzina"
  | "przyroda";

export type KurpieDictionaryEntry = {
  id: string;
  polish: string;
  kurpie: string;
  /** Ścieżka do pliku MP3 w katalogu public/, np. /audio/gwara/psiekny.mp3 */
  audio?: string;
  category?: KurpieDictionaryCategory;
};

export const KURPIE_DICTIONARY_CATEGORIES: {
  id: KurpieDictionaryCategory | "wszystkie";
  label: string;
}[] = [
  { id: "wszystkie", label: "Wszystkie" },
  { id: "powitania", label: "Powitania" },
  { id: "codzienne", label: "Codzienne" },
  { id: "rodzina", label: "Rodzina" },
  { id: "przyroda", label: "Przyroda" },
];

export function filterKurpieDictionary(
  entries: KurpieDictionaryEntry[],
  query: string,
  category: KurpieDictionaryCategory | "wszystkie",
): KurpieDictionaryEntry[] {
  const normalizedQuery = query.trim().toLocaleLowerCase("pl");

  return entries.filter((entry) => {
    const matchesCategory =
      category === "wszystkie" || entry.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    return (
      entry.polish.toLocaleLowerCase("pl").includes(normalizedQuery) ||
      entry.kurpie.toLocaleLowerCase("pl").includes(normalizedQuery)
    );
  });
}

/** Domyślna ścieżka do nagrania — plik {id}.mp3 w public/audio/gwara/ */
export function defaultKurpieAudioPath(id: string): string {
  return `/audio/gwara/${id}.mp3`;
}
