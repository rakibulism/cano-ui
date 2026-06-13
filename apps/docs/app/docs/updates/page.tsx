import type { Metadata } from "next"
import {
  Bug,
  FileText,
  Package,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { UPDATES, type UpdateType } from "@/lib/updates"
import { DocsArticle } from "@/components/site/docs"

export const metadata: Metadata = {
  title: "Updates",
  description:
    "A granular, day-to-day log of every change as it ships, newest first.",
}

const TYPE_META: Record<UpdateType, { icon: LucideIcon; label: string }> = {
  feature: { icon: Sparkles, label: "Feature" },
  fix: { icon: Bug, label: "Fix" },
  component: { icon: Package, label: "Component" },
  docs: { icon: FileText, label: "Docs" },
  chore: { icon: Wrench, label: "Chore" },
}

export default function UpdatesPage() {
  return (
    <DocsArticle
      title="Updates"
      lead="A granular, day-to-day log of every change as it ships, newest first. For milestones and versions, see the Changelog."
    >
      <ul className="!mt-8 flex flex-col gap-px overflow-hidden rounded-lg border bg-border">
        {UPDATES.map((update) => {
          const { icon: Icon, label } = TYPE_META[update.type]
          return (
            <li key={update.id} className="bg-background">
              <div className="flex gap-3 px-4 py-3.5">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border bg-muted/50 text-muted-foreground"
                >
                  <Icon className="size-4" />
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-medium text-foreground">
                      {update.title}
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {update.description ? (
                    <p className="text-sm text-muted-foreground">
                      {update.description}
                    </p>
                  ) : null}
                  <time className="mt-0.5 text-xs text-muted-foreground/70">
                    {update.date} · {update.time}
                  </time>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </DocsArticle>
  )
}
