"use client"

import * as React from "react"
import { MousePointer2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RichTooltip, type TooltipSide } from "@/registry/ui/rich-tooltip"

const tabs: { side: TooltipSide; className: string }[] = [
  { side: "top", className: "top-8 left-1/2 -translate-x-1/2" },
  { side: "bottom", className: "bottom-8 left-1/2 -translate-x-1/2" },
  { side: "left", className: "left-[15%] top-1/2 -translate-y-1/2" },
  { side: "right", className: "right-[15%] top-1/2 -translate-y-1/2" },
]

export default function RichTooltipDemo() {
  const [withTitle, setWithTitle] = React.useState(false)
  const [withShortcut, setWithShortcut] = React.useState(true)
  const [bounded, setBounded] = React.useState(false)
  const [box, setBox] = React.useState<HTMLDivElement | null>(null)

  // With the bound box on, the playground border becomes the collision
  // boundary, so tooltips flip inward instead of overflowing it.
  const collision = bounded
    ? { avoidCollisions: true, collisionBoundary: box, collisionPadding: 8 }
    : { avoidCollisions: false }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
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
        <div className="flex items-center gap-2">
          <Switch
            id="tooltip-bounded"
            checked={bounded}
            onCheckedChange={setBounded}
          />
          <Label htmlFor="tooltip-bounded" className="text-xs">
            Bound box
          </Label>
        </div>
      </div>

      <div
        ref={setBox}
        className={cn(
          "relative h-[320px] w-full rounded-lg border transition-colors",
          bounded ? "border-primary/40 bg-muted/30" : "bg-muted/20"
        )}
      >
        <p className="absolute inset-x-0 top-1/2 mt-10 text-center text-xs text-muted-foreground">
          {bounded
            ? "Tooltips now flip inward to stay inside the box"
            : "Hover a tab to preview its placement"}
        </p>

        {tabs.map(({ side, className }) => (
          <div key={side} className={cn("absolute", className)}>
            <RichTooltip
              side={side}
              content={`side="${side}"`}
              title={withTitle ? "Placement" : undefined}
              shortcut={withShortcut ? ["⌘", side[0].toUpperCase()] : undefined}
              {...collision}
            >
              <Button variant="outline" size="sm" className="capitalize">
                {side}
              </Button>
            </RichTooltip>
          </div>
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <RichTooltip
            side="top"
            content="Tooltips can hold rich content"
            title={withTitle ? "Rich tooltip" : undefined}
            shortcut={withShortcut ? ["⌘", "K"] : undefined}
            {...collision}
          >
            <Button size="sm">
              <MousePointer2 />
              Center
            </Button>
          </RichTooltip>
        </div>
      </div>
    </div>
  )
}
