import { useState } from 'react'
import { QUOTES } from '../data/quotes'
import { useApp } from '../context/AppContext'
import MotivationCard from './MotivationCard'

export default function Motivation() {
  const { favorites, toggleFavorite } = useApp()
  const [onlyFav, setOnlyFav] = useState(false)

  const list = onlyFav ? QUOTES.filter((q) => favorites[q]) : QUOTES

  return (
    <div className="space-y-6">
      <MotivationCard />

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">
          {QUOTES.length}+ Quotes to Keep You Going
        </h2>
        <button
          onClick={() => setOnlyFav((v) => !v)}
          className={`rounded-xl px-3 py-1.5 text-sm font-semibold transition-all ${
            onlyFav ? 'accent-grad' : 'glass text-slate-600 dark:text-slate-300'
          }`}
        >
          {onlyFav ? '★ Showing saved' : '☆ Show saved only'}
        </button>
      </div>

      {list.length === 0 ? (
        <p className="glass rounded-2xl p-8 text-center text-sm text-slate-500 dark:text-slate-400">
          No saved quotes yet. Tap ☆ on any quote to save it here.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((q, i) => {
            const fav = !!favorites[q]
            return (
              <div
                key={q}
                className="glass animate-fade-in group relative rounded-2xl p-5"
                style={{ animationDelay: `${(i % 12) * 30}ms` }}
              >
                <span className="text-3xl leading-none text-neutral-400/50 dark:text-neutral-500/50">“</span>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700 dark:text-slate-200">
                  {q}
                </p>
                <button
                  onClick={() => toggleFavorite(q)}
                  className={`absolute right-3 top-3 text-lg transition-all ${
                    fav
                      ? 'text-neutral-900 dark:text-white'
                      : 'text-slate-300 hover:text-neutral-700 dark:text-slate-600 dark:hover:text-neutral-200'
                  }`}
                  aria-label="Save quote"
                >
                  {fav ? '★' : '☆'}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
