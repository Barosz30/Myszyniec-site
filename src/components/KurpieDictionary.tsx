"use client";

import { useMemo, useState } from "react";
import {
  KURPIE_DICTIONARY_CATEGORIES,
  defaultKurpieAudioPath,
  filterKurpieDictionary,
  type KurpieDictionaryCategory,
  type KurpieDictionaryEntry,
} from "@/lib/kurpie-dictionary-shared";
import { KurpieAudioButton } from "./KurpieAudioButton";

type KurpieDictionaryProps = {
  entries: KurpieDictionaryEntry[];
};

export function KurpieDictionary({ entries }: KurpieDictionaryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] =
    useState<KurpieDictionaryCategory | "wszystkie">("wszystkie");

  const filtered = useMemo(
    () => filterKurpieDictionary(entries, query, category),
    [entries, query, category],
  );

  const audioCount = entries.filter((entry) => Boolean(entry.audio)).length;

  return (
    <div className="mt-10 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="block max-w-xl flex-1">
          <span className="text-sm font-medium text-foreground">
            Szukaj w słowniku
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="np. piękny, psiekny, woda…"
            className="mt-2 w-full rounded-[var(--radius-card)] border border-border bg-surface px-4 py-3 text-base text-foreground shadow-sm outline-none ring-primary/30 transition-shadow placeholder:text-muted-foreground focus:ring-2"
          />
        </label>

        <fieldset>
          <legend className="sr-only">Kategoria</legend>
          <div className="flex flex-wrap gap-2">
            {KURPIE_DICTIONARY_CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={category === item.id}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  category === item.id
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-surface text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="text-sm text-muted-foreground">
        Wyświetlono {filtered.length} z {entries.length} haseł.
        {audioCount > 0
          ? ` Nagrania dostępne dla ${audioCount} pozycji.`
          : " Nagrania można dodać jako pliki MP3 w katalogu public/audio/gwara/."}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-[var(--radius-card)] border border-dashed border-border bg-surface-muted/50 p-8 text-center">
          <p className="font-medium text-foreground">Brak wyników</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Spróbuj innego słowa lub wybierz inną kategorię.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-sm md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-muted/80 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-5 py-3">
                    Po polsku
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Po kurpiowsku
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Dźwięk
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((entry) => (
                  <DictionaryRow key={entry.id} entry={entry} />
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3 md:hidden">
            {filtered.map((entry) => (
              <li
                key={entry.id}
                className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-sm"
              >
                <div className="grid gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Po polsku
                    </p>
                    <p className="mt-1 text-base font-medium text-foreground">
                      {entry.polish}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Po kurpiowsku
                    </p>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      {entry.kurpie}
                    </p>
                  </div>
                  <KurpieAudioButton
                    src={entry.audio ?? defaultKurpieAudioPath(entry.id)}
                    label={entry.kurpie}
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function DictionaryRow({ entry }: { entry: KurpieDictionaryEntry }) {
  return (
    <tr className="transition-colors hover:bg-surface-muted/40">
      <td className="px-5 py-4 font-medium text-foreground">{entry.polish}</td>
      <td className="px-5 py-4 text-base font-semibold text-foreground">
        {entry.kurpie}
      </td>
      <td className="px-5 py-4">
        <KurpieAudioButton
          src={entry.audio ?? defaultKurpieAudioPath(entry.id)}
          label={entry.kurpie}
        />
      </td>
    </tr>
  );
}
