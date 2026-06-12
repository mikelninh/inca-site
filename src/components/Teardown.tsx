import { useLang } from '../i18n'
import { useReveal } from '../motion'
import Expandable from './Expandable'

export default function Teardown() {
  const { lang, t } = useLang()
  const ref = useReveal<HTMLElement>(lang)
  const [first, second, ...rest] = t.teardown.breaks
  return (
    <section id="teardown" ref={ref} className="mx-auto max-w-[1320px] px-6 py-24 lg:px-8">
      <p className="eyebrow reveal">{t.teardown.eyebrow}</p>
      <h2 className="reveal mt-3 max-w-2xl text-4xl lg:text-5xl">
        {t.teardown.titlePre}
        <em>{t.teardown.titleEm}</em>
      </h2>
      <p className="reveal mt-5 max-w-2xl text-muted">{t.teardown.intro}</p>
      <div className="reveal mt-12 overflow-x-auto">
        <div className="flex min-w-[720px] items-end border-b border-hairline pb-4">
          {t.teardown.pipeline.map((p, i) => (
            <div key={p.step} className={`flex-1 px-2 ${i % 2 ? 'pt-8' : ''}`}>
              <p className="font-mono text-2xl text-core-deep tabular-nums">{p.agents}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                {p.step}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-2 font-mono text-[11px] text-faint">{t.teardown.pipelineNote}</p>
      </div>
      <h3 className="reveal mt-14 text-2xl">{t.teardown.breaksTitle}</h3>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {[first, second].map((b) => (
          <div key={b.title} className="reveal rounded-xl border border-hairline bg-white/50 p-6">
            <h3 className="text-xl">{b.title}</h3>
            <p className="mt-2 text-sm text-muted">{b.body}</p>
          </div>
        ))}
      </div>
      <Expandable more={t.teardown.breaksMore} less={t.teardown.breaksLess}>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((b) => (
            <div key={b.title} className="rounded-xl border border-hairline bg-white/50 p-6">
              <h3 className="text-xl">{b.title}</h3>
              <p className="mt-2 text-sm text-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </Expandable>
      <div className="reveal mt-10 rounded-xl border-l-4 border-core bg-mist/30 p-6">
        <h3 className="text-xl">{t.teardown.first.title}</h3>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {t.teardown.first.points.map((p) => (
            <div key={p.title}>
              <p className="font-medium">{p.title}</p>
              <p className="mt-1 text-sm text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
