"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold tracking-tight"
            aria-label={`${SITE.name} — strona główna`}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm"
              aria-hidden="true"
            >
              {/* Stylizowana sosna — nawiązanie do Puszczy Zielonej (Kurpie) */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2 7 9h2.5L6 14h3.5L5 20h6v2h2v-2h6l-4.5-6H18l-3.5-5H17L12 2Z" />
              </svg>
            </span>
            <span className="text-lg">
              Twój <span className="text-primary">Myszyniec</span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Nawigacja główna"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-surface-muted text-primary"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground lg:hidden"
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
                aria-hidden="true"
              >
                {open ? (
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-surface lg:hidden"
          aria-label="Nawigacja mobilna"
        >
          <Container className="py-2">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-lg px-3 py-3 text-base font-medium ${
                      isActive(item.href)
                        ? "bg-surface-muted text-primary"
                        : "text-foreground hover:bg-surface-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
