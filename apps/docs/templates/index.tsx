"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

/** Template page components, loaded per route so the gallery stays light. */
export const templates: Record<string, ComponentType> = {
  "saas-landing": dynamic(() => import("./saas-landing"), { ssr: false }),
  "analytics-dashboard": dynamic(() => import("./analytics-dashboard"), {
    ssr: false,
  }),
  "agency-studio": dynamic(() => import("./agency-studio"), { ssr: false }),
  "personal-portfolio": dynamic(() => import("./personal-portfolio"), { ssr: false }),
  "ecommerce-store": dynamic(() => import("./ecommerce-store"), { ssr: false }),
  "startup-launch": dynamic(() => import("./startup-launch"), { ssr: false }),
  "corporate-business": dynamic(() => import("./corporate-business"), { ssr: false }),
  "blog-magazine": dynamic(() => import("./blog-magazine"), { ssr: false }),
  "event-conference": dynamic(() => import("./event-conference"), { ssr: false }),
  "course-landing": dynamic(() => import("./course-landing"), { ssr: false }),
  "crm-dashboard": dynamic(() => import("./crm-dashboard"), { ssr: false }),
  "project-dashboard": dynamic(() => import("./project-dashboard"), { ssr: false }),
}
