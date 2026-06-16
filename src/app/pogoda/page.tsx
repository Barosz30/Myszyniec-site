import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastList } from "@/components/ForecastList";
import { getWeather } from "@/lib/weather";
import { formatDateTime } from "@/lib/format";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Pogoda w Myszyńcu",
  description:
    "Aktualna pogoda i prognoza na 5 dni dla Myszyńca. Temperatura, wiatr, opady i wilgotność. Dane: Open-Meteo.",
  alternates: { canonical: "/pogoda" },
};

export default async function WeatherPage() {
  const weather = await getWeather();

  return (
    <Container className="py-12">
      <SectionHeading
        as="h1"
        eyebrow="Dashboard pogodowy"
        title="Pogoda w Myszyńcu"
        description="Aktualne warunki i prognoza na najbliższe dni — prosto dla naszej okolicy."
      />

      {weather ? (
        <div className="mt-8 space-y-8">
          <WeatherCard current={weather.current} />

          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">Prognoza na 5 dni</h2>
            <ForecastList daily={weather.daily} />
          </div>

          <p className="text-sm text-muted-foreground">
            Ostatnia aktualizacja: {formatDateTime(weather.updatedAt)}. Źródło danych:{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-primary"
            >
              Open-Meteo
            </a>
            . Dane odświeżają się automatycznie co ok. 30 minut.
          </p>
        </div>
      ) : (
        <div className="mt-8 rounded-[var(--radius-card)] border border-dashed border-border bg-surface p-8 text-center">
          <p className="text-lg font-semibold text-foreground">
            Nie udało się pobrać danych pogodowych.
          </p>
          <p className="mt-2 text-muted-foreground">
            Spróbuj odświeżyć stronę za chwilę. Jeśli problem się powtarza, sprawdź
            połączenie z internetem lub status usługi Open-Meteo.
          </p>
        </div>
      )}
    </Container>
  );
}
