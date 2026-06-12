# INCA-Bewerbungsseite — Design-Spec

Datum: 2026-06-12 · Status: zur Review · Projekt: `/Users/mikel/inca-site`

## Zweck und Moment

Interaktive Bewerbungsseite für die INCA Solutions GmbH (get-inca.com, KI-Schadendienstleister, Berlin). Der Link geht **mit der Bewerbung** raus — der erste Eindruck. Die Seite muss in 2 Minuten überzeugen und Tiefe für Neugierige bieten. Alles läuft auf einen Schritt zu: **„Mit Mikel sprechen"** (Spiegel von INCAs eigenem CTA „Mit Philip sprechen").

Konzept: **Editorial-Rahmen in INCAs Design-Sprache, eine echte klickbare Mini-Claims-Konsole als Herzstück** (gewählt aus drei Varianten). Keine neuen Demos — die Seite verpackt vorhandene, fahrbare Artefakte:

- `~/inca-claims-loop` — Mini-Schadenpipeline, Decision Receipts, Eval-Harness, Prompt-Benchmark
- `~/inca-explore` — GitLaw-gegroundeter Agent (echter Lauf), Flotten-Ranking
- Teardown-Inhalt aus `~/inca-claims-loop/TEARDOWN.md`

## Seitenstruktur (One-Pager, 7 Sektionen)

Sticky-Nav: Anker-Links + DE/EN-Toggle. Creme- und Grün-Sektionen im Wechsel (INCA-Rhythmus).

1. **Hero** (Creme) — Serif-Headline „Euer Loop, *einmal selbst gebaut.*" (Kursiv-Anteil in Core-Green), Sub-Zeile, CTA-Pill „Mit Mikel sprechen" (Signal-Orange) + Sekundär-Link „5 Minuten durchklicken ↓". Rechts die Konsolen-Karte, leicht 3D-gekippt (`perspective rotateY(-3deg)`), pulsierender Live-Punkt, tickende Uhr. Mono-Eyebrow: `BEWERBUNG · AI OPERATIONS · BERLIN`.
2. **Konsole** (Salbei, Herzstück) — vollbreite interaktive Konsole, Detail siehe unten.
3. **Teardown** (Creme) — „Wie ich euren Loop lese": TEARDOWN.md als Editorial-Sektion. INCAs 7-Stufen-Pipeline gespiegelt (FNOL 18 · Deckung/Haftung 12 · Kommunikation 24 · Regress 29 · Rechnung/Gutachten 63 · Betrug 42 · Finale Prüfung 8 = 250+ Agenten), wo der Loop in der Realität bricht, was ich zuerst bauen würde (Edge-Case-Discovery-Loop).
4. **Policy Grounding** (Salbei) — „GitLaw für Versicherungsverträge": der eingebackene echte Agent-Lauf aus inca-explore mit Zitat-Verifikation gegen 5.936 Gesetze, gerahmt als „Welche Klausel trägt die Entscheidung?".
5. **Flotte** (Creme) — Projektgrid, ehrlich gerankt wie fleet.html („heute fahrbar" / „teilweise"): GitLaw (+MCP), MCP-Flotte (agb-reader, flight-rights, elterngeld, judge, civic-ai-toolkit), SafeVoice, Eval-Arbeit. Mit echten Beispiel-Outputs und GitHub-Links.
6. **Fit** (Creme) — „Warum INCA, warum ich": kurz, persönlich (Berlin, Legal-Tech, DSGVO-Instinkte, Founder-Tempo). Easter Egg: kleines Decision Receipt, das die Bewerbung selbst bewertet — `decision: "human_review", why: ["Gespräch empfohlen"]`.
7. **CTA** (Dunkelgrün) — „Mit Mikel sprechen": Mail-Button `mikel_ninh@yahoo.de`, LinkedIn `https://www.linkedin.com/in/michael-ninh/`, dazu die Reality-Check-Frage („Wo bricht so etwas bei euch?"). Footer-Fußnote: „Inoffizielle Bewerbungsseite — Design als Hommage an inca / ochi.design". Calendly nachrüstbar.

## Die Konsole (Sektion 2) im Detail

Layout INCA-treu in der Aufhellung **A1 „Salbei"**: Rahmen Salbeigrün, **weiße Fall-Karten im Rahmen**, Receipt auf Mist-Green. Kopfzeile in Mono: `LOOP · OFFLINE-FIXTURES · DETERMINISTISCH` + Uhr — die Ehrlichkeits-Kennzeichnung ist Teil der Ästhetik, nicht Fußnote.

Drei Tabs:

- **Fälle:** Fall-Liste links (ID mono, Titel serif, Status-Pill: `auto_approve` grün / `human_review` orange / `reject` maroon). Fall anklicken → Pipeline-Stufen animieren gestaffelt durch (~1,2 s, Bars füllen sich) → Decision Receipt klappt als JSON auf (`decision`, `why[]`, `blocked_actions[]`). Agent-Trace pro Agent aufklappbar mit echtem Fixture-Output. Der bewusste Bruchfall ist als gestrichelte Karte markiert (`⚠ bewusst`).
- **Auswertung:** Eval-Harness-Metriken als Count-up-Zahlen, Label „Fixtures, nicht Modellgüte".
- **Benchmark:** Prompt v1 vs. v2 nebeneinander, Diff hervorgehoben, Projektion-vs-Messung sauber gekennzeichnet (Formulierungen aus SENDEN.md übernehmen).

Caption unter der Konsole: „Der Code, nicht das Modell, trifft die Entscheidung."

## Design-Tokens

Direkt aus INCAs Token-System (ochi.design) extrahiert, plus eine eigene Aufhellung:

| Token | Wert | Verwendung |
|---|---|---|
| Creme | `#F5F4F0` | Primärfläche |
| Soft White | `#EAE8E2` | Sekundärfläche |
| Border | `#D9D5CE` | Hairlines, Karten-Ränder |
| Tinte | `#050102` | Text, warmes Schwarz |
| Core Green | `#9AB50D` | Akzent, *em*-Kursive, Bars, Live-Punkt |
| Mist Green | `#DFED93` | Receipt-Fläche, Pills |
| **Salbei** | `#55613A` | **eigene Aufhellung** von INCAs Dunkelgrün — Konsolen-Rahmen, Sektion 4 |
| Dunkelgrün | `#2F3512` | nur noch Sektion 7 (CTA) und kleine Artefakte |
| Signal-Orange | `#FF611B` | CTA-Pill, Warn-Zustände |
| Maroon | `#3B0619` | reject/danger |
| Muted | `#4A4A46` / `#7A7872` | Sekundärtext |

Typografie: **Instrument Serif** (Headlines, Kursiv-Betonungen in Core Green — freie Alternative zu Reckless Neue), **Inter** (Fließtext — Alternative zu Gerstner Programm), **JetBrains Mono** (Eyebrows, Stats, Konsole — identisch mit INCA). Display fluid per `clamp()`, `text-wrap: balance`, Tracking −2 % auf Display. Radii 4/8/12/20/28 px + Pill-Buttons `999px`. Schatten niedrig und warm.

Motion: IntersectionObserver-Reveals mit ~40 ms Stagger, Count-up-Stats (~1,4 s, ease-out), pulsierender Live-Punkt, tickende Uhr. Alles hinter `prefers-reduced-motion`-Guard.

## Tech-Architektur

- **Stack:** React 19 + TypeScript + Vite + Tailwind 4. One-Pager, **kein Router** — Anker-Navigation.
- **Hosting:** GitHub Pages (Repo `inca-site`, Deploy via GitHub Action auf Push). `<meta name="robots" content="noindex">`.
- **Daten eingebacken, kein Backend, kein API-Key:** Sync-Script `scripts/sync-data.py` kopiert beim Build aus den Quell-Repos nach `src/data/`:
  - `inca-claims-loop/data/fixtures/` + Eval-/Benchmark-Ergebnisse → Fälle, Auswertung, Benchmark
  - `inca-explore/web/agent_run.json` + `tool_layer.json` → Policy-Grounding-Sektion
  - Flotten-Daten (aus fleet.html-Quelle) → Projektgrid
  - Script bricht hart ab, wenn Quelldaten fehlen → Build schlägt fehl statt leere Sektion.
- **i18n:** `src/strings.ts` mit `de`/`en`-Objekten, Toggle in der Nav, persistiert in `localStorage`, setzt `<html lang>`. Keine i18n-Library. DE ist Default (wie bei INCA).
- **Komponenten:** `Nav`, `Hero`, `Console` (mit `CaseList`, `PipelineView`, `Receipt`, `AgentTrace`, `EvalTab`, `BenchmarkTab`), `Teardown`, `Grounding`, `Fleet`, `Fit` (mit `EasterEggReceipt`), `CtaFooter`. Jede Sektion eine Datei, Daten kommen typisiert aus `src/data/`.

## Stimme und Inhalt

- Register: respektvoll-warm, kein Sales-Deutsch. INCA wird per „ihr/euch" angesprochen (wie in TEARDOWN.md/SENDEN.md). EN-Fassung gleichwertig, nicht wörtlich übersetzt.
- Inhaltsquellen: TEARDOWN.md (Sektion 3), SENDEN.md (Ehrlichkeits-Formulierungen, Reality-Check-Frage), Projekt-READMEs (Sektion 5).
- Fachliche Korrektheit: 250+ Agenten = TPA-Pipeline, 140+ = Schadenquotenoptimierung — nicht verwechseln.

## Fehlerbehandlung

Statische Seite, Fehlerquellen sind Build-Zeit: fehlende Daten → Sync-Script bricht ab; TypeScript erzwingt Datenform. Laufzeit: Fonts mit System-Fallback (Georgia/Arial), Bilder/JSON sind gebundelt (kein Netzwerk-Fehlerpfad), localStorage-Zugriff in try/catch (Safari Private Mode).

## Qualitäts-Gates (Definition of Done)

1. `tsc --noEmit` sauber
2. `vite build` grün
3. Playwright-Durchklick im echten Browser: beide Sprachen, alle 3 Konsolen-Tabs, Fall-Klick mit Receipt, Easter Egg, alle Links (Mail, LinkedIn, GitHub)
4. Lighthouse-Sichtprüfung: schnell ladend trotz Fonts/Motion (Fonts subsetted/`display=swap`)
5. Mobile-Breakpoint geprüft (Konsole stapelt: Fall-Liste über Pipeline)

## Bewusst NICHT im Scope (YAGNI)

- Kein Router, kein Backend, keine Datenbank, kein API-Key-Eingabefeld auf der Seite
- Kein CMS — Texte leben in `strings.ts`
- Keine Analytics
- Kein Nachbau von INCAs Logo/Fotos/3D-Sphäre — nur Palette, Typo-Haltung, Layout-Rhythmus; Hommage-Fußnote macht es explizit
- Die „Bewerbung als Schadenfall"-Idee bleibt auf das kleine Easter Egg in Sektion 6 beschränkt
