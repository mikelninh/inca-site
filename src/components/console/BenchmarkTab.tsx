import { useState } from 'react'
import { useLang } from '../../i18n'
import type { BenchmarkVersion, LoopData } from '../../types'

function VersionCard({ v, prompt }: { v: BenchmarkVersion; prompt: string }) {
  const { t } = useLang()
  const [showPrompt, setShowPrompt] = useState(false)
  return (
    <div className="flex-1 rounded-xl bg-cream p-4">
      <p className="font-serif text-lg">{v.label}</p>
      <p className="text-xs text-muted">{v.note}</p>
      <dl className="mt-3 space-y-1 font-mono text-xs">
        {Object.entries(v.metrics).map(([k, val]) => (
          <div key={k} className="flex justify-between">
            <dt className="text-muted">{k}</dt>
            <dd className="tabular-nums">{(val * 100).toFixed(1)}%</dd>
          </div>
        ))}
      </dl>
      <button
        onClick={() => setShowPrompt(!showPrompt)}
        className="mt-3 font-mono text-[11px] underline underline-offset-2"
      >
        {showPrompt ? '▾' : '▸'} {t.console.benchmark.showPrompt}
      </button>
      {showPrompt && (
        <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded bg-softwhite p-2 text-[10px]">
          {prompt}
        </pre>
      )}
    </div>
  )
}

export default function BenchmarkTab({ data }: { data: LoopData }) {
  const b = data.benchmark
  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row">
        <VersionCard v={b.versions.v1} prompt={b.prompts.v1} />
        <VersionCard v={b.versions.v2} prompt={b.prompts.v2} />
      </div>
      <p className="mt-4 rounded-lg bg-cream/10 p-3 font-mono text-[11px] text-mist/80">
        ⚠ {b.disclaimer}
      </p>
    </div>
  )
}
