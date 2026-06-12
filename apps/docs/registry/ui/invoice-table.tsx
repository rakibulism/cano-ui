import * as React from "react"
import { Download } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type InvoiceStatus = "paid" | "open" | "overdue" | "refunded"

export interface Invoice {
  id: string
  /** Invoice number shown to the user, e.g. "INV-0042". */
  number: string
  date: string
  /** Pre-formatted amount, e.g. "$249.00". */
  amount: string
  status: InvoiceStatus
  description?: string
}

export interface InvoiceTableProps extends React.ComponentProps<"div"> {
  invoices: Invoice[]
  onDownload?: (invoice: Invoice) => void
  emptyMessage?: string
}

const statusStyles: Record<InvoiceStatus, string> = {
  paid: "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  open: "border-transparent bg-blue-500/15 text-blue-700 dark:text-blue-400",
  overdue:
    "border-transparent bg-destructive/15 text-destructive dark:text-red-400",
  refunded: "border-transparent bg-muted text-muted-foreground",
}

const statusLabels: Record<InvoiceStatus, string> = {
  paid: "Paid",
  open: "Open",
  overdue: "Overdue",
  refunded: "Refunded",
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <Badge variant="outline" className={cn("capitalize", statusStyles[status])}>
      {statusLabels[status]}
    </Badge>
  )
}

export function InvoiceTable({
  invoices,
  onDownload,
  emptyMessage = "No invoices yet.",
  className,
  ...props
}: InvoiceTableProps) {
  return (
    <div
      data-slot="invoice-table"
      className={cn("w-full overflow-hidden rounded-lg border", className)}
      {...props}
    >
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Invoice</TableHead>
            <TableHead className="max-sm:hidden">Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            {onDownload ? (
              <TableHead className="w-12">
                <span className="sr-only">Download</span>
              </TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={onDownload ? 5 : 4}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{invoice.number}</span>
                    {invoice.description ? (
                      <span className="text-xs text-muted-foreground max-sm:hidden">
                        {invoice.description}
                      </span>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground max-sm:hidden">
                  {invoice.date}
                </TableCell>
                <TableCell>
                  <InvoiceStatusBadge status={invoice.status} />
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {invoice.amount}
                </TableCell>
                {onDownload ? (
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      aria-label={`Download ${invoice.number}`}
                      onClick={() => onDownload(invoice)}
                    >
                      <Download aria-hidden="true" />
                    </Button>
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
