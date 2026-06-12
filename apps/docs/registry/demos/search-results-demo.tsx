"use client"

import * as React from "react"
import { CreditCard, FileText, Settings, Users } from "lucide-react"

import { SearchBar } from "@/registry/ui/search-bar"
import {
  SearchResults,
  type SearchResultGroup,
} from "@/registry/ui/search-results"

const data: SearchResultGroup[] = [
  {
    label: "Pages",
    items: [
      { id: "1", title: "Billing settings", description: "Manage plans, invoices, and payment methods", icon: <CreditCard />, meta: "Settings" },
      { id: "2", title: "Team members", description: "Invite teammates and manage roles", icon: <Users />, meta: "Settings" },
      { id: "3", title: "General settings", description: "Workspace name, appearance, and locale", icon: <Settings />, meta: "Settings" },
    ],
  },
  {
    label: "Docs",
    items: [
      { id: "4", title: "Billing webhooks", description: "React to invoice and subscription events", icon: <FileText />, meta: "Guide" },
      { id: "5", title: "Usage-based billing", description: "Meter API calls and bill on consumption", icon: <FileText />, meta: "Guide" },
    ],
  },
]

export default function SearchResultsDemo() {
  const [query, setQuery] = React.useState("bill")

  const filtered = data.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      `${item.title} ${item.description}`
        .toLowerCase()
        .includes(query.trim().toLowerCase())
    ),
  }))

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <SearchBar
        placeholder="Search pages and docs…"
        value={query}
        onValueChange={setQuery}
      />
      <SearchResults query={query} groups={filtered} onSelect={() => {}} />
    </div>
  )
}
