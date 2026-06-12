import * as React from "react"

import { cn } from "@/lib/utils"

function ErrorPage({
  code,
  title,
  description,
  actions,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  code?: string | number
  title: string
  description?: string
  actions?: React.ReactNode
}) {
  return (
    <div
      data-slot="error-page"
      className={cn(
        "flex min-h-full flex-col items-center justify-center bg-background px-6 py-24 text-center",
        className
      )}
      {...props}
    >
      {code != null && (
        <p
          aria-hidden="true"
          className="text-7xl font-semibold tracking-tight text-foreground sm:text-8xl"
        >
          {code}
        </p>
      )}
      <h1 className="mt-6 text-xl font-semibold tracking-tight">
        {code != null && <span className="sr-only">Error {code}: </span>}
        {title}
      </h1>
      {description && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {(actions || children) && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {actions}
          {children}
        </div>
      )}
    </div>
  )
}

export { ErrorPage }
