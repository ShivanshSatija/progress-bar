import { useApp } from '../context/AppContext'
import { PHASES, CATEGORY_META } from '../data/roadmap'
import DayCard from './DayCard'
import ProgressBar from './ProgressBar'
import MotivationCard from './MotivationCard'

export default function TodayView() {
  const { days, currentDay, completed } = useApp()
  const today = days[currentDay - 1]
  const tomorrow = currentDay < 90 ? days[currentDay] : null

  // ----- Weekly goal: the 7-day block containing today -----
  const weekStart = Math.floor((currentDay - 1) / 7) * 7 + 1
  const weekDays = days.slice(weekStart - 1, weekStart - 1 + 7)
  const weekStats = aggregate(weekDays, completed)
  const weekNum = Math.floor((currentDay - 1) / 7) + 1

  // ----- Monthly goal: the current phase block -----
  const phase = PHASES.find((p) => currentDay >= p.range[0] && currentDay <= p.range[1])
  const monthDays = days.slice(phase.range[0] - 1, phase.range[1])
  const monthStats = aggregate(monthDays, completed)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          ☀️ Today &amp; What&apos;s Next
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Your focused plan for right now. Finish today, then preview tomorrow.
        </p>
      </div>

      <section>
        <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-neutral-900 dark:bg-white" /> Today&apos;s Tasks
        </h3>
        {today && <DayCard dayObj={today} defaultOpen highlight />}
      </section>

      {tomorrow && (
        <section>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            🔮 Tomorrow&apos;s Tasks
          </h3>
          <DayCard dayObj={tomorrow} />
        </section>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <GoalCard
          title={`📈 Weekly Goal — Week ${weekNum}`}
          subtitle={`Day ${weekStart}–${Math.min(weekStart + 6, 90)}`}
          stats={weekStats}
        />
        <GoalCard
          title={`🏆 Monthly Goal — Month ${phase.month}`}
          subtitle={phase.name}
          stats={monthStats}
        />
      </div>

      <MotivationCard />
    </div>
  )
}

function aggregate(dayList, completed) {
  const cat = {}
  let total = 0
  let done = 0
  dayList.forEach((d) =>
    d.tasks.forEach((t) => {
      total++
      cat[t.category] = cat[t.category] || { total: 0, done: 0 }
      cat[t.category].total++
      if (completed[t.id]) {
        done++
        cat[t.category].done++
      }
    }),
  )
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0, cat }
}

function GoalCard({ title, subtitle, stats }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-white">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        <span className="text-2xl font-extrabold text-gradient">{stats.pct}%</span>
      </div>
      <div className="mt-3">
        <ProgressBar value={stats.pct} color="violet" height="h-2.5" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {Object.entries(stats.cat).map(([c, v]) => (
          <div
            key={c}
            className="flex items-center justify-between rounded-lg bg-white/40 px-3 py-1.5 text-xs dark:bg-white/5"
          >
            <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
              {CATEGORY_META[c]?.icon} {c}
            </span>
            <span className="font-bold text-slate-500 dark:text-slate-400">
              {v.done}/{v.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
