const de = {
  nav: {
    konsole: 'Konsole',
    teardown: 'Teardown',
    werkstatt: 'Werkstatt',
    grounding: 'Grounding',
    flotte: 'Flotte',
    fit: 'Fit',
    cta: 'Kontakt',
  },
  hero: {
    eyebrow: 'BEWERBUNG · AI OPERATIONS · BERLIN',
    titlePre: 'Euer Loop, ',
    titleEm: 'einmal selbst gebaut.',
    sub: 'Ich habe mir euren Schadenloop angeschaut — und einen kleinen, ehrlichen Mini-Loop dazu gebaut. Drei Agenten, ein Receipt pro Fall, ein Eval-Harness. Diese Seite lässt euch alles anfassen.',
    cta: 'Mit Mikel sprechen',
    secondary: '5 Minuten durchklicken ↓',
  },
  loop: {
    title: 'Hinter allem steckt dieselbe Schleife.',
    steps: [
      { t: 'Aufnehmen', d: 'Fall, Daten, Belege strukturiert erfassen.' },
      { t: 'Prüfen', d: 'Deckung, Risiko, Plausibilität bewerten.' },
      { t: 'Entscheiden', d: 'Code entscheidet, sperrt das Riskante.' },
      { t: 'Belegen', d: 'Receipt: Quellen, Konfidenz, was geblockt wurde.' },
    ],
    motto: 'Nicht erzählt. Gebaut.',
  },
  console: {
    header: 'LOOP · OFFLINE-FIXTURES · DETERMINISTISCH',
    tabs: { faelle: 'Fälle', auswertung: 'Auswertung', benchmark: 'Benchmark' },
    caption: 'Der Code, nicht das Modell, trifft die Entscheidung.',
    breakBadge: '⚠ bricht bewusst',
    receiptHint: 'Receipt — jede Entscheidung nachvollziehbar',
    traceToggle: 'Agent-Trace aufklappen',
    evalDisclaimer:
      'Zahlen aus handgeschriebenen Fixtures — sie zeigen, was der Harness misst, nicht Modellgüte.',
    evalWink: 'Ihr habt 180.000+ Schäden bearbeitet. Ich habe acht. Dafür kenne ich jeden persönlich.',
    eval: {
      accuracy: 'Entscheidungs-Genauigkeit',
      fraudRecall: 'Fraud-Recall',
      fraudPrecision: 'Fraud-Precision',
      autoShare: 'Dunkel-Quote',
    },
    benchmark: { showPrompt: 'Prompt lesen' },
  },
  teardown: {
    eyebrow: 'TEARDOWN',
    titlePre: 'Wie ich ',
    titleEm: 'euren Loop lese.',
    intro:
      'Zwei Produkte auf einer Plattform, beide dieselbe Schleife: Ende-zu-Ende-Bearbeitung in 24h und Schadenquotenoptimierung als Prüf-Layer. Der KI-First-Anspruch steht und fällt mit einem Punkt, den ihr selbst benennt: Dunkelverarbeitungsquote ist nicht die wichtigste Kennzahl — Regulierungsqualität ist es. Genau darauf habe ich das Demo gebaut.',
    pipeline: [
      { step: 'FNOL & Reserve', agents: 18 },
      { step: 'Deckung & Haftung', agents: 12 },
      { step: 'Kommunikation', agents: 24 },
      { step: 'Regress', agents: 29 },
      { step: 'Rechnung & Gutachten', agents: 63 },
      { step: 'Betrugsprüfung', agents: 42 },
      { step: 'Finale Prüfung', agents: 8 },
    ],
    pipelineNote:
      'MARS routet jeden Fall durch 250+ KI-Agenten — die 140+ der Schadenquotenoptimierung sind die Prüfdisziplinen daraus.',
    breaksTitle: 'Wo es in der Realität bricht',
    breaksMore: 'Alle 5 Bruchstellen zeigen',
    breaksLess: 'Einklappen',
    breaks: [
      {
        title: 'Der Prompt, der in der Demo läuft, aber nicht über 10.000 Schäden',
        body: 'Ein Agent, der bei einem Fall sauber urteilt, driftet über die Verteilung: andere Sparte, knappe FNOL, widersprüchliche Belege. Ohne Eval-Set mit Ground-Truth sieht man den Drift erst in der Reklamation.',
      },
      {
        title: 'Unterschätzte Betrugssignale werden zu stiller Dunkelverarbeitung',
        body: 'Der teuerste Fehler ist nicht der False Positive (kostet Bearbeitungszeit), sondern der False Negative, der automatisch reguliert wird. Eine hohe Dunkelquote versteckt genau diese Fälle. Im Demo bewusst als ein verpasstes Signal abgebildet — der Harness macht ihn sichtbar.',
      },
      {
        title: 'Fehlende Angaben ≠ Ablehnung',
        body: 'Unvollständige FNOL (kein Aktenzeichen, kein Datum) muss zu einer Rückfrage oder Übergabe führen, nicht zu einer falschen Auto-Entscheidung. Das ist eine Routing-Frage, keine Modell-Frage.',
      },
      {
        title: 'DAX-Versicherer-Qualitätsbar bei Kundenkommunikation',
        body: 'Jede generierte Nachricht an den VN ist Außenwirkung des Versicherers. Hier ist „flawless" kein Vibe — es braucht messbare Gates und Review-Queues.',
      },
      {
        title: 'AVB-Heterogenität',
        body: 'Jeder Versicherer hat eigene Bedingungen. Deckungslogik muss aus dem mitgelieferten Vertragsauszug entscheiden, nicht aus Modellwissen — sonst halluziniert sie Klauseln, die im konkreten Vertrag nicht stehen.',
      },
    ],
    first: {
      title: 'Wo ich zuerst ansetzen würde',
      points: [
        {
          title: 'Eval-Harness als erstes Bürgerrecht',
          body: 'Bevor ein Prompt produktiv geht: ein Ground-Truth-Set pro Sparte, das Regulierungsqualität, Betrugs-Recall/Precision und Falsch-Positiv-Rate misst. Jede Prompt-Änderung wird daran gemessen, nicht am Bauchgefühl.',
        },
        {
          title: 'Receipt als Standard, nicht als Nice-to-have',
          body: 'Pro Fall: Quellen, Konfidenz, geblockte Aktionen, manuelle Verifikationspunkte. Gleichzeitig Auditierbarkeit (EU AI Act / DORA), Trainingsdatensatz für die Expert:innen und Vertrauensanker gegenüber dem Versicherer.',
        },
        {
          title: 'Risiko bleibt am Menschen — by design',
          body: 'Betrugsverdacht und Großschaden laufen nie durch den Autopiloten. Das senkt die Dunkelquote bewusst und erhöht die Qualität — der richtige Trade in einer regulierten Branche.',
        },
        {
          title: 'Den teuersten Fehler zuerst jagen',
          body: 'Recall auf echten Betrugsfällen vor Dunkelquote. Ein zusätzlicher Indizien-Agent plus Severity-Kalibrierung schließt die Lücke — und der Harness beweist, ob es geholfen hat.',
        },
      ],
    },
  },
  werkstatt: {
    eyebrow: 'WERKSTATT',
    titlePre: 'Wie bei mir ein ',
    titleEm: 'neuer Agent entsteht.',
    intro:
      'Kein Geheimnis, eher ein Handwerk — und oben in der Konsole könnt ihr jeden Schritt anfassen.',
    steps: [
      {
        title: '1 · Erst die Fälle, dann der Agent',
        body: 'Bevor es einen Prompt gibt, gibt es ein handgeschriebenes Ground-Truth-Set — inklusive der Fälle, an denen es brechen soll. Die acht Fälle oben sind genau so entstanden.',
      },
      {
        title: '2 · Schema vor Prosa',
        body: 'Structured Output definiert, was der Agent überhaupt sagen darf. Der Code entscheidet, das Modell liefert Einschätzungen — nie umgekehrt.',
      },
      {
        title: '3 · Eval ab Tag eins',
        body: 'Jede Prompt-Änderung läuft gegen denselben Bestand. Der Benchmark-Tab oben ist kein Feature, sondern mein normaler Arbeitsschritt.',
      },
      {
        title: '4 · Receipt, oder es ist nicht passiert',
        body: 'Quellen, Konfidenz, geblockte Aktionen, offene Fragen — pro Fall. Was sich nicht belegen lässt, wird nicht behauptet.',
      },
      {
        title: '5 · Autonomie zuletzt',
        body: 'Erst wenn der Recall auf dem teuersten Fehler stimmt, fällt eine menschliche Schranke. Nicht vorher, egal wie gut die Demo aussieht.',
      },
    ],
    learnTitle: 'Was ich von euch lernen will',
    learnIntro:
      'Ehrlich: Die Methode steht, die Skalierungs-Narben fehlen noch. Die holt man sich nur im Maschinenraum. Meine drei ersten Fragen an euch:',
    learn: [
      'Wie triagiert ihr Edge-Cases bei echtem Volumen — wer entscheidet, welcher von 250+ Agenten ein Update bekommt?',
      'Wie haltet ihr so viele Prompts im Team konsistent — Ownership, Review, Regressionsschutz?',
      'Was hat euch der Weg von der Demo zu 180.000 Schäden über Evals gelehrt, das in keinem Paper steht?',
    ],
  },
  grounding: {
    eyebrow: 'POLICY GROUNDING',
    titlePre: 'GitLaw für ',
    titleEm: 'Versicherungsverträge.',
    intro:
      'Nicht „was denkt das Modell?", sondern „welche Klausel trägt die Entscheidung?". Mein GitLaw-MCP verifiziert Rechtszitate gegen 5.942 echte Gesetze — dieselbe Mechanik, die eure Deckungsprüfung zitierfest machen würde.',
    toolTitle: 'Die Tool-Schicht — echte Aufrufe, key-frei reproduzierbar',
    agentTitle: 'Der Agent-Lauf',
    agentNotRun:
      'Hier steht bewusst kein erfundener Chat: Der Agent-Lauf erscheint erst, wenn er wirklich gelaufen ist.',
    verified: 'verifiziert',
    notVerified: 'nicht verifiziert',
  },
  fleet: {
    eyebrow: 'FLOTTE',
    titlePre: 'Was sonst noch ',
    titleEm: 'fährt.',
    intro:
      'Ehrlich gerankt: echte Tests, echte Beispiel-Outputs, kein Vaporware-Grid. Status und Zahlen stammen aus echter Code-Sichtung.',
    deNote: '',
    tests: 'Tests',
    tools: 'Tools',
    moreGroups: 'Auch das Ehrliche zeigen: teilweise fahrbar & Fundament',
    lessGroups: 'Einklappen',
  },
  fit: {
    eyebrow: 'FIT',
    titlePre: 'Warum INCA, ',
    titleEm: 'warum ich.',
    points: [
      {
        title: 'Berlin, sofort',
        body: 'Vor Ort, deutschsprachig, DSGVO im Reflex — Legal-Tech für deutsche Nutzer baue ich seit Jahren.',
      },
      {
        title: 'Loop-Denke',
        body: 'Receipt, Eval, Benchmark — nicht weil es im Stellenprofil steht, sondern weil ich es für meine eigenen Projekte so baue.',
      },
      {
        title: 'Founder-Tempo',
        body: 'Fünf Projekte parallel geshippt: Scope klein schneiden, ehrlich messen, nachziehen.',
      },
    ],
    egg: {
      why: 'Gespräch empfohlen',
      fraudSignal: 'mag Eval-Harnesses — verdächtig glaubwürdig',
      blocked: 'überverkaufen',
      uncertainty: 'startet gelegentlich zu viele Projekte parallel',
    },
  },
  cta: {
    title: 'Mit Mikel ',
    titleEm: 'sprechen.',
    sub: 'Mir ist weniger wichtig, ob das beeindruckt, als ob es auf eurem Operator-Niveau standhält. Wo bricht so etwas bei euch in der Realität?',
    mail: 'Mail an Mikel',
    linkedin: 'LinkedIn',
    homage: 'Inoffizielle Bewerbungsseite — Design als Hommage an inca / ochi.design.',
  },
}

const en: typeof de = {
  nav: {
    konsole: 'Console',
    teardown: 'Teardown',
    werkstatt: 'Workshop',
    grounding: 'Grounding',
    flotte: 'Fleet',
    fit: 'Fit',
    cta: 'Contact',
  },
  hero: {
    eyebrow: 'APPLICATION · AI OPERATIONS · BERLIN',
    titlePre: 'Your loop, ',
    titleEm: 'built once myself.',
    sub: 'I studied your claims loop — and built a small, honest mini-loop of my own. Three agents, a receipt per claim, an eval harness. This page lets you touch all of it.',
    cta: 'Talk to Mikel',
    secondary: 'click through in 5 minutes ↓',
  },
  loop: {
    title: 'Behind everything sits the same loop.',
    steps: [
      { t: 'Intake', d: 'Capture the claim, data and evidence — structured.' },
      { t: 'Assess', d: 'Coverage, risk, plausibility.' },
      { t: 'Decide', d: 'Code decides, blocks the risky parts.' },
      { t: 'Prove', d: 'Receipt: sources, confidence, what was blocked.' },
    ],
    motto: 'Not told. Built.',
  },
  console: {
    header: 'LOOP · OFFLINE FIXTURES · DETERMINISTIC',
    tabs: { faelle: 'Cases', auswertung: 'Evaluation', benchmark: 'Benchmark' },
    caption: 'The code, not the model, makes the decision.',
    breakBadge: '⚠ breaks on purpose',
    receiptHint: 'Receipt — every decision traceable',
    traceToggle: 'expand agent trace',
    evalDisclaimer:
      'Numbers come from hand-written fixtures — they show what the harness measures, not model quality.',
    evalWink: "You have processed 180,000+ claims. I have eight. Then again, I know each of mine personally.",
    eval: {
      accuracy: 'decision accuracy',
      fraudRecall: 'fraud recall',
      fraudPrecision: 'fraud precision',
      autoShare: 'auto-resolved share',
    },
    benchmark: { showPrompt: 'read the prompt' },
  },
  teardown: {
    eyebrow: 'TEARDOWN',
    titlePre: 'How I read ',
    titleEm: 'your loop.',
    intro:
      'Two products on one platform, both the same loop: end-to-end processing in 24h and loss-ratio optimisation as a verification layer. The AI-first claim stands or falls with a point you name yourselves: the auto-resolution rate is not the metric that matters — settlement quality is. That is exactly what I built the demo around.',
    pipeline: [
      { step: 'FNOL & reserve', agents: 18 },
      { step: 'Coverage & liability', agents: 12 },
      { step: 'Communication', agents: 24 },
      { step: 'Recourse', agents: 29 },
      { step: 'Invoice & appraisal', agents: 63 },
      { step: 'Fraud check', agents: 42 },
      { step: 'Final review', agents: 8 },
    ],
    pipelineNote:
      'MARS routes every claim through 250+ AI agents — the 140+ of the loss-ratio product are its verification disciplines.',
    breaksTitle: 'Where it breaks in reality',
    breaksMore: 'Show all 5 breaking points',
    breaksLess: 'Collapse',
    breaks: [
      {
        title: 'The prompt that works in the demo but not across 10,000 claims',
        body: 'An agent that judges one case cleanly drifts across the distribution: a different line of business, a terse FNOL, contradictory evidence. Without an eval set with ground truth, you only see the drift in the complaint.',
      },
      {
        title: 'Underrated fraud signals become silent auto-resolution',
        body: 'The most expensive error is not the false positive (it costs handling time) but the false negative that gets settled automatically. A high auto-resolution rate hides exactly these cases. The demo deliberately contains one missed signal — the harness makes it visible.',
      },
      {
        title: 'Missing information ≠ rejection',
        body: 'An incomplete FNOL (no case number, no date) must lead to a follow-up question or a handover, not to a wrong automatic decision. That is a routing question, not a model question.',
      },
      {
        title: 'DAX-insurer quality bar for customer communication',
        body: 'Every generated message to the policyholder is the insurer speaking in public. "Flawless" is not a vibe here — it needs measurable gates and review queues.',
      },
      {
        title: 'Policy heterogeneity',
        body: 'Every insurer has its own terms. Coverage logic must decide from the contract excerpt that was provided, not from model knowledge — otherwise it hallucinates clauses that are not in the actual contract.',
      },
    ],
    first: {
      title: 'Where I would start',
      points: [
        {
          title: 'An eval harness as the first civil right',
          body: 'Before a prompt goes to production: a ground-truth set per line of business measuring settlement quality, fraud recall/precision and false-positive rate. Every prompt change is measured against it — not against gut feeling.',
        },
        {
          title: 'Receipts as the standard, not a nice-to-have',
          body: 'Per claim: sources, confidence, blocked actions, manual verification points. That is auditability (EU AI Act / DORA), a training corpus for the experts, and a trust anchor towards the insurer — all at once.',
        },
        {
          title: 'Risk stays with humans — by design',
          body: 'Suspected fraud and large losses never ride the autopilot. That deliberately lowers the auto-resolution rate and raises quality — the right trade in a regulated industry.',
        },
        {
          title: 'Hunt the most expensive error first',
          body: 'Recall on real fraud cases before auto-resolution rate. An additional evidence agent plus severity calibration closes the gap — and the harness proves whether it helped.',
        },
      ],
    },
  },
  werkstatt: {
    eyebrow: 'WORKSHOP',
    titlePre: 'How a ',
    titleEm: 'new agent is born here.',
    intro: 'No secret, more of a craft — and in the console above you can touch every step.',
    steps: [
      {
        title: '1 · Cases first, agent second',
        body: 'Before there is a prompt, there is a hand-written ground-truth set — including the cases it is supposed to break on. The eight cases above came to life exactly this way.',
      },
      {
        title: '2 · Schema before prose',
        body: 'Structured output defines what the agent is allowed to say at all. The code decides, the model contributes assessments — never the other way round.',
      },
      {
        title: '3 · Evals from day one',
        body: 'Every prompt change runs against the same corpus. The benchmark tab above is not a feature, it is my normal working step.',
      },
      {
        title: '4 · Receipt, or it did not happen',
        body: 'Sources, confidence, blocked actions, open questions — per claim. What cannot be proven is not claimed.',
      },
      {
        title: '5 · Autonomy last',
        body: 'Only when recall on the most expensive error holds does a human gate come down. Not earlier, however good the demo looks.',
      },
    ],
    learnTitle: 'What I want to learn from you',
    learnIntro:
      'Honestly: the method is in place, the scaling scars are still missing. You only earn those in the engine room. My first three questions for you:',
    learn: [
      'How do you triage edge cases at real volume — who decides which of 250+ agents gets an update?',
      'How do you keep that many prompts consistent across a team — ownership, review, regression protection?',
      'What did the road from demo to 180,000 claims teach you about evals that is in no paper?',
    ],
  },
  grounding: {
    eyebrow: 'POLICY GROUNDING',
    titlePre: 'GitLaw for ',
    titleEm: 'insurance contracts.',
    intro:
      'Not "what does the model think?" but "which clause supports the decision?". My GitLaw MCP verifies legal citations against 5,942 real statutes — the same mechanics that would make your coverage checks citation-proof.',
    toolTitle: 'The tool layer — real calls, reproducible without a key',
    agentTitle: 'The agent run',
    agentNotRun:
      'Deliberately no invented chat here: the agent run only appears once it has actually run.',
    verified: 'verified',
    notVerified: 'not verified',
  },
  fleet: {
    eyebrow: 'FLEET',
    titlePre: 'What else is ',
    titleEm: 'running.',
    intro:
      'Honestly ranked: real tests, real sample outputs, no vaporware grid. Status and numbers come from actual code review.',
    deNote: 'Tool descriptions are in German — the sources are German-language projects.',
    tests: 'tests',
    tools: 'tools',
    moreGroups: 'Show the honest part too: partly running & foundations',
    lessGroups: 'Collapse',
  },
  fit: {
    eyebrow: 'FIT',
    titlePre: 'Why INCA, ',
    titleEm: 'why me.',
    points: [
      {
        title: 'Berlin, now',
        body: 'On site, German-speaking, GDPR as a reflex — I have been building legal tech for German users for years.',
      },
      {
        title: 'Loop thinking',
        body: 'Receipt, eval, benchmark — not because the job ad says so, but because that is how I build my own projects.',
      },
      {
        title: 'Founder pace',
        body: 'Shipped five projects in parallel: cut scope small, measure honestly, iterate.',
      },
    ],
    egg: {
      why: 'conversation recommended',
      fraudSignal: 'claims to enjoy eval harnesses — suspiciously credible',
      blocked: 'overselling',
      uncertainty: 'occasionally starts too many projects in parallel',
    },
  },
  cta: {
    title: 'Talk to ',
    titleEm: 'Mikel.',
    sub: 'I care less about whether this impresses you than whether it holds up at your operator level. Where does something like this break in your reality?',
    mail: 'Email Mikel',
    linkedin: 'LinkedIn',
    homage: 'Unofficial application page — the design is an homage to inca / ochi.design.',
  },
}

export const strings = { de, en }
export type Lang = keyof typeof strings
