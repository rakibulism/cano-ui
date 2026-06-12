"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface PaginationBarProps {
  /** Current page, 1-based. */
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  /** Numbered buttons shown on each side of the current page. */
  siblingCount?: number
  /** Optional "Showing x–y of z" caption; provide both to render it. */
  totalItems?: number
  pageSize?: number
  className?: string
}

const GAP = "…" as const

/** 1 … 4 [5] 6 … 20 — numbers to render with gaps collapsed. */
function buildRange(page: number, pageCount: number, siblingCount: number) {
  const range: (number | typeof GAP)[] = []
  const start = Math.max(2, page - siblingCount)
  const end = Math.min(pageCount - 1, page + siblingCount)

  range.push(1)
  if (start > 2) range.push(GAP)
  for (let i = start; i <= end; i++) range.push(i)
  if (end < pageCount - 1) range.push(GAP)
  if (pageCount > 1) range.push(pageCount)
  return range
}

export function PaginationBar({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  totalItems,
  pageSize,
  className,
}: PaginationBarProps) {
  const range = buildRange(page, pageCount, siblingCount)
  const showCaption = totalItems !== undefined && pageSize !== undefined
  const from = showCaption ? (page - 1) * pageSize + 1 : 0
  const to = showCaption ? Math.min(page * pageSize, totalItems) : 0

  return (
    <nav
      aria-label="Pagination"
      data-slot="pagination-bar"
      className={cn(
        "flex w-full flex-wrap items-center justify-between gap-3",
        className
      )}
    >
      {showCaption ? (
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{from}–{to}</span>{" "}
          of <span className="font-medium text-foreground">{totalItems}</span>
        </p>
      ) : null}
      <div className={cn("flex items-center gap-1", !showCaption && "mx-auto")}>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        {range.map((item, i) =>
          item === GAP ? (
            <span
              key={`gap-${i}`}
              aria-hidden="true"
              className="px-1.5 text-sm text-muted-foreground"
            >
              {GAP}
            </span>
          ) : (
            <Button
              key={item}
              variant={item === page ? "outline" : "ghost"}
              size="icon"
              aria-label={`Page ${item}`}
              aria-current={item === page ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className="tabular-nums"
            >
              {item}
            </Button>
          )
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </nav>
  )
}
