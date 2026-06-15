import type { WeatherIconKey } from "@/lib/weather";

export function WeatherIcon({
  icon,
  isDay = true,
  className = "h-10 w-10",
}: {
  icon: WeatherIconKey;
  isDay?: boolean;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "clear":
      return isDay ? (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg {...common}>
          <path d="M21 12.8A8 8 0 1 1 11.2 3a6 6 0 0 0 9.8 9.8Z" />
        </svg>
      );
    case "partly":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="3" />
          <path d="M8 2v1M2 8h1M3.6 3.6l.7.7M12.4 3.6l-.7.7" />
          <path d="M17 18H9a4 4 0 1 1 1.2-7.8A5 5 0 0 1 20 12a3 3 0 0 1-3 6Z" />
        </svg>
      );
    case "cloudy":
      return (
        <svg {...common}>
          <path d="M17.5 19H7a4 4 0 1 1 1.1-7.85A5.5 5.5 0 0 1 18.5 12 3.5 3.5 0 0 1 17.5 19Z" />
        </svg>
      );
    case "fog":
      return (
        <svg {...common}>
          <path d="M17.5 14H7a4 4 0 1 1 1.1-7.85A5.5 5.5 0 0 1 18.5 7 3.5 3.5 0 0 1 17.5 14Z" />
          <path d="M4 18h16M6 21h12" />
        </svg>
      );
    case "drizzle":
      return (
        <svg {...common}>
          <path d="M17.5 13H7a4 4 0 1 1 1.1-7.85A5.5 5.5 0 0 1 18.5 6 3.5 3.5 0 0 1 17.5 13Z" />
          <path d="M9 17v1M13 17v1M17 17v1" />
        </svg>
      );
    case "rain":
      return (
        <svg {...common}>
          <path d="M17.5 13H7a4 4 0 1 1 1.1-7.85A5.5 5.5 0 0 1 18.5 6 3.5 3.5 0 0 1 17.5 13Z" />
          <path d="M8 16l-1 4M12 16l-1 4M16 16l-1 4" />
        </svg>
      );
    case "snow":
      return (
        <svg {...common}>
          <path d="M17.5 13H7a4 4 0 1 1 1.1-7.85A5.5 5.5 0 0 1 18.5 6 3.5 3.5 0 0 1 17.5 13Z" />
          <path d="M8 17h.01M12 19h.01M16 17h.01M10 20h.01M14 20h.01" />
        </svg>
      );
    case "thunder":
      return (
        <svg {...common}>
          <path d="M17.5 12H7a4 4 0 1 1 1.1-7.85A5.5 5.5 0 0 1 18.5 5 3.5 3.5 0 0 1 17.5 12Z" />
          <path d="M12 13l-2 4h3l-2 4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M17.5 19H7a4 4 0 1 1 1.1-7.85A5.5 5.5 0 0 1 18.5 12 3.5 3.5 0 0 1 17.5 19Z" />
        </svg>
      );
  }
}
