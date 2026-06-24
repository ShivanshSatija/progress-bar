import { useApp } from '../context/AppContext'
import ProgressBar, { ProgressRing } from './ProgressBar'
import { CATEGORIES, CATEGORY_META, PHASES } from '../data/roadmap'
import MotivationCard from './MotivationCard'

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="glass animate-fade-in rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/5 text-xl ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{value}</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
        </div>
      </div>
      {sub && <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">{sub}</p>}
    </div>
  )
}

export default function Dashboard() {
  const { stats, currentDay, streak, days } = useApp()
  const phase = PHASES.find((p) => currentDay >= p.range[0] && currentDay <= p.range[1])
  const daysLeft = 90 - currentDay

  const readinessLabel =
    stats.readiness >= 80
      ? 'Interview Ready 🔥'
      : stats.readiness >= 50
      ? 'On Track 💪'
      : stats.readiness >= 25
      ? 'Building Momentum 🚀'
      : 'Just Getting Started 🌱'

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-black/5 blur-2xl dark:bg-white/10" />
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {phase?.name} · Month {phase?.month}
            </p>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-800 dark:text-white sm:text-4xl">
              Day <span className="text-gradient">{currentDay}</span> of 90
            </h1>
            <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
              {daysLeft > 0
                ? `${daysLeft} days left to your offer letter. Keep the streak alive!`
                : 'Mission complete — go get that offer! 🎉'}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              <span className="rounded-full bg-black/5 px-3 py-1 text-sm font-bold text-neutral-700 ring-1 ring-black/5 dark:bg-white/10 dark:text-neutral-200 dark:ring-white/10">
                🔥 {streak}-day streak
              </span>
              <span className="rounded-full bg-black/5 px-3 py-1 text-sm font-bold text-neutral-700 ring-1 ring-black/5 dark:bg-white/10 dark:text-neutral-200 dark:ring-white/10">
                ✅ {stats.done}/{stats.total} tasks
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <ProgressRing value={stats.overall} label="Overall" />
          </div>
        </div>
      </div>

      {/* Readiness + quick stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="glass animate-fade-in col-span-2 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Placement Readiness Score
              </p>
              <p className="mt-1 text-4xl font-extrabold text-gradient">{stats.readiness}</p>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                {readinessLabel}
              </p>
            </div>
            <div className="text-5xl">🎯</div>
          </div>
          <div className="mt-3">
            <ProgressBar value={stats.readiness} color="pink" height="h-3" />
          </div>
        </div>

        <StatCard icon="🔥" label="Current Streak" value={`${streak}d`} accent="amber" />
        <StatCard
          icon="📅"
          label="Days Remaining"
          value={Math.max(0, daysLeft)}
          accent="indigo"
        />
      </div>

      {/* Category progress */}
      <div className="glass rounded-2xl p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-slate-800 dark:text-white">
          Track Progress
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {CATEGORIES.map((cat) => {
            const c = stats.categories[cat]
            return (
              <div key={cat}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <span>{CATEGORY_META[cat].icon}</span> {cat}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {c.done}/{c.total} · {c.pct}%
                  </span>
                </div>
                <ProgressBar value={c.pct} color={CATEGORY_META[cat].accent} height="h-2.5" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Phase timeline */}
      <div className="grid gap-4 sm:grid-cols-3">
        {PHASES.map((p) => {
          const active = currentDay >= p.range[0] && currentDay <= p.range[1]
          const passed = currentDay > p.range[1]
          return (
            <div
              key={p.month}
              className={`glass rounded-2xl p-4 transition-all ${
                active ? 'ring-2 ring-black/20 dark:ring-white/30' : ''
              }`}
            >
              <div
                className={`accent-grad mb-2 inline-block rounded-lg px-2.5 py-1 text-xs font-bold`}
              >
                Month {p.month}
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">{p.name}</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Day {p.range[0]}–{p.range[1]}
              </p>
              <p className="mt-2 text-xs font-semibold">
                {passed ? (
                  <span className="text-neutral-800 dark:text-neutral-100">Completed ✓</span>
                ) : active ? (
                  <span className="text-neutral-600 dark:text-neutral-300">In progress…</span>
                ) : (
                  <span className="text-slate-400">Upcoming</span>
                )}
              </p>
            </div>
          )
        })}
      </div>

      <MotivationCard />
    </div>
  )
}
