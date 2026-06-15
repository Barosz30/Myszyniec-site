// Wszystkie daty prezentujemy w czasie polskim (Europe/Warsaw), niezależnie od
// strefy czasowej serwera (na Vercel jest to UTC). Inaczej w okolicach północy
// „Dziś" w prognozie albo data na kafelku wydarzenia potrafiłyby się przesunąć.
const TIME_ZONE = "Europe/Warsaw";

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  timeZone: TIME_ZONE,
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("pl-PL", {
  timeZone: TIME_ZONE,
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const weekdayFormatter = new Intl.DateTimeFormat("pl-PL", {
  timeZone: TIME_ZONE,
  weekday: "short",
});

const dayFormatter = new Intl.DateTimeFormat("pl-PL", {
  timeZone: TIME_ZONE,
  day: "2-digit",
});

const monthShortFormatter = new Intl.DateTimeFormat("pl-PL", {
  timeZone: TIME_ZONE,
  month: "short",
});

// Klucz dnia w formacie RRRR-MM-DD wyliczony dla strefy Europe/Warsaw.
const dayKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// Bezpiecznie zamienia ISO na Date — zwraca null dla brakujących/niepoprawnych
// wartości, dzięki czemu formatery nie rzucają „RangeError: Invalid time value".
function toValidDate(iso: string | null | undefined): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDate(iso: string): string {
  const d = toValidDate(iso);
  return d ? dateFormatter.format(d) : "";
}

export function formatDateTime(iso: string): string {
  const d = toValidDate(iso);
  return d ? dateTimeFormatter.format(d) : "";
}

export function formatWeekday(iso: string): string {
  const d = toValidDate(iso);
  return d ? weekdayFormatter.format(d) : "";
}

export function formatDay(iso: string): string {
  const d = toValidDate(iso);
  return d ? dayFormatter.format(d) : "";
}

export function formatMonthShort(iso: string): string {
  const d = toValidDate(iso);
  return d ? monthShortFormatter.format(d) : "";
}

export function isToday(iso: string): boolean {
  const d = toValidDate(iso);
  if (!d) return false;
  return dayKeyFormatter.format(d) === dayKeyFormatter.format(new Date());
}
