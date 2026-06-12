import * as React from "react"

import { cn } from "@/lib/utils"

export interface ActivityFeedItem {
  id: string
  /** Lucide icon component (or any component accepting className). */
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  actor: string
  action: string
  target?: string
  timestamp: string
  /** Optional extra content rendered below the entry, e.g. a commit hash. */
  meta?: React.ReactNode
}

export interface ActivityFeedGroup {
  label: string
  items: ActivityFeedItem[]
}

export interface ActivityFeedProps {
  groups: ActivityFeedGroup[]
  className?: string
}

export function ActivityFeed({ groups, className }: ActivityFeedProps) {
  return (
    <div className={cn("flex w-full flex-col gap-6", className)}>
      {groups.map((group) => (
        <section key={group.label} aria-label={group.label}>
          <h3 className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {group.label}
          </h3>
          <ol className="flex flex-col">
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <li
                  key={item.id}
                  className="group/item relative flex gap-3 pb-6 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-8 bottom-0 w-px -translate-x-1/2 bg-border group-last/item:hidden"
                  />
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    {Icon ? (
                      <Icon
                        className="size-4 text-muted-foreground"
                        aria-hidden={true}
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-muted-foreground/50"
                      />
                    )}
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5 pt-1.5">
                    <p className="text-sm leading-snug">
                      <span className="font-medium text-foreground">
                        {item.actor}
                      </span>{" "}
                      <span className="text-muted-foreground">
                        {item.action}
                      </span>
                      {item.target ? (
                        <>
                          {" "}
                          <span className="font-medium text-foreground">
                            {item.target}
                          </span>
                        </>
                      ) : null}
                    </p>
                    <time className="text-xs text-muted-foreground">
                      {item.timestamp}
                    </time>
                    {item.meta ? <div className="mt-1.5">{item.meta}</div> : null}
                  </div>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </div>
  )
}
