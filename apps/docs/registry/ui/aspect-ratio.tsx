import * as React from "react"

import { cn } from "@/lib/utils"

export interface AspectRatioProps extends React.ComponentProps<"div"> {
  /** Width / height, e.g. 16 / 9. Defaults to 1. */
  ratio?: number
}

/** Constrains its content to a given width-to-height ratio. */
function AspectRatio({
  ratio = 1,
  className,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{ aspectRatio: ratio, ...style }}
      className={cn("relative w-full", className)}
      {...props}
    />
  )
}

export { AspectRatio }
