import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground">
        Oj, tej strony tu ni ma
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Zabłądziłeś trochę po Puszczy Zielonej. Wróć na stronę główną — tam się nie
        zgubisz.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
      >
        Wróć na start
      </Link>
    </Container>
  );
}
