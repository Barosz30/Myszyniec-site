import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NewsList } from "./NewsList";
import type { NewsListItem } from "@/lib/types";

// Prosty stub next/link, by uniknąć zależności od kontekstu routera w testach.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const items: NewsListItem[] = [
  {
    slug: "pierwszy",
    title: "Pierwszy news",
    date: "2026-06-10",
    excerpt: "Zajawka pierwszego newsa.",
    source: "Redakcja",
    tags: ["kultura", "miasto"],
  },
  {
    slug: "drugi",
    title: "Drugi news",
    date: "2026-06-09",
  },
];

describe("NewsList", () => {
  it("renders all news items with links to detail pages", () => {
    render(<NewsList items={items} />);
    expect(screen.getByText("Pierwszy news")).toBeInTheDocument();
    expect(screen.getByText("Drugi news")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Pierwszy news" });
    expect(link).toHaveAttribute("href", "/newsy/pierwszy");
  });

  it("renders tags and excerpt when present", () => {
    render(<NewsList items={items} />);
    expect(screen.getByText("Zajawka pierwszego newsa.")).toBeInTheDocument();
    expect(screen.getByText("#kultura")).toBeInTheDocument();
  });

  it("shows an empty state when there are no items", () => {
    render(<NewsList items={[]} />);
    expect(screen.getByText(/Na razie brak newsów/)).toBeInTheDocument();
  });
});
