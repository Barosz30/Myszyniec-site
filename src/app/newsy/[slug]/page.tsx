import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getNewsBySlug, getNewsSlugs } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "Nie znaleziono" };
  return {
    title: article.title,
    description: article.excerpt ?? SITE.description,
    alternates: { canonical: `/newsy/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt ?? SITE.description,
      publishedTime: article.date,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  return (
    <Container className="py-12">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/newsy"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
        >
          <span aria-hidden="true">←</span> Wszystkie newsy
        </Link>

        <header className="mt-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true">•</span>
            <span>{article.readingTimeMin} min czytania</span>
            {article.source ? (
              <>
                <span aria-hidden="true">•</span>
                <span>{article.source}</span>
              </>
            ) : null}
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {article.title}
          </h1>
          {article.tags && article.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div
          className="prose-content mt-8"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        {article.sourceUrl ? (
          <p className="mt-8 rounded-xl border border-border bg-surface-muted/60 p-4 text-sm text-muted-foreground">
            Źródło:{" "}
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline"
            >
              {article.source ?? article.sourceUrl}
            </a>
          </p>
        ) : null}

        {article.author ? (
          <p className="mt-6 text-sm text-muted-foreground">Autor: {article.author}</p>
        ) : null}
      </article>
    </Container>
  );
}
