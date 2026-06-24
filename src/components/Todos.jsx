import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Todos() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useApp()
  const [text, setText] = useState('')

  const submit = (e) => {
    e.preventDefault()
    addTodo(text)
    setText('')
  }

  const done = todos.filter((t) => t.done).length

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          ✅ My To-Do List
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Add your own custom tasks. Saved permanently in your browser.
        </p>
      </div>

      <form onSubmit={submit} className="glass flex gap-2 rounded-2xl p-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a custom task… (e.g. Email senior for referral)"
          className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-slate-100"
        />
        <button
          type="submit"
          className="accent-grad rounded-xl px-4 py-2 text-sm font-semibold transition-all hover:opacity-90"
        >
          + Add
        </button>
      </form>

      {todos.length > 0 && (
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {done}/{todos.length} done
        </p>
      )}

      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="glass rounded-2xl p-8 text-center text-sm text-slate-500 dark:text-slate-400">
            No custom tasks yet. Add your first one above! ✨
          </p>
        ) : (
          todos.map((t) => (
            <div
              key={t.id}
              className={`glass animate-fade-in flex items-center gap-3 rounded-xl px-4 py-3 ${
                t.done ? 'opacity-60' : ''
              }`}
            >
              <button
                onClick={() => toggleTodo(t.id)}
                className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 transition-all ${
                  t.done
                    ? 'accent-grad checkbox-pop border-transparent'
                    : 'border-slate-300 hover:border-neutral-900 dark:border-slate-500 dark:hover:border-white'
                }`}
              >
                {t.done && (
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.29 6.8-6.8a1 1 0 011.4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <span
                className={`flex-1 text-sm font-medium text-slate-800 dark:text-slate-100 ${
                  t.done ? 'line-through' : ''
                }`}
              >
                {t.text}
              </span>
              <button
                onClick={() => deleteTodo(t.id)}
                className="flex-none rounded-lg px-2 py-1 text-xs font-semibold text-neutral-500 transition-all hover:bg-black/10 hover:text-neutral-900 dark:hover:bg-white/10 dark:hover:text-white"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
