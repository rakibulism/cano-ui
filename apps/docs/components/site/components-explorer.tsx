"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
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

const STORAGE_KEY = "components-collapsed"

function groupByCategory(items: RegistryMeta[]) {
  const groups = new Map<string, RegistryMeta[]>()
  for (const item of items) {
    if (!groups.has(item.category)) groups.set(item.category, [])
    groups.get(item.category)!.push(item)
  }
  return [...groups.entries()].sort(
    (a, b) =>
      ((CATEGORY_ORDER.indexOf(a[0]) + 100) % 100) -
      ((CATEGORY_ORDER.indexOf(b[0]) + 100) % 100)
  )
}

export function ComponentsExplorer({ items }: { items: RegistryMeta[] }) {
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState<string | null>(null)
  const [collapsed, setCollapsed] = React.useState<Set<string>>(new Set())
  const q = query.trim().toLowerCase()

  // Hydrate collapsed state from localStorage (after mount, so SSR matches).
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setCollapsed(new Set(JSON.parse(saved)))
    } catch {
      // ignore
    }
  }, [])

  function persist(next: Set<string>) {
    setCollapsed(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
    } catch {
      // ignore
    }
  }

  const filtered = q
    ? items.filter((item) =>
        `${item.name} ${item.title} ${item.description} ${item.category}`
          .toLowerCase()
          .includes(q)
      )
    : items
  const groups = groupByCategory(filtered)
  const categoryKey = groups.map(([c]) => c).join(",")

  // While searching, force every section open so matches are never hidden.
  const isOpen = (category: string) => (q ? true : !collapsed.has(category))
  const allCollapsed =
    !q && groups.length > 0 && groups.every(([c]) => collapsed.has(c))

  function toggle(category: string) {
    const next = new Set(collapsed)
    if (next.has(category)) next.delete(category)
    else next.add(category)
    persist(next)
  }

  function expandAll() {
    persist(new Set())
  }

  function collapseAll() {
    persist(new Set(groups.map(([c]) => c)))
  }

  // Scroll-spy: highlight the category the reader is currently in.
  React.useEffect(() => {
    const cats = categoryKey ? categoryKey.split(",") : []
    if (cats.length === 0) {
      setActive(null)
      return
    }
    const compute = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      if (atBottom) {
        setActive(cats[cats.length - 1])
        return
      }
      let current = cats[0]
      for (const c of cats) {
        const el = document.getElementById(`cat-${c}`)
        if (el && el.getBoundingClientRect().top <= 100) current = c
        else break
      }
      setActive(current)
    }
    compute()
    window.addEventListener("scroll", compute, { passive: true })
    window.addEventListener("resize", compute)
    return () => {
      window.removeEventListener("scroll", compute)
      window.removeEventListener("resize", compute)
    }
  }, [categoryKey])

  function jumpToCategory(category: string) {
    // Expand the target first so there's content to scroll to.
    if (collapsed.has(category)) {
      const next = new Set(collapsed)
      next.delete(category)
      persist(next)
    }
    requestAnimationFrame(() =>
      document
        .getElementById(`cat-${category}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    )
  }

  return (
    <div className="mt-8 grid gap-10 md:grid-cols-[180px_minmax(0,1fr)]">
      <aside className="hidden md:block">
        {groups.length > 0 ? (
          <nav aria-label="Categories" className="sticky top-20">
            <p className="px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Categories
            </p>
            <ul className="mt-2 flex flex-col gap-0.5">
              {groups.map(([category, group]) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => jumpToCategory(category)}
                    aria-current={active === category ? "true" : undefined}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm capitalize transition-colors",
                      active === category
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  >
                    {category.replace("-", " ")}
                    <span className="text-xs tabular-nums text-muted-foreground/70">
                      {group.length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2 border-t pt-2">
              <button
                type="button"
                onClick={allCollapsed ? expandAll : collapseAll}
                disabled={!!q}
                className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground disabled:opacity-50"
              >
                {allCollapsed ? "Show all components" : "Collapse all"}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-3.5 shrink-0 transition-transform",
                    allCollapsed && "-rotate-90"
                  )}
                />
              </button>
            </div>
          </nav>
        ) : null}
      </aside>

      <div className="min-w-0">
        <div className="max-w-md">
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
          groups.map(([category, group]) => {
            const open = isOpen(category)
            return (
              <section
                key={category}
                id={`cat-${category}`}
                className="mt-10 scroll-mt-20 first:mt-8"
              >
                <button
                  type="button"
                  onClick={() => toggle(category)}
                  aria-expanded={open}
                  className="group flex w-full items-center gap-2 rounded-md py-1 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-4 shrink-0 transition-transform duration-200",
                      !open && "-rotate-90"
                    )}
                  />
                  {category.replace("-", " ")}
                  <span className="tabular-nums text-muted-foreground/60">
                    {group.length}
                  </span>
                </button>
                {open ? (
                  <ul className="mt-3 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
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
                            <SearchHighlight
                              text={item.description}
                              query={query}
                            />
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            )
          })
        )}
      </div>
    </div>
  )
}
