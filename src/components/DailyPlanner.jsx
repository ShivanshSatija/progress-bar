import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import { PHASES } from '../data/roadmap'
import DayCard from './DayCard'

export default function DailyPlanner() {
  const { days, currentDay, dayProgress } = useApp()
  const [month, setMonth] = useState(0) // 0 = all
  const [filter, setFilter] = useState('all') // all | done | pending

  const filtered = useMemo(() => {
    return days.filter((d) => {
      if (month !== 0 && d.month !== month) return false
      const pct = dayProgress(d)
      if (filter === 'done' && pct !== 100) return false
      if (filter === 'pending' && pct === 100) return false
      return true
    })
  }, [days, month, filter, dayProgress])

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          📅 90-Day Daily Planner
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Every day from Day 1 to Day 90 has a concrete plan. Tap a day to expand.
        </p>
      </div>

      {/* Filters */}
      <div className="glass flex flex-wrap items-center gap-2 rounded-2xl p-3">
        <Chip active={month === 0} onClick={() => setMonth(0)}>
          All 90 days
        </Chip>
        {PHASES.map((p) => (
          <Chip key={p.month} active={month === p.month} onClick={() => setMonth(p.month)}>
            Month {p.month}: {p.name}
          </Chip>
        ))}
        <span className="mx-1 h-5 w-px bg-slate-300/50 dark:bg-white/10" />
        <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
          All
        </Chip>
        <Chip active={filter === 'pending'} onClick={() => setFilter('pending')}>
          Pending
        </Chip>
        <Chip active={filter === 'done'} onClick={() => setFilter('done')}>
          Completed
        </Chip>
      </div>

      <div className="space-y-3">
        {filtered.map((d) => (
          <DayCard key={d.day} dayObj={d} defaultOpen={d.day === currentDay} />
        ))}
        {filtered.length === 0 && (
          <p className="glass rounded-2xl p-8 text-center text-sm text-slate-500 dark:text-slate-400">
            No days match this filter.
          </p>
        )}
      </div>
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
        active
          ? 'accent-grad shadow'
          : 'bg-white/50 text-slate-600 hover:bg-white/80 dark:bg-white/10 dark:text-slate-300'
      }`}
    >
      {children}
    </button>
  )
}
