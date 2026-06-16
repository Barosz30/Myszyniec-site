import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-custom",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — lokalny portal o Myszyńcu`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Myszyniec",
    "Kurpie",
    "powiat ostrołęcki",
    "Mazowsze",
    "newsy Myszyniec",
    "pogoda Myszyniec",
    "wydarzenia Myszyniec",
  ],
  // Uwaga: świadomie NIE ustawiamy tu openGraph.title/description ani twitter.title/
  // description — Next.js uzupełni je z `title`/`description` danej strony. Dzięki temu
  // udostępnianie podstron (np. /pogoda) pokazuje właściwy tytuł, a nie stronę główną.
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2f7a4d" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1512" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Skrypt ustawiający motyw przed pierwszym renderem (zapobiega „mignięciu").
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${sans.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#tresc"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Przejdź do treści
        </a>
        <Header />
        <main id="tresc" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
