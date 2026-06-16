"use client";

import { useSyncExternalStore } from "react";
import { KURPIE_FACTS, dailyKurpieFact } from "@/lib/kurpie";

const emptySubscribe = () => () => {};

/**
 * Ciekawostka „dnia" liczona po stronie klienta na podstawie aktualnego dnia
 * (Europe/Warsaw). Dzięki useSyncExternalStore strona może być cache'owana (ISR),
 * a i tak każdy odwiedzający zobaczy ciekawostkę właściwą dla swojego dnia —
 * bez błędu hydracji.
 */
export function DailyFact() {
  const fact = useSyncExternalStore(
    emptySubscribe,
    () => dailyKurpieFact(),
    () => KURPIE_FACTS[0],
  );
  return <>{fact}</>;
}
