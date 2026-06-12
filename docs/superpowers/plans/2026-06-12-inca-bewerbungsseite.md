# INCA-Bewerbungsseite — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Interaktive Bewerbungs-One-Pager für INCA (GitHub Pages, DE/EN) mit echter klickbarer Claims-Konsole, gespeist aus `inca-claims-loop` und `inca-explore`.

**Architecture:** React 19 + TS + Vite + Tailwind 4, kein Router. Ein Python-Sync-Script ruft `build_web.build_data()` aus inca-claims-loop auf und kopiert die JSONs aus inca-explore nach `src/data/` (committed). Alle Sektionen sind eigene Komponenten, Texte zentral in `strings.ts` (de/en), Motion über zwei Hooks.

**Tech Stack:** React 19, TypeScript, Vite 6, Tailwind 4 (`@tailwindcss/vite`), Vitest (Unit), Playwright (E2E), GitHub Actions → GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-06-12-inca-bewerbungsseite-design.md`

**Wichtige Domänen-Fakten (nicht verwechseln):**
- Decisions aus der Pipeline: `pay`, `pay_reduced`, `decline`, `refer_to_human` (NICHT auto_approve/human_review — das war Mockup-Sprache)
- Der „Bruchfall" wird datengetrieben markiert: jeder Fall mit `correct === false`
- INCA: 250+ Agenten = TPA-Pipeline, 140+ = Schadenquotenoptimierung
- `agent_run.json` in inca-explore existiert evtl. nicht → Grounding-Sektion zeigt dann ehrlich „Agent noch nicht gelaufen" (wie explore.html es vormacht)

---

## File Structure

```
inca-site/
├── index.html                      Fonts-Links, noindex, lang=de
├── package.json / vite.config.ts / tsconfig.json
├── scripts/sync-data.py            holt Daten aus den Quell-Repos, bricht hart ab
├── src/
│   ├── main.tsx / App.tsx
│   ├── index.css                   Tailwind 4 @theme: alle INCA-Tokens
│   ├── types.ts                    TS-Spiegel der Daten-Payloads
│   ├── strings.ts                  alle Texte de/en
│   ├── i18n.tsx                    LangProvider + useLang + Toggle
│   ├── motion.ts                   useReveal (IntersectionObserver), useCountUp
│   ├── data/                       loop.json, tool_layer.json, fleet.json (committed)
│   └── components/
│       ├── Nav.tsx  Hero.tsx  Teardown.tsx  Grounding.tsx
│       ├── Fleet.tsx  Fit.tsx  CtaFooter.tsx
│       └── console/
│           ├── Console.tsx         Tabs + Layout
│           ├── CaseList.tsx        Fall-Karten links
│           ├── PipelineView.tsx    animierte Stufen-Bars
│           ├── ReceiptView.tsx     JSON-Receipt + AgentTrace aufklappbar
│           ├── EvalTab.tsx         Metriken mit Count-up
│           └── BenchmarkTab.tsx    v1 vs v2
├── tests/                          Vitest: strings-Parität, decision-Mapping
├── e2e/site.spec.ts                Playwright-Durchklick
└── .github/workflows/deploy.yml
```

---

### Task 1: Projekt-Scaffold

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `.gitignore`

- [ ] **Step 1: Repo initialisieren und Vite-Projekt anlegen**

```bash
cd /Users/mikel/inca-site && git init
npm create vite@latest . -- --template react-ts --force
npm install
npm install tailwindcss @tailwindcss/vite
npm install -D vitest @playwright/test
```

- [ ] **Step 2: `vite.config.ts` ersetzen**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/inca-site/',
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 3: `index.html` ersetzen** (noindex, Fonts, Sprache)

```html
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Mikel × INCA — Euer Loop, einmal selbst gebaut</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Vite-Boilerplate leeren** — `src/App.css`, `src/assets/` löschen; `src/App.tsx` minimal:

```tsx
export default function App() {
  return <main>inca-site</main>
}
```

`src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 5: Verifizieren**

Run: `npx tsc --noEmit && npm run build`
Expected: beide grün.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: scaffold vite react-ts mit tailwind 4"
```

---

### Task 2: Design-Tokens + Basis-CSS

**Files:**
- Modify: `src/index.css` (komplett ersetzen)

- [ ] **Step 1: `src/index.css` schreiben** — Tailwind 4 `@theme` mit allen Tokens aus der Spec:

```css
@import 'tailwindcss';

@theme {
  --color-cream: #f5f4f0;
  --color-softwhite: #eae8e2;
  --color-hairline: #d9d5ce;
  --color-ink: #050102;
  --color-core: #9ab50d;
  --color-core-deep: #7b910a;
  --color-mist: #dfed93;
  --color-sage: #55613a;
  --color-darkgreen: #2f3512;
  --color-signal: #ff611b;
  --color-signal-deep: #cc4e16;
  --color-maroon: #3b0619;
  --color-muted: #4a4a46;
  --color-faint: #7a7872;

  --font-serif: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  --font-sans: 'Inter', Arial, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-cream text-ink font-sans antialiased;
}

h1, h2, h3 {
  @apply font-serif font-normal;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

h1 em, h2 em {
  @apply text-core not-italic;
  font-style: italic; /* Instrument Serif italic */
}

.eyebrow {
  @apply font-mono text-xs uppercase text-faint;
  letter-spacing: 0.14em;
}

.pill-cta {
  @apply inline-block rounded-full bg-signal px-7 py-3 font-mono text-sm text-white;
  letter-spacing: 0.06em;
  transition: background 200ms cubic-bezier(0.2, 0, 0, 1);
}
.pill-cta:hover { @apply bg-signal-deep; }

.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 360ms cubic-bezier(0.2, 0, 0, 1), transform 360ms cubic-bezier(0.2, 0, 0, 1);
}
.reveal.is-visible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
  * { animation-duration: 0.01ms !important; }
}

@keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
.live-dot {
  @apply inline-block h-2 w-2 rounded-full bg-core;
  animation: pulse-dot 1.6s ease-in-out infinite;
}
```

- [ ] **Step 2: Verifizieren** — `npx tsc --noEmit && npm run build` grün.

- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat: inca design-tokens als tailwind theme"`

---

### Task 3: Sync-Script + Daten + Typen

**Files:**
- Create: `scripts/sync-data.py`, `src/types.ts`
- Create (generiert): `src/data/loop.json`, `src/data/tool_layer.json`, `src/data/fleet.json`, ggf. `src/data/agent_run.json`

- [ ] **Step 1: `scripts/sync-data.py` schreiben**

```python
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
            fail(f"{src} fehlt — in inca-explore `python tool_layer.py && python build.py` laufen lassen")
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
```

- [ ] **Step 2: Script laufen lassen, Output prüfen**

Run: `python3 scripts/sync-data.py && ls src/data/`
Expected: `loop.json tool_layer.json fleet.json agent_run.json`, Meldung mit Fall-Anzahl. Falls inca-explore die Web-JSONs nicht hat: vorher dort `python tool_layer.py && python build.py`.

- [ ] **Step 3: `src/types.ts` schreiben** — Spiegel von `build_web.build_data()`:

```ts
export type Decision = 'pay' | 'pay_reduced' | 'decline' | 'refer_to_human'

export interface AgentTrace {
  agent: string
  model: string
  mode: string // 'live' | 'fixture'
  confidence: number
  summary: string
  sources: string[]
}

export interface BlockedAction {
  action: string
  reason: string
}

export interface LoopCase {
  claim_id: string
  line_of_business: string
  incident_date: string
  reported_date: string
  policy_excerpt: string
  fnol_text: string
  invoice_items: { description: string; amount_eur: number }[]
  attachments: string[]
  expected_decision: Decision
  ground_truth_note: string
  is_fraudulent: boolean
  decision: Decision
  payout_eur: number
  correct: boolean
  receipt: {
    rationale: string
    traces: AgentTrace[]
    blocked_actions: BlockedAction[]
    human_verification_required: string[]
    uncertainty_notes: string[]
  }
}

export interface BenchmarkVersion {
  label: string
  note: string
  metrics: { accuracy: number; fraud_recall: number; fraud_precision: number; fraud_fp: number }
  confusion: { labels: string[]; matrix: number[][] }
  calibration: unknown
}

export interface LoopData {
  generated_at: string
  model: string
  mode: string
  metrics: {
    total: number
    correct: number
    decision_accuracy: number
    fraud_recall: number
    fraud_precision: number
    fraud_false_positive_rate: number
    auto_resolved_share: number
    auto_resolved_accuracy: number
  }
  cases: LoopCase[]
  benchmark: {
    n: number
    kind: string
    disclaimer: string
    coverage_floor: number
    prompts: { v1: string; v2: string }
    versions: { v1: BenchmarkVersion; v2: BenchmarkVersion }
  }
}

export interface FleetTool {
  name: string
  oneliner: string
  tools_count?: number
  tests?: number
  [k: string]: unknown
}

export interface FleetData {
  note: string
  groups: { title: string; subtitle: string; tools: FleetTool[] }[]
}

export interface ToolLayerCase {
  tool: string
  label: string
  input: Record<string, unknown>
  result: Record<string, unknown>
}

export interface ToolLayerData {
  source: string
  cases: ToolLayerCase[]
}

export type AgentRun = { ran: false } | { ran?: true; [k: string]: unknown }

export const DECISION_META: Record<Decision, { de: string; en: string; tone: 'core' | 'signal' | 'maroon' }> = {
  pay: { de: 'auszahlen', en: 'pay', tone: 'core' },
  pay_reduced: { de: 'gekürzt auszahlen', en: 'pay reduced', tone: 'core' },
  decline: { de: 'ablehnen', en: 'decline', tone: 'maroon' },
  refer_to_human: { de: 'an Mensch', en: 'human review', tone: 'signal' },
}
```

- [ ] **Step 4: Vitest-Test für Datenintegrität schreiben** — Create: `tests/data.test.ts`

```ts
import { describe, expect, it } from 'vitest'
import loop from '../src/data/loop.json'
import fleet from '../src/data/fleet.json'
import { DECISION_META, type LoopData } from '../src/types'

const data = loop as unknown as LoopData

describe('synced data', () => {
  it('hat Fälle und jede decision ist gemappt', () => {
    expect(data.cases.length).toBeGreaterThan(0)
    for (const c of data.cases) {
      expect(DECISION_META[c.decision]).toBeDefined()
      expect(c.receipt.traces.length).toBeGreaterThan(0)
    }
  })
  it('enthält mindestens einen Bruchfall (correct=false)', () => {
    expect(data.cases.some((c) => !c.correct)).toBe(true)
  })
  it('fleet hat Gruppen mit Tools', () => {
    expect((fleet as { groups: unknown[] }).groups.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 5: Test laufen lassen**

Run: `npx vitest run`
Expected: PASS (3 Tests). Schlägt der Bruchfall-Test fehl, prüfen ob die Showcase-Fälle wirklich einen `correct:false`-Fall enthalten (`python3 -c "import json; print([c['claim_id'] for c in json.load(open('src/data/loop.json'))['cases'] if not c['correct']])"`); falls nein, Test auf `>= 0` ändern UND in der Konsolen-UI den Bruchfall-Marker an `is_fraudulent`-Fehlklassifikation knüpfen — aber zuerst die Daten prüfen, nicht den Test weichspülen.

- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: sync-script, echte daten, typen"`

---

### Task 4: i18n — strings.ts + Provider

**Files:**
- Create: `src/strings.ts`, `src/i18n.tsx`, `tests/strings.test.ts`

- [ ] **Step 1: Paritäts-Test schreiben** — `tests/strings.test.ts`

```ts
import { describe, expect, it } from 'vitest'
import { strings } from '../src/strings'

function keysOf(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null ? keysOf(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  )
}

describe('strings', () => {
  it('de und en haben identische Schlüssel', () => {
    expect(keysOf(strings.de).sort()).toEqual(keysOf(strings.en).sort())
  })
  it('keine leeren Texte', () => {
    for (const lang of ['de', 'en'] as const) {
      for (const k of keysOf(strings[lang])) {
        const val = k.split('.').reduce((o: any, p) => o[p], strings[lang])
        expect(val, `${lang}.${k}`).not.toBe('')
      }
    }
  })
})
```

- [ ] **Step 2: Test laufen lassen** — Run: `npx vitest run tests/strings.test.ts` — Expected: FAIL (strings.ts existiert nicht).

- [ ] **Step 3: `src/strings.ts` schreiben.** Komplette Kerntexte (Auszug hier; weitere Sektions-Texte kommen in den jeweiligen Tasks dazu — IMMER in beiden Sprachen gleichzeitig, der Paritäts-Test erzwingt das):

```ts
export const strings = {
  de: {
    nav: { konsole: 'Konsole', teardown: 'Teardown', grounding: 'Grounding', flotte: 'Flotte', fit: 'Fit', cta: 'Kontakt' },
    hero: {
      eyebrow: 'BEWERBUNG · AI OPERATIONS · BERLIN',
      titlePre: 'Euer Loop, ',
      titleEm: 'einmal selbst gebaut.',
      sub: 'Ich habe mir euren Schadenloop angeschaut — und einen kleinen, ehrlichen Mini-Loop dazu gebaut. Drei Agenten, ein Receipt pro Fall, ein Eval-Harness. Diese Seite lässt euch alles anfassen.',
      cta: 'Mit Mikel sprechen',
      secondary: '5 Minuten durchklicken ↓',
    },
    console: {
      header: 'LOOP · OFFLINE-FIXTURES · DETERMINISTISCH',
      tabs: { faelle: 'Fälle', auswertung: 'Auswertung', benchmark: 'Benchmark' },
      caption: 'Der Code, nicht das Modell, trifft die Entscheidung.',
      breakBadge: '⚠ bricht bewusst',
      receiptHint: 'Receipt — jede Entscheidung nachvollziehbar',
      traceToggle: 'Agent-Trace aufklappen',
      evalDisclaimer: 'Zahlen aus handgeschriebenen Fixtures — sie zeigen, was der Harness misst, nicht Modellgüte.',
    },
    fit: { easterEggWhy: 'Gespräch empfohlen' },
    cta: {
      title: 'Mit Mikel ',
      titleEm: 'sprechen.',
      sub: 'Mir ist weniger wichtig, ob das beeindruckt, als ob es auf eurem Operator-Niveau standhält. Wo bricht so etwas bei euch in der Realität?',
      mail: 'Mail an Mikel',
      linkedin: 'LinkedIn',
      homage: 'Inoffizielle Bewerbungsseite — Design als Hommage an inca / ochi.design.',
    },
  },
  en: {
    nav: { konsole: 'Console', teardown: 'Teardown', grounding: 'Grounding', flotte: 'Fleet', fit: 'Fit', cta: 'Contact' },
    hero: {
      eyebrow: 'APPLICATION · AI OPERATIONS · BERLIN',
      titlePre: 'Your loop, ',
      titleEm: 'built once myself.',
      sub: 'I studied your claims loop — and built a small, honest mini-loop of my own. Three agents, a receipt per claim, an eval harness. This page lets you touch all of it.',
      cta: 'Talk to Mikel',
      secondary: 'click through in 5 minutes ↓',
    },
    console: {
      header: 'LOOP · OFFLINE FIXTURES · DETERMINISTIC',
      tabs: { faelle: 'Cases', auswertung: 'Evaluation', benchmark: 'Benchmark' },
      caption: 'The code, not the model, makes the decision.',
      breakBadge: '⚠ breaks on purpose',
      receiptHint: 'Receipt — every decision traceable',
      traceToggle: 'expand agent trace',
      evalDisclaimer: 'Numbers come from hand-written fixtures — they show what the harness measures, not model quality.',
    },
    fit: { easterEggWhy: 'conversation recommended' },
    cta: {
      title: 'Talk to ',
      titleEm: 'Mikel.',
      sub: "I care less about whether this impresses you than whether it holds up at your operator level. Where does something like this break in your reality?",
      mail: 'Email Mikel',
      linkedin: 'LinkedIn',
      homage: 'Unofficial application page — design is an homage to inca / ochi.design.',
    },
  },
} as const

export type Lang = keyof typeof strings
```

- [ ] **Step 4: `src/i18n.tsx` schreiben**

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { strings, type Lang } from './strings'

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'de',
  setLang: () => {},
})

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem('lang')
    if (stored === 'de' || stored === 'en') return stored
  } catch {
    /* Safari Private Mode */
  }
  return 'de'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext)
  return { lang, setLang, t: strings[lang] }
}
```

- [ ] **Step 5: Tests laufen lassen** — Run: `npx vitest run` — Expected: PASS.

- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: i18n mit de/en-paritätstest"`

---

### Task 5: Motion-Hooks + Nav + Hero

**Files:**
- Create: `src/motion.ts`, `src/components/Nav.tsx`, `src/components/Hero.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: `src/motion.ts` schreiben**

```ts
import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.15 },
    )
    el.querySelectorAll('.reveal').forEach((n, i) => {
      ;(n as HTMLElement).style.transitionDelay = `${i * 40}ms`
      obs.observe(n)
    })
    return () => obs.disconnect()
  }, [])
  return ref
}

export function useCountUp(target: number, durationMs = 1400) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return
      obs.disconnect()
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - t0) / durationMs, 1)
        setValue(target * (1 - Math.pow(1 - p, 3))) // ease-out cubic
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, durationMs])
  return { ref, value }
}

export function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now.toLocaleTimeString('de-DE', { hour12: false })
}
```

- [ ] **Step 2: `src/components/Nav.tsx` schreiben** — sticky, Anker, DE/EN-Toggle:

```tsx
import { useLang } from '../i18n'

const ANCHORS = ['konsole', 'teardown', 'grounding', 'flotte', 'fit', 'cta'] as const

export default function Nav() {
  const { lang, setLang, t } = useLang()
  return (
    <nav className="sticky top-0 z-50 border-b border-hairline bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-3 lg:px-8">
        <a href="#top" className="font-mono text-sm tracking-[0.14em]">
          MIKEL <span className="text-core">×</span> INCA
        </a>
        <div className="hidden gap-6 md:flex">
          {ANCHORS.map((a) => (
            <a key={a} href={`#${a}`} className="font-mono text-xs uppercase tracking-[0.12em] text-muted hover:text-ink">
              {t.nav[a]}
            </a>
          ))}
        </div>
        <button
          onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
          className="rounded-full border border-hairline px-3 py-1 font-mono text-xs"
          aria-label="Sprache wechseln / switch language"
        >
          {lang === 'de' ? 'DE → EN' : 'EN → DE'}
        </button>
      </div>
    </nav>
  )
}
```

- [ ] **Step 3: `src/components/Hero.tsx` schreiben** — links Statement, rechts gekippte Konsolen-Vorschau (statisch; klickt zu `#konsole`):

```tsx
import loop from '../data/loop.json'
import { useLang } from '../i18n'
import { useClock, useReveal } from '../motion'
import { DECISION_META, type LoopData } from '../types'

const data = loop as unknown as LoopData

export default function Hero() {
  const { lang, t } = useLang()
  const clock = useClock()
  const ref = useReveal<HTMLElement>()
  const preview = data.cases.find((c) => c.decision === 'refer_to_human') ?? data.cases[0]
  return (
    <header id="top" ref={ref} className="mx-auto grid max-w-[1320px] gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
      <div>
        <p className="eyebrow reveal">{t.hero.eyebrow}</p>
        <h1 className="reveal mt-4 text-5xl leading-[0.98] lg:text-7xl">
          {t.hero.titlePre}
          <em>{t.hero.titleEm}</em>
        </h1>
        <p className="reveal mt-6 max-w-md text-lg text-muted">{t.hero.sub}</p>
        <div className="reveal mt-8 flex items-center gap-6">
          <a href="#cta" className="pill-cta">{t.hero.cta}</a>
          <a href="#konsole" className="font-mono text-sm text-muted underline-offset-4 hover:underline">
            {t.hero.secondary}
          </a>
        </div>
      </div>
      <a
        href="#konsole"
        className="reveal block rounded-[20px] bg-sage p-5 shadow-[0_24px_60px_rgba(47,53,18,0.25)] transition-transform hover:scale-[1.01] lg:[transform:perspective(2000px)_rotateY(-3deg)]"
      >
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.14em] text-mist">
          <span><span className="live-dot mr-2" />{t.console.header}</span>
          <span>{clock}</span>
        </div>
        <div className="mt-3 rounded-xl bg-cream p-4">
          <div className="flex items-center justify-between font-mono text-xs text-faint">
            <span>{preview.claim_id}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] text-white ${DECISION_META[preview.decision].tone === 'signal' ? 'bg-signal' : DECISION_META[preview.decision].tone === 'maroon' ? 'bg-maroon' : 'bg-core'}`}>
              {DECISION_META[preview.decision][lang]}
            </span>
          </div>
          <p className="mt-1 font-serif text-lg">{preview.fnol_text.slice(0, 80)}…</p>
          <div className="mt-3 space-y-2">
            {preview.receipt.traces.map((tr) => (
              <div key={tr.agent}>
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                  <span>{tr.agent}</span>
                  <span>{Math.round(tr.confidence * 100)}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-hairline">
                  <div className="h-full rounded-full bg-core" style={{ width: `${tr.confidence * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </a>
    </header>
  )
}
```

- [ ] **Step 4: `src/App.tsx` zusammensetzen** (Sektionen kommen als Platzhalter-`<section id>` dazu und werden in späteren Tasks ersetzt):

```tsx
import Nav from './components/Nav'
import Hero from './components/Hero'
import { LangProvider } from './i18n'

export default function App() {
  return (
    <LangProvider>
      <Nav />
      <Hero />
      <section id="konsole" />
      <section id="teardown" />
      <section id="grounding" />
      <section id="flotte" />
      <section id="fit" />
      <section id="cta" />
    </LangProvider>
  )
}
```

- [ ] **Step 5: Im Browser prüfen** — Run: `npm run dev`, öffnen, DE/EN-Toggle klicken (Hero-Texte wechseln), Reveal-Animation sichtbar, Uhr tickt.

- [ ] **Step 6: Verifizieren + Commit**

```bash
npx tsc --noEmit && npx vitest run && git add -A && git commit -m "feat: nav, hero mit live-konsolen-vorschau, motion-hooks"
```

---

### Task 6: Konsole — Fälle-Tab (Herzstück)

**Files:**
- Create: `src/components/console/Console.tsx`, `CaseList.tsx`, `PipelineView.tsx`, `ReceiptView.tsx`
- Create: `tests/decision.test.ts`
- Modify: `src/App.tsx` (Platzhalter `#konsole` ersetzen)

- [ ] **Step 1: Unit-Test fürs Pill-Mapping** — `tests/decision.test.ts`

```ts
import { describe, expect, it } from 'vitest'
import { DECISION_META, type Decision } from '../src/types'

describe('DECISION_META', () => {
  it('deckt alle vier decisions mit beiden Sprachen ab', () => {
    const all: Decision[] = ['pay', 'pay_reduced', 'decline', 'refer_to_human']
    for (const d of all) {
      expect(DECISION_META[d].de).toBeTruthy()
      expect(DECISION_META[d].en).toBeTruthy()
      expect(['core', 'signal', 'maroon']).toContain(DECISION_META[d].tone)
    }
  })
})
```

Run: `npx vitest run tests/decision.test.ts` — Expected: PASS (Typen existieren aus Task 3; der Test sichert gegen spätere Enum-Erweiterungen in der Pipeline).

- [ ] **Step 2: `CaseList.tsx`** — Fall-Karten, Bruchfall gestrichelt:

```tsx
import { useLang } from '../../i18n'
import { DECISION_META, type LoopCase } from '../../types'

const TONE_BG = { core: 'bg-core text-darkgreen', signal: 'bg-signal text-white', maroon: 'bg-maroon text-cream' }

export default function CaseList({ cases, activeId, onSelect }: {
  cases: LoopCase[]
  activeId: string
  onSelect: (id: string) => void
}) {
  const { lang, t } = useLang()
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 lg:block lg:w-56 lg:shrink-0 lg:space-y-2 lg:overflow-visible lg:pb-0">
      {cases.map((c) => {
        const meta = DECISION_META[c.decision]
        return (
          <button
            key={c.claim_id}
            onClick={() => onSelect(c.claim_id)}
            data-testid={`case-${c.claim_id}`}
            className={`w-64 shrink-0 rounded-xl border p-3 text-left transition lg:w-full ${
              c.claim_id === activeId ? 'border-core bg-core/10' : 'border-mist/30 bg-cream/5 hover:border-mist/60'
            } ${c.correct ? '' : 'border-dashed'}`}
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-mist/70">
              <span>{c.claim_id}</span>
              {!c.correct && <span className="text-signal">{t.console.breakBadge}</span>}
            </div>
            <p className="mt-1 line-clamp-2 font-serif text-sm text-cream">{c.fnol_text}</p>
            <span className={`mt-2 inline-block rounded-full px-2 py-0.5 font-mono text-[10px] ${TONE_BG[meta.tone]}`}>
              {meta[lang]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: `PipelineView.tsx`** — gestaffelte Bar-Animation pro Trace (CSS-Transition über width, Stagger via key-Reset beim Fallwechsel):

```tsx
import { useEffect, useState } from 'react'
import type { AgentTrace } from '../../types'

export default function PipelineView({ traces, caseId }: { traces: AgentTrace[]; caseId: string }) {
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    setArmed(false)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = setTimeout(() => setArmed(true), reduced ? 0 : 80)
    return () => clearTimeout(id)
  }, [caseId])
  return (
    <div className="space-y-3">
      {traces.map((tr, i) => {
        const warn = tr.confidence < 0.7
        return (
          <div key={`${caseId}-${tr.agent}`}>
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-mist/80">
              <span>{tr.agent}</span>
              <span className={warn ? 'text-signal' : ''}>{Math.round(tr.confidence * 100)}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-cream/15">
              <div
                className={`h-full rounded-full transition-[width] duration-700 ease-out ${warn ? 'bg-signal' : 'bg-core'}`}
                style={{ width: armed ? `${tr.confidence * 100}%` : '0%', transitionDelay: `${i * 350}ms` }}
              />
            </div>
            <p className="mt-1 text-xs text-mist/60">{tr.summary}</p>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 4: `ReceiptView.tsx`** — Receipt auf Mist-Green, Trace + blocked_actions, JSON-Ästhetik:

```tsx
import { useState } from 'react'
import { useLang } from '../../i18n'
import type { LoopCase } from '../../types'

export default function ReceiptView({ c }: { c: LoopCase }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl bg-mist p-4 font-mono text-xs leading-relaxed text-darkgreen" data-testid="receipt">
      <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-sage">{t.console.receiptHint}</p>
      <div>
        <span className="font-semibold text-core-deep">"decision"</span>:{' '}
        <span className="text-signal-deep">"{c.decision}"</span>,
      </div>
      <div>
        <span className="font-semibold text-core-deep">"payout_eur"</span>: {c.payout_eur},
      </div>
      <div>
        <span className="font-semibold text-core-deep">"rationale"</span>: "{c.receipt.rationale}"
      </div>
      {c.receipt.blocked_actions.length > 0 && (
        <div className="mt-1">
          <span className="font-semibold text-core-deep">"blocked_actions"</span>:{' '}
          [{c.receipt.blocked_actions.map((b) => `"${b.action} — ${b.reason}"`).join(', ')}]
        </div>
      )}
      {c.receipt.uncertainty_notes.length > 0 && (
        <div className="mt-1">
          <span className="font-semibold text-core-deep">"uncertainty"</span>:{' '}
          [{c.receipt.uncertainty_notes.map((n) => `"${n}"`).join(', ')}]
        </div>
      )}
      <button onClick={() => setOpen(!open)} className="mt-3 underline underline-offset-2" data-testid="trace-toggle">
        {open ? '▾' : '▸'} {t.console.traceToggle} ({c.receipt.traces.length})
      </button>
      {open && (
        <div className="mt-2 space-y-2 border-t border-sage/30 pt-2">
          {c.receipt.traces.map((tr) => (
            <div key={tr.agent}>
              <span className="font-semibold">{tr.agent}</span> · {tr.model} · {tr.mode}
              <p className="text-darkgreen/80">{tr.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: `Console.tsx`** — Salbei-Rahmen, Tabs, Fall-State; Eval/Benchmark-Tabs zunächst als `null`-Render mit TODO-freiem Minimal-Inhalt („kommt in Task 7"-Platzhalter ist verboten — stattdessen Tabs erst in Task 7 ins Tab-Array aufnehmen):

```tsx
import { useState } from 'react'
import loop from '../../data/loop.json'
import { useLang } from '../../i18n'
import { useClock, useReveal } from '../../motion'
import type { LoopData } from '../../types'
import CaseList from './CaseList'
import PipelineView from './PipelineView'
import ReceiptView from './ReceiptView'

const data = loop as unknown as LoopData

export default function Console() {
  const { t } = useLang()
  const clock = useClock()
  const ref = useReveal<HTMLElement>()
  const [activeId, setActiveId] = useState(data.cases[0].claim_id)
  const active = data.cases.find((c) => c.claim_id === activeId)!
  return (
    <section id="konsole" ref={ref} className="bg-softwhite py-24">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <div className="reveal mx-auto max-w-5xl rounded-[28px] bg-sage p-6 shadow-[0_24px_60px_rgba(47,53,18,0.25)] lg:p-8">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.14em] text-mist">
            <span><span className="live-dot mr-2" />{t.console.header}</span>
            <span>{clock} BERLIN</span>
          </div>
          <div className="mt-6 flex flex-col gap-5 lg:flex-row">
            <CaseList cases={data.cases} activeId={activeId} onSelect={setActiveId} />
            <div className="min-w-0 flex-1 space-y-5">
              <div className="rounded-xl bg-cream p-4">
                <div className="font-mono text-xs text-faint">{active.claim_id} · {active.line_of_business}</div>
                <p className="mt-1 font-serif text-lg">{active.fnol_text}</p>
                <p className="mt-2 border-l-2 border-core pl-3 text-xs text-muted">{active.policy_excerpt}</p>
              </div>
              <PipelineView traces={active.receipt.traces} caseId={active.claim_id} />
              <ReceiptView c={active} />
            </div>
          </div>
        </div>
        <p className="reveal mt-4 text-center font-mono text-xs tracking-[0.1em] text-faint">{t.console.caption}</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: In `App.tsx` einbinden** — `<section id="konsole" />` durch `<Console />` ersetzen (Import dazu).

- [ ] **Step 7: Browser-Check** — `npm run dev`: Fall wechseln → Bars animieren neu durch, Receipt aktualisiert, Trace klappt auf, Bruchfall gestrichelt mit Badge. Mobile-Breite: Fall-Liste wird horizontale Scroll-Reihe.

- [ ] **Step 8: Verifizieren + Commit**

```bash
npx tsc --noEmit && npx vitest run && git add -A && git commit -m "feat: interaktive claims-konsole mit receipts"
```

---

### Task 7: Konsole — Auswertung + Benchmark-Tabs

**Files:**
- Create: `src/components/console/EvalTab.tsx`, `src/components/console/BenchmarkTab.tsx`
- Modify: `src/components/console/Console.tsx`, `src/strings.ts` (+ Benchmark-Texte de/en)

- [ ] **Step 1: `EvalTab.tsx`** — Count-up-Metriken + Disclaimer:

```tsx
import { useLang } from '../../i18n'
import { useCountUp } from '../../motion'
import type { LoopData } from '../../types'

function Stat({ label, value, pct = true }: { label: string; value: number; pct?: boolean }) {
  const { ref, value: v } = useCountUp(pct ? value * 100 : value)
  return (
    <div className="rounded-xl bg-cream p-4 text-center">
      <span ref={ref} className="font-serif text-4xl tabular-nums">
        {pct ? `${v.toFixed(0)}%` : v.toFixed(0)}
      </span>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{label}</p>
    </div>
  )
}

export default function EvalTab({ data }: { data: LoopData }) {
  const { t } = useLang()
  const m = data.metrics
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label={t.console.eval.accuracy} value={m.decision_accuracy} />
        <Stat label={t.console.eval.fraudRecall} value={m.fraud_recall} />
        <Stat label={t.console.eval.fraudPrecision} value={m.fraud_precision} />
        <Stat label={t.console.eval.autoShare} value={m.auto_resolved_share} />
      </div>
      <p className="mt-4 rounded-lg bg-cream/10 p-3 font-mono text-[11px] text-mist/80">
        ⚠ {t.console.evalDisclaimer}
      </p>
    </div>
  )
}
```

In `strings.ts` ergänzen (beide Sprachen): `console.eval = { accuracy: 'Entscheidungs-Genauigkeit'/'decision accuracy', fraudRecall: 'Fraud-Recall'/'fraud recall', fraudPrecision: 'Fraud-Precision'/'fraud precision', autoShare: 'Dunkel-Quote'/'auto-resolved share' }`.

- [ ] **Step 2: `BenchmarkTab.tsx`** — v1/v2 nebeneinander, echter Prompt-Text aufklappbar, Disclaimer aus den Daten:

```tsx
import { useState } from 'react'
import { useLang } from '../../i18n'
import type { BenchmarkVersion, LoopData } from '../../types'

function VersionCard({ v, prompt }: { v: BenchmarkVersion; prompt: string }) {
  const { t } = useLang()
  const [showPrompt, setShowPrompt] = useState(false)
  return (
    <div className="flex-1 rounded-xl bg-cream p-4">
      <p className="font-serif text-lg">{v.label}</p>
      <p className="text-xs text-muted">{v.note}</p>
      <dl className="mt-3 space-y-1 font-mono text-xs">
        {Object.entries(v.metrics).map(([k, val]) => (
          <div key={k} className="flex justify-between">
            <dt className="text-muted">{k}</dt>
            <dd className="tabular-nums">{(val * 100).toFixed(1)}%</dd>
          </div>
        ))}
      </dl>
      <button onClick={() => setShowPrompt(!showPrompt)} className="mt-3 font-mono text-[11px] underline underline-offset-2">
        {showPrompt ? '▾' : '▸'} {t.console.benchmark.showPrompt}
      </button>
      {showPrompt && <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded bg-softwhite p-2 text-[10px]">{prompt}</pre>}
    </div>
  )
}

export default function BenchmarkTab({ data }: { data: LoopData }) {
  const b = data.benchmark
  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row">
        <VersionCard v={b.versions.v1} prompt={b.prompts.v1} />
        <VersionCard v={b.versions.v2} prompt={b.prompts.v2} />
      </div>
      <p className="mt-4 rounded-lg bg-cream/10 p-3 font-mono text-[11px] text-mist/80">⚠ {b.disclaimer}</p>
    </div>
  )
}
```

In `strings.ts` ergänzen: `console.benchmark = { showPrompt: 'Prompt lesen'/'read the prompt' }`.

- [ ] **Step 3: Tabs in `Console.tsx` verdrahten** — State `tab: 'faelle' | 'auswertung' | 'benchmark'`, Pill-Tabs unter dem Header (aktiv: `bg-core text-darkgreen`, inaktiv: `border border-mist/30 text-mist`), Inhalt per Conditional Render. Tab-Buttons bekommen `data-testid={`tab-${key}`}`.

- [ ] **Step 4: Browser-Check** — Tabs wechseln, Count-up läuft beim ersten Sichtbarwerden, Prompts aufklappbar, Disclaimer (deutscher Text aus den Daten) sichtbar.

- [ ] **Step 5: Verifizieren + Commit**

```bash
npx tsc --noEmit && npx vitest run && git add -A && git commit -m "feat: eval- und benchmark-tab in der konsole"
```

---

### Task 8: Teardown-Sektion

**Files:**
- Create: `src/components/Teardown.tsx`
- Modify: `src/strings.ts` (Teardown-Texte de/en), `src/App.tsx`

- [ ] **Step 1: Inhalt aus `/Users/mikel/inca-claims-loop/TEARDOWN.md` lesen** und in `strings.ts` als strukturierte Blöcke übernehmen (beide Sprachen; EN sinngemäß übersetzen, Fachbegriffe FNOL/TPA/Regress lassen). Struktur:

```ts
teardown: {
  eyebrow: 'TEARDOWN',
  titlePre: 'Wie ich ', titleEm: 'euren Loop lese.',
  intro: '<aus TEARDOWN.md: die Twoliner-Einleitung>',
  pipeline: [
    { step: 'FNOL & Reserve', agents: 18 },
    { step: 'Deckung & Haftung', agents: 12 },
    { step: 'Kommunikation', agents: 24 },
    { step: 'Regress', agents: 29 },
    { step: 'Rechnung & Gutachten', agents: 63 },
    { step: 'Betrugsprüfung', agents: 42 },
    { step: 'Finale Prüfung', agents: 8 },
  ],
  pipelineNote: 'MARS routet jeden Fall durch 250+ KI-Agenten — die 140+ der Schadenquotenoptimierung sind die Prüfdisziplinen daraus.',
  breaks: [ { title: '<Bruchstelle 1 aus TEARDOWN.md>', body: '<…>' }, /* alle Bruchstellen übernehmen */ ],
  first: { title: 'Was ich zuerst bauen würde', body: '<Edge-Case-Discovery-Absatz aus TEARDOWN.md>' },
}
```

WICHTIG: Die konkreten Texte stehen in TEARDOWN.md — vollständig übernehmen statt neu erfinden, Register beibehalten (respektvoll, kein Sales-Deutsch).

- [ ] **Step 2: `Teardown.tsx` schreiben** — Editorial: Eyebrow, Serif-Headline, Intro; Pipeline als horizontale Timeline (Mono-Zahlen, alternierge Ticks wie bei INCA); Bruchstellen als 2-Spalten-Karten; „Was zuerst"-Block mit Core-Green-Border:

```tsx
import { useLang } from '../i18n'
import { useReveal } from '../motion'

export default function Teardown() {
  const { t } = useLang()
  const ref = useReveal<HTMLElement>()
  return (
    <section id="teardown" ref={ref} className="mx-auto max-w-[1320px] px-6 py-24 lg:px-8">
      <p className="eyebrow reveal">{t.teardown.eyebrow}</p>
      <h2 className="reveal mt-3 max-w-2xl text-4xl lg:text-5xl">
        {t.teardown.titlePre}<em>{t.teardown.titleEm}</em>
      </h2>
      <p className="reveal mt-5 max-w-2xl text-muted">{t.teardown.intro}</p>
      <div className="reveal mt-12 overflow-x-auto">
        <div className="flex min-w-[720px] items-end gap-0 border-b border-hairline pb-4">
          {t.teardown.pipeline.map((p, i) => (
            <div key={p.step} className={`flex-1 px-2 ${i % 2 ? 'pt-8' : ''}`}>
              <p className="font-mono text-2xl text-core-deep tabular-nums">{p.agents}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{p.step}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 font-mono text-[11px] text-faint">{t.teardown.pipelineNote}</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {t.teardown.breaks.map((b) => (
          <div key={b.title} className="reveal rounded-xl border border-hairline bg-white/50 p-6">
            <h3 className="text-xl">{b.title}</h3>
            <p className="mt-2 text-sm text-muted">{b.body}</p>
          </div>
        ))}
      </div>
      <div className="reveal mt-10 rounded-xl border-l-4 border-core bg-mist/30 p-6">
        <h3 className="text-xl">{t.teardown.first.title}</h3>
        <p className="mt-2 max-w-3xl text-sm text-muted">{t.teardown.first.body}</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: In `App.tsx` einbinden, Browser-Check, Verifizieren + Commit**

```bash
npx tsc --noEmit && npx vitest run && git add -A && git commit -m "feat: teardown-sektion aus TEARDOWN.md"
```

---

### Task 9: Policy-Grounding-Sektion

**Files:**
- Create: `src/components/Grounding.tsx`
- Modify: `src/strings.ts` (Grounding-Texte de/en), `src/App.tsx`

- [ ] **Step 1: Strings ergänzen** (beide Sprachen):

```ts
grounding: {
  eyebrow: 'POLICY GROUNDING',
  titlePre: 'GitLaw für ', titleEm: 'Versicherungsverträge.',
  intro: 'Nicht „was denkt das Modell?", sondern „welche Klausel trägt die Entscheidung?". Mein GitLaw-MCP verifiziert Rechtszitate gegen 5.942 echte Gesetze — dieselbe Mechanik, die eure Deckungsprüfung zitierfest machen würde.',
  toolTitle: 'Die Tool-Schicht — echte Aufrufe, key-frei reproduzierbar',
  agentTitle: 'Der Agent-Lauf',
  agentNotRun: 'Hier steht bewusst kein erfundener Chat: Der Agent-Lauf erscheint erst, wenn er wirklich gelaufen ist.',
  verified: 'verifiziert', notVerified: 'nicht verifiziert',
}
```

- [ ] **Step 2: `Grounding.tsx` schreiben** — Salbei-Sektion; links Intro, rechts `tool_layer.json`-Cases als klickbare Liste (Input → Result-JSON, verified-Badge grün/maroon); darunter Agent-Lauf aus `agent_run.json` ODER der ehrliche Hinweis:

```tsx
import { useState } from 'react'
import agentRun from '../data/agent_run.json'
import toolLayer from '../data/tool_layer.json'
import { useLang } from '../i18n'
import { useReveal } from '../motion'
import type { AgentRun, ToolLayerData } from '../types'

const tl = toolLayer as unknown as ToolLayerData
const run = agentRun as AgentRun

export default function Grounding() {
  const { t } = useLang()
  const ref = useReveal<HTMLElement>()
  const [idx, setIdx] = useState(0)
  const c = tl.cases[idx]
  const verified = Boolean((c.result as { verified?: boolean }).verified)
  return (
    <section id="grounding" ref={ref} className="bg-sage py-24 text-cream">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <p className="eyebrow reveal !text-mist/70">{t.grounding.eyebrow}</p>
        <h2 className="reveal mt-3 max-w-2xl text-4xl text-cream lg:text-5xl">
          {t.grounding.titlePre}<em className="text-mist">{t.grounding.titleEm}</em>
        </h2>
        <p className="reveal mt-5 max-w-2xl text-mist/80">{t.grounding.intro}</p>
        <div className="reveal mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mist/70">{t.grounding.toolTitle}</p>
            {tl.cases.map((tc, i) => (
              <button
                key={tc.label}
                onClick={() => setIdx(i)}
                className={`block w-full rounded-lg border p-3 text-left text-sm ${i === idx ? 'border-core bg-core/15' : 'border-mist/25 hover:border-mist/50'}`}
              >
                <span className="font-mono text-[10px] text-mist/60">{tc.tool}</span>
                <p className="font-serif">{tc.label}</p>
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-darkgreen p-5 font-mono text-xs leading-relaxed">
            <div className="flex justify-between text-mist/60">
              <span>{tl.source}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${verified ? 'bg-core text-darkgreen' : 'bg-maroon text-cream'}`}>
                {verified ? t.grounding.verified : t.grounding.notVerified}
              </span>
            </div>
            <pre className="mt-3 overflow-auto whitespace-pre-wrap text-mist">{JSON.stringify({ input: c.input, result: c.result }, null, 1)}</pre>
          </div>
        </div>
        <div className="reveal mt-8 rounded-xl border border-mist/25 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mist/70">{t.grounding.agentTitle}</p>
          {'ran' in run && run.ran === false ? (
            <p className="mt-2 text-sm text-mist/80">{t.grounding.agentNotRun}</p>
          ) : (
            <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap font-mono text-xs text-mist">{JSON.stringify(run, null, 1)}</pre>
          )}
        </div>
      </div>
    </section>
  )
}
```

Hinweis: Wenn `agent_run.json` ein echter Lauf ist, dessen Format anschauen (`python3 -m json.tool src/data/agent_run.json | head -50`) und statt rohem `<pre>` eine Konversations-Liste rendern (Rolle + Text + Tool-Calls); das Format entsteht in `inca-explore/agent.py`.

- [ ] **Step 3: Einbinden, Browser-Check (Tool-Case wechseln → JSON wechselt, verified-Badge korrekt), Verifizieren + Commit**

```bash
npx tsc --noEmit && npx vitest run && git add -A && git commit -m "feat: policy-grounding-sektion mit echter tool-schicht"
```

---

### Task 10: Flotte-Sektion

**Files:**
- Create: `src/components/Fleet.tsx`
- Modify: `src/strings.ts` (Fleet-Texte de/en), `src/App.tsx`

- [ ] **Step 1: Strings ergänzen** (beide Sprachen): `fleet: { eyebrow: 'FLOTTE', titlePre: 'Was sonst noch ', titleEm: 'fährt.', intro: '<1-2 Sätze: ehrlich gerankt, echte Tests, echte Outputs>', tests: 'Tests', tools: 'Tools' }`. Die Gruppen-Titel/-Untertitel und Tool-Beschreibungen kommen aus `fleet.json` (deutsch) — im EN-Modus mit `lang`-Weiche die deutschen Originaltexte zeigen plus kurzem EN-Hinweis `fleet.deNote: 'tool descriptions in German — sources are German-language projects'`. Keine maschinelle Doppelpflege von fleet.json.

- [ ] **Step 2: `Fleet.tsx` schreiben** — Creme-Sektion, Gruppen aus `fleet.json` (Gruppe „Heute fahrbar" zuerst, visuell stärker), Tool-Karten mit Name, Oneliner, Test-/Tool-Zahlen in Mono, GitHub-Link wo vorhanden:

```tsx
import fleetJson from '../data/fleet.json'
import { useLang } from '../i18n'
import { useReveal } from '../motion'
import type { FleetData } from '../types'

const fleet = fleetJson as unknown as FleetData

export default function Fleet() {
  const { lang, t } = useLang()
  const ref = useReveal<HTMLElement>()
  return (
    <section id="flotte" ref={ref} className="mx-auto max-w-[1320px] px-6 py-24 lg:px-8">
      <p className="eyebrow reveal">{t.fleet.eyebrow}</p>
      <h2 className="reveal mt-3 text-4xl lg:text-5xl">{t.fleet.titlePre}<em>{t.fleet.titleEm}</em></h2>
      <p className="reveal mt-5 max-w-2xl text-muted">{t.fleet.intro}</p>
      {lang === 'en' && <p className="reveal mt-2 font-mono text-xs text-faint">{t.fleet.deNote}</p>}
      {fleet.groups.map((g, gi) => (
        <div key={g.title} className="mt-12">
          <h3 className={`text-2xl ${gi === 0 ? '' : 'text-muted'}`}>{g.title}</h3>
          <p className="text-sm text-faint">{g.subtitle}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.tools.map((tool) => (
              <div key={tool.name} className={`reveal rounded-xl border p-5 ${gi === 0 ? 'border-core/40 bg-white/60' : 'border-hairline bg-white/30'}`}>
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl">{tool.name}</h4>
                  {gi === 0 && <span className="live-dot" />}
                </div>
                <p className="mt-1 text-sm text-muted">{tool.oneliner}</p>
                <p className="mt-3 font-mono text-[11px] text-faint">
                  {tool.tests ? `${tool.tests} ${t.fleet.tests}` : ''}
                  {tool.tests && tool.tools_count ? ' · ' : ''}
                  {tool.tools_count ? `${tool.tools_count} ${t.fleet.tools}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
```

Vor dem Schreiben die echten Felder prüfen: `python3 -c "import json; d=json.load(open('src/data/fleet.json')); print(json.dumps(d['groups'][0]['tools'][0], ensure_ascii=False, indent=1))"` — falls Tools `repo`/`example_output`-Felder haben, GitHub-Link und aufklappbaren Beispiel-Output ergänzen.

- [ ] **Step 3: Einbinden, Browser-Check, Verifizieren + Commit**

```bash
npx tsc --noEmit && npx vitest run && git add -A && git commit -m "feat: flotte-sektion aus fleet.json"
```

---

### Task 11: Fit + Easter Egg + CTA-Footer

**Files:**
- Create: `src/components/Fit.tsx`, `src/components/CtaFooter.tsx`
- Modify: `src/strings.ts`, `src/App.tsx`

- [ ] **Step 1: Strings ergänzen** (beide Sprachen, Register: respektvoll-warm, kein Sales-Deutsch):

```ts
fit: {
  eyebrow: 'FIT',
  titlePre: 'Warum INCA, ', titleEm: 'warum ich.',
  points: [
    { title: 'Berlin, sofort', body: 'Vor Ort, deutschsprachig, DSGVO im Reflex — Legal-Tech für deutsche Nutzer baue ich seit Jahren.' },
    { title: 'Loop-Denke', body: 'Receipt, Eval, Benchmark — nicht weil es im Stellenprofil steht, sondern weil ich es für meine eigenen Projekte so baue.' },
    { title: 'Founder-Tempo', body: 'Fünf Projekte parallel geshippt: Scope klein schneiden, ehrlich messen, nachziehen.' },
  ],
  easterEggWhy: 'Gespräch empfohlen', // bereits aus Task 4 vorhanden — nicht doppeln
},
```

- [ ] **Step 2: `Fit.tsx`** — drei Punkte-Karten + Easter-Egg-Receipt (kleines Mist-Green-Receipt, das die Bewerbung selbst bewertet):

```tsx
import { useLang } from '../i18n'
import { useReveal } from '../motion'

export default function Fit() {
  const { t } = useLang()
  const ref = useReveal<HTMLElement>()
  return (
    <section id="fit" ref={ref} className="mx-auto max-w-[1320px] px-6 py-24 lg:px-8">
      <p className="eyebrow reveal">{t.fit.eyebrow}</p>
      <h2 className="reveal mt-3 text-4xl lg:text-5xl">{t.fit.titlePre}<em>{t.fit.titleEm}</em></h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {t.fit.points.map((p) => (
          <div key={p.title} className="reveal rounded-xl border border-hairline bg-white/50 p-6">
            <h3 className="text-xl">{p.title}</h3>
            <p className="mt-2 text-sm text-muted">{p.body}</p>
          </div>
        ))}
      </div>
      <div className="reveal mx-auto mt-12 max-w-md rounded-xl bg-mist p-4 font-mono text-xs text-darkgreen" data-testid="easter-egg">
        <div><span className="font-semibold text-core-deep">"claim_id"</span>: "MN-2026-001",</div>
        <div><span className="font-semibold text-core-deep">"decision"</span>: <span className="text-signal-deep">"refer_to_human"</span>,</div>
        <div><span className="font-semibold text-core-deep">"why"</span>: ["{t.fit.easterEggWhy}"],</div>
        <div><span className="font-semibold text-core-deep">"blocked_actions"</span>: []</div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: `CtaFooter.tsx`** — Dunkelgrün, Mail + LinkedIn + Hommage:

```tsx
import { useLang } from '../i18n'
import { useReveal } from '../motion'

export default function CtaFooter() {
  const { t } = useLang()
  const ref = useReveal<HTMLElement>()
  return (
    <footer id="cta" ref={ref} className="bg-darkgreen py-24 text-cream">
      <div className="mx-auto max-w-[1320px] px-6 text-center lg:px-8">
        <h2 className="reveal text-4xl text-cream lg:text-6xl">
          {t.cta.title}<em className="text-mist">{t.cta.titleEm}</em>
        </h2>
        <p className="reveal mx-auto mt-5 max-w-xl text-mist/80">{t.cta.sub}</p>
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-5">
          <a href="mailto:mikel_ninh@yahoo.de" className="pill-cta" data-testid="mail-cta">{t.cta.mail}</a>
          <a
            href="https://www.linkedin.com/in/michael-ninh/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-mist/40 px-7 py-3 font-mono text-sm text-mist hover:border-mist"
          >
            {t.cta.linkedin}
          </a>
        </div>
        <p className="reveal mt-16 font-mono text-[11px] text-mist/50">{t.cta.homage}</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Einbinden (alle Platzhalter-Sections in App.tsx sind jetzt ersetzt), Browser-Check, Verifizieren + Commit**

```bash
npx tsc --noEmit && npx vitest run && git add -A && git commit -m "feat: fit-sektion mit receipt-easteregg und cta-footer"
```

---

### Task 12: Playwright-E2E

**Files:**
- Create: `playwright.config.ts`, `e2e/site.spec.ts`
- Modify: `package.json` (Scripts)

- [ ] **Step 1: `playwright.config.ts`**

```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:4173/inca-site/' },
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4173/inca-site/',
    reuseExistingServer: true,
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1380, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
  ],
})
```

`package.json`-Scripts ergänzen: `"test": "vitest run", "e2e": "playwright test", "preview": "vite preview"`.

- [ ] **Step 2: `e2e/site.spec.ts`**

```ts
import { expect, test } from '@playwright/test'

test('voller Durchklick DE', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Euer Loop')
  // Konsole: Fall wechseln -> Receipt ändert sich
  const cases = page.locator('[data-testid^="case-"]')
  await expect(cases.first()).toBeVisible()
  const firstReceipt = await page.getByTestId('receipt').textContent()
  await cases.nth(1).click()
  await expect(page.getByTestId('receipt')).not.toHaveText(firstReceipt!)
  // Agent-Trace aufklappen
  await page.getByTestId('trace-toggle').click()
  // Tabs
  await page.getByTestId('tab-auswertung').click()
  await expect(page.getByText('Fixtures')).toBeVisible()
  await page.getByTestId('tab-benchmark').click()
  // Easter Egg + CTA
  await expect(page.getByTestId('easter-egg')).toContainText('refer_to_human')
  await expect(page.getByTestId('mail-cta')).toHaveAttribute('href', 'mailto:mikel_ninh@yahoo.de')
})

test('EN-Toggle wechselt Texte und persistiert', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /sprache|language/i }).click()
  await expect(page.locator('h1')).toContainText('Your loop')
  await page.reload()
  await expect(page.locator('h1')).toContainText('Your loop')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
})
```

- [ ] **Step 3: Browser installieren + laufen lassen**

Run: `npx playwright install chromium && npx playwright test`
Expected: 4 passed (2 Tests × 2 Viewports). Bei Fehlschlag: `npx playwright test --headed` zum Zuschauen — Selektoren gegen tatsächliches Markup prüfen, nicht blind anpassen.

- [ ] **Step 4: Commit** — `git add -A && git commit -m "test: playwright-durchklick desktop+mobile, beide sprachen"`

---

### Task 13: Deploy — GitHub Pages (NUR mit Mikels Go)

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Workflow schreiben** — `src/data/` ist committed, daher braucht CI weder Python noch die Quell-Repos:

```yaml
name: Deploy
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npx vitest run
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: STOPP — Mikel fragen.** Repo-Erstellung auf GitHub (public? privat geht nicht mit Pages Free), Push und Pages-Aktivierung sind Veröffentlichung. Erst nach explizitem Go:

```bash
gh repo create mikelninh/inca-site --public --source . --push
gh api repos/mikelninh/inca-site/pages -X POST -f build_type=workflow 2>/dev/null || true
```

Expected: Deploy-Workflow läuft, Seite unter `https://mikelninh.github.io/inca-site/` erreichbar.

- [ ] **Step 3: Live-Check** — Seite öffnen, beide Sprachen durchklicken, Fonts laden, Konsole interaktiv, `noindex` im Quelltext.

- [ ] **Step 4: Commit des Workflows** (falls noch nicht im Push enthalten).

---

## Offene Empfehlung (kein Task, vor dem Versenden)

In `inca-explore` einmal `ANTHROPIC_API_KEY=… python agent.py` laufen lassen und `python3 scripts/sync-data.py` wiederholen — dann zeigt die Grounding-Sektion einen echten Agent-Lauf statt des Ehrlichkeits-Hinweises. Beides ist vertretbar, der echte Lauf ist stärker.

## Self-Review (erledigt)

- Spec-Abdeckung: alle 7 Sektionen (Tasks 5-11), Konsole mit 3 Tabs (6-7), Tokens (2), Sync+Typen (3), i18n (4), Quality-Gates (12, plus tsc/vitest in jedem Task), Deploy+noindex (1, 13), Hommage-Fußnote (11), Mobile (12, CaseList horizontal-scroll in 6) ✓
- Platzhalter: Teardown-/Intro-Texte verweisen bewusst auf TEARDOWN.md als Quelle (Originaltexte übernehmen, nicht erfinden) — das ist eine Quellenangabe, kein TBD ✓
- Typkonsistenz: `DECISION_META`, `LoopData`, `useReveal`/`useCountUp`/`useClock` werden überall mit denselben Signaturen verwendet ✓
