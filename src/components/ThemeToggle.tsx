"use client";

// Ikona motywu jest sterowana wyłącznie klasą `.dark` na <html> (wariant `dark:`),
// więc zawsze zgadza się z faktycznym motywem — bez stanu Reacta, bez „mignięcia"
// i bez ryzyka niezgodności hydracji (serwer vs klient).
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // brak dostępu do localStorage — motyw zadziała w obrębie sesji
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Przełącz tryb jasny lub ciemny"
      title="Zmień motyw"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-muted"
    >
      {/* Tryb jasny → pokazujemy księżyc (klik = włącz ciemny) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="block h-5 w-5 dark:hidden"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
          clipRule="evenodd"
        />
      </svg>
      {/* Tryb ciemny → pokazujemy słońce (klik = włącz jasny) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="hidden h-5 w-5 dark:block"
        aria-hidden="true"
      >
        <path d="M12 2.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.591ZM21.75 12a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1 0-1.5h2a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.591 1.591ZM12 18a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 12 18ZM7.758 17.243a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.592-1.591ZM6 12a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1 0-1.5h2A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.591 1.591Z" />
      </svg>
    </button>
  );
}
