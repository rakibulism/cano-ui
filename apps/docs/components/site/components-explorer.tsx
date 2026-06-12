"use client"

import * as React from "react"
import Link from "next/link"

import type { RegistryMeta } from "@/lib/registry"
import { SearchBar } from "@/registry/ui/search-bar"
import { SearchHighlight } from "@/registry/ui/search-results"

const CATEGORY_ORDER = [
  "layout",
  "data",
  "navigation",
  "input",
  "flow",
  "auth",
  "dashboard",
  "data-viz",
  "marketing",
  "profile",
  "feedback",
]

function groupByCategory(items: RegistryMeta[]) {
  const groups = new Map<string, RegistryMeta[]>()
  for (const item of items) {
    if (!groups.has(item.category)) groups.set(item.category, [])
    groups.get(item.category)!.push(item)
  }
  return [...groups.entries()].sort(
    (a, b) =>
      (CATEGORY_ORDER.indexOf(a[0]) + 100) % 100 -
      ((CATEGORY_ORDER.indexOf(b[0]) + 100) % 100)
  )
}

export function ComponentsExplorer({ items }: { items: RegistryMeta[] }) {
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()

  const filtered = q
    ? items.filter((item) =>
        `${item.name} ${item.title} ${item.description} ${item.category}`
          .toLowerCase()
          .includes(q)
      )
    : items
  const groups = groupByCategory(filtered)

  return (
    <>
      <div className="mt-8 max-w-md">
        <SearchBar
          placeholder={`Search ${items.length} components…`}
          shortcut={["⌘", "K"]}
          value={query}
          onValueChange={setQuery}
          aria-label="Search components"
        />
      </div>
      {q ? (
        <p className="mt-3 text-sm text-muted-foreground" role="status">
          {filtered.length === 0
            ? "No components match"
            : `${filtered.length} component${filtered.length === 1 ? "" : "s"} matching`}{" "}
          <span className="font-medium text-foreground">“{query}”</span>
        </p>
      ) : null}

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-lg border px-6 py-16 text-center">
          <p className="text-sm font-medium">Nothing found</p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Try a different term — e.g. “table”, “chart”, or “dialog”.
          </p>
        </div>
      ) : (
        groups.map(([category, group]) => (
          <section key={category} className="mt-12">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {category.replace("-", " ")}
            </h2>
            <ul className="mt-4 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {group.map((item) => (
                <li key={item.name} className="bg-background">
                  <Link
                    href={`/components/${item.name}`}
                    className="block h-full p-5 transition-colors hover:bg-accent/50"
                  >
                    <span className="text-sm font-medium">
                      <SearchHighlight text={item.title} query={query} />
                    </span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <SearchHighlight text={item.description} query={query} />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </>
  )
}
