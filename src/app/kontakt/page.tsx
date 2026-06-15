import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt i o portalu",
  description:
    "Napisz do redakcji portalu Twój Myszyniec. Zgłoś news, wydarzenie lub sprostowanie. Dowiedz się, czym jest ten portal.",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  return (
    <Container className="py-12">
      <SectionHeading
        as="h1"
        eyebrow="Odezwij się"
        title="Kontakt i o portalu"
        description="Masz temat, wydarzenie albo zauważyłeś błąd? Daj znać — to portal tworzony z myślą o mieszkańcach."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-foreground">Napisz do nas</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Co tam u wôs słychać? Czekamy na Wasze wiadomości.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[var(--radius-card)] border border-border bg-surface-muted/60 p-6">
            <h2 className="text-xl font-bold text-foreground">O portalu</h2>
            <div className="mt-3 space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">Twój Myszyniec</strong> to{" "}
                {SITE.unofficial ? (
                  <span className="font-semibold text-foreground">
                    nieoficjalny portal społecznościowy
                  </span>
                ) : (
                  <span>portal lokalny</span>
                )}
                . Nie jesteśmy urzędem ani oficjalnym medium — robimy to z potrzeby
                serca, dla mieszkańców i miłośników Kurpiowszczyzny.
              </p>
              <p>
                Oficjalne komunikaty zawsze sprawdzaj u źródła, m.in. na stronie{" "}
                <a
                  href="https://www.myszyniec.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline"
                >
                  Urzędu Miejskiego w Myszyńcu
                </a>
                .
              </p>
              <p>
                Przy newsach staramy się podawać źródła. Jeśli zauważysz błąd —{" "}
                napisz, poprawimy.
              </p>
            </div>
          </div>

          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-xl font-bold text-foreground">Dane kontaktowe</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>
                E-mail:{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-medium text-primary underline"
                >
                  {SITE.email}
                </a>
              </li>
              <li>Myszyniec, powiat ostrołęcki, woj. mazowieckie</li>
            </ul>
            <p className="mt-4 text-sm italic text-muted-foreground">
              „Ostańcie z Boziem” — czyli do usłyszenia!
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
