import { useEffect, useState } from 'react'
import { useApp } from './context/AppContext'
import Dashboard from './components/Dashboard'
import TodayView from './components/TodayView'
import DailyPlanner from './components/DailyPlanner'
import TrackView from './components/TrackView'
import Notes from './components/Notes'
import Todos from './components/Todos'
import Motivation from './components/Motivation'
import Pomodoro from './components/Pomodoro'
import PyDSA from './components/PyDSA'
import SearchModal from './components/SearchModal'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'today', label: 'Today', icon: '☀️' },
  { id: 'planner', label: 'Daily Planner', icon: '📅' },
  { id: 'sep1', divider: 'Roadmaps' },
  { id: 'dsa', label: 'DSA', icon: '🧠' },
  { id: 'ml', label: 'Machine Learning', icon: '🤖' },
  { id: 'aptitude', label: 'Aptitude', icon: '🔢' },
  { id: 'corecs', label: 'Core CS', icon: '🖥️' },
  { id: 'development', label: 'Development', icon: '💻' },
  { id: 'placement', label: 'Placement', icon: '🎯' },
  { id: 'sep2', divider: 'Tools' },
  { id: 'pydsa', label: 'Py DSA', icon: '🐍' },
  { id: 'pomodoro', label: 'Pomodoro', icon: '⏱️' },
  { id: 'notes', label: 'Notes', icon: '📝' },
  { id: 'todos', label: 'To-Do', icon: '✅' },
  { id: 'motivation', label: 'Motivation', icon: '💬' },
]

const TRACK_MAP = {
  dsa: 'DSA',
  ml: 'ML',
  aptitude: 'Aptitude',
  corecs: 'Core CS',
  development: 'Development',
  placement: 'Placement',
}

export default function App() {
  const { theme, toggleTheme, stats, currentDay } = useApp()
  const [view, setView] = useState('dashboard')
  const [searchOpen, setSearchOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Ctrl/Cmd+K opens search.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id) => {
    setView(id)
    setSidebarOpen(false)
  }

  return (
    <div className="app-bg min-h-screen text-slate-900 dark:text-slate-100">
      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar */}
        <Sidebar
          view={view}
          go={go}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          stats={stats}
          currentDay={currentDay}
        />

        {/* Main */}
        <div className="flex-1 min-w-0">
          <TopBar
            onMenu={() => setSidebarOpen(true)}
            onSearch={() => setSearchOpen(true)}
            theme={theme}
            toggleTheme={toggleTheme}
            onSettings={() => setSettingsOpen(true)}
          />

          <main className="px-4 pb-24 pt-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in">
              {view === 'dashboard' && <Dashboard />}
              {view === 'today' && <TodayView />}
              {view === 'planner' && <DailyPlanner />}
              {TRACK_MAP[view] && <TrackView category={TRACK_MAP[view]} />}
              {view === 'pydsa' && <PyDSA />}
              {view === 'pomodoro' && <Pomodoro />}
              {view === 'notes' && <Notes />}
              {view === 'todos' && <Todos />}
              {view === 'motivation' && <Motivation />}
            </div>
          </main>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </div>
  )
}

function Sidebar({ view, go, open, onClose, stats, currentDay }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`glass-strong fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/30 transition-transform dark:border-white/10 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900 text-2xl shadow-lg ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10">
            🚀
          </div>
          <div>
            <h1 className="text-base font-extrabold leading-tight text-slate-800 dark:text-white">
              90-Day Mission
            </h1>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Placement Tracker
            </p>
          </div>
          <button onClick={onClose} className="ml-auto text-slate-400 lg:hidden">
            ✕
          </button>
        </div>

        {/* Mini progress */}
        <div className="mx-4 mb-2 rounded-2xl bg-black/5 p-3 ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Day {currentDay}/90</span>
            <span className="font-bold text-gradient">{stats.overall}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
            <div
              className="accent-fill h-full rounded-full transition-all duration-1000"
              style={{ width: `${stats.overall}%` }}
            />
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
          {NAV.map((item) =>
            item.divider ? (
              <p
                key={item.id}
                className="px-3 pb-1 pt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500"
              >
                {item.divider}
              </p>
            ) : (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                  view === item.id
                    ? 'accent-grad shadow-lg'
                    : 'text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ),
          )}
        </nav>

        <div className="border-t border-white/30 p-4 text-center text-[11px] text-slate-400 dark:border-white/10">
          Made for your offer letter ✨
        </div>
      </aside>
    </>
  )
}

function TopBar({ onMenu, onSearch, theme, toggleTheme, onSettings }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/20 bg-white/30 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30 sm:px-6 lg:px-8">
      <button
        onClick={onMenu}
        className="rounded-lg p-2 text-slate-600 hover:bg-white/50 dark:text-slate-300 lg:hidden"
        aria-label="Open menu"
      >
        ☰
      </button>

      <button
        onClick={onSearch}
        className="flex flex-1 items-center gap-2 rounded-xl bg-white/50 px-4 py-2 text-sm text-slate-500 ring-1 ring-black/5 transition-all hover:bg-white/70 dark:bg-white/10 dark:text-slate-400 sm:max-w-md"
      >
        🔍 <span className="flex-1 text-left">Search tasks…</span>
        <kbd className="hidden rounded bg-black/10 px-1.5 py-0.5 text-[10px] font-semibold dark:bg-white/10 sm:inline">
          Ctrl K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={onSettings}
          className="rounded-xl bg-white/50 p-2.5 text-slate-600 ring-1 ring-black/5 transition-all hover:bg-white/70 dark:bg-white/10 dark:text-slate-300"
          aria-label="Settings"
        >
          ⚙️
        </button>
        <button
          onClick={toggleTheme}
          className="rounded-xl bg-white/50 p-2.5 text-slate-600 ring-1 ring-black/5 transition-all hover:bg-white/70 dark:bg-white/10 dark:text-slate-300"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

function SettingsModal({ onClose }) {
  const { startDate, setStartDate, resetAllProgress } = useApp()
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-strong w-full max-w-md rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">⚙️ Settings</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Mission start date
            </label>
            <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
              Day 1 of your 90-day plan. Controls dates &amp; which days are weekends.
            </p>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl bg-white/60 px-3 py-2 text-sm text-slate-800 ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:bg-white/10 dark:text-slate-100 dark:focus:ring-white"
            />
          </div>

          <div className="rounded-xl bg-black/5 p-4 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
              ⚠️ Danger zone
            </p>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              Wipe all progress, notes, todos &amp; saved quotes.
            </p>
            <button
              onClick={resetAllProgress}
              className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Reset everything
            </button>
          </div>

          <p className="text-center text-[11px] text-slate-400">
            All data is stored locally in your browser (Local Storage).
          </p>
        </div>
      </div>
    </div>
  )
}
