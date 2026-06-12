"use client"

import * as React from "react"

import { ComboboxFilter, FilterBar } from "@/registry/ui/combobox-filters"

type Project = {
  name: string
  status: "active" | "paused" | "archived"
  priority: "low" | "medium" | "high"
}

const projects: Project[] = [
  { name: "Acme Billing Revamp", status: "active", priority: "high" },
  { name: "Acme Onboarding Flow", status: "active", priority: "medium" },
  { name: "Acme Mobile App", status: "paused", priority: "high" },
  { name: "Acme Docs Refresh", status: "active", priority: "low" },
  { name: "Acme Legacy Importer", status: "archived", priority: "low" },
  { name: "Acme Audit Logs", status: "paused", priority: "medium" },
]

const statusOptions = [
  { label: "Active", value: "active", count: 3 },
  { label: "Paused", value: "paused", count: 2 },
  { label: "Archived", value: "archived", count: 1 },
]

const priorityOptions = [
  { label: "Low", value: "low", count: 2 },
  { label: "Medium", value: "medium", count: 2 },
  { label: "High", value: "high", count: 2 },
]

export default function ComboboxFiltersDemo() {
  const [status, setStatus] = React.useState<string[]>([])
  const [priority, setPriority] = React.useState<string[]>([])

  const filtered = projects.filter(
    (project) =>
      (status.length === 0 || status.includes(project.status)) &&
      (priority.length === 0 || priority.includes(project.priority))
  )

  return (
    <div className="w-full max-w-2xl space-y-4">
      <FilterBar>
        <ComboboxFilter
          title="Status"
          options={statusOptions}
          selected={status}
          onChange={setStatus}
        />
        <ComboboxFilter
          title="Priority"
          options={priorityOptions}
          selected={priority}
          onChange={setPriority}
        />
      </FilterBar>
      <ul className="divide-y rounded-lg border">
        {filtered.length === 0 ? (
          <li className="px-4 py-8 text-center text-sm text-muted-foreground">
            No projects match the current filters.
          </li>
        ) : (
          filtered.map((project) => (
            <li
              key={project.name}
              className="flex items-center justify-between px-4 py-3 text-sm"
            >
              <span className="font-medium">{project.name}</span>
              <span className="text-xs capitalize text-muted-foreground">
                {project.status} · {project.priority}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
