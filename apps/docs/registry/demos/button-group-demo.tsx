"use client"

import * as React from "react"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Calendar,
  ChevronDown,
  List,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/registry/ui/button-group"

const alignments = [
  { value: "left", icon: AlignLeft, label: "Align left" },
  { value: "center", icon: AlignCenter, label: "Align center" },
  { value: "right", icon: AlignRight, label: "Align right" },
]

export default function ButtonGroupDemo() {
  const [align, setAlign] = React.useState("left")
  const [view, setView] = React.useState("list")

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <ButtonGroup>
          {alignments.map(({ value, icon: Icon, label }) => (
            <Button
              key={value}
              variant="outline"
              size="icon"
              aria-label={label}
              aria-pressed={align === value}
              className={cn(align === value && "bg-accent")}
              onClick={() => setAlign(value)}
            >
              <Icon />
            </Button>
          ))}
        </ButtonGroup>

        <ButtonGroup>
          <Button
            variant="outline"
            aria-pressed={view === "list"}
            className={cn(view === "list" && "bg-accent")}
            onClick={() => setView("list")}
          >
            <List />
            List
          </Button>
          <Button
            variant="outline"
            aria-pressed={view === "calendar"}
            className={cn(view === "calendar" && "bg-accent")}
            onClick={() => setView("calendar")}
          >
            <Calendar />
            Calendar
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button>Merge pull request</Button>
          <Button size="icon" aria-label="More merge options">
            <ChevronDown />
          </Button>
        </ButtonGroup>
      </div>

      <ButtonGroup orientation="vertical">
        <Button variant="outline" size="sm">
          Day
        </Button>
        <Button variant="outline" size="sm">
          Week
        </Button>
        <Button variant="outline" size="sm">
          Month
        </Button>
      </ButtonGroup>
    </div>
  )
}
