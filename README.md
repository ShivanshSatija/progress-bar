# 🚀 90-Day Placement Mission

A premium, offline-first productivity app that turns "I want to get placed" into a **concrete daily plan**. It generates a realistic 90-day roadmap for a 6th-semester B.Tech IT student and tells you *exactly what to do every single day* — DSA, Core CS, Aptitude, Development and Placement prep — then tracks your progress permanently in **Local Storage**.

Built with **React (Vite) + Tailwind CSS**.

---

## ✨ Features

- **Smart 90-day roadmap** auto-generated across 3 phases:
  - **Month 1 — Foundation Building**
  - **Month 2 — Interview Preparation**
  - **Month 3 — Placement Readiness & Revision**
- **Daily Planner** — all 90 days, each with day number, date, estimated time, tasks, checkboxes and a live completion %.
- **DSA Roadmap** — ~150 real LeetCode problems in an Easy → Medium → Hard progression, ordered Arrays → … → Dynamic Programming, each with name, difficulty and a direct link.
- **Aptitude, Core CS, Development & Placement roadmaps** — every topic from your syllabus, intelligently spread across the 90 days.
- **Dashboard** — overall %, per-track % (DSA / Aptitude / Core CS / Development), a weighted **Placement Readiness Score**, streaks and phase timeline, all with animated progress bars + a progress ring.
- **Today / Tomorrow / Weekly / Monthly goals** so you always know the next move.
- **Time budget** — 4h on weekdays, 6h on weekends, allocated automatically.
- **Notes** (auto-saved) and a **custom To-Do list**.
- **100+ motivational quotes** with a quote-of-the-day and a save/favorites list.
- **Search** (Ctrl/Cmd + K) across every task.
- **Dark mode**, glassmorphism UI, gradients and subtle animations.
- **Everything persists** in Local Storage — close the tab, come back, nothing is lost.

---

## 🚀 Easiest way: launch it like a desktop app

Double-click **`Launch 90-Day Mission.bat`** in this folder. It will:

1. install everything the first time (one-time, ~1 min),
2. build the app,
3. start it and **open your browser automatically**.

Keep that little black window open while you use the app; close it to stop.

**Make it a clickable desktop icon:** right-click `Launch 90-Day Mission.bat` → **Show more options → Send to → Desktop (create shortcut)**. Now you have an icon on your desktop you can double-click any time.

**Install it as a real app window (PWA):** once it opens in Chrome or Edge, click the **install icon** in the address bar (or ⋮ menu → *Install / Apps → Install this site as an app*). You'll get a standalone window plus a Start-Menu/desktop icon — no browser tabs. It even works offline. Your saved progress is shared between the browser tab and the installed app.

> Mission **Day 1 = Wed, 24 June 2026** (set in the code and changeable anytime from ⚙️ Settings).

---

## 🛠️ For developers

```bash
# install dependencies
npm install

# start the dev server (auto-opens the browser, hot reload)
npm run dev

# production build + preview server
npm run build
npm run preview
```

---

## 🧠 How the roadmap is generated

The plan is **computed**, not hard-coded, in [`src/data/roadmap.js`](src/data/roadmap.js):

- DSA questions (from [`src/data/dsaQuestions.js`](src/data/dsaQuestions.js)) are consumed **in topic order**, ~2 per weekday and ~3 per weekend, so difficulty ramps up naturally. Once the ~150 problems are covered, later days become structured **revision**.
- Core CS, Aptitude, Development and Placement items (from [`src/data/syllabus.js`](src/data/syllabus.js)) are **spread** across the relevant phase so deeper topics get multiple days.
- Each task has a stable ID, so your completion state survives even if you change the **mission start date** in Settings.

To customize the plan, edit the data files — the UI updates automatically.

---

## 📁 Project structure

```
src/
  data/
    dsaQuestions.js   # ~150 LeetCode problems (name, difficulty, url, topic)
    syllabus.js       # Core CS / Aptitude / Development / Placement topics
    quotes.js         # 110 motivational quotes
    roadmap.js        # the 90-day plan generator + helpers
  hooks/
    useLocalStorage.js
  context/
    AppContext.jsx    # all persisted state + derived stats
  components/
    Dashboard.jsx  TodayView.jsx  DailyPlanner.jsx  DayCard.jsx
    TrackView.jsx  TaskItem.jsx   ProgressBar.jsx
    Notes.jsx  Todos.jsx  Motivation.jsx  MotivationCard.jsx  SearchModal.jsx
  App.jsx
  main.jsx
  index.css
```

---

## 🔒 Privacy

100% client-side. No backend, no accounts, no tracking. Your progress lives only in your browser.

Now go get that offer letter. 💪
