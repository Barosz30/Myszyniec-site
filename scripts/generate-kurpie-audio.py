#!/usr/bin/env python3
"""Generuje syntetyczne nagrania MP3 dla haseł słownika gwary kurpiowskiej."""

from __future__ import annotations

import asyncio
import json
import sys
from pathlib import Path

try:
    import edge_tts
except ImportError:
    print("Brak pakietu edge-tts. Zainstaluj: pip install edge-tts", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
DICTIONARY_PATH = ROOT / "content" / "kurpie-dictionary.json"
OUTPUT_DIR = ROOT / "public" / "audio" / "gwara"
VOICE = "pl-PL-ZofiaNeural"


async def synthesize(text: str, output_path: Path) -> None:
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(str(output_path))


async def main() -> int:
    data = json.loads(DICTIONARY_PATH.read_text(encoding="utf-8"))
    entries = data.get("entries", [])
    if not entries:
        print("Brak haseł w słowniku.", file=sys.stderr)
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for entry in entries:
        entry_id = entry["id"]
        kurpie = entry["kurpie"]
        output_path = OUTPUT_DIR / f"{entry_id}.mp3"
        print(f"→ {entry_id}: {kurpie}")
        await synthesize(kurpie, output_path)

    print(f"\nWygenerowano {len(entries)} nagrań w {OUTPUT_DIR}")
    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
