"use client"

import { MousePointer2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RichTooltip } from "@/registry/ui/rich-tooltip"

export default function RichTooltipDemo() {
  return (
    <div className="relative h-[320px] w-full rounded-lg border bg-muted/20">
      <p className="absolute inset-x-0 top-1/2 mt-10 text-center text-xs text-muted-foreground">
        Hover a tab to preview its placement
      </p>

      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <RichTooltip side="top" content="Appears on top" avoidCollisions={false}>
          <Button variant="outline" size="sm">
            Top
          </Button>
        </RichTooltip>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <RichTooltip side="bottom" content="Appears on bottom" avoidCollisions={false}>
          <Button variant="outline" size="sm">
            Bottom
          </Button>
        </RichTooltip>
      </div>

      <div className="absolute left-[15%] top-1/2 -translate-y-1/2">
        <RichTooltip side="left" content="Appears on left" avoidCollisions={false}>
          <Button variant="outline" size="sm">
            Left
          </Button>
        </RichTooltip>
      </div>

      <div className="absolute right-[15%] top-1/2 -translate-y-1/2">
        <RichTooltip side="right" content="Appears on right" avoidCollisions={false}>
          <Button variant="outline" size="sm">
            Right
          </Button>
        </RichTooltip>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <RichTooltip
          side="top"
          title="Rich tooltip"
          content="Add a title and shortcut keys"
          shortcut={["⌘", "K"]}
        >
          <Button size="sm">
            <MousePointer2 />
            Center
          </Button>
        </RichTooltip>
      </div>
    </div>
  )
}
