"use client"

import { AspectRatio } from "@/registry/ui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <div className="mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
      <div>
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center rounded-lg border bg-muted text-sm text-muted-foreground"
        >
          16 / 9
        </AspectRatio>
      </div>
      <div>
        <AspectRatio
          ratio={1}
          className="flex items-center justify-center rounded-lg border bg-muted text-sm text-muted-foreground"
        >
          1 / 1
        </AspectRatio>
      </div>
    </div>
  )
}
