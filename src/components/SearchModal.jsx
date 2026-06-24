import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../context/AppContext'
import { CATEGORY_META } from '../data/roadmap'
import TaskItem from './TaskItem'

export default function SearchModal({ open, onClose }) {
  const { allTasks } = useApp()
  const [q, setQ] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQ('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return []
    return allTasks
      .filter((t) => {
        const hay = `${t.name || ''} ${t.topic || ''} ${t.track || ''} ${t.category} ${t.difficulty || ''}`.toLowerCase()
        return hay.includes(term)
      })
      .slice(0, 60)
  }, [q, allTasks])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[10vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-strong w-full max-w-2xl rounded-2xl p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 rounded-xl bg-white/60 px-4 py-3 ring-1 ring-black/5 dark:bg-white/10">
          <span className="text-lg">🔍</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search problems, topics, tracks… (e.g. 'graph', 'SQL', 'resume')"
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-slate-100"
          />
          <kbd className="rounded bg-black/10 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-400">
            ESC
          </kbd>
        </div>

        <div className="mt-3 max-h-[55vh] overflow-y-auto">
          {q.trim() === '' ? (
            <p className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Type to search across all 90 days of tasks.
            </p>
          ) : results.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
              No matches for “{q}”.
            </p>
          ) : (
            <>
              <p className="px-1 pb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              <div className="space-y-0.5">
                {results.map((t) => (
                  <TaskItem key={`${t.id}-search`} task={t} showDay />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
