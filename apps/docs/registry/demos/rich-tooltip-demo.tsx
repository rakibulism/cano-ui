"use client"

import * as React from "react"
import { Bookmark } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RichTooltip, type TooltipSide } from "@/registry/ui/rich-tooltip"

const sides: TooltipSide[] = ["top", "bottom", "left", "right"]

export default function RichTooltipDemo() {
  const [side, setSide] = React.useState<TooltipSide>("top")
  const [withTitle, setWithTitle] = React.useState(false)
  const [withShortcut, setWithShortcut] = React.useState(true)

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Playground: pick a placement and watch the tooltip move live. */}
      <div className="rounded-lg border">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b px-4 py-3">
          <div
            role="radiogroup"
            aria-label="Tooltip placement"
            className="flex items-center gap-1"
          >
            {sides.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={side === s}
                onClick={() => setSide(s)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                  side === s
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="tooltip-title"
              checked={withTitle}
              onCheckedChange={setWithTitle}
            />
            <Label htmlFor="tooltip-title" className="text-xs">
              Title
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="tooltip-shortcut"
              checked={withShortcut}
              onCheckedChange={setWithShortcut}
            />
            <Label htmlFor="tooltip-shortcut" className="text-xs">
              Shortcut
            </Label>
          </div>
        </div>
        <div className="flex min-h-[200px] items-center justify-center p-10">
          <RichTooltip
            open
            side={side}
            content="Save to your bookmarks"
            title={withTitle ? "Bookmark" : undefined}
            shortcut={withShortcut ? ["⌘", "D"] : undefined}
          >
            <Button variant="outline">
              <Bookmark />
              Bookmark
            </Button>
          </RichTooltip>
        </div>
      </div>

      {/* Hover each button for the real (non-pinned) behavior. */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {sides.map((s) => (
          <RichTooltip key={s} side={s} content={`Appears on ${s}`}>
            <Button variant="ghost" size="sm" className="capitalize">
              {s}
            </Button>
          </RichTooltip>
        ))}
      </div>
    </div>
  )
}
