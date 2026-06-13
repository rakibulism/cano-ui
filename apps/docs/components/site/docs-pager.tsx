"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { DOCS_FLAT } from "@/components/site/docs-sidebar"

export function DocsPager() {
  const pathname = usePathname()
  const index = DOCS_FLAT.findIndex((item) => item.href === pathname)
  if (index === -1) return null

  const prev = index > 0 ? DOCS_FLAT[index - 1] : null
  const next = index < DOCS_FLAT.length - 1 ? DOCS_FLAT[index + 1] : null

  return (
    <div className="mt-16 flex items-center justify-between gap-4 border-t pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="flex items-center gap-1.5 text-xs">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Previous
          </span>
          <span className="font-medium text-foreground">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 text-right text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="flex items-center gap-1.5 text-xs">
            Next
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
          <span className="font-medium text-foreground">{next.label}</span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  )
}
