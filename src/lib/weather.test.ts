import { afterEach, describe, expect, it, vi } from "vitest";
import { describeWeatherCode, getWeather } from "./weather";

describe("describeWeatherCode", () => {
  it("maps known WMO codes to Polish labels and icons", () => {
    expect(describeWeatherCode(0)).toMatchObject({ label: "Bezchmurnie", icon: "clear" });
    expect(describeWeatherCode(3)).toMatchObject({ icon: "cloudy" });
    expect(describeWeatherCode(61)).toMatchObject({ icon: "rain" });
    expect(describeWeatherCode(71)).toMatchObject({ icon: "snow" });
    expect(describeWeatherCode(95)).toMatchObject({ icon: "thunder" });
    expect(describeWeatherCode(45)).toMatchObject({ icon: "fog" });
  });

  it("keeps the original code and falls back gracefully for unknown codes", () => {
    const unknown = describeWeatherCode(1234);
    expect(unknown.code).toBe(1234);
    expect(unknown.label).toBe("Brak danych");
    expect(unknown.icon).toBe("cloudy");
  });
});

const sampleResponse = {
  current: {
    time: "2026-06-15T08:00",
    temperature_2m: 17.6,
    relative_humidity_2m: 71.2,
    apparent_temperature: 16.1,
    is_day: 1,
    precipitation: 0.2,
    weather_code: 61,
    wind_speed_10m: 12.4,
    wind_gusts_10m: 28.9,
  },
  daily: {
    time: ["2026-06-15", "2026-06-16", "2026-06-17", "2026-06-18", "2026-06-19"],
    weather_code: [61, 3, 0, 80, 95],
    temperature_2m_max: [19.4, 21.1, 24.9, 18.0, 16.5],
    temperature_2m_min: [11.2, 12.6, 13.1, 10.0, 9.8],
    precipitation_sum: [2.1, 0, 0, 5.3, 8.0],
    precipitation_probability_max: [60, 10, 0, 80, 90],
    wind_speed_10m_max: [20.1, 15.2, 12.0, 25.5, 30.0],
  },
};

describe("getWeather", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("parses and rounds Open-Meteo data", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => sampleResponse,
      })),
    );

    const weather = await getWeather();
    expect(weather).not.toBeNull();
    expect(weather!.current.temperature).toBe(18);
    expect(weather!.current.humidity).toBe(71);
    expect(weather!.current.windSpeed).toBe(12);
    expect(weather!.current.condition.icon).toBe("rain");
    expect(weather!.daily).toHaveLength(5);
    expect(weather!.daily[2].tempMax).toBe(25);
    expect(weather!.daily[4].condition.icon).toBe("thunder");
    vi.unstubAllGlobals();
  });

  it("returns null when the API responds with an error status", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, json: async () => ({}) })));
    expect(await getWeather()).toBeNull();
    vi.unstubAllGlobals();
  });

  it("returns null when the request throws", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      }),
    );
    expect(await getWeather()).toBeNull();
    vi.unstubAllGlobals();
  });

  it("requests the Myszyniec coordinates and Warsaw timezone", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, json: async () => sampleResponse }));
    vi.stubGlobal("fetch", fetchMock);
    await getWeather();
    const calledUrl = String(fetchMock.mock.calls[0][0]);
    expect(calledUrl).toContain("latitude=53.3936");
    expect(calledUrl).toContain("longitude=21.3447");
    expect(calledUrl).toContain("timezone=Europe%2FWarsaw");
    vi.unstubAllGlobals();
  });
});
