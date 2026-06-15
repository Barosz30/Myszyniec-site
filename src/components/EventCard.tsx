import type { EventItem } from "@/lib/types";
import { formatDateTime } from "@/lib/format";

const categoryColors: Record<string, string> = {
  Kultura: "bg-accent/15 text-accent-foreground dark:text-accent",
  Sport: "bg-sky/15 text-sky",
  Religia: "bg-primary/15 text-primary",
  Społeczność: "bg-primary/15 text-primary",
};

export function EventCard({ event }: { event: EventItem }) {
  const start = new Date(event.start);
  const day = start.toLocaleDateString("pl-PL", { day: "2-digit" });
  const month = start.toLocaleDateString("pl-PL", { month: "short" });

  return (
    <article className="flex gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-sm">
      <div
        className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-primary text-primary-foreground"
        aria-hidden="true"
      >
        <span className="text-2xl font-extrabold leading-none">{day}</span>
        <span className="text-xs uppercase">{month}</span>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {event.category ? (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                categoryColors[event.category] ?? "bg-surface-muted text-muted-foreground"
              }`}
            >
              {event.category}
            </span>
          ) : null}
        </div>

        <h3 className="mt-1 text-lg font-bold leading-snug text-foreground">
          {event.url ? (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              {event.title}
            </a>
          ) : (
            event.title
          )}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          <time dateTime={event.start}>{formatDateTime(event.start)}</time>
        </p>

        {event.location ? (
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
              <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            {event.location}
          </p>
        ) : null}

        {event.description ? (
          <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
        ) : null}
      </div>
    </article>
  );
}
