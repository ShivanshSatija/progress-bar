import { DSA_QUESTIONS, DSA_TOPIC_ORDER } from './dsaQuestions'
import { CORE_CS, APTITUDE, DEVELOPMENT, PLACEMENT, MACHINE_LEARNING } from './syllabus'

// ---------------------------------------------------------------------------
// 90-DAY ROADMAP GENERATOR
// ---------------------------------------------------------------------------
// Designed for a 6th-sem B.Tech IT student who already knows basic Python and
// some LeetCode. Three phases:
//   Month 1 (Day 1-30)  -> Foundation Building
//   Month 2 (Day 31-60) -> Interview Preparation
//   Month 3 (Day 61-90) -> Placement Readiness & Revision
//
// Time budget: weekdays 4h, weekends 6h. DSA is the backbone (~150 problems,
// Easy -> Medium -> Hard), with Core CS, Aptitude, Development and Placement
// woven in so every single day has a concrete, balanced plan.
// ---------------------------------------------------------------------------

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// Monochrome theme. Small chips/badges use an adaptive inverted accent (dark on
// light mode, light on dark mode). Large hero banners use a fixed near-black panel.
const ACCENT = 'from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300'
const PANEL = 'from-neutral-900 via-neutral-800 to-black'

export const PHASES = [
  { month: 1, name: 'Foundation Building', range: [1, 30], color: ACCENT },
  { month: 2, name: 'Interview Preparation', range: [31, 60], color: ACCENT },
  { month: 3, name: 'Placement Readiness & Revision', range: [61, 90], color: ACCENT },
]

export const CATEGORIES = ['DSA', 'ML', 'Core CS', 'Aptitude', 'Development', 'Placement']

export const CATEGORY_META = {
  DSA: { icon: '🧠', color: PANEL, accent: 'violet' },
  ML: { icon: '🤖', color: PANEL, accent: 'violet' },
  'Core CS': { icon: '🖥️', color: PANEL, accent: 'violet' },
  Aptitude: { icon: '🔢', color: PANEL, accent: 'violet' },
  Development: { icon: '💻', color: PANEL, accent: 'violet' },
  Placement: { icon: '🎯', color: PANEL, accent: 'violet' },
}

// Spread `items` one-per-day across [startDay, endDay] inclusive. Items get
// roughly equal consecutive runs of days (deeper topics => more days).
function spreadAcross(items, startDay, endDay) {
  const map = {}
  const span = endDay - startDay + 1
  if (span <= 0 || items.length === 0) return map
  for (let d = 0; d < span; d++) {
    const idx = Math.min(Math.floor((d * items.length) / span), items.length - 1)
    map[startDay + d] = items[idx]
  }
  return map
}

function phaseFor(day) {
  return PHASES.find((p) => day >= p.range[0] && day <= p.range[1]) || PHASES[0]
}

function isWeekend(startDate, day) {
  const d = new Date(startDate)
  d.setDate(d.getDate() + (day - 1))
  const wd = d.getDay()
  return wd === 0 || wd === 6
}

function dateFor(startDate, day) {
  const d = new Date(startDate)
  d.setDate(d.getDate() + (day - 1))
  return d
}

// Build the full roadmap. startDateISO controls the calendar dates + which days
// are weekends (for the 4h/6h time budget). Task IDs are derived from day +
// content so progress persists even if the start date changes.
export function generateRoadmap(startDateISO) {
  const startDate = startDateISO ? new Date(startDateISO) : new Date()

  // Pre-compute spread maps for the non-DSA tracks.
  const coreMap = spreadAcross(CORE_CS, 1, 78)
  const aptMap = spreadAcross(APTITUDE, 1, 90)
  const devMap = spreadAcross(DEVELOPMENT, 1, 60)
  const placeMap = spreadAcross(PLACEMENT, 35, 88)
  const mlMap = spreadAcross(MACHINE_LEARNING, 1, 85)

  const days = []
  let qi = 0 // pointer into DSA_QUESTIONS

  for (let day = 1; day <= 90; day++) {
    const phase = phaseFor(day)
    const weekend = isWeekend(startDate, day)
    const date = dateFor(startDate, day)
    const estHours = weekend ? 6 : 4

    // ---------------- DSA ----------------
    const dsaCount = weekend ? 3 : 2
    const dsa = []
    for (let c = 0; c < dsaCount; c++) {
      if (qi < DSA_QUESTIONS.length) {
        const q = DSA_QUESTIONS[qi++]
        dsa.push({ ...q, category: 'DSA' })
      } else {
        // Revision phase: re-solve patterns from a rotating topic.
        const topic = DSA_TOPIC_ORDER[(day + c) % DSA_TOPIC_ORDER.length]
        dsa.push({
          id: `dsarev-${day}-${c}`,
          name: `Revise ${topic}: re-solve 2 problems & note patterns`,
          difficulty: 'Revision',
          url: `https://leetcode.com/tag/${slug(topic)}/`,
          topic,
          category: 'DSA',
        })
      }
    }

    // ---------------- Machine Learning ----------------
    const ml = []
    if (mlMap[day]) {
      ml.push({
        id: `ml-${day}`,
        topic: mlMap[day].topic,
        track: mlMap[day].track,
        category: 'ML',
      })
    } else if (day >= 86) {
      ml.push({
        id: `mlrev-${day}`,
        topic: 'Practice ML on a fresh Kaggle dataset & revise key algorithms',
        track: 'Practice',
        category: 'ML',
      })
    }

    // ---------------- Core CS ----------------
    const coreCS = []
    if (coreMap[day]) {
      coreCS.push({
        id: `core-${day}`,
        topic: coreMap[day].topic,
        track: coreMap[day].track,
        category: 'Core CS',
      })
    } else if (day >= 79) {
      const item = CORE_CS[(day - 79) % CORE_CS.length]
      coreCS.push({
        id: `corerev-${day}`,
        topic: `Revise & quiz: ${item.track}`,
        track: item.track,
        category: 'Core CS',
      })
    }

    // ---------------- Aptitude ----------------
    const aptitude = []
    if (aptMap[day]) {
      aptitude.push({
        id: `apt-${day}`,
        topic: `${aptMap[day].topic} (solve 15-20 questions)`,
        track: aptMap[day].track,
        category: 'Aptitude',
      })
    }

    // ---------------- Development ----------------
    const development = []
    if (devMap[day]) {
      development.push({
        id: `dev-${day}`,
        topic: devMap[day].topic,
        track: devMap[day].track,
        category: 'Development',
      })
    } else if (day > 60 && day % 2 === 0) {
      development.push({
        id: `devmaint-${day}`,
        topic: 'Improve, document & deploy your portfolio project',
        track: 'Projects',
        category: 'Development',
      })
    }

    // ---------------- Placement ----------------
    const placement = []
    if (placeMap[day]) {
      placement.push({
        id: `place-${day}`,
        topic: placeMap[day].topic,
        track: placeMap[day].track,
        category: 'Placement',
      })
    } else if (day >= 89) {
      placement.push({
        id: `placefinal-${day}`,
        topic:
          day === 90
            ? 'Final: mock interview + relax, you are placement-ready! 🎉'
            : 'Final revision: skim notes, top 50 questions, rest well',
        track: 'Final Prep',
        category: 'Placement',
      })
    }

    const focus = buildFocus(day, phase, dsa)

    const tasks = [...dsa, ...ml, ...coreCS, ...aptitude, ...development, ...placement]

    days.push({
      day,
      date,
      dateISO: date.toISOString().slice(0, 10),
      weekend,
      estHours,
      month: phase.month,
      phase: phase.name,
      phaseColor: phase.color,
      focus,
      dsa,
      ml,
      coreCS,
      aptitude,
      development,
      placement,
      tasks,
      taskIds: tasks.map((t) => t.id),
    })
  }

  // Flat index of every task (handy for search + aggregation).
  const allTasks = days.flatMap((d) =>
    d.tasks.map((t) => ({ ...t, day: d.day })),
  )

  return { days, allTasks }
}

function buildFocus(day, phase, dsa) {
  const topic = dsa[0]?.topic
  if (day === 1) return 'Kickoff! Set up your tracker, GitHub & study environment.'
  if (day === 90) return 'You made it. Final mock + celebrate — you are ready! 🚀'
  if (phase.month === 1) return `Foundation: master ${topic} & build core habits.`
  if (phase.month === 2) return `Interview prep: deepen ${topic} & start mock rounds.`
  return `Readiness: revise ${topic}, polish resume & apply.`
}

// Format a date like "Mon, 23 Jun 2026"
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date instanceof Date ? date : new Date(date))
}

export function difficultyColor(diff) {
  switch (diff) {
    case 'Easy':
      return 'text-neutral-500 dark:text-neutral-400 bg-neutral-500/10 ring-neutral-400/30'
    case 'Medium':
      return 'text-neutral-700 dark:text-neutral-200 bg-neutral-500/15 ring-neutral-500/40'
    case 'Hard':
      return 'text-black dark:text-white bg-black/10 dark:bg-white/15 ring-neutral-700/50 dark:ring-white/40 font-extrabold'
    default:
      return 'text-neutral-500 dark:text-neutral-400 bg-transparent ring-neutral-400/40'
  }
}
