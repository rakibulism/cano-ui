"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/ui/collapsible"

export default function CollapsibleDemo() {
  const [open, setOpen] = React.useState(true)

  return (
    <div className="mx-auto w-full max-w-sm">
      <Collapsible open={open} onOpenChange={setOpen} className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 rounded-md border px-4 py-2">
          <span className="text-sm font-medium">@acme starred 3 repos</span>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @acme/ui
        </div>
        <CollapsibleContent className="flex flex-col gap-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm">
            @acme/cli
          </div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm">
            @acme/registry
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
