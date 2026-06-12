"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface InputFieldProps
  extends Omit<React.ComponentProps<"input">, "size"> {
  label?: string
  /** Helper text under the field; replaced by `error` when set. */
  description?: string
  /** Error message — colors the border and text. */
  error?: string
  /** Icon rendered inside the field, before the text. */
  icon?: React.ReactNode
  /** Icon or element rendered inside the field, after the text. */
  iconRight?: React.ReactNode
  containerClassName?: string
}

export function InputField({
  label,
  description,
  error,
  icon,
  iconRight,
  required,
  id: idProp,
  containerClassName,
  className,
  ...props
}: InputFieldProps) {
  const autoId = React.useId()
  const id = idProp ?? autoId
  const hintId = `${id}-hint`

  return (
    <div
      data-slot="input-field"
      className={cn("flex w-full flex-col gap-2", containerClassName)}
    >
      {label ? (
        <Label htmlFor={id}>
          {label}
          {required ? (
            <span aria-hidden="true" className="-ml-0.5 text-destructive">
              *
            </span>
          ) : null}
        </Label>
      ) : null}
      <div className="relative">
        {icon ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground [&>svg]:size-4"
          >
            {icon}
          </span>
        ) : null}
        <Input
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={description || error ? hintId : undefined}
          className={cn(icon && "pl-9", iconRight && "pr-9", className)}
          {...props}
        />
        {iconRight ? (
          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground [&>svg]:size-4">
            {iconRight}
          </span>
        ) : null}
      </div>
      {error ? (
        <p id={hintId} className="text-sm text-destructive">
          {error}
        </p>
      ) : description ? (
        <p id={hintId} className="text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
