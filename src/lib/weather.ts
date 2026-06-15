import { SITE } from "./site";

export type WeatherCondition = {
  code: number;
  label: string;
  // klucz ikony używany przez komponent WeatherIcon
  icon: WeatherIconKey;
};

export type WeatherIconKey =
  | "clear"
  | "partly"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunder";

export type CurrentWeather = {
  temperature: number;
  apparentTemperature: number;
  windSpeed: number;
  windGusts: number;
  precipitation: number;
  humidity: number;
  isDay: boolean;
  time: string;
  condition: WeatherCondition;
};

export type DailyForecast = {
  date: string;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  precipitationProbability: number;
  windMax: number;
  condition: WeatherCondition;
};

export type WeatherData = {
  current: CurrentWeather;
  daily: DailyForecast[];
  updatedAt: string;
};

// Mapowanie kodów pogodowych WMO (Open-Meteo) na polskie opisy i ikony.
// Źródło kodów: https://open-meteo.com/en/docs
export function describeWeatherCode(code: number): WeatherCondition {
  const map: Record<number, Omit<WeatherCondition, "code">> = {
    0: { label: "Bezchmurnie", icon: "clear" },
    1: { label: "Przeważnie słonecznie", icon: "partly" },
    2: { label: "Częściowe zachmurzenie", icon: "partly" },
    3: { label: "Zachmurzenie", icon: "cloudy" },
    45: { label: "Mgła", icon: "fog" },
    48: { label: "Mgła osadzająca szadź", icon: "fog" },
    51: { label: "Lekka mżawka", icon: "drizzle" },
    53: { label: "Umiarkowana mżawka", icon: "drizzle" },
    55: { label: "Gęsta mżawka", icon: "drizzle" },
    56: { label: "Marznąca mżawka", icon: "drizzle" },
    57: { label: "Gęsta marznąca mżawka", icon: "drizzle" },
    61: { label: "Słaby deszcz", icon: "rain" },
    63: { label: "Umiarkowany deszcz", icon: "rain" },
    65: { label: "Silny deszcz", icon: "rain" },
    66: { label: "Marznący deszcz", icon: "rain" },
    67: { label: "Silny marznący deszcz", icon: "rain" },
    71: { label: "Słabe opady śniegu", icon: "snow" },
    73: { label: "Umiarkowane opady śniegu", icon: "snow" },
    75: { label: "Intensywne opady śniegu", icon: "snow" },
    77: { label: "Śnieg ziarnisty", icon: "snow" },
    80: { label: "Przelotny deszcz", icon: "rain" },
    81: { label: "Przelotny deszcz", icon: "rain" },
    82: { label: "Gwałtowne ulewy", icon: "rain" },
    85: { label: "Przelotne opady śniegu", icon: "snow" },
    86: { label: "Intensywne opady śniegu", icon: "snow" },
    95: { label: "Burza", icon: "thunder" },
    96: { label: "Burza z gradem", icon: "thunder" },
    99: { label: "Burza z silnym gradem", icon: "thunder" },
  };
  const found = map[code] ?? { label: "Brak danych", icon: "cloudy" as const };
  return { code, ...found };
}

type OpenMeteoResponse = {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_gusts_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
  };
};

/**
 * Pobiera dane pogodowe z Open-Meteo (bez klucza API).
 * Dane są cache'owane przez Next.js na 30 minut (revalidate).
 */
export async function getWeather(): Promise<WeatherData | null> {
  const { latitude, longitude } = SITE.geo;
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_gusts_10m",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max",
    timezone: "Europe/Warsaw",
    forecast_days: "5",
    wind_speed_unit: "kmh",
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  try {
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return null;
    const data = (await res.json()) as OpenMeteoResponse;

    const current: CurrentWeather = {
      temperature: Math.round(data.current.temperature_2m),
      apparentTemperature: Math.round(data.current.apparent_temperature),
      windSpeed: Math.round(data.current.wind_speed_10m),
      windGusts: Math.round(data.current.wind_gusts_10m),
      precipitation: data.current.precipitation,
      humidity: Math.round(data.current.relative_humidity_2m),
      isDay: data.current.is_day === 1,
      time: data.current.time,
      condition: describeWeatherCode(data.current.weather_code),
    };

    const daily: DailyForecast[] = data.daily.time.map((date, i) => ({
      date,
      tempMax: Math.round(data.daily.temperature_2m_max[i]),
      tempMin: Math.round(data.daily.temperature_2m_min[i]),
      precipitationSum: data.daily.precipitation_sum[i],
      precipitationProbability: data.daily.precipitation_probability_max[i] ?? 0,
      windMax: Math.round(data.daily.wind_speed_10m_max[i]),
      condition: describeWeatherCode(data.daily.weather_code[i]),
    }));

    return { current, daily, updatedAt: new Date().toISOString() };
  } catch {
    return null;
  }
}
