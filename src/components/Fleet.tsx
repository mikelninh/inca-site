import fleetJson from '../data/fleet.json'
import { useReveal } from '../motion'
import { t } from '../strings'
import type { FleetData } from '../types'

const fleet = fleetJson as unknown as FleetData

export default function Fleet() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="flotte" ref={ref} className="mx-auto max-w-[1320px] px-6 py-24 lg:px-8">
      <p className="eyebrow reveal">{t.fleet.eyebrow}</p>
      <h2 className="reveal mt-3 text-4xl lg:text-5xl">
        {t.fleet.titlePre}
        <em>{t.fleet.titleEm}</em>
      </h2>
      <p className="reveal mt-5 max-w-2xl text-muted">{t.fleet.intro}</p>
      {fleet.groups.map((g, gi) => (
        <div key={g.title} className="mt-12">
          <h3 className={`text-2xl ${gi === 0 ? '' : 'text-muted'}`}>{g.title}</h3>
          <p className="text-sm text-faint">{g.subtitle}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.tools.map((tool) => (
              <div
                key={tool.name}
                className={`reveal rounded-xl border p-5 ${
                  gi === 0 ? 'border-core/40 bg-white/60' : 'border-hairline bg-white/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl">{tool.name}</h4>
                  {gi === 0 && <span className="live-dot" />}
                </div>
                <p className="mt-1 text-sm text-muted">{tool.oneliner}</p>
                {tool.sample && (
                  <p className="mt-3 overflow-x-auto rounded bg-softwhite p-2 font-mono text-[10px] text-muted">
                    {tool.sample}
                  </p>
                )}
                <p className="mt-3 font-mono text-[11px] text-faint">
                  {tool.tests ? `${tool.tests} ${t.fleet.tests}` : ''}
                  {tool.tests && tool.tools_count ? ' · ' : ''}
                  {tool.tools_count ? `${tool.tools_count} ${t.fleet.tools}` : ''}
                  {tool.deployed ? (
                    <>
                      {(tool.tests || tool.tools_count) && ' · '}
                      <a
                        href={`https://${tool.deployed}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-core-deep underline underline-offset-2"
                      >
                        {tool.deployed}
                      </a>
                    </>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="reveal mt-8 font-mono text-[11px] text-faint">{fleet.note}</p>
    </section>
  )
}
