// Centralna konfiguracja portalu. Zmień tu dane kontaktowe, nazwę i linki nawigacji.

export const SITE = {
  name: "Twój Myszyniec",
  shortName: "Twój Myszyniec",
  description:
    "Nieoficjalny portal społecznościowy o Myszyńcu — newsy, pogoda, wydarzenia i sprawy ważne dla regionu. Z sercem dla Kurpiów.",
  // Zmień na docelową domenę po wdrożeniu (używane w SEO, sitemap, OpenGraph).
  // Można nadpisać zmienną środowiskową NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://twoj-myszyniec.vercel.app",
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
