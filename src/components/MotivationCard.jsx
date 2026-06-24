import { useState } from 'react'
import { QUOTES } from '../data/quotes'
import { useApp } from '../context/AppContext'

export default function MotivationCard() {
  const { currentDay, favorites, toggleFavorite } = useApp()
  // Quote of the day is deterministic; the dice button shuffles.
  const [idx, setIdx] = useState(currentDay % QUOTES.length)
  const quote = QUOTES[idx]
  const fav = !!favorites[quote]

  const shuffle = () => {
    let n = idx
    while (n === idx) n = Math.floor(Math.random() * QUOTES.length)
    setIdx(n)
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black p-6 text-white shadow-xl ring-1 ring-white/10 sm:p-8">
      <div className="pointer-events-none absolute -bottom-8 -right-6 text-[120px] opacity-20">
        ”
      </div>
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 animate-float rounded-full bg-white/10 blur-2xl" />
      <p className="text-xs font-bold uppercase tracking-widest text-white/70">
        Daily Motivation
      </p>
      <blockquote className="relative mt-3 max-w-2xl text-xl font-bold leading-snug sm:text-2xl">
        “{quote}”
      </blockquote>
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={shuffle}
          className="rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur transition-all hover:bg-white/30"
        >
          🎲 New quote
        </button>
        <button
          onClick={() => toggleFavorite(quote)}
          className="rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur transition-all hover:bg-white/30"
        >
          {fav ? '★ Saved' : '☆ Save'}
        </button>
      </div>
    </div>
  )
}
