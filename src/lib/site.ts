// Centralna konfiguracja portalu. Zmień tu dane kontaktowe, nazwę i linki nawigacji.

const DEFAULT_SITE_URL = "https://twoj-myszyniec.vercel.app";

// Bezpiecznie ustala adres portalu z NEXT_PUBLIC_SITE_URL.
// Pusta lub niepoprawna wartość nie może wywrócić całej aplikacji
// (new URL(...) w metadataBase rzuciłby błędem przy starcie).
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!fromEnv) return DEFAULT_SITE_URL;
  try {
    return new URL(fromEnv).toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE = {
  name: "Twój Myszyniec",
  shortName: "Twój Myszyniec",
  description:
    "Nieoficjalny portal społecznościowy o Myszyńcu — newsy, pogoda, wydarzenia i sprawy ważne dla regionu. Z sercem dla Kurpiów.",
  // Zmień na docelową domenę po wdrożeniu (używane w SEO, sitemap, OpenGraph).
  // Można nadpisać zmienną środowiskową NEXT_PUBLIC_SITE_URL.
  url: resolveSiteUrl(),
  locale: "pl_PL",
  // Współrzędne Myszyńca (woj. mazowieckie, powiat ostrołęcki)
  geo: {
    latitude: 53.3936,
    longitude: 21.3447,
  },
  // Kontakt redakcji portalu (placeholder — podmień na realny adres)
  email: "kontakt@twoj-myszyniec.pl",
  // Czy to portal nieoficjalny? (wyświetlane w stopce i na stronie kontaktu)
  unofficial: true,
} as const;

export type NavItem = {
  href: string;
  label: string;
  // Krótki opis używany m.in. na kafelkach strony głównej
  description?: string;
};

export const NAV: NavItem[] = [
  { href: "/", label: "Start" },
  {
    href: "/o-myszyncu",
    label: "O Myszyńcu",
    description: "Historia, ciekawostki i podstawowe dane o naszej miejscowości.",
  },
  {
    href: "/gwara-kurpiowska",
    label: "Gwara kurpiowska",
    description: "Słownik gwary kurpiowskiej z nagraniami wymowy.",
  },
  {
    href: "/newsy",
    label: "Newsy",
    description: "Co słychać w Myszyńcu i okolicy — najnowsze informacje.",
  },
  {
    href: "/pogoda",
    label: "Pogoda",
    description: "Aktualna pogoda i prognoza na kolejne dni dla Myszyńca.",
  },
  {
    href: "/wydarzenia",
    label: "Wydarzenia",
    description: "Kalendarz lokalnych imprez, festynów i spotkań.",
  },
  {
    href: "/wazne",
    label: "Ważne dla regionu",
    description: "Alerty, komunikaty drogowe oraz numery alarmowe.",
  },
  {
    href: "/kontakt",
    label: "Kontakt",
    description: "Napisz do nas i dowiedz się więcej o portalu.",
  },
];
