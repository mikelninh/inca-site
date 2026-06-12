import { useLang } from '../i18n'
import { useReveal } from '../motion'

export default function Werkstatt() {
  const { lang, t } = useLang()
  const ref = useReveal<HTMLElement>(lang)
  return (
    <section id="werkstatt" ref={ref} className="bg-softwhite py-24">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <p className="eyebrow reveal">{t.werkstatt.eyebrow}</p>
        <h2 className="reveal mt-3 max-w-2xl text-4xl lg:text-5xl">
          {t.werkstatt.titlePre}
          <em>{t.werkstatt.titleEm}</em>
        </h2>
        <p className="reveal mt-5 max-w-2xl text-muted">{t.werkstatt.intro}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.werkstatt.steps.map((s) => (
            <div key={s.title} className="reveal rounded-xl border border-hairline bg-white/60 p-6">
              <h3 className="text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </div>
          ))}
          <div className="reveal rounded-xl bg-darkgreen p-6 text-cream">
            <h3 className="text-lg text-mist">{t.werkstatt.learnTitle}</h3>
            <p className="mt-2 text-sm text-mist/80">{t.werkstatt.learnIntro}</p>
            <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-mist/90">
              {t.werkstatt.learn.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
