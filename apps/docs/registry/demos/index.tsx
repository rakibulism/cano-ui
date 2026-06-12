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
  "announcement-banner": dynamic(() => import("./announcement-banner-demo"), { ssr: false, loading }),
  "api-key-manager": dynamic(() => import("./api-key-manager-demo"), { ssr: false, loading }),
  "bottom-sheet": dynamic(() => import("./bottom-sheet-demo"), { ssr: false, loading }),
  "button-group": dynamic(() => import("./button-group-demo"), { ssr: false, loading }),
  "button-pro": dynamic(() => import("./button-pro-demo"), { ssr: false, loading }),
  "app-shell": dynamic(() => import("./app-shell-demo"), { ssr: false, loading }),
  "auth-forms": dynamic(() => import("./auth-forms-demo"), { ssr: false, loading }),
  "card-payment-input": dynamic(() => import("./card-payment-input-demo"), { ssr: false, loading }),
  "chart-cards": dynamic(() => import("./chart-cards-demo"), { ssr: false, loading }),
  "combobox-filters": dynamic(() => import("./combobox-filters-demo"), { ssr: false, loading }),
  "command-palette": dynamic(() => import("./command-palette-demo"), { ssr: false, loading }),
  "country-input": dynamic(() => import("./country-input-demo"), { ssr: false, loading }),
  "data-table-pro": dynamic(() => import("./data-table-pro-demo"), { ssr: false, loading }),
  "date-range-picker": dynamic(() => import("./date-range-picker-demo"), { ssr: false, loading }),
  "drawer": dynamic(() => import("./drawer-demo"), { ssr: false, loading }),
  "empty-state": dynamic(() => import("./empty-state-demo"), { ssr: false, loading }),
  "error-page": dynamic(() => import("./error-page-demo"), { ssr: false, loading }),
  "feedback-dialog": dynamic(() => import("./feedback-dialog-demo"), { ssr: false, loading }),
  "file-dropzone": dynamic(() => import("./file-dropzone-demo"), { ssr: false, loading }),
  "input-field": dynamic(() => import("./input-field-demo"), { ssr: false, loading }),
  "input-group": dynamic(() => import("./input-group-demo"), { ssr: false, loading }),
  "integration-cards": dynamic(() => import("./integration-cards-demo"), { ssr: false, loading }),
  "invoice-table": dynamic(() => import("./invoice-table-demo"), { ssr: false, loading }),
  "kanban-board": dynamic(() => import("./kanban-board-demo"), { ssr: false, loading }),
  "kbd": dynamic(() => import("./kbd-demo"), { ssr: false, loading }),
  "language-search": dynamic(() => import("./language-search-demo"), { ssr: false, loading }),
  "notification-center": dynamic(() => import("./notification-center-demo"), { ssr: false, loading }),
  "phone-number-input": dynamic(() => import("./phone-number-input-demo"), { ssr: false, loading }),
  "number-input": dynamic(() => import("./number-input-demo"), { ssr: false, loading }),
  "onboarding-stepper": dynamic(() => import("./onboarding-stepper-demo"), { ssr: false, loading }),
  "otp-input": dynamic(() => import("./otp-input-demo"), { ssr: false, loading }),
  "pagination-bar": dynamic(() => import("./pagination-bar-demo"), { ssr: false, loading }),
  "pricing-cards": dynamic(() => import("./pricing-cards-demo"), { ssr: false, loading }),
  "progress-bar": dynamic(() => import("./progress-bar-demo"), { ssr: false, loading }),
  "rich-tooltip": dynamic(() => import("./rich-tooltip-demo"), { ssr: false, loading }),
  "search-bar": dynamic(() => import("./search-bar-demo"), { ssr: false, loading }),
  "search-results": dynamic(() => import("./search-results-demo"), { ssr: false, loading }),
  "settings-layout": dynamic(() => import("./settings-layout-demo"), { ssr: false, loading }),
  "slider-field": dynamic(() => import("./slider-field-demo"), { ssr: false, loading }),
  "stats-grid": dynamic(() => import("./stats-grid-demo"), { ssr: false, loading }),
  "team-members-table": dynamic(() => import("./team-members-table-demo"), { ssr: false, loading }),
  "testimonial-cards": dynamic(() => import("./testimonial-cards-demo"), { ssr: false, loading }),
  "usage-meter": dynamic(() => import("./usage-meter-demo"), { ssr: false, loading }),
}
