import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { NewsList } from "@/components/NewsList";
import { getAllNews } from "@/lib/content";

export const metadata: Metadata = {
  title: "Newsy z Myszyńca",
  description:
    "Najnowsze informacje z Myszyńca i gminy. Lokalne wiadomości z datą i źródłem.",
  alternates: { canonical: "/newsy" },
};

export default function NewsPage() {
  const news = getAllNews();

  return (
    <Container className="py-12">
      <SectionHeading
        as="h1"
        eyebrow="Newsy"
        title="Co słychać w Myszyńcu?"
        description="Lokalne informacje z miasta i gminy. Każdy wpis ma datę, a tam gdzie to możliwe — źródło."
      />
      <div className="mt-8">
        <NewsList items={news} />
      </div>
    </Container>
  );
}
