import { createContext, useContext, useEffect, useMemo, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { generateRoadmap, CATEGORIES } from '../data/roadmap'

const AppContext = createContext(null)

const todayISO = () => new Date().toISOString().slice(0, 10)

// Mission Day 1. Change this here, or anytime from ⚙️ Settings in the app.
const MISSION_START = '2026-06-24'

export function AppProvider({ children }) {
  // ---- persisted state ----
  const [startDate, setStartDate] = useLocalStorage('pm.startDate', MISSION_START)
  const [completed, setCompleted] = useLocalStorage('pm.completed', {}) // { taskId: true }
  const [notes, setNotes] = useLocalStorage('pm.notes', '')
  const [todos, setTodos] = useLocalStorage('pm.todos', []) // [{id,text,done}]
  const [theme, setTheme] = useLocalStorage('pm.theme', 'dark')
  const [favorites, setFavorites] = useLocalStorage('pm.favorites', {}) // pinned quotes

  // ---- derived roadmap (regenerated only when startDate changes) ----
  const { days, allTasks } = useMemo(
    () => generateRoadmap(startDate),
    [startDate],
  )

  // ---- theme side-effect ----
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [setTheme],
  )

  // ---- task completion ----
  const toggleTask = useCallback(
    (id) =>
      setCompleted((c) => {
        const next = { ...c }
        if (next[id]) delete next[id]
        else next[id] = true
        return next
      }),
    [setCompleted],
  )

  const isDone = useCallback((id) => !!completed[id], [completed])

  const setDayComplete = useCallback(
    (dayObj, value) =>
      setCompleted((c) => {
        const next = { ...c }
        dayObj.taskIds.forEach((id) => {
          if (value) next[id] = true
          else delete next[id]
        })
        return next
      }),
    [setCompleted],
  )

  // ---- progress aggregation ----
  const stats = useMemo(() => {
    const perCat = {}
    CATEGORIES.forEach((cat) => (perCat[cat] = { total: 0, done: 0 }))
    let total = 0
    let done = 0
    allTasks.forEach((t) => {
      total++
      perCat[t.category].total++
      if (completed[t.id]) {
        done++
        perCat[t.category].done++
      }
    })
    const pct = (d, tot) => (tot === 0 ? 0 : Math.round((d / tot) * 100))
    const categories = {}
    CATEGORIES.forEach((cat) => {
      categories[cat] = {
        ...perCat[cat],
        pct: pct(perCat[cat].done, perCat[cat].total),
      }
    })
    const overall = pct(done, total)
    // Placement readiness: weighted blend that rewards the high-signal tracks.
    const readiness = Math.round(
      categories['DSA'].pct * 0.3 +
        categories['ML'].pct * 0.2 +
        categories['Core CS'].pct * 0.15 +
        categories['Development'].pct * 0.15 +
        categories['Aptitude'].pct * 0.1 +
        categories['Placement'].pct * 0.1,
    )
    return { total, done, overall, categories, readiness }
  }, [allTasks, completed])

  // per-day completion %
  const dayProgress = useCallback(
    (dayObj) => {
      const total = dayObj.taskIds.length
      if (!total) return 0
      const d = dayObj.taskIds.filter((id) => completed[id]).length
      return Math.round((d / total) * 100)
    },
    [completed],
  )

  // ---- current day pointer (based on real calendar vs startDate) ----
  const currentDay = useMemo(() => {
    const start = new Date(startDate)
    start.setHours(0, 0, 0, 0)
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const diff = Math.floor((now - start) / 86400000) + 1
    return Math.min(90, Math.max(1, diff))
  }, [startDate])

  // ---- streak: consecutive completed days up to currentDay ----
  const streak = useMemo(() => {
    let s = 0
    for (let i = currentDay; i >= 1; i--) {
      const dayObj = days[i - 1]
      const total = dayObj.taskIds.length
      const d = dayObj.taskIds.filter((id) => completed[id]).length
      if (total > 0 && d === total) s++
      else break
    }
    return s
  }, [currentDay, days, completed])

  // ---- todos ----
  const addTodo = useCallback(
    (text) => {
      const t = text.trim()
      if (!t) return
      setTodos((list) => [
        ...list,
        { id: `todo-${Date.now()}-${list.length}`, text: t, done: false },
      ])
    },
    [setTodos],
  )
  const toggleTodo = useCallback(
    (id) =>
      setTodos((list) =>
        list.map((x) => (x.id === id ? { ...x, done: !x.done } : x)),
      ),
    [setTodos],
  )
  const deleteTodo = useCallback(
    (id) => setTodos((list) => list.filter((x) => x.id !== id)),
    [setTodos],
  )

  const toggleFavorite = useCallback(
    (q) =>
      setFavorites((f) => {
        const next = { ...f }
        if (next[q]) delete next[q]
        else next[q] = true
        return next
      }),
    [setFavorites],
  )

  const resetAllProgress = useCallback(() => {
    if (
      window.confirm(
        'Reset ALL progress, notes and todos? This cannot be undone.',
      )
    ) {
      setCompleted({})
      setNotes('')
      setTodos([])
      setFavorites({})
      // notebook is managed locally in the Notes component
      try {
        window.localStorage.removeItem('pm.notebook')
      } catch (e) {
        /* ignore */
      }
    }
  }, [setCompleted, setNotes, setTodos, setFavorites])

  const value = {
    startDate,
    setStartDate,
    days,
    allTasks,
    completed,
    toggleTask,
    isDone,
    setDayComplete,
    stats,
    dayProgress,
    currentDay,
    streak,
    notes,
    setNotes,
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    theme,
    toggleTheme,
    favorites,
    toggleFavorite,
    resetAllProgress,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
