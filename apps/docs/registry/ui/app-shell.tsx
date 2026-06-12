"use client"

import * as React from "react"
import { Menu, PanelLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type AppShellContextValue = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  inMobileSheet: boolean
}

const AppShellContext = React.createContext<AppShellContextValue | null>(null)

function useAppShell() {
  const context = React.useContext(AppShellContext)
  if (!context) {
    throw new Error("useAppShell must be used within an <AppShell />.")
  }
  return context
}

function AppShell({
  defaultCollapsed = false,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultCollapsed?: boolean
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const contextValue = React.useMemo<AppShellContextValue>(
    () => ({
      collapsed,
      setCollapsed,
      mobileOpen,
      setMobileOpen,
      inMobileSheet: false,
    }),
    [collapsed, mobileOpen]
  )

  return (
    <AppShellContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="app-shell"
          className={cn(
            "flex h-full min-h-0 w-full bg-background text-foreground",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </AppShellContext.Provider>
  )
}

function AppShellSidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"aside">) {
  const context = useAppShell()

  return (
    <>
      <aside
        data-slot="app-shell-sidebar"
        data-collapsed={context.collapsed}
        className={cn(
          "hidden shrink-0 flex-col border-r bg-card transition-[width] duration-200 lg:flex",
          context.collapsed ? "w-14" : "w-60",
          className
        )}
        {...props}
      >
        {children}
      </aside>
      <Sheet open={context.mobileOpen} onOpenChange={context.setMobileOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-0 lg:hidden">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <AppShellContext.Provider
            value={{ ...context, collapsed: false, inMobileSheet: true }}
          >
            <div className="flex h-full flex-col">{children}</div>
          </AppShellContext.Provider>
        </SheetContent>
      </Sheet>
    </>
  )
}

function AppShellSidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { collapsed } = useAppShell()

  return (
    <div
      data-slot="app-shell-sidebar-header"
      className={cn(
        "flex h-14 shrink-0 items-center border-b px-4",
        collapsed && "justify-center px-2",
        className
      )}
      {...props}
    />
  )
}

function AppShellSidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-sidebar-footer"
      className={cn("mt-auto border-t p-2", className)}
      {...props}
    />
  )
}

function AppShellNav({
  className,
  "aria-label": ariaLabel = "Main",
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="app-shell-nav"
      aria-label={ariaLabel}
      className={cn("flex flex-1 flex-col gap-4 overflow-y-auto p-2", className)}
      {...props}
    />
  )
}

function AppShellNavGroup({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  label?: string
}) {
  const { collapsed } = useAppShell()

  return (
    <div
      data-slot="app-shell-nav-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      {label && (
        <div
          className={cn(
            "px-3 pb-1 text-xs font-medium text-muted-foreground",
            collapsed && "sr-only"
          )}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  )
}

function AppShellNavItem({
  href,
  icon: Icon,
  active = false,
  onClick,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & {
  href: string
  icon?: React.ComponentType<{ className?: string }>
  active?: boolean
}) {
  const { collapsed, inMobileSheet, setMobileOpen } = useAppShell()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (inMobileSheet) {
      setMobileOpen(false)
    }
    onClick?.(event)
  }

  const link = (
    <a
      data-slot="app-shell-nav-item"
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={handleClick}
      className={cn(
        "flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
        collapsed && "w-9 justify-center px-0",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      <span className={cn("truncate", collapsed && "sr-only")}>{children}</span>
    </a>
  )

  if (!collapsed) {
    return link
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{children}</TooltipContent>
    </Tooltip>
  )
}

function AppShellSidebarToggle({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { collapsed, setCollapsed } = useAppShell()

  return (
    <Button
      data-slot="app-shell-sidebar-toggle"
      variant="ghost"
      size="icon"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      onClick={() => setCollapsed(!collapsed)}
      className={cn("hidden size-8 lg:inline-flex", className)}
      {...props}
    >
      <PanelLeft />
    </Button>
  )
}

function AppShellMobileTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { setMobileOpen } = useAppShell()

  return (
    <Button
      data-slot="app-shell-mobile-trigger"
      variant="ghost"
      size="icon"
      aria-label="Open navigation"
      onClick={() => setMobileOpen(true)}
      className={cn("size-8 lg:hidden", className)}
      {...props}
    >
      <Menu />
    </Button>
  )
}

function AppShellMain({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-main"
      className={cn("flex min-w-0 flex-1 flex-col", className)}
      {...props}
    />
  )
}

function AppShellTopbar({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="app-shell-topbar"
      className={cn(
        "flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4",
        className
      )}
      {...props}
    />
  )
}

function AppShellContent({
  className,
  children,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="app-shell-content"
      className={cn("flex-1 overflow-y-auto", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl p-6">{children}</div>
    </main>
  )
}

export {
  AppShell,
  AppShellSidebar,
  AppShellSidebarHeader,
  AppShellSidebarFooter,
  AppShellNav,
  AppShellNavGroup,
  AppShellNavItem,
  AppShellSidebarToggle,
  AppShellMobileTrigger,
  AppShellMain,
  AppShellTopbar,
  AppShellContent,
  useAppShell,
}
