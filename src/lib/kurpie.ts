// Wstawki w gwarze kurpiowskiej — z szacunkiem dla kultury Kurpiów Puszczy Zielonej.
// To lekkie, przyjazne akcenty „do ludzi". W razie potrzeby uzupełnij/popraw
// we współpracy z lokalnymi znawcami gwary.
// TODO: Zweryfikować pisownię i znaczenia z lokalnym źródłem (np. Związek Kurpiów).

export type KurpiePhrase = {
  phrase: string;
  meaning: string;
};

export const KURPIE_PHRASES: KurpiePhrase[] = [
  { phrase: "Witôjcie u nôs!", meaning: "Witajcie u nas!" },
  { phrase: "Co tam u wôs słychać?", meaning: "Co tam u was słychać?" },
  { phrase: "Ostańcie z Boziem", meaning: "Zostańcie z Bogiem (do widzenia)" },
  { phrase: "Dobrygo dnia, ludkowie", meaning: "Dobrego dnia, ludzie" },
];

// Krótkie ciekawostki o kulturze kurpiowskiej (do wykorzystania jako „Czy wiesz, że…").
export const KURPIE_FACTS: string[] = [
  "Kurpie słyną z misternych wycinanek z kolorowego papieru — każda wieś miała swój styl.",
  "Bursztyn, zwany złotem Kurpiów, od wieków zdobi stroje i biżuterię regionu.",
  "Kurpiowska bazylika w Myszyńcu to jedno z ważniejszych miejsc kultu na Mazowszu.",
  "Miodobranie Kurpiowskie to barwne święto tradycji bartniczych i ludowych.",
];

export function randomKurpiePhrase(): KurpiePhrase {
  return KURPIE_PHRASES[Math.floor(Math.random() * KURPIE_PHRASES.length)];
}

// Ciekawostka „dnia" — wybierana deterministycznie na podstawie dnia miesiąca,
// dzięki czemu zmienia się codziennie, a render pozostaje stabilny w danym dniu.
export function dailyKurpieFact(): string {
  const dayOfMonth = new Date().getDate();
  return KURPIE_FACTS[dayOfMonth % KURPIE_FACTS.length];
}
