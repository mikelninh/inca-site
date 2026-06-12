const de = {
  nav: {
    konsole: 'Konsole',
    teardown: 'Teardown',
    grounding: 'Grounding',
    flotte: 'Flotte',
    fit: 'Fit',
    cta: 'Kontakt',
  },
  hero: {
    eyebrow: 'BEWERBUNG · AI OPERATIONS · BERLIN',
    eyebrowShort: 'AI OPERATIONS · BERLIN',
    titlePre: 'Eine Bewerbung, ',
    titleEm: 'die man anfassen kann.',
    sub: 'Ich kenne euren Schadenloop nur von außen. Also habe ich ihn nachgebaut: drei Agenten, ein Receipt pro Fall, ein Eval-Harness. Wo er bei euch in der Realität bricht — darüber will ich reden.',
    cta: 'Mit Mikel sprechen',
    secondary: 'Erst anfassen, dann urteilen ↓',
    repo: 'Code: github.com/mikelninh/inca-site',
  },
  interstitial: { pre: 'Nicht erzählt. ', em: 'Gebaut.' },
  console: {
    header: 'LOOP · OFFLINE-FIXTURES · DETERMINISTISCH',
    tabs: { faelle: 'Fälle', auswertung: 'Auswertung', benchmark: 'Benchmark' },
    caption: 'Der Code, nicht das Modell, trifft die Entscheidung.',
    breakBadge: '⚠ bricht bewusst',
    receiptHint: 'Receipt — jede Entscheidung nachvollziehbar',
    traceToggle: 'Agent-Trace aufklappen',
    evalDisclaimer: 'Handgeschriebene Fixtures — gezeigt wird die Methode, nicht Modellgüte.',
    evalWink: 'Ihr habt 180.000+ Schäden bearbeitet. Ich habe acht. Dafür kenne ich jeden persönlich.',
    eval: {
      accuracy: 'Entscheidungs-Genauigkeit',
      fraudRecall: 'Fraud-Recall',
      fraudPrecision: 'Fraud-Precision',
      autoShare: 'Dunkel-Quote',
    },
    benchmark: {
      showPrompt: 'Prompt lesen',
      disclaimer:
        'Selbsttest auf synthetischen Fixtures — die Differenz v1→v2 ist projiziert, nicht gemessen. Echte Zahlen: --live mit Key.',
    },
  },
  teardown: {
    eyebrow: 'TEARDOWN',
    titlePre: 'Wie ich ',
    titleEm: 'euren Loop lese.',
    intro:
      'Quellenlage, ehrlich: eure Website, das Stellenprofil, öffentliche Interviews — der Rest ist Hypothese. So lese ich es: zwei Produkte auf einer Plattform, beide dieselbe Schleife. Der Punkt, den ihr selbst benennt — Regulierungsqualität schlägt Dunkelquote — ist genau der, auf den ich das Demo gebaut habe.',
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
  grounding: {
    eyebrow: 'POLICY GROUNDING',
    titlePre: 'Keine Klausel ',
    titleEm: 'aus dem Modellgedächtnis.',
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
    intro: 'Echte Tests, echte Beispiel-Outputs — Status und Zahlen aus Code-Sichtung.',
    deNote: '',
    tests: 'Tests',
    tools: 'Tools',
    moreGroups: 'Mehr zeigen: teilweise fahrbar & Fundament',
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
    learnTitle: 'Was ich von euch lernen will',
    learnIntro:
      'Die Methode steht. Die Skalierungs-Narben holt man sich nur im Maschinenraum. Drei erste Fragen:',
    learn: [
      'Wie triagiert ihr Edge-Cases bei echtem Volumen — wer entscheidet, welcher von 250+ Agenten ein Update bekommt?',
      'Wie haltet ihr so viele Prompts im Team konsistent — Ownership, Review, Regressionsschutz?',
      'Was hat euch der Weg von der Demo zu 180.000 Schäden über Evals gelehrt, das in keinem Paper steht?',
    ],
    mail: 'Mail an Mikel',
    linkedin: 'LinkedIn',
    homage: 'Inoffizielle Bewerbungsseite — Design als Hommage an inca / ochi.design.',
  },
}

const en: typeof de = {
  nav: {
    konsole: 'Console',
    teardown: 'Teardown',
    grounding: 'Grounding',
    flotte: 'Fleet',
    fit: 'Fit',
    cta: 'Contact',
  },
  hero: {
    eyebrow: 'APPLICATION · AI OPERATIONS · BERLIN',
    eyebrowShort: 'AI OPERATIONS · BERLIN',
    titlePre: 'A job application ',
    titleEm: 'you can poke at.',
    sub: 'I only know your claims loop from the outside. So I rebuilt it: three agents, a receipt per claim, an eval harness. Where it breaks in your reality — that is what I want to talk about.',
    cta: 'Talk to Mikel',
    secondary: 'play first, judge later ↓',
    repo: 'Code: github.com/mikelninh/inca-site',
  },
  interstitial: { pre: 'Not told. ', em: 'Built.' },
  console: {
    header: 'LOOP · OFFLINE FIXTURES · DETERMINISTIC',
    tabs: { faelle: 'Cases', auswertung: 'Evaluation', benchmark: 'Benchmark' },
    caption: 'The code, not the model, makes the decision.',
    breakBadge: '⚠ breaks on purpose',
    receiptHint: 'Receipt — every decision traceable',
    traceToggle: 'expand agent trace',
    evalDisclaimer: 'Hand-written fixtures — this shows the method, not model quality.',
    evalWink: "You have processed 180,000+ claims. I have eight. Then again, I know each of mine personally.",
    eval: {
      accuracy: 'decision accuracy',
      fraudRecall: 'fraud recall',
      fraudPrecision: 'fraud precision',
      autoShare: 'auto-resolved share',
    },
    benchmark: {
      showPrompt: 'read the prompt',
      disclaimer:
        'Self-test on synthetic fixtures — the v1→v2 delta is projected, not measured. Real numbers: --live with a key.',
    },
  },
  teardown: {
    eyebrow: 'TEARDOWN',
    titlePre: 'How I read ',
    titleEm: 'your loop.',
    intro:
      'My sources, honestly: your website, the job ad, public interviews — the rest is hypothesis. This is how I read it: two products on one platform, both the same loop. The point you name yourselves — settlement quality beats auto-resolution rate — is exactly what I built the demo around.',
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
  grounding: {
    eyebrow: 'POLICY GROUNDING',
    titlePre: 'No clause ',
    titleEm: 'from model memory.',
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
    intro: 'Real tests, real sample outputs — status and numbers from actual code review.',
    deNote: 'Tool descriptions are in German — the sources are German-language projects.',
    tests: 'tests',
    tools: 'tools',
    moreGroups: 'Show more: partly running & foundations',
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
    learnTitle: 'What I want to learn from you',
    learnIntro:
      'The method is in place. Scaling scars you only earn in the engine room. Three first questions:',
    learn: [
      'How do you triage edge cases at real volume — who decides which of 250+ agents gets an update?',
      'How do you keep that many prompts consistent across a team — ownership, review, regression protection?',
      'What did the road from demo to 180,000 claims teach you about evals that is in no paper?',
    ],
    mail: 'Email Mikel',
    linkedin: 'LinkedIn',
    homage: 'Unofficial application page — the design is an homage to inca / ochi.design.',
  },
}

export const strings = { de, en }
export type Lang = keyof typeof strings
