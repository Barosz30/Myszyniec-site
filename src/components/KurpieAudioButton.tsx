"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type KurpieAudioButtonProps = {
  src: string;
  label: string;
};

export function KurpieAudioButton({ src, label }: KurpieAudioButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);
  const [loading, setLoading] = useState(false);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
  }, []);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = "none";
    audioRef.current = audio;

    const onEnded = () => setPlaying(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onError = () => {
      setMissing(true);
      setPlaying(false);
      setLoading(false);
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("error", onError);
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio || missing) return;

    if (playing) {
      stop();
      return;
    }

    setLoading(true);
    try {
      await audio.play();
    } catch {
      setMissing(true);
      stop();
    } finally {
      setLoading(false);
    }
  }

  if (missing) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground"
        title="Brak nagrania — dodaj plik MP3 w katalogu public/audio/gwara/"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            d="M11 5 6 9H3v6h3l5 4V5ZM16 9a4 4 0 0 1 0 6M19 6a7 7 0 0 1 0 12"
          />
          <path strokeLinecap="round" d="M4 4l16 16" />
        </svg>
        Brak nagrania
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={togglePlayback}
      disabled={loading}
      aria-label={
        playing
          ? `Zatrzymaj nagranie: ${label}`
          : `Odtwórz nagranie: ${label}`
      }
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-60"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        {playing ? (
          <path d="M6 5h4v14H6V5Zm8 0h4v14h-4V5Z" />
        ) : (
          <path d="M8 5v14l11-7L8 5Z" />
        )}
      </svg>
      {loading ? "Ładowanie…" : playing ? "Zatrzymaj" : "Posłuchaj"}
    </button>
  );
}
