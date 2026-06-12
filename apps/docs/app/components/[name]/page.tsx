import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site/header"
import { ComponentPreview } from "@/components/site/component-preview"
import { CopyButton } from "@/components/site/copy-button"
import {
  getComponentSource,
  getRegistryItem,
  getRegistryItems,
} from "@/lib/registry"

export function generateStaticParams() {
  return getRegistryItems().map((item) => ({ name: item.name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const { name } = await params
  const item = getRegistryItem(name)
  if (!item) return {}
  return { title: item.title, description: item.description }
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const item = getRegistryItem(name)
  if (!item) notFound()

  const source = getComponentSource(item)
  const installCommand = `npx cano-ui add ${item.name}`

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        <Link
          href="/components"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Components
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {item.title}
            </h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              {item.description}
            </p>
          </div>
          <span className="rounded-md border px-2 py-1 text-xs text-muted-foreground">
            {item.category}
          </span>
        </div>

        <section className="mt-10">
          <ComponentPreview name={item.name} />
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-medium">Installation</h2>
          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border bg-muted/50 py-2 pl-4 pr-2 font-mono text-sm">
            <span className="select-all">{installCommand}</span>
            <CopyButton value={installCommand} />
          </div>
          {(item.dependencies.length > 0 ||
            item.registryDependencies.length > 0) && (
            <p className="mt-3 text-sm text-muted-foreground">
              Installs{" "}
              {[...item.registryDependencies, ...item.dependencies].join(", ")}{" "}
              automatically if missing.
            </p>
          )}
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Source</h2>
            <CopyButton value={source} />
          </div>
          <pre className="mt-4 max-h-[600px] overflow-auto rounded-lg border bg-muted/50 p-4 font-mono text-[13px] leading-relaxed">
            <code>{source}</code>
          </pre>
          <p className="mt-3 text-sm text-muted-foreground">
            This exact file lands in your project at{" "}
            <code className="rounded bg-muted px-1 py-0.5">
              components/ui/{item.name}.tsx
            </code>
            . It is yours to edit.
          </p>
        </section>
      </main>
    </div>
  )
}
