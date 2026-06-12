"use client"

import * as React from "react"

import { PaginationBar } from "@/registry/ui/pagination-bar"

export default function PaginationBarDemo() {
  const [page, setPage] = React.useState(5)
  const [simple, setSimple] = React.useState(1)

  return (
    <div className="flex w-full flex-col gap-8">
      <PaginationBar
        page={page}
        pageCount={24}
        onPageChange={setPage}
        totalItems={1175}
        pageSize={50}
      />
      <PaginationBar page={simple} pageCount={5} onPageChange={setSimple} />
    </div>
  )
}
