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
  type: UpdateType
  title: string
  description?: string
}

export const UPDATES: Update[] = [
  {
    id: 8,
    date: "June 13, 2026",
    type: "feature",
    title: "Updates feed & notifications bell",
    description:
      "A bell in the header surfaces new updates, and this page lists them all — the granular companion to the Changelog.",
  },
  {
    id: 7,
    date: "June 13, 2026",
    type: "feature",
    title: "Light / Dark / System theme toggle",
    description:
      "A toggle in the header lets you override the device theme; the choice persists across visits.",
  },
  {
    id: 6,
    date: "June 13, 2026",
    type: "chore",
    title: "Dedicated favicon",
    description: "The site favicon is now the cano mark on a rounded plate.",
  },
  {
    id: 5,
    date: "June 13, 2026",
    type: "feature",
    title: "Device-following dark mode",
    description:
      "The site now follows your OS light/dark preference automatically, with no flash.",
  },
  {
    id: 4,
    date: "June 13, 2026",
    type: "docs",
    title: "Logo across the site",
    description: "Added the cano logo mark to the header and footer.",
  },
  {
    id: 3,
    date: "June 13, 2026",
    type: "feature",
    title: "Component search sidebar",
    description:
      "The Components page gained a category sidebar with scroll-spy for quicker navigation.",
  },
  {
    id: 2,
    date: "June 13, 2026",
    type: "docs",
    title: "Documentation section",
    description:
      "Launched /docs with a left sidebar, plus a Changelog and this Updates feed.",
  },
  {
    id: 1,
    date: "June 13, 2026",
    type: "feature",
    title: "Cano CLI announced",
    description:
      "The full-screen terminal app is now featured on the homepage and documented under Docs → CLI.",
  },
]

export const LATEST_UPDATE_ID = UPDATES.length > 0 ? UPDATES[0].id : 0
