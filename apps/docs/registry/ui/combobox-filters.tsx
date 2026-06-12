"use client"

import * as React from "react"
import { Check, PlusCircle, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

export interface ComboboxFilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

export interface ComboboxFilterProps {
  title: string
  options: ComboboxFilterOption[]
  selected: string[]
  onChange: (values: string[]) => void
  className?: string
}

export function FilterBar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

export function ComboboxFilter({
  title,
  options,
  selected,
  onChange,
  className,
}: ComboboxFilterProps) {
  const selectedOptions = options.filter((option) =>
    selected.includes(option.value)
  )

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    )
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircle className="size-4" />
            {title}
            {selected.length > 0 ? (
              <>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selected.length}
                </Badge>
              </>
            ) : null}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0" align="start">
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected.includes(option.value)
                  const Icon = option.icon

                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => toggle(option.value)}
                    >
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded-sm border border-input",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "[&_svg]:invisible"
                        )}
                      >
                        <Check className="size-3" />
                      </span>
                      {Icon ? (
                        <Icon className="size-4 text-muted-foreground" />
                      ) : null}
                      <span>{option.label}</span>
                      {option.count !== undefined ? (
                        <span className="ml-auto font-mono text-xs text-muted-foreground">
                          {option.count}
                        </span>
                      ) : null}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              {selected.length > 0 ? (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => onChange([])}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              ) : null}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedOptions.map((option) => (
        <Badge key={option.value} variant="secondary" className="gap-1 pr-1">
          {option.label}
          <button
            type="button"
            aria-label={`Remove ${option.label} filter`}
            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={() => toggle(option.value)}
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      {selected.length > 0 ? (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground"
          onClick={() => onChange([])}
        >
          Clear filters
        </Button>
      ) : null}
    </div>
  )
}
