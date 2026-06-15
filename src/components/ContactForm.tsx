"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Mam temat na news");
  const [message, setMessage] = useState("");

  const subject = encodeURIComponent(`[Twój Myszyniec] ${topic}`);
  const body = encodeURIComponent(
    `Imię/nick: ${name}\nE-mail: ${email}\n\n${message}`,
  );
  const mailto = `mailto:${SITE.email}?subject=${subject}&body=${body}`;

  const inputClass =
    "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary";

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        // MVP: bez backendu — otwieramy klienta poczty.
        // TODO: podłączyć realny endpoint (np. Resend / Formspree / API route).
        e.preventDefault();
        window.location.href = mailto;
      }}
    >
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
          Imię lub nick
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Jak się do Ciebie zwracać?"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
          Twój e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="np. jan@przyklad.pl"
        />
      </div>

      <div>
        <label htmlFor="topic" className="mb-1 block text-sm font-medium text-foreground">
          Temat
        </label>
        <select
          id="topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={inputClass}
        >
          <option>Mam temat na news</option>
          <option>Chcę zgłosić wydarzenie</option>
          <option>Poprawka / sprostowanie</option>
          <option>Współpraca</option>
          <option>Inne</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Wiadomość
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
          placeholder="Napisz, o co chodzi…"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
      >
        Wyślij wiadomość
      </button>

      <p className="text-sm text-muted-foreground">
        Formularz otworzy Twój program pocztowy z gotową treścią. Wolisz napisać wprost?
        Pisz na{" "}
        <a href={`mailto:${SITE.email}`} className="font-medium text-primary underline">
          {SITE.email}
        </a>
        .
      </p>
    </form>
  );
}
