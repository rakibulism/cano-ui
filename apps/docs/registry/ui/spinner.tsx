import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.ComponentProps<"svg"> {
  /** Accessible label; defaults to "Loading". */
  label?: string
}

/** An accessible loading spinner. Sizes via className, e.g. size-6. */
function Spinner({ className, label = "Loading", ...props }: SpinnerProps) {
  return (
    <Loader2
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn("size-4 shrink-0 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
