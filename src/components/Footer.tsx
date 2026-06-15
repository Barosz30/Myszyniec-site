import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <Container className="py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="text-lg font-extrabold">
              Twój <span className="text-primary">Myszyniec</span>
            </p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {SITE.description}
            </p>
            <p className="mt-3 text-sm italic text-muted-foreground">
              „Witôjcie u nôs!” — po kurpiowsku zapraszamy do odwiedzin.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Strony
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV.filter((n) => n.href !== "/").map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Kontakt
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {SITE.email}
                </a>
              </li>
              <li>Myszyniec, woj. mazowieckie</li>
              <li>powiat ostrołęcki</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}.{" "}
            {SITE.unofficial ? (
              <span>Nieoficjalny portal społecznościowy.</span>
            ) : null}
          </p>
          <p>
            Dane pogodowe:{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-primary"
            >
              Open-Meteo
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
