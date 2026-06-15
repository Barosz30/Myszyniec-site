import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { getRegionData } from "@/lib/content";
import type { EmergencyContact, RegionAlert } from "@/lib/types";

export const metadata: Metadata = {
  title: "Ważne dla regionu",
  description:
    "Alerty, komunikaty drogowe oraz numery alarmowe i ważne kontakty dla mieszkańców Myszyńca i okolicy.",
  alternates: { canonical: "/wazne" },
};

const alertStyles: Record<RegionAlert["level"], string> = {
  info: "border-sky/40 bg-sky/10",
  warning: "border-warning/50 bg-warning/10",
  danger: "border-danger/50 bg-danger/10",
};

const alertLabel: Record<RegionAlert["level"], string> = {
  info: "Informacja",
  warning: "Ostrzeżenie",
  danger: "Alarm",
};

function ContactList({
  title,
  items,
}: {
  title: string;
  items: EmergencyContact[];
}) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-sm">
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((c) => (
          <li key={`${c.name}-${c.phone}`} className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-foreground">{c.name}</span>
              <a
                href={`tel:${c.phone.replace(/\s+/g, "")}`}
                className="shrink-0 rounded-full bg-primary/12 px-3 py-1 font-mono text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {c.phone}
              </a>
            </div>
            {c.note ? (
              <span className="text-sm text-muted-foreground">{c.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RegionPage() {
  const { alerts, roadNotices, emergency, health, pharmacies } = getRegionData();

  return (
    <Container className="py-12">
      <SectionHeading
        as="h1"
        eyebrow="Bezpieczeństwo i komunikaty"
        title="Ważne dla regionu"
        description="Alerty, komunikaty drogowe i najważniejsze numery — wszystko pod ręką."
      />

      {/* ALERTY */}
      <section className="mt-8" aria-labelledby="alerty">
        <h2 id="alerty" className="mb-4 text-xl font-bold text-foreground">
          Alerty i ostrzeżenia
        </h2>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              role="status"
              className={`rounded-[var(--radius-card)] border p-5 ${alertStyles[alert.level]}`}
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-foreground">
                  {alertLabel[alert.level]}
                </span>
                <h3 className="font-bold text-foreground">{alert.title}</h3>
              </div>
              {alert.body ? (
                <p className="mt-2 text-sm text-muted-foreground">{alert.body}</p>
              ) : null}
              {alert.sourceUrl ? (
                <a
                  href={alert.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-primary underline"
                >
                  Źródło: {alert.source ?? "link"}
                </a>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Oficjalne ostrzeżenia meteorologiczne publikuje IMGW-PIB. Planujemy ich
          automatyczną integrację — patrz komentarze TODO w kodzie.
        </p>
      </section>

      {/* KOMUNIKATY DROGOWE */}
      <section className="mt-12" aria-labelledby="drogi">
        <h2 id="drogi" className="mb-4 text-xl font-bold text-foreground">
          Komunikaty drogowe i prace
        </h2>
        <div className="space-y-3">
          {roadNotices.map((notice) => (
            <div
              key={notice.id}
              className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-sm"
            >
              <h3 className="font-bold text-foreground">{notice.title}</h3>
              {notice.body ? (
                <p className="mt-1 text-sm text-muted-foreground">{notice.body}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* NUMERY ALARMOWE I KONTAKTY */}
      <section className="mt-12" aria-labelledby="numery">
        <h2 id="numery" className="mb-4 text-xl font-bold text-foreground">
          Numery alarmowe i ważne kontakty
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          <ContactList title="Numery alarmowe" items={emergency} />
          <ContactList title="Zdrowie" items={health} />
          <ContactList title="Apteki" items={pharmacies} />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          W nagłych przypadkach zagrożenia życia dzwoń pod{" "}
          <strong className="text-foreground">112</strong>. Część danych kontaktowych to
          przykłady — przed publikacją zweryfikuj je w pliku{" "}
          <code className="rounded bg-surface-muted px-1.5 py-0.5">content/region.json</code>.
        </p>
      </section>
    </Container>
  );
}
