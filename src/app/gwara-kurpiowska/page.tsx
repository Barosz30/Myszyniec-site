import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { KurpieDictionary } from "@/components/KurpieDictionary";
import { SectionHeading } from "@/components/SectionHeading";
import { getKurpieDictionary } from "@/lib/kurpie-dictionary";
import { safeExternalUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: "Gwara kurpiowska",
  description:
    "Słownik gwary kurpiowskiej — polskie słowo, forma kurpiowska i nagrania wymowy. Naucz się mówić po kurpiowsku.",
  alternates: { canonical: "/gwara-kurpiowska" },
};

const SOURCES = [
  {
    label: "Gwara kurpiowska — Wikipedia",
    url: "https://pl.wikipedia.org/wiki/Gwara_kurpiowska",
  },
  {
    label: "Kurpie — gwara regionu (Dialektologia UW)",
    url: "http://www.dialektologia.uw.edu.pl/index.php?l1=mapa-serwisu&l2=&l3=&l4=kurpie-gwara-regionu",
  },
  {
    label: "Słownik nazw i wyrażeń kurpiowskich — Związek Kurpiów",
    url: "https://zwiazekkurpiow.pl/slownik/",
  },
  {
    label: "Mowa kurpiowska — To jest kurpiowskie!",
    url: "https://tojestkurpiowskie.pl/kategoria-multimedia/mowa-kurpiowska/",
  },
];

export default function KurpieDialectPage() {
  const entries = getKurpieDictionary();

  return (
    <Container className="py-12">
      <SectionHeading
        as="h1"
        eyebrow="Mowa Kurpiów"
        title="Gwara kurpiowska"
        description="Słownik zapisu: słowo po polsku, odpowiednik po kurpiowsku i nagranie wymowy. Pisownia nawiązuje do dialektu literackiego Kurpiów Puszczy Zielonej."
      />

      <div className="mt-6 rounded-[var(--radius-card)] border border-border bg-accent/10 p-5 text-sm text-muted-foreground">
        <p>
          Przy każdym haśle możesz odsłuchać nagranie wymowy po kurpiowsku. Obecnie
          są to <strong className="text-foreground">syntetyczne nagrania</strong> (lektor
          TTS) — możesz je sprawdzić i w razie potrzeby podmienić własnym plikiem MP3 w
          katalogu{" "}
          <code className="rounded bg-surface px-1.5 py-0.5">public/audio/gwara/</code>
          . Hasła warto weryfikować z lokalnymi znawcami gwary (np.{" "}
          <a
            href="https://zwiazekkurpiow.pl/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline"
          >
            Związek Kurpiów
          </a>
          ).
        </p>
      </div>

      <KurpieDictionary entries={entries} />

      <div className="mt-12 rounded-[var(--radius-card)] border border-border bg-surface-muted/60 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Źródła i uwagi
        </h2>
        <ul className="mt-3 space-y-1 text-sm">
          {SOURCES.map((source) => {
            const href = safeExternalUrl(source.url);
            return (
              <li key={source.url}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    {source.label}
                  </a>
                ) : (
                  <span>{source.label}</span>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Aby podmienić nagranie, zastąp plik MP3 w{" "}
          <code className="rounded bg-surface px-1.5 py-0.5">
            public/audio/gwara/
          </code>{" "}
          (np. <code className="rounded bg-surface px-1.5 py-0.5">piekny.mp3</code>
          ) lub podaj ścieżkę w polu <code className="rounded bg-surface px-1.5 py-0.5">audio</code>{" "}
          w pliku{" "}
          <code className="rounded bg-surface px-1.5 py-0.5">
            content/kurpie-dictionary.json
          </code>
          . Nowe syntetyczne nagrania wygenerujesz poleceniem{" "}
          <code className="rounded bg-surface px-1.5 py-0.5">yarn audio:kurpie</code>
          .
        </p>
      </div>
    </Container>
  );
}
