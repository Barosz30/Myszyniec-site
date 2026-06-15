import type { CurrentWeather } from "@/lib/weather";
import { WeatherIcon } from "./WeatherIcon";

function Stat({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | number;
  unit?: string;
}) {
  return (
    <div className="rounded-xl bg-surface-muted/70 px-3 py-2">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-base font-semibold text-foreground">
        {value}
        {unit ? <span className="text-sm font-normal text-muted-foreground"> {unit}</span> : null}
      </dd>
    </div>
  );
}

export function WeatherCard({ current }: { current: CurrentWeather }) {
  return (
    <section
      aria-label="Aktualna pogoda w Myszyńcu"
      className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-gradient-to-br from-sky/15 via-surface to-primary/10 p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Teraz w Myszyńcu</p>
          <p className="mt-1 text-5xl font-extrabold tracking-tight text-foreground">
            {current.temperature}°C
          </p>
          <p className="mt-1 text-lg text-foreground">{current.condition.label}</p>
          <p className="text-sm text-muted-foreground">
            Odczuwalna {current.apparentTemperature}°C
          </p>
        </div>
        <div className="text-primary">
          <WeatherIcon
            icon={current.condition.icon}
            isDay={current.isDay}
            className="h-20 w-20"
          />
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Wiatr" value={current.windSpeed} unit="km/h" />
        <Stat label="Porywy" value={current.windGusts} unit="km/h" />
        <Stat label="Opady" value={current.precipitation} unit="mm" />
        <Stat label="Wilgotność" value={current.humidity} unit="%" />
      </dl>
    </section>
  );
}
