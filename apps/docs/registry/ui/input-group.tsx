import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Fuses inputs, addons, and buttons into one control: outer corners stay
 * rounded, inner corners flatten, and shared edges collapse.
 */
export function InputGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="input-group"
      className={cn(
        "isolate flex w-full items-stretch",
        "[&>*]:rounded-none [&>*]:shadow-none [&>*:focus-visible]:z-10 [&>*:focus-within]:z-10",
        "[&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md",
        "[&>*:not(:first-child)]:-ml-px",
        "[&>input]:h-auto [&>input]:flex-1",
        className
      )}
      {...props}
    />
  )
}

export interface InputGroupAddonProps extends React.ComponentProps<"span"> {
  /** Render as an interactive element (e.g. wrapping a select). */
  asChild?: boolean
}

/** Static text or icon segment, e.g. "https://" or "@". */
export function InputGroupAddon({
  className,
  ...props
}: InputGroupAddonProps) {
  return (
    <span
      data-slot="input-group-addon"
      className={cn(
        "flex items-center border border-input bg-muted px-3 text-sm text-muted-foreground [&>svg]:size-4",
        className
      )}
      {...props}
    />
  )
}
