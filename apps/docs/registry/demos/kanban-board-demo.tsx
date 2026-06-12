"use client"

import * as React from "react"

import { KanbanBoard, type KanbanColumn } from "@/registry/ui/kanban-board"

const initialColumns: KanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    cards: [
      {
        id: "ACME-101",
        title: "Add SCIM provisioning for enterprise workspaces",
        description:
          "Support automated user lifecycle management via Okta and Entra ID.",
        labels: ["Auth"],
        assignee: { name: "Priya Raman" },
      },
      {
        id: "ACME-102",
        title: "Investigate flaky billing webhook tests",
        description:
          "Stripe webhook integration tests fail intermittently on CI since the runner upgrade.",
        labels: ["Billing", "CI"],
        dueDate: "Jun 24",
      },
      {
        id: "ACME-103",
        title: "Design empty states for the audit log page",
        labels: ["Design"],
        assignee: { name: "Sofia Marlow" },
      },
    ],
  },
  {
    id: "in-progress",
    title: "In progress",
    cards: [
      {
        id: "ACME-94",
        title: "Migrate project search to the new query service",
        description:
          "Move autocomplete and full-text search off the legacy endpoint before it is decommissioned.",
        labels: ["Backend"],
        assignee: { name: "Daniel Okafor" },
        dueDate: "Jun 18",
      },
      {
        id: "ACME-97",
        title: "Ship usage-based billing alerts",
        description:
          "Notify workspace admins at 80% and 100% of their monthly API quota.",
        labels: ["Billing"],
        assignee: { name: "Priya Raman" },
        dueDate: "Jun 20",
      },
    ],
  },
  {
    id: "in-review",
    title: "In review",
    cards: [
      {
        id: "ACME-91",
        title: "Fix avatar upload failing for files over 4 MB",
        description:
          "Client-side resize before upload; reject unsupported formats with a clear error.",
        labels: ["Bug"],
        assignee: { name: "Lena Fischer" },
      },
      {
        id: "ACME-89",
        title: "Add keyboard shortcuts for the command menu",
        labels: ["Frontend"],
        assignee: { name: "Daniel Okafor" },
        dueDate: "Jun 16",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      {
        id: "ACME-85",
        title: "Rotate API signing keys and update docs",
        labels: ["Security"],
        assignee: { name: "Lena Fischer" },
      },
      {
        id: "ACME-82",
        title: "Upgrade monorepo to React 19",
        description:
          "Bump dependencies, remove deprecated APIs, and verify all docs examples render.",
        labels: ["Infra"],
        assignee: { name: "Sofia Marlow" },
      },
    ],
  },
]

export default function KanbanBoardDemo() {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(initialColumns)

  function handleCardMove(
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    index: number
  ) {
    setColumns((current) => {
      const fromColumn = current.find((column) => column.id === fromColumnId)
      const card = fromColumn?.cards.find((item) => item.id === cardId)
      if (!fromColumn || !card) return current

      const sourceIndex = fromColumn.cards.indexOf(card)
      let insertIndex = index
      if (fromColumnId === toColumnId && sourceIndex < insertIndex) {
        insertIndex -= 1
      }

      return current.map((column) => {
        const cards =
          column.id === fromColumnId
            ? column.cards.filter((item) => item.id !== cardId)
            : [...column.cards]
        if (column.id === toColumnId) {
          cards.splice(Math.min(insertIndex, cards.length), 0, card)
        }
        return column.id === fromColumnId || column.id === toColumnId
          ? { ...column, cards }
          : column
      })
    })
  }

  return <KanbanBoard columns={columns} onCardMove={handleCardMove} />
}
