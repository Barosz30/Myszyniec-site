import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WeatherCard } from "./WeatherCard";
import { describeWeatherCode, type CurrentWeather } from "@/lib/weather";

const current: CurrentWeather = {
  temperature: 18,
  apparentTemperature: 16,
  windSpeed: 12,
  windGusts: 29,
  precipitation: 0.2,
  humidity: 71,
  isDay: true,
  time: "2026-06-15T08:00",
  condition: describeWeatherCode(61),
};

describe("WeatherCard", () => {
  it("renders the current temperature and condition", () => {
    render(<WeatherCard current={current} />);
    expect(screen.getByText("18°C")).toBeInTheDocument();
    expect(screen.getByText("Słaby deszcz")).toBeInTheDocument();
    expect(screen.getByText(/Odczuwalna 16°C/)).toBeInTheDocument();
  });

  it("renders the key weather stats", () => {
    render(<WeatherCard current={current} />);
    expect(screen.getByText("Wiatr")).toBeInTheDocument();
    expect(screen.getByText("Wilgotność")).toBeInTheDocument();
    expect(screen.getByText("71")).toBeInTheDocument();
  });
});
