import { useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

// A lightweight OneNote-style notebook: many separate notes (pages), each with
// its own title and free-form body. Everything auto-saves to Local Storage.

const makeNote = (title = 'Untitled note', body = '') => ({
  id: `note-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  title,
  body,
  updated: Date.now(),
})

const INITIAL = () => [
  makeNote(
    'DSA Patterns 🧠',
    '• Sliding window: grow right, shrink left when the window is invalid\n• Two pointers: sort first, then converge from both ends\n• BFS for shortest path on unweighted graphs\n\n(Tip: make one note per topic — DSA, ML, Core CS, HR answers…)',
  ),
  makeNote(
    'ML Notes 🤖',
    '• Always split train/test BEFORE feature scaling\n• Regression metric: R²   |   Classification metric: confusion matrix\n• Overfitting → use k-Fold Cross Validation + regularization',
  ),
]

function fmt(ts) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(ts))
  } catch {
    return ''
  }
}

export default function Notes() {
  const [notes, setNotes] = useLocalStorage('pm.notebook', INITIAL)
  const [selectedId, setSelectedId] = useState(() => notes[0]?.id || null)
  const [query, setQuery] = useState('')

  // keep a valid selection
  useEffect(() => {
    if (notes.length === 0) {
      setSelectedId(null)
    } else if (!notes.find((n) => n.id === selectedId)) {
      setSelectedId(notes[0].id)
    }
  }, [notes, selectedId])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = [...notes].sort((a, b) => b.updated - a.updated)
    if (!q) return list
    return list.filter((n) => `${n.title} ${n.body}`.toLowerCase().includes(q))
  }, [notes, query])

  const selected = notes.find((n) => n.id === selectedId) || null

  const addNote = () => {
    const n = makeNote()
    setNotes((list) => [n, ...list])
    setSelectedId(n.id)
    setQuery('')
  }

  const updateSelected = (patch) =>
    setNotes((list) =>
      list.map((n) => (n.id === selectedId ? { ...n, ...patch, updated: Date.now() } : n)),
    )

  const deleteNote = (id) => {
    setNotes((list) => list.filter((n) => n.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">📝 My Notebook</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Keep separate notes per topic — like OneNote. Auto-saved in your browser.
          </p>
        </div>
        <button
          onClick={addNote}
          className="accent-grad rounded-xl px-4 py-2 text-sm font-semibold transition-all hover:opacity-90"
        >
          + New note
        </button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Note list */}
        <aside className="lg:w-72 lg:flex-none">
          <div className="glass rounded-2xl p-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 Search notes…"
              className="mb-2 w-full rounded-xl bg-black/5 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none dark:bg-white/10 dark:text-slate-100"
            />
            <div className="max-h-[60vh] space-y-1 overflow-y-auto">
              {filtered.length === 0 && (
                <p className="p-4 text-center text-xs text-slate-400">No notes found.</p>
              )}
              {filtered.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedId(n.id)}
                  className={`w-full rounded-xl px-3 py-2.5 text-left transition-all ${
                    n.id === selectedId
                      ? 'accent-grad'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <p
                    className={`truncate text-sm font-semibold ${
                      n.id === selectedId ? '' : 'text-slate-800 dark:text-slate-100'
                    }`}
                  >
                    {n.title || 'Untitled note'}
                  </p>
                  <p
                    className={`truncate text-[11px] ${
                      n.id === selectedId
                        ? 'opacity-70'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {n.body.replace(/\n/g, ' ').slice(0, 40) || 'Empty'} · {fmt(n.updated)}
                  </p>
                </button>
              ))}
            </div>
          </div>
          <p className="mt-2 px-1 text-[11px] text-slate-400">
            {notes.length} note{notes.length !== 1 ? 's' : ''}
          </p>
        </aside>

        {/* Editor */}
        <section className="min-w-0 flex-1">
          {selected ? (
            <div className="glass rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <input
                  value={selected.title}
                  onChange={(e) => updateSelected({ title: e.target.value })}
                  placeholder="Note title…"
                  className="flex-1 bg-transparent text-xl font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-white"
                />
                <button
                  onClick={() => deleteNote(selected.id)}
                  className="flex-none rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-500 transition-all hover:bg-black/10 hover:text-neutral-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  🗑 Delete
                </button>
              </div>
              <div className="my-3 h-px bg-black/10 dark:bg-white/10" />
              <textarea
                value={selected.body}
                onChange={(e) => updateSelected({ body: e.target.value })}
                placeholder={
                  'Start writing…\n\n• Use bullet points\n• Multiple lines & paragraphs\n• One note per topic'
                }
                className="min-h-[50vh] w-full resize-y bg-transparent font-mono text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-slate-100"
              />
              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Last edited {fmt(selected.updated)}</span>
                <span>
                  {selected.body.length} chars ·{' '}
                  {selected.body.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
            </div>
          ) : (
            <div className="glass flex min-h-[40vh] flex-col items-center justify-center rounded-2xl p-8 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No note selected. Create your first note ✨
              </p>
              <button
                onClick={addNote}
                className="accent-grad mt-4 rounded-xl px-4 py-2 text-sm font-semibold"
              >
                + New note
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
