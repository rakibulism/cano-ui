import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ExternalLink } from "lucide-react"

import {
  CATEGORY_LABEL,
  TEMPLATES,
  getTemplate,
} from "@/lib/templates"
import { SiteHeader } from "@/components/site/header"
import { TemplateFrame } from "@/components/site/template-frame"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const t = getTemplate(slug)
  if (!t) return {}
  return { title: t.name, description: t.description }
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const template = getTemplate(slug)
  if (!template) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <Link
          href="/templates"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Templates
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{template.name}</h1>
            <p className="mt-2 max-w-xl text-muted-foreground">{template.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <Badge variant="secondary">{template.kind === "saas" ? "SaaS product" : "Website"}</Badge>
              <Badge variant="outline">{CATEGORY_LABEL[template.category] ?? template.category}</Badge>
              <Badge variant="outline" className="capitalize">{template.pages}-page</Badge>
            </div>
          </div>
          <Button asChild>
            <Link href={`/templates/${template.slug}/preview`} target="_blank">
              Open full preview
              <ExternalLink aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <section className="mt-8">
          <div className="h-[560px] overflow-auto rounded-lg border bg-background shadow-sm">
            <TemplateFrame slug={template.slug} />
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Live preview, scaled to fit. Open the full preview for the real thing.
          </p>
        </section>

        <section className="mt-12 flex flex-col gap-3">
          <h2 className="text-lg font-medium">Built with</h2>
          <div className="flex flex-wrap gap-1.5">
            {template.components.map((c) => (
              <Badge key={c} variant="outline" className="font-mono text-xs">
                {c}
              </Badge>
            ))}
          </div>
          {template.tags.length > 0 ? (
            <p className="text-sm text-muted-foreground">
              Tags: {template.tags.join(", ")}
            </p>
          ) : null}
        </section>
      </main>
    </div>
  )
}
