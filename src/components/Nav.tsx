import { t } from '../strings'

const ANCHORS = ['konsole', 'teardown', 'grounding', 'flotte', 'fit', 'cta'] as const

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-hairline bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-3 lg:px-8">
        <a href="#top" className="font-mono text-sm tracking-[0.14em]">
          MIKEL <span className="text-core">×</span> INCA
        </a>
        <div className="hidden gap-6 md:flex">
          {ANCHORS.map((a) => (
            <a
              key={a}
              href={`#${a}`}
              className="font-mono text-xs uppercase tracking-[0.12em] text-muted hover:text-ink"
            >
              {t.nav[a]}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
