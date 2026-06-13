"use client"

import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/registry/ui/scroll-area"

const tags = Array.from({ length: 40 }, (_, i) => `v1.2.0-canary.${40 - i}`)

export default function ScrollAreaDemo() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <ScrollArea className="h-64 rounded-lg border">
        <div className="p-4">
          <h4 className="mb-3 text-sm font-medium leading-none">Releases</h4>
          {tags.map((tag) => (
            <div key={tag}>
              <div className="py-1.5 font-mono text-sm">{tag}</div>
              <Separator />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
