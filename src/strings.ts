// Alle Seitentexte zentral — falls später EN dazukommt, hier verzweigen.
export const t = {
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
    evalDisclaimer:
      'Zahlen aus handgeschriebenen Fixtures — sie zeigen, was der Harness misst, nicht Modellgüte.',
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
    tests: 'Tests',
    tools: 'Tools',
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
    easterEggWhy: 'Gespräch empfohlen',
  },
  cta: {
    title: 'Mit Mikel ',
    titleEm: 'sprechen.',
    sub: 'Mir ist weniger wichtig, ob das beeindruckt, als ob es auf eurem Operator-Niveau standhält. Wo bricht so etwas bei euch in der Realität?',
    mail: 'Mail an Mikel',
    linkedin: 'LinkedIn',
    homage: 'Inoffizielle Bewerbungsseite — Design als Hommage an inca / ochi.design.',
  },
} as const
