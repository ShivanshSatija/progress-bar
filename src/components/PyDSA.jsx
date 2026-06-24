import { useMemo, useState } from 'react'
import { DSA_QUESTIONS, DSA_TOPIC_ORDER } from '../data/dsaQuestions'
import { PY_SOLUTIONS } from '../data/pySolutions'
import { difficultyColor } from '../data/roadmap'

// Reference section: every DSA question + its optimal Python solution.
const slugOf = (q) => q.id.replace(/^dsa-/, '')

export default function PyDSA() {
  const [query, setQuery] = useState('')

  // Only real questions that have a solution, grouped by topic order.
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    const byTopic = {}
    DSA_QUESTIONS.forEach((item) => {
      const sol = PY_SOLUTIONS[slugOf(item)]
      if (!sol) return
      if (q && !`${item.name} ${item.topic} ${item.difficulty}`.toLowerCase().includes(q)) return
      ;(byTopic[item.topic] = byTopic[item.topic] || []).push({ ...item, sol })
    })
    return DSA_TOPIC_ORDER.filter((t) => byTopic[t]).map((t) => ({ topic: t, items: byTopic[t] }))
  }, [query])

  const total = useMemo(
    () => DSA_QUESTIONS.filter((q) => PY_SOLUTIONS[slugOf(q)]).length,
    [],
  )

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black p-6 text-white shadow-xl ring-1 ring-white/10">
        <div className="pointer-events-none absolute -right-6 -top-6 text-[100px] opacity-20">🐍</div>
        <p className="text-xs font-bold uppercase tracking-widest text-white/70">Reference</p>
        <h2 className="mt-1 text-3xl font-extrabold">Py DSA — Solutions</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/90">
          All {total} DSA questions from your roadmap, each with an optimal Python solution,
          approach &amp; time/space complexity. Tap a topic to expand.
        </p>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Search a problem… (e.g. 'two sum', 'graph', 'dp')"
        className="w-full rounded-2xl bg-white/60 px-4 py-3 text-sm text-slate-800 ring-1 ring-black/5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:bg-white/10 dark:text-slate-100 dark:focus:ring-white"
      />

      {groups.length === 0 ? (
        <p className="glass rounded-2xl p-8 text-center text-sm text-slate-500 dark:text-slate-400">
          No problems match “{query}”.
        </p>
      ) : (
        groups.map((g, i) => (
          <TopicGroup
            key={g.topic}
            topic={g.topic}
            items={g.items}
            defaultOpen={i === 0}
            forceOpen={!!query}
          />
        ))
      )}
    </div>
  )
}

function TopicGroup({ topic, items, defaultOpen, forceOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  const isOpen = open || forceOpen
  return (
    <div className="glass rounded-2xl p-4">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 text-left">
        <h3 className="flex-1 text-base font-bold text-slate-800 dark:text-white">{topic}</h3>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {items.length} problem{items.length !== 1 ? 's' : ''}
        </span>
        <svg
          className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-3 space-y-3 border-t border-white/30 pt-3 dark:border-white/10">
          {items.map((q) => (
            <Solution key={q.id} q={q} />
          ))}
        </div>
      )}
    </div>
  )
}

function Solution({ q }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(q.sol.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="rounded-xl bg-black/[0.03] p-3 ring-1 ring-black/5 dark:bg-white/[0.03] dark:ring-white/10">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-slate-800 dark:text-white">{q.name}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ring-1 ${difficultyColor(
            q.difficulty,
          )}`}
        >
          {q.difficulty}
        </span>
        <a
          href={q.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-white/60 px-2 py-0.5 text-[11px] font-semibold text-neutral-700 ring-1 ring-black/10 transition-all hover:bg-neutral-900 hover:text-white dark:bg-white/10 dark:text-neutral-200 dark:ring-white/15 dark:hover:bg-white dark:hover:text-black"
        >
          LeetCode ↗
        </a>
      </div>

      {q.sol.approach && (
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
          <span className="font-semibold">Approach:</span> {q.sol.approach}
        </p>
      )}
      {q.sol.complexity && (
        <p className="mt-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          ⏱ {q.sol.complexity}
        </p>
      )}

      <div className="relative mt-2">
        <button
          onClick={copy}
          className="absolute right-2 top-2 z-10 rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold text-neutral-200 ring-1 ring-white/15 transition-all hover:bg-white/20"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <pre className="overflow-x-auto rounded-lg bg-neutral-950 p-4 text-[12.5px] leading-relaxed text-neutral-100 ring-1 ring-white/10">
          <code className="font-mono whitespace-pre">{q.sol.code}</code>
        </pre>
      </div>
    </div>
  )
}
