import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EventCard } from "./EventCard";
import type { EventItem } from "@/lib/types";

const baseEvent: EventItem = {
  id: "test-1",
  title: "Miodobranie Kurpiowskie",
  start: "2026-08-23T11:00:00+02:00",
  end: "2026-08-23T20:00:00+02:00",
  location: "Myszyniec, plac przy bazylice",
  description: "Doroczne święto kultury kurpiowskiej.",
  category: "Kultura",
};

describe("EventCard", () => {
  it("renders the title, location, description and category", () => {
    render(<EventCard event={baseEvent} />);
    expect(screen.getByText("Miodobranie Kurpiowskie")).toBeInTheDocument();
    expect(screen.getByText(/plac przy bazylice/)).toBeInTheDocument();
    expect(screen.getByText(/Doroczne święto/)).toBeInTheDocument();
    expect(screen.getByText("Kultura")).toBeInTheDocument();
  });

  it("links the title when a url is provided", () => {
    render(<EventCard event={{ ...baseEvent, url: "https://example.com" }} />);
    const link = screen.getByRole("link", { name: "Miodobranie Kurpiowskie" });
    expect(link).toHaveAttribute("href", "https://example.com/");
  });

  it("renders a non-linked title when no url is provided", () => {
    render(<EventCard event={baseEvent} />);
    expect(
      screen.queryByRole("link", { name: "Miodobranie Kurpiowskie" }),
    ).not.toBeInTheDocument();
  });

  it("does not render a dangerous javascript: url as a link", () => {
    render(<EventCard event={{ ...baseEvent, url: "javascript:alert(1)" }} />);
    expect(
      screen.queryByRole("link", { name: "Miodobranie Kurpiowskie" }),
    ).not.toBeInTheDocument();
  });
});
