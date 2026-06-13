"use client"

import { templates } from "@/templates"

/** Renders a template's page component by slug (client-only). */
export function TemplateFrame({ slug }: { slug: string }) {
  const Component = templates[slug]
  if (!Component) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-sm text-muted-foreground">
        Preview unavailable.
      </div>
    )
  }
  return <Component />
}
