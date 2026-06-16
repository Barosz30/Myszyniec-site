import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { NewsList } from "@/components/NewsList";
import { EventCard } from "@/components/EventCard";
import { WeatherIcon } from "@/components/WeatherIcon";
import { getAllNews, getUpcomingEvents } from "@/lib/content";
import { getWeather } from "@/lib/weather";
import { DailyFact } from "@/components/DailyFact";

export const revalidate = 1800;

const tiles = [
  {
    href: "/pogoda",
    title: "Pogoda",
    desc: "Sprawdź, co za oknem i na kolejne dni.",
    icon: (
      <path d="M17.5 19H7a4 4 0 1 1 1.1-7.85A5.5 5.5 0 0 1 18.5 12 3.5 3.5 0 0 1 17.5 19Z" />
    ),
  },
  {
    href: "/newsy",
    title: "Newsy",
    desc: "Co słychać w mieście i gminie.",
    icon: (
      <path d="M4 5h16v14H4zM7 9h10M7 13h10M7 17h6" />
    ),
  },
  {
    href: "/wydarzenia",
    title: "Wydarzenia",
    desc: "Festyny, koncerty, spotkania.",
    icon: (
      <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" />
    ),
  },
  {
    href: "/kontakt",
    title: "Kontakt",
    desc: "Napisz do nas, zgłoś temat.",
    icon: (
      <path d="M4 5h16v14H4zM4 7l8 6 8-6" />
    ),
  },
];

export default async function HomePage() {
  const [weather, news, events] = await Promise.all([
    getWeather(),
    Promise.resolve(getAllNews()),
    Promise.resolve(getUpcomingEvents(3)),
  ]);
  const latestNews = news.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/12 via-background to-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]"
        >
          <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <Container className="relative py-16 sm:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              Lokalny portal społecznościowy · Kurpie
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
              Twój <span className="text-primary">Myszyniec</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground sm:text-xl">
              Newsy, pogoda, wydarzenia i sprawy ważne dla regionu — w jednym miejscu,
              po naszemu. Z sercem dla Myszyńca i całej Kurpiowszczyzny.
            </p>
            <p className="mt-3 text-base italic text-muted-foreground">
              „Witôjcie u nôs!” — czyli witajcie u nas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/newsy"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-strong"
              >
                Zobacz newsy
              </Link>
              <Link
                href="/o-myszyncu"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 font-semibold text-foreground transition-colors hover:bg-surface-muted"
              >
                Poznaj Myszyniec
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* KAFELKI */}
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {tiles.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className="group flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  {tile.icon}
                </svg>
              </span>
              <span className="text-lg font-bold text-foreground">{tile.title}</span>
              <span className="text-sm text-muted-foreground">{tile.desc}</span>
            </Link>
          ))}
        </div>
      </Container>

      {/* POGODA — skrót */}
      <Container className="pb-4">
        <div className="rounded-[var(--radius-card)] border border-border bg-gradient-to-br from-sky/12 via-surface to-primary/10 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {weather ? (
              <>
                <div className="flex items-center gap-5">
                  <span className="text-primary">
                    <WeatherIcon
                      icon={weather.current.condition.icon}
                      isDay={weather.current.isDay}
                      className="h-16 w-16"
                    />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">Teraz w Myszyńcu</p>
                    <p className="text-4xl font-extrabold text-foreground">
                      {weather.current.temperature}°C
                    </p>
                    <p className="text-foreground">{weather.current.condition.label}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground">Wiatr</p>
                    <p className="text-lg font-semibold text-foreground">
                      {weather.current.windSpeed} km/h
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Wilgotność</p>
                    <p className="text-lg font-semibold text-foreground">
                      {weather.current.humidity}%
                    </p>
                  </div>
                  <Link
                    href="/pogoda"
                    className="self-center rounded-full border border-border bg-surface px-4 py-2 font-semibold text-primary transition-colors hover:bg-surface-muted"
                  >
                    Pełna prognoza →
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex w-full items-center justify-between gap-4">
                <p className="text-muted-foreground">
                  Nie udało się teraz pobrać pogody. Spróbuj otworzyć pełny dashboard.
                </p>
                <Link
                  href="/pogoda"
                  className="rounded-full border border-border bg-surface px-4 py-2 font-semibold text-primary transition-colors hover:bg-surface-muted"
                >
                  Pogoda →
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* NEWSY */}
      <Container className="py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Najnowsze"
            title="Newsy z Myszyńca"
            description="Wybór ostatnich wpisów. Po więcej zajrzyj do działu newsów."
          />
          <Link
            href="/newsy"
            className="hidden shrink-0 rounded-full border border-border bg-surface px-4 py-2 font-semibold text-primary transition-colors hover:bg-surface-muted sm:inline-flex"
          >
            Wszystkie newsy →
          </Link>
        </div>
        <NewsList items={latestNews} />
      </Container>

      {/* WYDARZENIA + CIEKAWOSTKA */}
      <Container className="pb-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Kalendarz"
              title="Najbliższe wydarzenia"
              description="Co się dzieje w okolicy. Pełny kalendarz w dziale Wydarzenia."
            />
            <div className="mt-6 space-y-4">
              {events.length > 0 ? (
                events.map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <p className="rounded-[var(--radius-card)] border border-dashed border-border bg-surface p-6 text-muted-foreground">
                  Brak nadchodzących wydarzeń. Zajrzyj wkrótce.
                </p>
              )}
            </div>
            <div className="mt-6">
              <Link
                href="/wydarzenia"
                className="inline-flex rounded-full border border-border bg-surface px-4 py-2 font-semibold text-primary transition-colors hover:bg-surface-muted"
              >
                Cały kalendarz →
              </Link>
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-[var(--radius-card)] border border-border bg-accent/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-foreground dark:text-accent">
                Czy wiesz, że…
              </p>
              <p className="mt-2 text-lg text-foreground">
                <DailyFact />
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Po kurpiowsku
              </p>
              <p className="mt-2 text-lg text-foreground">„Dobrygo dnia, ludkowie”</p>
              <p className="text-sm text-muted-foreground">= Dobrego dnia, ludzie</p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
