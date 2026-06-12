"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Archive, Download } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DataTableColumnHeader,
  DataTablePro,
} from "@/registry/ui/data-table-pro"

type InvoiceStatus = "paid" | "pending" | "refunded" | "failed"

interface Invoice {
  id: string
  customer: string
  email: string
  status: InvoiceStatus
  amount: number
}

const invoices: Invoice[] = [
  {
    id: "INV-1042",
    customer: "Northwind Labs",
    email: "billing@northwindlabs.com",
    status: "paid",
    amount: 1250.0,
  },
  {
    id: "INV-1043",
    customer: "Linear Path Co.",
    email: "accounts@linearpath.co",
    status: "paid",
    amount: 480.0,
  },
  {
    id: "INV-1044",
    customer: "Halcyon Systems",
    email: "finance@halcyon.io",
    status: "pending",
    amount: 3120.5,
  },
  {
    id: "INV-1045",
    customer: "Ridgeline Analytics",
    email: "ap@ridgeline.dev",
    status: "failed",
    amount: 199.0,
  },
  {
    id: "INV-1046",
    customer: "Bluepeak Media",
    email: "ops@bluepeak.media",
    status: "paid",
    amount: 742.25,
  },
  {
    id: "INV-1047",
    customer: "Foundry Eight",
    email: "billing@foundry8.com",
    status: "refunded",
    amount: 96.0,
  },
  {
    id: "INV-1048",
    customer: "Cobalt Works",
    email: "invoices@cobaltworks.app",
    status: "pending",
    amount: 1580.0,
  },
  {
    id: "INV-1049",
    customer: "Meridian Cloud",
    email: "payables@meridiancloud.net",
    status: "paid",
    amount: 2304.75,
  },
  {
    id: "INV-1050",
    customer: "Arbor & Sage",
    email: "hello@arborsage.studio",
    status: "paid",
    amount: 64.0,
  },
]

const statusVariant: Record<
  InvoiceStatus,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  paid: "secondary",
  pending: "outline",
  refunded: "outline",
  failed: "outline",
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("customer")}</span>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<InvoiceStatus>("status")
      return (
        <Badge
          variant={statusVariant[status]}
          className={status === "failed" ? "text-destructive" : undefined}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader
          column={column}
          title="Amount"
          className="-mr-2"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {currency.format(row.getValue("amount"))}
      </div>
    ),
  },
]

export default function DataTableProDemo() {
  return (
    <DataTablePro
      columns={columns}
      data={invoices}
      filterColumn="email"
      filterPlaceholder="Filter by email…"
      enableRowSelection
      showPageSize
      initialPageSize={10}
      bulkActions={
        <>
          <Button variant="outline" size="sm">
            <Download aria-hidden="true" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Archive aria-hidden="true" />
            Archive
          </Button>
        </>
      }
    />
  )
}
