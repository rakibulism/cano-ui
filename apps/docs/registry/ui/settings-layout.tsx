import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface SettingsNavItem {
  title: string
  href: string
  active?: boolean
}

function SettingsLayout({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="settings-layout"
      className={cn("flex flex-col gap-6 md:flex-row md:gap-10", className)}
      {...props}
    />
  )
}

function SettingsNav({
  items,
  className,
  "aria-label": ariaLabel = "Settings",
  ...props
}: React.ComponentProps<"nav"> & {
  items: SettingsNavItem[]
}) {
  return (
    <nav
      data-slot="settings-nav"
      aria-label={ariaLabel}
      className={cn("md:w-48 md:shrink-0", className)}
      {...props}
    >
      <ul className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-col md:px-0 md:pb-0">
        {items.map((item) => (
          <li key={item.title} className="shrink-0 md:shrink">
            <a
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                item.active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SettingsContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="settings-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-6", className)}
      {...props}
    />
  )
}

function SettingsSection({
  title,
  description,
  footer,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Card> & {
  title: string
  description?: string
  footer?: React.ReactNode
}) {
  return (
    <Card data-slot="settings-section" className={className} {...props}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
      {footer && (
        <CardFooter className="justify-end gap-2 border-t">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}

export { SettingsLayout, SettingsNav, SettingsContent, SettingsSection }
