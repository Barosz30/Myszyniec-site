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

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return dateTimeFormatter.format(new Date(iso));
}

export function formatWeekday(iso: string): string {
  return weekdayFormatter.format(new Date(iso));
}

export function formatDay(iso: string): string {
  return dayFormatter.format(new Date(iso));
}

export function formatMonthShort(iso: string): string {
  return monthShortFormatter.format(new Date(iso));
}

export function isToday(iso: string): boolean {
  return dayKeyFormatter.format(new Date(iso)) === dayKeyFormatter.format(new Date());
}
