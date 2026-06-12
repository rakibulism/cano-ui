import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site/header"
import { getRegistryItems, groupByCategory } from "@/lib/registry"

export const metadata: Metadata = {
  title: "Components",
  description: "All components in the cano registry.",
}

export default function ComponentsPage() {
  const groups = groupByCategory(getRegistryItems())

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

        {groups.map(([category, items]) => (
          <section key={category} className="mt-12">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {category.replace("-", " ")}
            </h2>
            <ul className="mt-4 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <li key={item.name} className="bg-background">
                  <Link
                    href={`/components/${item.name}`}
                    className="block h-full p-5 transition-colors hover:bg-accent/50"
                  >
                    <span className="text-sm font-medium">{item.title}</span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  )
}
