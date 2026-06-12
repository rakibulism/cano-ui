"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** Wraps case-insensitive matches of `query` in a highlight mark. */
export function SearchHighlight({
  text,
  query,
}: {
  text: string
  query: string
}) {
  const q = query.trim()
  if (!q) return <>{text}</>
  const parts = text.split(
    new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig")
  )
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark
            key={i}
            className="rounded-xs bg-amber-200/70 text-inherit dark:bg-amber-500/30"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  )
}

export interface SearchResultItem {
  id: string
  title: string
  description?: string
  /** Icon or thumbnail slot rendered before the text. */
  icon?: React.ReactNode
  /** Small trailing hint, e.g. a category or shortcut. */
  meta?: React.ReactNode
}

export interface SearchResultGroup {
  label: string
  items: SearchResultItem[]
}

export interface SearchResultsProps {
  /** The query used for highlighting matches. */
  query?: string
  groups: SearchResultGroup[]
  onSelect?: (item: SearchResultItem) => void
  emptyMessage?: string
  className?: string
}

export function SearchResults({
  query = "",
  groups,
  onSelect,
  emptyMessage = "No results found.",
  className,
}: SearchResultsProps) {
  const nonEmpty = groups.filter((g) => g.items.length > 0)

  return (
    <div
      data-slot="search-results"
      className={cn("w-full overflow-hidden rounded-lg border", className)}
    >
      {nonEmpty.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-muted-foreground">
          {emptyMessage}
          {query ? (
            <>
              {" "}
              for <span className="font-medium text-foreground">“{query}”</span>
            </>
          ) : null}
        </p>
      ) : (
        <div className="max-h-96 divide-y overflow-y-auto">
          {nonEmpty.map((group) => (
            <section key={group.label} aria-label={group.label}>
              <h3 className="bg-muted/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {group.label}
              </h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={onSelect ? () => onSelect(item) : undefined}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none"
                    >
                      {item.icon ? (
                        <span
                          aria-hidden="true"
                          className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-muted/50 text-muted-foreground [&>svg]:size-4"
                        >
                          {item.icon}
                        </span>
                      ) : null}
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium">
                          <SearchHighlight text={item.title} query={query} />
                        </span>
                        {item.description ? (
                          <span className="truncate text-xs text-muted-foreground">
                            <SearchHighlight
                              text={item.description}
                              query={query}
                            />
                          </span>
                        ) : null}
                      </span>
                      {item.meta ? (
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {item.meta}
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
