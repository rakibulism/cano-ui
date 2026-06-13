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
  "product-feature-page": dynamic(() => import("./product-feature-page"), { ssr: false }),
  "saas-pricing-page": dynamic(() => import("./saas-pricing-page"), { ssr: false }),
  "app-landing": dynamic(() => import("./app-landing"), { ssr: false }),
  "newsletter-landing": dynamic(() => import("./newsletter-landing"), { ssr: false }),
  "design-studio": dynamic(() => import("./design-studio"), { ssr: false }),
  "photographer-portfolio": dynamic(() => import("./photographer-portfolio"), { ssr: false }),
  "product-detail": dynamic(() => import("./product-detail"), { ssr: false }),
  "fashion-store": dynamic(() => import("./fashion-store"), { ssr: false }),
  "coming-soon": dynamic(() => import("./coming-soon"), { ssr: false }),
  "consulting-firm": dynamic(() => import("./consulting-firm"), { ssr: false }),
  "article-page": dynamic(() => import("./article-page"), { ssr: false }),
  "webinar-landing": dynamic(() => import("./webinar-landing"), { ssr: false }),
  "bootcamp-landing": dynamic(() => import("./bootcamp-landing"), { ssr: false }),
  "help-center": dynamic(() => import("./help-center"), { ssr: false }),
  "finance-dashboard": dynamic(() => import("./finance-dashboard"), { ssr: false }),
  "ai-chat": dynamic(() => import("./ai-chat"), { ssr: false }),
  "account-settings": dynamic(() => import("./account-settings"), { ssr: false }),
  "web-analytics": dynamic(() => import("./web-analytics"), { ssr: false }),
  "contacts-crm": dynamic(() => import("./contacts-crm"), { ssr: false }),
  "kanban-app": dynamic(() => import("./kanban-app"), { ssr: false }),
}
