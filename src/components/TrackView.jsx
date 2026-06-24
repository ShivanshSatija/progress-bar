import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import { CATEGORY_META } from '../data/roadmap'
import { DSA_TOPIC_ORDER as DSA_ORDER } from '../data/dsaQuestions'
import TaskItem from './TaskItem'
import ProgressBar from './ProgressBar'

const HEADERS = {
  DSA: {
    title: 'DSA Roadmap',
    blurb:
      '~150 LeetCode problems in a structured Easy → Medium → Hard progression, ordered by topic from Arrays all the way to Dynamic Programming.',
    groupBy: 'topic',
    order: DSA_ORDER,
  },
  ML: {
    title: 'Machine Learning Roadmap',
    blurb:
      'SuperDataScience "Machine Learning A-Z" (Udemy): build, train & deploy ML, DL & AI models in AWS, Python & R — from data preprocessing through Deep Learning and a deployed capstone.',
    groupBy: 'track',
  },
  Aptitude: {
    title: 'Aptitude Roadmap',
    blurb:
      'Quantitative, Logical Reasoning & Verbal — practiced a little every day so it compounds before test season.',
    groupBy: 'track',
  },
  'Core CS': {
    title: 'Core CS Roadmap',
    blurb:
      'OOPs, DBMS, Operating Systems, Computer Networks & System Design basics — the theory interviewers love to probe.',
    groupBy: 'track',
  },
  Development: {
    title: 'Development Roadmap',
    blurb:
      'Git → Web fundamentals → React → Backend (Node, REST, MongoDB) → deploy a real full-stack project for your resume.',
    groupBy: 'track',
  },
  Placement: {
    title: 'Resume & Placement Preparation',
    blurb:
      'Resume, LinkedIn, GitHub polish, HR & behavioral prep, mock interviews and a steady stream of applications.',
    groupBy: 'track',
  },
}

export default function TrackView({ category }) {
  const { allTasks, stats } = useApp()
  const cfg = HEADERS[category]
  const meta = CATEGORY_META[category]
  const cstat = stats.categories[category]

  const groups = useMemo(() => {
    const items = allTasks.filter((t) => t.category === category)
    const by = {}
    items.forEach((t) => {
      const key = t[cfg.groupBy] || 'General'
      ;(by[key] = by[key] || []).push(t)
    })
    let keys = Object.keys(by)
    if (cfg.order) {
      keys = cfg.order.filter((k) => by[k]).concat(keys.filter((k) => !cfg.order.includes(k)))
    }
    return keys.map((k) => ({ key: k, items: by[k] }))
  }, [allTasks, category, cfg])

  return (
    <div className="space-y-5">
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${meta.color} p-6 text-white shadow-xl`}
      >
        <div className="pointer-events-none absolute -right-6 -top-6 text-[100px] opacity-20">
          {meta.icon}
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-white/70">Roadmap</p>
        <h2 className="mt-1 text-3xl font-extrabold">{cfg.title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/90">{cfg.blurb}</p>
        <div className="mt-4 max-w-md">
          <div className="mb-1 flex justify-between text-xs font-semibold">
            <span>
              {cstat.done}/{cstat.total} completed
            </span>
            <span>{cstat.pct}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white transition-all duration-1000"
              style={{ width: `${cstat.pct}%` }}
            />
          </div>
        </div>
      </div>

      {groups.map((g, i) => (
        <TopicGroup key={g.key} title={g.key} items={g.items} defaultOpen={i === 0} />
      ))}
    </div>
  )
}

function TopicGroup({ title, items, defaultOpen }) {
  const { isDone } = useApp()
  const [open, setOpen] = useState(defaultOpen)
  const done = items.filter((t) => isDone(t.id)).length
  const pct = Math.round((done / items.length) * 100)

  return (
    <div className="glass rounded-2xl p-4">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 text-left">
        <h3 className="flex-1 text-base font-bold text-slate-800 dark:text-white">{title}</h3>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {done}/{items.length}
        </span>
        <div className="w-24">
          <ProgressBar value={pct} color="violet" height="h-2" />
        </div>
        <svg
          className={`h-5 w-5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="mt-3 space-y-0.5 border-t border-white/30 pt-3 dark:border-white/10">
          {items.map((t) => (
            <TaskItem key={t.id} task={t} showDay />
          ))}
        </div>
      )}
    </div>
  )
}
