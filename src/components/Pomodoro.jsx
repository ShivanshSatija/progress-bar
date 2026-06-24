import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const MODES = {
  focus: { label: 'Focus', emoji: '🎯' },
  short: { label: 'Short Break', emoji: '☕' },
  long: { label: 'Long Break', emoji: '🌿' },
}

const todayISO = () => new Date().toISOString().slice(0, 10)

function beep() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ctx = new Ctx()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.connect(g)
    g.connect(ctx.destination)
    o.type = 'sine'
    o.frequency.value = 880
    g.gain.setValueAtTime(0.0001, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7)
    o.start()
    o.stop(ctx.currentTime + 0.72)
  } catch (e) {
    /* audio not available */
  }
}

const fmt = (s) => {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function Pomodoro() {
  const [settings, setSettings] = useLocalStorage('pomo.settings', {
    focus: 25,
    short: 5,
    long: 15,
    longEvery: 4,
    autoStart: false,
    sound: true,
  })
  const [stats, setStats] = useLocalStorage('pomo.stats', {
    date: todayISO(),
    sessions: 0,
    minutes: 0,
    total: 0,
  })
  const [focusTask, setFocusTask] = useLocalStorage('pomo.task', '')

  const [mode, setMode] = useState('focus')
  const [secondsLeft, setSecondsLeft] = useState(settings.focus * 60)
  const [running, setRunning] = useState(false)
  const [cycle, setCycle] = useState(0) // completed focus sessions in current set

  // refs so the interval/completion logic always sees fresh values
  const endRef = useRef(0)
  const modeRef = useRef(mode)
  const settingsRef = useRef(settings)
  const cycleRef = useRef(cycle)
  useEffect(() => {
    modeRef.current = mode
  }, [mode])
  useEffect(() => {
    settingsRef.current = settings
  }, [settings])
  useEffect(() => {
    cycleRef.current = cycle
  }, [cycle])

  const total = settings[mode] * 60
  const progress = total > 0 ? ((total - secondsLeft) / total) * 100 : 0

  // keep timer synced when durations change while paused
  useEffect(() => {
    if (!running) setSecondsLeft(settings[mode] * 60)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.focus, settings.short, settings.long, mode])

  const bumpStats = useCallback(() => {
    setStats((s) => {
      const fresh = s.date === todayISO() ? s : { date: todayISO(), sessions: 0, minutes: 0, total: s.total || 0 }
      return {
        ...fresh,
        sessions: fresh.sessions + 1,
        minutes: fresh.minutes + settingsRef.current.focus,
        total: (fresh.total || 0) + 1,
      }
    })
  }, [setStats])

  const switchMode = useCallback((m, autoStart = false) => {
    setRunning(false)
    setMode(m)
    setSecondsLeft(settingsRef.current[m] * 60)
    if (autoStart) setTimeout(() => setRunning(true), 400)
  }, [])

  const advance = useCallback(
    (counted) => {
      if (modeRef.current === 'focus') {
        if (counted) bumpStats()
        const nc = cycleRef.current + 1
        setCycle(nc)
        const next = nc % settingsRef.current.longEvery === 0 ? 'long' : 'short'
        switchMode(next, settingsRef.current.autoStart && counted)
      } else {
        switchMode('focus', settingsRef.current.autoStart && counted)
      }
    },
    [bumpStats, switchMode],
  )

  const advanceRef = useRef(advance)
  useEffect(() => {
    advanceRef.current = advance
  }, [advance])

  // the ticking interval
  useEffect(() => {
    if (!running) return
    endRef.current = Date.now() + secondsLeft * 1000
    const id = setInterval(() => {
      const remaining = Math.round((endRef.current - Date.now()) / 1000)
      if (remaining <= 0) {
        clearInterval(id)
        setSecondsLeft(0)
        if (settingsRef.current.sound) beep()
        notify(modeRef.current)
        advanceRef.current(true)
      } else {
        setSecondsLeft(remaining)
      }
    }, 250)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  // live countdown in the browser tab title
  useEffect(() => {
    if (running) document.title = `${fmt(secondsLeft)} • ${MODES[mode].label}`
    else document.title = '90-Day Placement Mission 🚀'
    return () => {
      document.title = '90-Day Placement Mission 🚀'
    }
  }, [running, secondsLeft, mode])

  const start = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    setRunning(true)
  }
  const pause = () => setRunning(false)
  const reset = () => {
    setRunning(false)
    setSecondsLeft(settings[mode] * 60)
  }

  const isToday = stats.date === todayISO()
  const todaySessions = isToday ? stats.sessions : 0
  const todayMinutes = isToday ? stats.minutes : 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">⏱️ Pomodoro Timer</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Focus in deep 25-minute sprints, take short breaks, repeat. Your sessions are saved.
        </p>
      </div>

      {/* Mode tabs */}
      <div className="glass flex flex-wrap gap-2 rounded-2xl p-2">
        {Object.entries(MODES).map(([key, m]) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
              mode === key
                ? 'accent-grad shadow'
                : 'text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5'
            }`}
          >
            {m.emoji} {m.label}
          </button>
        ))}
      </div>

      {/* Timer */}
      <div className="glass-strong flex flex-col items-center rounded-3xl p-8">
        <TimerRing progress={progress} time={fmt(secondsLeft)} label={MODES[mode].label} />

        {/* cycle dots */}
        <div className="mt-5 flex items-center gap-2">
          {Array.from({ length: settings.longEvery }).map((_, i) => (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                i < cycle % settings.longEvery
                  ? 'bg-neutral-900 dark:bg-white'
                  : 'bg-neutral-300 dark:bg-white/20'
              }`}
            />
          ))}
          <span className="ml-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            {cycle} focus done
          </span>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center gap-3">
          {!running ? (
            <button
              onClick={start}
              className="accent-grad rounded-xl px-8 py-3 text-base font-bold shadow-lg transition-all hover:opacity-90"
            >
              ▶ Start
            </button>
          ) : (
            <button
              onClick={pause}
              className="accent-grad rounded-xl px-8 py-3 text-base font-bold shadow-lg transition-all hover:opacity-90"
            >
              ⏸ Pause
            </button>
          )}
          <button
            onClick={reset}
            className="rounded-xl bg-black/5 px-4 py-3 text-sm font-semibold text-slate-600 ring-1 ring-black/5 transition-all hover:bg-black/10 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/20"
          >
            ↺ Reset
          </button>
          <button
            onClick={() => advance(false)}
            className="rounded-xl bg-black/5 px-4 py-3 text-sm font-semibold text-slate-600 ring-1 ring-black/5 transition-all hover:bg-black/10 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/20"
          >
            ⏭ Skip
          </button>
        </div>

        {/* Focus task */}
        <input
          value={focusTask}
          onChange={(e) => setFocusTask(e.target.value)}
          placeholder="What are you focusing on? (e.g. Solve Two Sum + Maximum Subarray)"
          className="mt-6 w-full max-w-md rounded-xl bg-black/5 px-4 py-2.5 text-center text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:bg-white/10 dark:text-slate-100 dark:focus:ring-white"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatBox emoji="✅" value={todaySessions} label="Sessions today" />
        <StatBox emoji="⏳" value={`${todayMinutes}m`} label="Focused today" />
        <StatBox emoji="🏆" value={stats.total || 0} label="All-time sessions" />
      </div>

      {/* Settings */}
      <div className="glass rounded-2xl p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Timer Settings
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stepper
            label="Focus (min)"
            value={settings.focus}
            min={5}
            max={60}
            step={5}
            onChange={(v) => setSettings((s) => ({ ...s, focus: v }))}
          />
          <Stepper
            label="Short break"
            value={settings.short}
            min={1}
            max={30}
            step={1}
            onChange={(v) => setSettings((s) => ({ ...s, short: v }))}
          />
          <Stepper
            label="Long break"
            value={settings.long}
            min={5}
            max={45}
            step={5}
            onChange={(v) => setSettings((s) => ({ ...s, long: v }))}
          />
          <Stepper
            label="Long break every"
            value={settings.longEvery}
            min={2}
            max={8}
            step={1}
            onChange={(v) => setSettings((s) => ({ ...s, longEvery: v }))}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Toggle
            checked={settings.autoStart}
            onChange={(v) => setSettings((s) => ({ ...s, autoStart: v }))}
            label="Auto-start next session"
          />
          <Toggle
            checked={settings.sound}
            onChange={(v) => setSettings((s) => ({ ...s, sound: v }))}
            label="Sound when timer ends 🔔"
          />
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">
        Tip: 1 focus block ≈ 1–2 LeetCode problems. Stack 4 blocks → take a long break → repeat. 🔁
      </p>
    </div>
  )
}

function TimerRing({ progress, time, label }) {
  const size = 240
  const stroke = 16
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (progress / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 text-neutral-900 dark:text-white">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-neutral-200 dark:stroke-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke="currentColor"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s linear' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-5xl font-extrabold tabular-nums text-slate-800 dark:text-white">
          {time}
        </span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>
    </div>
  )
}

function StatBox({ emoji, value, label }) {
  return (
    <div className="glass rounded-2xl p-4 text-center">
      <div className="text-2xl">{emoji}</div>
      <div className="mt-1 text-2xl font-extrabold text-slate-800 dark:text-white">{value}</div>
      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  )
}

function Stepper({ label, value, min, max, step, onChange }) {
  const dec = () => onChange(Math.max(min, value - step))
  const inc = () => onChange(Math.min(max, value + step))
  return (
    <div>
      <p className="mb-1 text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</p>
      <div className="flex items-center gap-2">
        <button
          onClick={dec}
          className="h-9 w-9 rounded-lg bg-black/5 text-lg font-bold text-slate-700 ring-1 ring-black/5 transition-all hover:bg-black/10 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/20"
        >
          −
        </button>
        <span className="min-w-[2.5rem] text-center text-lg font-bold text-slate-800 dark:text-white">
          {value}
        </span>
        <button
          onClick={inc}
          className="h-9 w-9 rounded-lg bg-black/5 text-lg font-bold text-slate-700 ring-1 ring-black/5 transition-all hover:bg-black/10 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/20"
        >
          +
        </button>
      </div>
    </div>
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 rounded-xl bg-black/5 px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-black/5 transition-all dark:bg-white/10 dark:text-slate-200 dark:ring-white/10"
    >
      <span
        className={`relative h-5 w-9 rounded-full transition-all ${
          checked ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-white/20'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all dark:bg-neutral-900 ${
            checked ? 'left-[1.125rem]' : 'left-0.5'
          }`}
        />
      </span>
      {label}
    </button>
  )
}

function notify(mode) {
  try {
    if (!('Notification' in window) || Notification.permission !== 'granted') return
    const msg =
      mode === 'focus'
        ? 'Focus session complete! Time for a break. ☕'
        : 'Break over — back to focus! 🎯'
    new Notification('⏱️ Pomodoro', { body: msg })
  } catch (e) {
    /* notifications unavailable */
  }
}
