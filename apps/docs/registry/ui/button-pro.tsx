"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface ButtonProProps extends React.ComponentProps<typeof Button> {
  /** Shows a spinner, disables the button, and swaps the label. */
  loading?: boolean
  /** Label shown while loading; falls back to children. */
  loadingText?: string
  /** Icon rendered before the label. */
  icon?: React.ReactNode
  /** Icon rendered after the label. */
  iconRight?: React.ReactNode
}

export function ButtonPro({
  loading = false,
  loadingText,
  icon,
  iconRight,
  disabled,
  children,
  className,
  ...props
}: ButtonProProps) {
  return (
    <Button
      data-slot="button-pro"
      data-loading={loading || undefined}
      disabled={disabled || loading}
      className={cn(loading && "relative", className)}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" aria-hidden="true" />
      ) : (
        icon
      )}
      {loading ? (loadingText ?? children) : children}
      {!loading && iconRight}
    </Button>
  )
}
