import { useLang } from '../i18n'
import { useReveal } from '../motion'

export default function Loop() {
  const { lang, t } = useLang()
  const ref = useReveal<HTMLElement>(lang)
  return (
    <section ref={ref} className="border-y border-hairline bg-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-14 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="reveal text-2xl lg:text-3xl">{t.loop.title}</h2>
          <p className="reveal font-mono text-xs uppercase tracking-[0.14em] text-core-deep">
            {t.loop.motto}
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.loop.steps.map((s, i) => (
            <div key={s.t} className="reveal flex gap-3">
              <span className="font-mono text-2xl text-core tabular-nums">{i + 1}</span>
              <div>
                <p className="font-serif text-xl">{s.t}</p>
                <p className="mt-1 text-sm text-muted">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
