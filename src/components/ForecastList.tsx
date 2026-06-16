import type { DailyForecast } from "@/lib/weather";
import { formatWeekday, isToday } from "@/lib/format";
import { WeatherIcon } from "./WeatherIcon";

export function ForecastList({ daily }: { daily: DailyForecast[] }) {
  return (
    <section aria-label="Prognoza pogody na kolejne dni">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {daily.map((day) => (
          <li
            key={day.date}
            className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-border bg-surface p-4 text-center shadow-sm"
          >
            <span className="text-sm font-semibold capitalize text-foreground">
              {isToday(day.date) ? "Dziś" : formatWeekday(day.date)}
            </span>
            <span className="text-primary">
              <WeatherIcon icon={day.condition.icon} className="h-10 w-10" />
            </span>
            <span className="sr-only">{day.condition.label}</span>
            <span className="text-base font-bold text-foreground">
              {day.tempMax}°
              <span className="ml-1 font-normal text-muted-foreground">
                {day.tempMin}°
              </span>
            </span>
            <span className="flex items-center gap-1 text-xs text-sky">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                <path d="M12 2s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11Z" />
              </svg>
              {day.precipitationProbability}%
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
