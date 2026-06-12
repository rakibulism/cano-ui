"use client"

import * as React from "react"
import { endOfMonth, format, isSameDay, startOfMonth, subDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

export interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  align?: "start" | "end"
  placeholder?: string
  className?: string
}

interface Preset {
  label: string
  getRange: () => DateRange
}

function getPresets(): Preset[] {
  const today = new Date()

  return [
    { label: "Today", getRange: () => ({ from: today, to: today }) },
    {
      label: "Yesterday",
      getRange: () => ({ from: subDays(today, 1), to: subDays(today, 1) }),
    },
    {
      label: "Last 7 days",
      getRange: () => ({ from: subDays(today, 6), to: today }),
    },
    {
      label: "Last 30 days",
      getRange: () => ({ from: subDays(today, 29), to: today }),
    },
    {
      label: "This month",
      getRange: () => ({ from: startOfMonth(today), to: endOfMonth(today) }),
    },
  ]
}

function rangesMatch(a: DateRange | undefined, b: DateRange): boolean {
  return (
    !!a?.from &&
    !!a.to &&
    !!b.from &&
    !!b.to &&
    isSameDay(a.from, b.from) &&
    isSameDay(a.to, b.to)
  )
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(query.matches)

    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return isMobile
}

export function DateRangePicker({
  value,
  onChange,
  align = "start",
  placeholder = "Pick a date range",
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<DateRange | undefined>(value)
  const isMobile = useIsMobile()
  const presets = React.useMemo(getPresets, [open])

  const activePreset =
    presets.find((preset) => rangesMatch(draft, preset.getRange()))?.label ??
    (draft?.from ? "Custom" : undefined)

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setDraft(value)
    }
    setOpen(next)
  }

  const handleApply = () => {
    onChange?.(draft)
    setOpen(false)
  }

  const presetButtons = (
    <>
      {presets.map((preset) => (
        <Button
          key={preset.label}
          variant="ghost"
          size="sm"
          className={cn(
            "shrink-0 justify-start font-normal",
            activePreset === preset.label && "bg-accent text-accent-foreground"
          )}
          onClick={() => setDraft(preset.getRange())}
        >
          {preset.label}
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "shrink-0 justify-start font-normal",
          activePreset === "Custom" && "bg-accent text-accent-foreground"
        )}
        onClick={() => setDraft(undefined)}
      >
        Custom
      </Button>
    </>
  )

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            !value?.from && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, "LLL d, y")} –{" "}
                {format(value.to, "LLL d, y")}
              </>
            ) : (
              format(value.from, "LLL d, y")
            )
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <div className="flex flex-col md:flex-row">
          {isMobile ? (
            <div className="flex gap-1 overflow-x-auto border-b p-2">
              {presetButtons}
            </div>
          ) : (
            <div className="flex flex-col gap-1 p-2">{presetButtons}</div>
          )}
          {!isMobile ? (
            <Separator orientation="vertical" className="h-auto" />
          ) : null}
          <Calendar
            mode="range"
            numberOfMonths={isMobile ? 1 : 2}
            selected={draft}
            onSelect={setDraft}
            defaultMonth={draft?.from ?? value?.from}
          />
        </div>
        <div className="flex items-center justify-end gap-2 border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDraft(undefined)}
          >
            Clear
          </Button>
          <Button size="sm" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
