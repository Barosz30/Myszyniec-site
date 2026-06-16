import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { getAboutContent } from "@/lib/content";
import { SITE } from "@/lib/site";
import { safeExternalUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: "O Myszyńcu",
  description:
    "Historia, ciekawostki i podstawowe dane o Myszyńcu — stolicy Kurpiów w powiecie ostrołęckim.",
  alternates: { canonical: "/o-myszyncu" },
};

type AboutData = {
  title?: string;
  lead?: string;
  gmina?: string;
  powiat?: string;
  wojewodztwo?: string;
  populacjaMiasto?: string;
  populacjaGmina?: string;
  powierzchniaGmina?: string;
  kodPocztowy?: string;
  nrKierunkowy?: string;
  rzeka?: string;
  sources?: { label: string; url: string }[];
};

export default async function AboutPage() {
  const { data, html } = await getAboutContent();
  const about = data as AboutData;

  const facts: { label: string; value?: string }[] = [
    { label: "Gmina", value: about.gmina },
    { label: "Powiat", value: about.powiat },
    { label: "Województwo", value: about.wojewodztwo },
    { label: "Ludność (miasto)", value: about.populacjaMiasto },
    { label: "Ludność (gmina)", value: about.populacjaGmina },
    { label: "Powierzchnia gminy", value: about.powierzchniaGmina },
    { label: "Rzeka", value: about.rzeka },
    { label: "Kod pocztowy", value: about.kodPocztowy },
    { label: "Numer kierunkowy", value: about.nrKierunkowy },
  ].filter((f) => Boolean(f.value));

  const { latitude, longitude } = SITE.geo;
  const d = 0.05;
  const bbox = `${longitude - d},${latitude - 0.03},${longitude + d},${latitude + 0.03}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;
  const mapLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=13/${latitude}/${longitude}`;

  return (
    <Container className="py-12">
      <SectionHeading
        as="h1"
        eyebrow="Poznaj nas"
        title={about.title ?? "O Myszyńcu"}
        description={about.lead}
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {about.sources && about.sources.length > 0 ? (
            <div className="mt-10 rounded-[var(--radius-card)] border border-border bg-surface-muted/60 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Źródła
              </h2>
              <ul className="mt-3 space-y-1 text-sm">
                {about.sources.map((s) => {
                  const href = safeExternalUrl(s.url);
                  return (
                    <li key={s.url}>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          {s.label}
                        </a>
                      ) : (
                        <span>{s.label}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground">Podstawowe dane</h2>
            <dl className="mt-4 divide-y divide-border">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex justify-between gap-4 py-2 text-sm"
                >
                  <dt className="text-muted-foreground">{fact.label}</dt>
                  <dd className="text-right font-semibold text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-sm">
            <iframe
              title="Mapa Myszyńca (OpenStreetMap)"
              src={mapSrc}
              loading="lazy"
              className="h-64 w-full border-0"
            />
            <div className="p-4 text-sm">
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline"
              >
                Otwórz większą mapę (OpenStreetMap) →
              </a>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
