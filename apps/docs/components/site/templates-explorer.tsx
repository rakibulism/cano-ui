"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, LayoutTemplate } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  CATEGORY_LABEL,
  type TemplateKind,
  type TemplateMeta,
} from "@/lib/templates"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/registry/ui/search-bar"
import { SearchHighlight } from "@/registry/ui/search-results"

type KindFilter = "all" | TemplateKind
type PagesFilter = "all" | "single" | "multi"
type Sort = "newest" | "name"

export function TemplatesExplorer({ items }: { items: TemplateMeta[] }) {
  const [query, setQuery] = React.useState("")
  const [kind, setKind] = React.useState<KindFilter>("all")
  const [pages, setPages] = React.useState<PagesFilter>("all")
  const [category, setCategory] = React.useState<string>("all")
  const [sort, setSort] = React.useState<Sort>("newest")

  const q = query.trim().toLowerCase()

  const filtered = items
    .filter((t) => (kind === "all" ? true : t.kind === kind))
    .filter((t) => (pages === "all" ? true : t.pages === pages))
    .filter((t) => (category === "all" ? true : t.category === category))
    .filter((t) =>
      q
        ? `${t.name} ${t.description} ${t.tags.join(" ")} ${CATEGORY_LABEL[t.category] ?? ""}`
            .toLowerCase()
            .includes(q)
        : true
    )
    .sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : b.order - a.order
    )

  // Categories available within the current kind selection.
  const categories = [
    ...new Set(
      items
        .filter((t) => (kind === "all" ? true : t.kind === kind))
        .map((t) => t.category)
    ),
  ]

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3 py-1 text-sm transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
    )

  return (
    <div className="mt-8 flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="max-w-xs flex-1">
          <SearchBar
            placeholder={`Search ${items.length} templates…`}
            value={query}
            onValueChange={setQuery}
            aria-label="Search templates"
          />
        </div>
        <label className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-9 rounded-md border border-input bg-transparent px-2 text-sm text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="newest">Newest</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(["all", "website", "saas"] as KindFilter[]).map((k) => (
          <button
            key={k}
            onClick={() => {
              setKind(k)
              setCategory("all")
            }}
            className={chip(kind === k)}
          >
            {k === "all" ? "All" : k === "saas" ? "SaaS products" : "Websites"}
          </button>
        ))}
        <span className="mx-1 h-5 w-px bg-border" />
        {(["all", "single", "multi"] as PagesFilter[]).map((p) => (
          <button key={p} onClick={() => setPages(p)} className={chip(pages === p)}>
            {p === "all" ? "Any length" : p === "single" ? "Single page" : "Multi-page"}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setCategory("all")} className={chip(category === "all")}>
          All categories
        </button>
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={chip(category === c)}>
            {CATEGORY_LABEL[c] ?? c}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground" role="status">
        {filtered.length} template{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-lg border px-6 py-16 text-center">
          <p className="text-sm font-medium">No templates match</p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Try clearing a filter or searching for something else.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border transition-colors hover:border-foreground/20"
            >
              <div className="flex aspect-video items-center justify-center border-b bg-muted/40 text-muted-foreground">
                <LayoutTemplate className="size-8 opacity-40" aria-hidden="true" />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">
                    <SearchHighlight text={t.name} query={query} />
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  <SearchHighlight text={t.description} query={query} />
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
                  <Badge variant="secondary" className="capitalize">
                    {t.kind === "saas" ? "SaaS" : "Website"}
                  </Badge>
                  <Badge variant="outline">{CATEGORY_LABEL[t.category] ?? t.category}</Badge>
                  <Badge variant="outline" className="capitalize">{t.pages}-page</Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
