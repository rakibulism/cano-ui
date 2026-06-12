"use client"

import * as React from "react"
import { format, subDays } from "date-fns"
import type { DateRange } from "react-day-picker"

import { DateRangePicker } from "@/registry/ui/date-range-picker"

export default function DateRangePickerDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  })

  return (
    <div className="flex w-full flex-col items-center gap-4 py-8">
      <DateRangePicker value={range} onChange={setRange} align="start" />
      <p className="text-sm text-muted-foreground">
        {range?.from && range.to
          ? `Showing Acme analytics from ${format(range.from, "LLL d, y")} to ${format(range.to, "LLL d, y")}.`
          : "No date range selected."}
      </p>
    </div>
  )
}
