"use client"

import { InvoiceTable, type Invoice } from "@/registry/ui/invoice-table"

const invoices: Invoice[] = [
  {
    id: "1",
    number: "INV-0049",
    date: "Apr 1, 2026",
    amount: "$249.00",
    status: "open",
    description: "Pro plan — monthly",
  },
  {
    id: "2",
    number: "INV-0048",
    date: "Mar 1, 2026",
    amount: "$249.00",
    status: "paid",
    description: "Pro plan — monthly",
  },
  {
    id: "3",
    number: "INV-0047",
    date: "Feb 1, 2026",
    amount: "$249.00",
    status: "paid",
    description: "Pro plan — monthly",
  },
  {
    id: "4",
    number: "INV-0046",
    date: "Jan 1, 2026",
    amount: "$418.50",
    status: "overdue",
    description: "Pro plan + extra seats",
  },
  {
    id: "5",
    number: "INV-0045",
    date: "Dec 1, 2025",
    amount: "$249.00",
    status: "refunded",
    description: "Pro plan — monthly",
  },
]

export default function InvoiceTableDemo() {
  return (
    <div className="w-full">
      <InvoiceTable invoices={invoices} onDownload={() => {}} />
    </div>
  )
}
