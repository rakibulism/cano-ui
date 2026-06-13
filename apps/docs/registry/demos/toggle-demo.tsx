"use client"

import { Bold, Italic, Underline } from "lucide-react"

import { Toggle } from "@/registry/ui/toggle"

export default function ToggleDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <Toggle aria-label="Toggle bold" defaultPressed>
        <Bold />
      </Toggle>
      <Toggle aria-label="Toggle italic" variant="outline">
        <Italic />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline />
        Underline
      </Toggle>
      <Toggle aria-label="Disabled" disabled>
        <Bold />
      </Toggle>
    </div>
  )
}
