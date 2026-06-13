"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

/** Template page components, loaded per route so the gallery stays light. */
export const templates: Record<string, ComponentType> = {
  "saas-landing": dynamic(() => import("./saas-landing"), { ssr: false }),
  "analytics-dashboard": dynamic(() => import("./analytics-dashboard"), {
    ssr: false,
  }),
}
