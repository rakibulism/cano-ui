"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function loading() {
  return <Skeleton className="h-[200px] w-full" />
}

// Demos are interactive client widgets (live dates, Radix ids, drag state),
// so they render client-only — SSRing them only invites hydration mismatches.
/** Demo components, loaded per page so one heavy demo doesn't bloat the rest. */
export const demos: Record<string, ComponentType> = {
  "account-card": dynamic(() => import("./account-card-demo"), { ssr: false, loading }),
  "activity-feed": dynamic(() => import("./activity-feed-demo"), { ssr: false, loading }),
  "app-shell": dynamic(() => import("./app-shell-demo"), { ssr: false, loading }),
  "auth-forms": dynamic(() => import("./auth-forms-demo"), { ssr: false, loading }),
  "chart-cards": dynamic(() => import("./chart-cards-demo"), { ssr: false, loading }),
  "combobox-filters": dynamic(() => import("./combobox-filters-demo"), { ssr: false, loading }),
  "command-palette": dynamic(() => import("./command-palette-demo"), { ssr: false, loading }),
  "data-table-pro": dynamic(() => import("./data-table-pro-demo"), { ssr: false, loading }),
  "date-range-picker": dynamic(() => import("./date-range-picker-demo"), { ssr: false, loading }),
  "empty-state": dynamic(() => import("./empty-state-demo"), { ssr: false, loading }),
  "error-page": dynamic(() => import("./error-page-demo"), { ssr: false, loading }),
  "file-dropzone": dynamic(() => import("./file-dropzone-demo"), { ssr: false, loading }),
  "kanban-board": dynamic(() => import("./kanban-board-demo"), { ssr: false, loading }),
  "onboarding-stepper": dynamic(() => import("./onboarding-stepper-demo"), { ssr: false, loading }),
  "pricing-cards": dynamic(() => import("./pricing-cards-demo"), { ssr: false, loading }),
  "settings-layout": dynamic(() => import("./settings-layout-demo"), { ssr: false, loading }),
  "stats-grid": dynamic(() => import("./stats-grid-demo"), { ssr: false, loading }),
  "team-members-table": dynamic(() => import("./team-members-table-demo"), { ssr: false, loading }),
}
