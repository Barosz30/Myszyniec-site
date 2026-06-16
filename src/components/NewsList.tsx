import Link from "next/link";
import type { NewsListItem } from "@/lib/types";
import { formatDate } from "@/lib/format";

function NewsCard({ item }: { item: NewsListItem }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <time dateTime={item.date}>{formatDate(item.date)}</time>
        {item.source ? (
          <>
            <span aria-hidden="true">•</span>
            <span>{item.source}</span>
          </>
        ) : null}
      </div>

      <h3 className="mt-2 text-lg font-bold leading-snug text-foreground">
        <Link
          href={`/newsy/${item.slug}`}
          className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-primary"
        >
          {item.title}
        </Link>
      </h3>

      {item.excerpt ? (
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.excerpt}</p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {item.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Czytaj dalej
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );
}

export function NewsList({ items }: { items: NewsListItem[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-[var(--radius-card)] border border-dashed border-border bg-surface p-8 text-center text-muted-foreground">
        Na razie brak newsów. Zajrzyj wkrótce — albo dodaj własny wpis w{" "}
        <code className="rounded bg-surface-muted px-1.5 py-0.5">content/news/</code>.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <NewsCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
