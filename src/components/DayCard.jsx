import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { formatDate, CATEGORY_META } from '../data/roadmap'
import TaskItem from './TaskItem'
import ProgressBar from './ProgressBar'

const SECTIONS = [
  { key: 'dsa', label: 'DSA', cat: 'DSA' },
  { key: 'ml', label: 'Machine Learning', cat: 'ML' },
  { key: 'coreCS', label: 'Core CS', cat: 'Core CS' },
  { key: 'aptitude', label: 'Aptitude', cat: 'Aptitude' },
  { key: 'development', label: 'Development', cat: 'Development' },
  { key: 'placement', label: 'Placement', cat: 'Placement' },
]

export default function DayCard({ dayObj, defaultOpen = false, highlight = false }) {
  const { dayProgress, setDayComplete, currentDay } = useApp()
  const [open, setOpen] = useState(defaultOpen)
  const pct = dayProgress(dayObj)
  const allDone = pct === 100
  const isToday = dayObj.day === currentDay

  return (
    <div
      className={`glass animate-fade-in rounded-2xl p-4 sm:p-5 ${
        highlight || isToday ? 'ring-2 ring-black/20 dark:ring-white/30' : ''
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 text-left"
      >
        <div className="accent-grad flex h-14 w-14 flex-none flex-col items-center justify-center rounded-xl shadow-lg">

          <span className="text-[9px] font-semibold uppercase opacity-80">Day</span>
          <span className="text-xl font-extrabold leading-none">{dayObj.day}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              {formatDate(dayObj.date)}
            </h3>
            {isToday && (
              <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-black">
                TODAY
              </span>
            )}
            <span className="rounded-full bg-white/50 px-2 py-0.5 text-[10px] font-semibold text-slate-600 ring-1 ring-black/5 dark:bg-white/10 dark:text-slate-300">
              ⏱ {dayObj.estHours}h · {dayObj.weekend ? 'Weekend' : 'Weekday'}
            </span>
            {allDone && (
              <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-bold text-neutral-700 dark:bg-white/15 dark:text-neutral-200">
                ✓ DONE
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
            {dayObj.focus}
          </p>
        </div>

        <div className="hidden w-32 flex-none sm:block">
          <ProgressBar value={pct} color="violet" height="h-2" />
          <p className="mt-1 text-right text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {pct}% complete
          </p>
        </div>

        <svg
          className={`h-5 w-5 flex-none text-slate-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Mobile progress */}
      <div className="mt-3 sm:hidden">
        <ProgressBar value={pct} color="violet" height="h-2" />
      </div>

      {/* Body */}
      {open && (
        <div className="mt-4 space-y-4 border-t border-white/30 pt-4 dark:border-white/10">
          {SECTIONS.map((s) => {
            const items = dayObj[s.key]
            if (!items || items.length === 0) return null
            return (
              <div key={s.key}>
                <div className="mb-1 flex items-center gap-2 px-1">
                  <span>{CATEGORY_META[s.cat].icon}</span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {s.label}
                  </h4>
                </div>
                <div className="space-y-0.5">
                  {items.map((t) => (
                    <TaskItem key={t.id} task={t} />
                  ))}
                </div>
              </div>
            )
          })}

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Total time today: <strong>{dayObj.estHours} hours</strong> ·{' '}
              {dayObj.tasks.length} tasks
            </span>
            <button
              onClick={() => setDayComplete(dayObj, !allDone)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                allDone
                  ? 'bg-white/60 text-slate-600 ring-1 ring-black/5 hover:bg-white/80 dark:bg-white/10 dark:text-slate-300'
                  : 'accent-grad hover:opacity-90'
              }`}
            >
              {allDone ? 'Mark day incomplete' : 'Mark all done ✓'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
