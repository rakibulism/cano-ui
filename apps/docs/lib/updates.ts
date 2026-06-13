/**
 * The Updates feed — a granular, append-only log of every change as it ships,
 * newest first. This is the fine-grained companion to the Changelog: the
 * Changelog records milestones and versions, while Updates captures the small
 * day-to-day changes. Add a new entry at the TOP with the next-highest id.
 */
export type UpdateType = "feature" | "fix" | "component" | "docs" | "chore"

export interface Update {
  /** Monotonic id — higher is newer. Increment for each new entry. */
  id: number
  date: string
  time: string
  type: UpdateType
  title: string
  description?: string
}

export const UPDATES: Update[] = [
  {
    id: 28,
    date: "June 14, 2026",
    time: "1:50 AM",
    type: "feature",
    title: "24 more templates",
    description:
      "Templates wave 11 — 235 total now; more interactive SaaS apps (email client, team chat, funnel & attribution analytics, lead routing, segments, standup, bug triage, payments, spend, AI translation & doc-chat) plus new website templates across every category.",
  },
  {
    id: 27,
    date: "June 14, 2026",
    time: "1:15 AM",
    type: "feature",
    title: "24 more templates",
    description:
      "Templates wave 10 — 211 total now; more interactive SaaS apps (team wiki, asset manager, AI video & chatbot, realtime dashboard, renewals, project portfolio, expense approvals) plus new website templates across every category.",
  },
  {
    id: 26,
    date: "June 14, 2026",
    time: "12:40 AM",
    type: "feature",
    title: "24 more templates",
    description:
      "Templates wave 9 — 187 total now; more interactive SaaS apps (social scheduler, form builder, analytics, forecasting, calendar, tax, cap table, AI labeling & voice) plus new website templates across every category.",
  },
  {
    id: 25,
    date: "June 14, 2026",
    time: "12:05 AM",
    type: "feature",
    title: "24 more templates",
    description:
      "Templates wave 8 — 163 total now; more interactive SaaS apps (HR, store admin, learning, analytics, OKRs, release planner, ledger, portfolio, AI ops & code assistant) plus new website templates across every category.",
  },
  {
    id: 24,
    date: "June 13, 2026",
    time: "11:30 PM",
    type: "feature",
    title: "23 more templates",
    description:
      "Templates wave 7 — 139 total now; more interactive SaaS apps (workspace, admin console, analytics, lead scoring, issue tracker, budgeting, trading, AI writer & search) plus new website templates across every category.",
  },
  {
    id: 23,
    date: "June 13, 2026",
    time: "8:22 PM",
    type: "feature",
    title: "24 more templates",
    description:
      "Templates wave 6 — 116 total now; a status page, public roadmap, fintech/healthcare landings, more agencies, portfolios, stores, plus interactive courses, social analytics, email campaigns, payroll, and AI meeting notes.",
  },
  {
    id: 22,
    date: "June 13, 2026",
    time: "8:04 PM",
    type: "feature",
    title: "20 more templates",
    description:
      "Templates wave 5 — 92 total now; every SaaS category gained two more interactive apps, plus more website variety.",
  },
  {
    id: 21,
    date: "June 13, 2026",
    time: "7:46 PM",
    type: "feature",
    title: "20 more templates",
    description:
      "Templates wave 4 — 72 total now, including API platform, careers, investor one-pager, AI agents console, team admin, and a time-tracking app.",
  },
  {
    id: 20,
    date: "June 13, 2026",
    time: "7:28 PM",
    type: "feature",
    title: "20 more templates",
    description:
      "Templates wave 3 — 52 total now, including a deals pipeline, inbox app, product analytics, AI image studio, and many more website variants.",
  },
  {
    id: 19,
    date: "June 13, 2026",
    time: "7:10 PM",
    type: "feature",
    title: "20 more templates",
    description:
      "Templates wave 2 — 32 total now, with every category covered, including interactive finance, AI chat, settings, analytics, CRM, and kanban products.",
  },
  {
    id: 18,
    date: "June 13, 2026",
    time: "6:52 PM",
    type: "component",
    title: "6 final primitives",
    description:
      "Added item, field, typography, carousel, resizable, and sidebar — completing the standard primitive set (68 components total).",
  },
  {
    id: 17,
    date: "June 13, 2026",
    time: "6:34 PM",
    type: "feature",
    title: "Collapsible component categories",
    description:
      "Collapse any category on the Components page, or show/collapse them all. Changelog and Updates now show the time too.",
  },
  {
    id: 16,
    date: "June 13, 2026",
    time: "6:20 PM",
    type: "feature",
    title: "10 new templates",
    description:
      "Wave 1 of the templates gallery — 8 website templates and 2 interactive SaaS dashboards (CRM, project management).",
  },
  {
    id: 15,
    date: "June 13, 2026",
    time: "6:06 PM",
    type: "docs",
    title: "Collapsible docs sidebar",
    description:
      "Collapse any docs category, and expand “All components” to jump to any component from the sidebar.",
  },
  {
    id: 14,
    date: "June 13, 2026",
    time: "5:52 PM",
    type: "feature",
    title: "Templates",
    description:
      "Browse full websites and interactive SaaS products built from cano components — filter, sort, search, and preview full-screen.",
  },
  {
    id: 13,
    date: "June 13, 2026",
    time: "5:38 PM",
    type: "feature",
    title: "Update notifications",
    description:
      "When a new version of the site ships, you'll get a prompt to reload (or skip) — with the version called out.",
  },
  {
    id: 12,
    date: "June 13, 2026",
    time: "5:24 PM",
    type: "component",
    title: "Toasts & menus",
    description: "Added sonner, menubar, and navigation-menu (batch 3).",
  },
  {
    id: 11,
    date: "June 13, 2026",
    time: "5:10 PM",
    type: "component",
    title: "6 more primitives",
    description:
      "Added alert-dialog, radio-group, hover-card, context-menu, scroll-area, and native-select (batch 2).",
  },
  {
    id: 10,
    date: "June 13, 2026",
    time: "4:56 PM",
    type: "component",
    title: "8 new primitives",
    description:
      "Added accordion, collapsible, toggle, toggle-group, alert, breadcrumb, aspect-ratio, and spinner — the first batch of the standard primitive set.",
  },
  {
    id: 9,
    date: "June 13, 2026",
    time: "4:42 PM",
    type: "feature",
    title: "“What’s new” highlight",
    description:
      "On your first visit of a session with unread updates, a callout under the bell surfaces what changed.",
  },
  {
    id: 8,
    date: "June 13, 2026",
    time: "4:28 PM",
    type: "feature",
    title: "Updates feed & notifications bell",
    description:
      "A bell in the header surfaces new updates, and this page lists them all — the granular companion to the Changelog.",
  },
  {
    id: 7,
    date: "June 13, 2026",
    time: "4:14 PM",
    type: "feature",
    title: "Light / Dark / System theme toggle",
    description:
      "A toggle in the header lets you override the device theme; the choice persists across visits.",
  },
  {
    id: 6,
    date: "June 13, 2026",
    time: "4:00 PM",
    type: "chore",
    title: "Dedicated favicon",
    description: "The site favicon is now the cano mark on a rounded plate.",
  },
  {
    id: 5,
    date: "June 13, 2026",
    time: "3:46 PM",
    type: "feature",
    title: "Device-following dark mode",
    description:
      "The site now follows your OS light/dark preference automatically, with no flash.",
  },
  {
    id: 4,
    date: "June 13, 2026",
    time: "3:32 PM",
    type: "docs",
    title: "Logo across the site",
    description: "Added the cano logo mark to the header and footer.",
  },
  {
    id: 3,
    date: "June 13, 2026",
    time: "3:18 PM",
    type: "feature",
    title: "Component search sidebar",
    description:
      "The Components page gained a category sidebar with scroll-spy for quicker navigation.",
  },
  {
    id: 2,
    date: "June 13, 2026",
    time: "3:04 PM",
    type: "docs",
    title: "Documentation section",
    description:
      "Launched /docs with a left sidebar, plus a Changelog and this Updates feed.",
  },
  {
    id: 1,
    date: "June 13, 2026",
    time: "2:50 PM",
    type: "feature",
    title: "Cano CLI announced",
    description:
      "The full-screen terminal app is now featured on the homepage and documented under Docs → CLI.",
  },
]

export const LATEST_UPDATE_ID = UPDATES.length > 0 ? UPDATES[0].id : 0
