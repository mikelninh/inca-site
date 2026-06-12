import { useReveal } from '../motion'
import { t } from '../strings'

export default function Fit() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="fit" ref={ref} className="mx-auto max-w-[1320px] px-6 py-24 lg:px-8">
      <p className="eyebrow reveal">{t.fit.eyebrow}</p>
      <h2 className="reveal mt-3 text-4xl lg:text-5xl">
        {t.fit.titlePre}
        <em>{t.fit.titleEm}</em>
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {t.fit.points.map((p) => (
          <div key={p.title} className="reveal rounded-xl border border-hairline bg-white/50 p-6">
            <h3 className="text-xl">{p.title}</h3>
            <p className="mt-2 text-sm text-muted">{p.body}</p>
          </div>
        ))}
      </div>
      <div
        className="reveal mx-auto mt-12 max-w-md rounded-xl bg-mist p-4 font-mono text-xs text-darkgreen"
        data-testid="easter-egg"
      >
        <div>
          <span className="font-semibold text-core-deep">"claim_id"</span>: "MN-2026-001",
        </div>
        <div>
          <span className="font-semibold text-core-deep">"decision"</span>:{' '}
          <span className="text-signal-deep">"refer_to_human"</span>,
        </div>
        <div>
          <span className="font-semibold text-core-deep">"why"</span>: ["{t.fit.easterEggWhy}"],
        </div>
        <div>
          <span className="font-semibold text-core-deep">"blocked_actions"</span>: []
        </div>
      </div>
    </section>
  )
}
