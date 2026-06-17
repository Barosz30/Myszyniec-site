// Wstawki w gwarze kurpiowskiej — z szacunkiem dla kultury Kurpiów Puszczy Zielonej.
// To lekkie, przyjazne akcenty „do ludzi". Przykłady językowe (psiekny, bańdzie)
// opierają się na opisie gwary kurpiowskiej (Dialektologia UW, Wikipedia).
// Zwroty grzecznościowe są stylizowane — w razie potrzeby uzupełnij/popraw
// we współpracy z lokalnymi znawcami gwary (np. Związek Kurpiów).
// Źródła: https://pl.wikipedia.org/wiki/Gwara_kurpiowska
//         http://www.dialektologia.uw.edu.pl (Kurpie — gwara regionu)

export type KurpiePhrase = {
  phrase: string;
  meaning: string;
};

export const KURPIE_PHRASES: KurpiePhrase[] = [
  { phrase: "Witôjcie u nôs!", meaning: "Witajcie u nas!" },
  { phrase: "Co tam u wôs słychać?", meaning: "Co tam u was słychać?" },
  { phrase: "Ostańcie z Boziem", meaning: "Zostańcie z Bogiem (do widzenia)" },
  { phrase: "Dobrygo dnia, ludkowie", meaning: "Dobrego dnia, ludzie" },
  // Przykłady cech gwary (szeroka wymowa ę, asynchroniczna wymowa wargowych miękkich)
  { phrase: "psiekny", meaning: "piękny" },
  { phrase: "bańdzie", meaning: "będzie" },
];

// Krótkie ciekawostki o kulturze kurpiowskiej (do wykorzystania jako „Czy wiesz, że…").
export const KURPIE_FACTS: string[] = [
  "Wycinankę kurpiowską wykonywano nożycami do strzyżenia owiec — z kolorowego, glansowanego papieru.",
  "Najsłynniejsza wycinanka to leluja — papierowe „drzewko życia” o pionowej, symetrycznej budowie.",
  "Bursztyn, zwany złotem Kurpiów, od wieków zdobi stroje i biżuterię regionu.",
  "Miodobranie Kurpiowskie odbywa się w Myszyńcu od 1976 roku, w ostatni weekend sierpnia.",
  "Gwara kurpiowska ma własną pisownię i słowniki — to nie błędy, lecz odrębny system.",
  "W gwarze spod Myszyńca „piękny” to psiekny, a „będzie” — bańdzie.",
  "Wycinankarstwo kurpiowskie trafiło w 2020 r. na Krajową listę niematerialnego dziedzictwa kulturowego.",
];

export function randomKurpiePhrase(): KurpiePhrase {
  return KURPIE_PHRASES[Math.floor(Math.random() * KURPIE_PHRASES.length)];
}

const warsawDayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Warsaw",
  day: "2-digit",
});

// Ciekawostka „dnia" — wybierana deterministycznie na podstawie dnia miesiąca
// (wg strefy Europe/Warsaw), dzięki czemu zmienia się o właściwej porze dla
// polskich użytkowników, a render pozostaje stabilny w obrębie danego dnia.
export function dailyKurpieFact(): string {
  const dayOfMonth = Number(warsawDayFormatter.format(new Date()));
  return KURPIE_FACTS[dayOfMonth % KURPIE_FACTS.length];
}
