import { useApp } from '../context/AppContext'
import { CATEGORY_META, difficultyColor } from '../data/roadmap'

// A single completable task row. Works for every category. DSA tasks render a
// difficulty pill + an external LeetCode link.
export default function TaskItem({ task, showDay = false }) {
  const { isDone, toggleTask } = useApp()
  const done = isDone(task.id)
  const meta = CATEGORY_META[task.category]

  const title = task.category === 'DSA' ? task.name : task.topic

  return (
    <div
      className={`group flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all hover:border-white/40 hover:bg-white/40 dark:hover:bg-white/5 ${
        done ? 'opacity-60' : ''
      }`}
    >
      <button
        onClick={() => toggleTask(task.id)}
        aria-label={done ? 'Mark incomplete' : 'Mark complete'}
        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 transition-all ${
          done
            ? 'accent-grad checkbox-pop border-transparent'
            : 'border-slate-300 hover:border-neutral-900 dark:border-slate-500 dark:hover:border-white'
        }`}
      >
        {done && (
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.29 6.8-6.8a1 1 0 011.4 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {showDay && task.day && (
            <span className="rounded-md bg-black/10 px-1.5 py-0.5 text-[10px] font-bold text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
              Day {task.day}
            </span>
          )}
          <span className="text-[10px]" title={task.category}>
            {meta?.icon}
          </span>
          <span
            className={`text-sm font-medium text-slate-800 dark:text-slate-100 ${
              done ? 'line-through' : ''
            }`}
          >
            {title}
          </span>
          {task.difficulty && (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ring-1 ${difficultyColor(
                task.difficulty,
              )}`}
            >
              {task.difficulty}
            </span>
          )}
        </div>
        {task.track && task.category !== 'DSA' && (
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {task.category} · {task.track}
          </span>
        )}
        {task.topic && task.category === 'DSA' && (
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            DSA · {task.topic}
          </span>
        )}
      </div>

      {task.url && (
        <a
          href={task.url}
          target="_blank"
          rel="noreferrer"
          className="flex-none rounded-lg bg-white/60 px-2.5 py-1 text-xs font-semibold text-neutral-700 opacity-0 ring-1 ring-black/10 transition-all hover:bg-neutral-900 hover:text-white group-hover:opacity-100 dark:bg-white/10 dark:text-neutral-200 dark:ring-white/15 dark:hover:bg-white dark:hover:text-black"
        >
          Solve ↗
        </a>
      )}
    </div>
  )
}
