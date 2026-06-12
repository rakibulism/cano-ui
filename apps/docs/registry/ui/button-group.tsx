import * as React from "react"

import { cn } from "@/lib/utils"

export interface ButtonGroupProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical"
}

/**
 * Visually fuses the buttons placed inside it into a single segmented
 * control: outer corners stay rounded, inner corners flatten, and shared
 * edges collapse to a single border.
 */
export function ButtonGroup({
  orientation = "horizontal",
  className,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "isolate inline-flex w-fit",
        "[&>*]:rounded-none [&>*]:shadow-none [&>*:focus-visible]:z-10",
        orientation === "horizontal"
          ? [
              "[&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md",
              "[&>*:not(:first-child)]:-ml-px",
            ]
          : [
              "flex-col",
              "[&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md",
              "[&>*:not(:first-child)]:-mt-px",
            ],
        className
      )}
      {...props}
    />
  )
}
