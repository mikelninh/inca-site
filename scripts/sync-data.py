#!/usr/bin/env python3
"""Holt die echten Daten aus inca-claims-loop und inca-explore nach src/data/.

Bricht hart ab, wenn Quellen fehlen - lieber Build-Fehler als leere Sektion.
agent_run.json ist optional (existiert erst nach einem Live-Lauf von agent.py).
"""

import json
import os
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOOP = Path(os.environ.get("INCA_LOOP_HOME", str(Path.home() / "inca-claims-loop")))
EXPLORE = Path(os.environ.get("INCA_EXPLORE_HOME", str(Path.home() / "inca-explore")))
OUT = ROOT / "src" / "data"


def fail(msg: str) -> None:
    print(f"sync-data: FEHLER — {msg}", file=sys.stderr)
    sys.exit(1)


def main() -> None:
    if not LOOP.exists():
        fail(f"inca-claims-loop nicht gefunden: {LOOP}")
    if not EXPLORE.exists():
        fail(f"inca-explore nicht gefunden: {EXPLORE}")

    os.environ["INCA_OFFLINE"] = "1"
    sys.path.insert(0, str(LOOP))
    from build_web import build_data  # noqa: E402

    OUT.mkdir(parents=True, exist_ok=True)
    loop = build_data()
    if not loop.get("cases"):
        fail("build_data() lieferte keine Fälle")
    (OUT / "loop.json").write_text(json.dumps(loop, ensure_ascii=False, indent=1))
    print(f"sync-data: loop.json — {len(loop['cases'])} Fälle, Modus {loop['mode']}")

    for name in ("tool_layer.json", "fleet.json"):
        src = EXPLORE / "web" / name
        if not src.exists():
            fail(
                f"{src} fehlt — in inca-explore `python tool_layer.py && python build.py` laufen lassen"
            )
        shutil.copy(src, OUT / name)
        print(f"sync-data: {name} kopiert")

    agent_run = EXPLORE / "web" / "agent_run.json"
    if agent_run.exists():
        shutil.copy(agent_run, OUT / "agent_run.json")
        print("sync-data: agent_run.json kopiert (echter Lauf)")
    else:
        (OUT / "agent_run.json").write_text(json.dumps({"ran": False}))
        print("sync-data: agent_run.json fehlt — ehrlicher Platzhalter {ran:false}")


if __name__ == "__main__":
    main()
