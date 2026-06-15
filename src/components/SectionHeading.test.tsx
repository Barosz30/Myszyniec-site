import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "./SectionHeading";

describe("SectionHeading", () => {
  it("renders eyebrow, title and description", () => {
    render(
      <SectionHeading
        eyebrow="Najnowsze"
        title="Newsy z Myszyńca"
        description="Opis sekcji"
      />,
    );
    expect(screen.getByText("Najnowsze")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Newsy z Myszyńca" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Opis sekcji")).toBeInTheDocument();
  });

  it("renders an h1 when requested", () => {
    render(<SectionHeading title="Tytuł" as="h1" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Tytuł");
  });
});
