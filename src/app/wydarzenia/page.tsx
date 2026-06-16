import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { getPastEvents, getUpcomingEvents } from "@/lib/content";

// Podział na nadchodzące/minione zależy od bieżącego czasu, więc odświeżamy
// stronę co 30 minut (inaczej klasyfikacja zamarłaby do następnego buildu).
export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Wydarzenia w Myszyńcu",
  description:
    "Kalendarz lokalnych wydarzeń: festyny, koncerty, spotkania i imprezy sportowe w Myszyńcu i gminie.",
  alternates: { canonical: "/wydarzenia" },
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <Container className="py-12">
      <SectionHeading
        as="h1"
        eyebrow="Kalendarz"
        title="Wydarzenia w okolicy"
        description="Festyny, koncerty, spotkania i sport. Dane prowadzimy w pliku content/events.json."
      />

      <section className="mt-8" aria-labelledby="nadchodzace">
        <h2 id="nadchodzace" className="mb-4 text-xl font-bold text-foreground">
          Nadchodzące
        </h2>
        {upcoming.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="rounded-[var(--radius-card)] border border-dashed border-border bg-surface p-6 text-muted-foreground">
            Brak nadchodzących wydarzeń. Dodaj nowe w{" "}
            <code className="rounded bg-surface-muted px-1.5 py-0.5">content/events.json</code>.
          </p>
        )}
      </section>

      {past.length > 0 ? (
        <section className="mt-12" aria-labelledby="minione">
          <h2 id="minione" className="mb-4 text-xl font-bold text-foreground">
            Minione
          </h2>
          <div className="grid gap-4 opacity-75 sm:grid-cols-2">
            {past.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
