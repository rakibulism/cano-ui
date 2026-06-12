"use client"

import * as React from "react"

import { SearchBar } from "@/registry/ui/search-bar"

export default function SearchBarDemo() {
  const [query, setQuery] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <SearchBar
        placeholder="Search components…"
        shortcut={["⌘", "K"]}
        value={query}
        onValueChange={(next) => {
          setQuery(next)
          setLoading(true)
          setTimeout(() => setLoading(false), 600)
        }}
        loading={loading}
      />
      <SearchBar placeholder="Search docs…" defaultValue="kanban board" />
      <p className="text-center text-xs text-muted-foreground">
        Try pressing ⌘K (or Ctrl+K) — it focuses the first field from anywhere
        on the page.
      </p>
    </div>
  )
}
