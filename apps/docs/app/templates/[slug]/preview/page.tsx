import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

import { TEMPLATES, getTemplate } from "@/lib/templates"
import { TemplateFrame } from "@/components/site/template-frame"

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
  return t ? { title: `${t.name} — Preview` } : {}
}

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!getTemplate(slug)) notFound()

  return (
    <div className="min-h-screen">
      <Link
        href={`/templates/${slug}`}
        className="fixed top-4 left-4 z-[100] inline-flex items-center gap-1.5 rounded-full border bg-background/90 px-3 py-1.5 text-sm font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back
      </Link>
      <TemplateFrame slug={slug} />
    </div>
  )
}
