"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export interface Integration {
  id: string
  name: string
  description: string
  /** Logo or icon slot, e.g. an <img> or a Lucide icon. */
  logo?: React.ReactNode
  connected?: boolean
  /** Shown as a small badge, e.g. "Beta" or "Popular". */
  tag?: string
  /** Disables the toggle, e.g. for plan-gated integrations. */
  disabled?: boolean
}

export interface IntegrationCardsProps
  extends Omit<React.ComponentProps<"div">, "onToggle"> {
  integrations: Integration[]
  onToggle?: (integration: Integration, connected: boolean) => void
  onConfigure?: (integration: Integration) => void
}

export function IntegrationCard({
  integration,
  onToggle,
  onConfigure,
  className,
}: {
  integration: Integration
  onToggle?: (integration: Integration, connected: boolean) => void
  onConfigure?: (integration: Integration) => void
  className?: string
}) {
  const switchId = `integration-${integration.id}`

  return (
    <Card
      data-slot="integration-card"
      className={cn("gap-4 py-4", className)}
    >
      <CardContent className="flex items-start gap-3 px-4">
        {integration.logo ? (
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-muted/50 [&>svg]:size-5"
          >
            {integration.logo}
          </span>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <label
              htmlFor={switchId}
              className="truncate text-sm font-semibold"
            >
              {integration.name}
            </label>
            {integration.tag ? (
              <Badge variant="secondary" className="text-xs">
                {integration.tag}
              </Badge>
            ) : null}
          </div>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {integration.description}
          </p>
        </div>
        <Switch
          id={switchId}
          checked={integration.connected ?? false}
          disabled={integration.disabled}
          onCheckedChange={
            onToggle
              ? (checked) => onToggle(integration, checked)
              : undefined
          }
        />
      </CardContent>
      {integration.connected && onConfigure ? (
        <CardFooter className="px-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onConfigure(integration)}
          >
            Configure
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}

export function IntegrationCards({
  integrations,
  onToggle,
  onConfigure,
  className,
  ...props
}: IntegrationCardsProps) {
  return (
    <div
      data-slot="integration-cards"
      className={cn("grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
      {...props}
    >
      {integrations.map((integration) => (
        <IntegrationCard
          key={integration.id}
          integration={integration}
          onToggle={onToggle}
          onConfigure={onConfigure}
        />
      ))}
    </div>
  )
}
