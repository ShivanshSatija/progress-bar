import { useEffect, useState } from 'react'

// Minimalist monochrome: inverts with theme (black fill on light, white on dark).
// All keys map to the same neutral gradient so existing callers keep working.
const MONO = 'from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400'
const GRADIENTS = {
  indigo: MONO,
  emerald: MONO,
  amber: MONO,
  cyan: MONO,
  pink: MONO,
  violet: MONO,
}

// Animated, shimmering progress bar that eases to its value on mount/update.
export default function ProgressBar({
  value = 0,
  color = 'violet',
  height = 'h-3',
  showLabel = false,
  label,
}) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = requestAnimationFrame(() => setWidth(value))
    return () => cancelAnimationFrame(t)
  }, [value])

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600 dark:text-slate-300">{label}</span>
          <span className="text-slate-700 dark:text-slate-100">{value}%</span>
        </div>
      )}
      <div
        className={`relative w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10 ${height}`}
      >
        <div
          className={`relative h-full rounded-full bg-gradient-to-r ${
            GRADIENTS[color] || GRADIENTS.violet
          } shimmer transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

// Circular progress ring (used on the dashboard hero).
export function ProgressRing({ value = 0, size = 160, stroke = 14, label }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const t = requestAnimationFrame(() => setV(value))
    return () => cancelAnimationFrame(t)
  }, [value])

  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (v / 100) * c

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="-rotate-90 text-neutral-900 dark:text-white"
      >
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-slate-200 dark:stroke-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke="url(#ringGrad)"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-extrabold text-gradient">{value}%</span>
        {label && (
          <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
