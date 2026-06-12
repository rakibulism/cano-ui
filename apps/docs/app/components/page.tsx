import type { Metadata } from "next"
import { SiteHeader } from "@/components/site/header"
import { ComponentsExplorer } from "@/components/site/components-explorer"
import { getRegistryItems } from "@/lib/registry"

export const metadata: Metadata = {
  title: "Components",
  description: "All components in the cano registry.",
}

export default function ComponentsPage() {
  const items = getRegistryItems()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Add any of these with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            npx cano-ui add &lt;name&gt;
          </code>
          . Dependencies — including shadcn primitives — are resolved
          automatically.
        </p>
        <ComponentsExplorer items={items} />
      </main>
    </div>
  )
}
