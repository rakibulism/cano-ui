import type { Metadata } from "next"

import { TEMPLATES } from "@/lib/templates"
import { SiteHeader } from "@/components/site/header"
import { TemplatesExplorer } from "@/components/site/templates-explorer"

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Full pages and interactive products built from cano components — websites and SaaS dashboards you can preview and make your own.",
}

export default function TemplatesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Templates</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Complete websites and interactive SaaS products, composed entirely
          from cano components. Filter, sort, and search — then preview any one
          full-screen.
        </p>
        <TemplatesExplorer items={TEMPLATES} />
      </main>
    </div>
  )
}
