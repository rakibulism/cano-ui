"use client"

import * as React from "react"
import { Bell, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface NotificationItem {
  id: string
  title: string
  description?: string
  timestamp: string
  read?: boolean
  /** Lucide icon component (or any component accepting className). */
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
}

export interface NotificationCenterProps {
  notifications: NotificationItem[]
  onNotificationClick?: (notification: NotificationItem) => void
  onMarkAllRead?: () => void
  emptyMessage?: string
  className?: string
}

function NotificationRow({
  notification,
  onClick,
}: {
  notification: NotificationItem
  onClick?: () => void
}) {
  const Icon = notification.icon
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none"
    >
      <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
        {Icon ? (
          <Icon className="size-4 text-muted-foreground" aria-hidden={true} />
        ) : (
          <Bell className="size-4 text-muted-foreground" aria-hidden={true} />
        )}
        {!notification.read ? (
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-primary ring-2 ring-popover"
          />
        ) : null}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span
          className={cn(
            "truncate text-sm",
            notification.read
              ? "text-muted-foreground"
              : "font-medium text-foreground"
          )}
        >
          {notification.title}
        </span>
        {notification.description ? (
          <span className="line-clamp-2 text-xs text-muted-foreground">
            {notification.description}
          </span>
        ) : null}
        <time className="text-xs text-muted-foreground/70">
          {notification.timestamp}
        </time>
      </span>
      {!notification.read ? (
        <span className="sr-only">(unread)</span>
      ) : null}
    </button>
  )
}

function NotificationList({
  notifications,
  onNotificationClick,
  emptyMessage,
}: {
  notifications: NotificationItem[]
  onNotificationClick?: (notification: NotificationItem) => void
  emptyMessage: string
}) {
  if (notifications.length === 0) {
    return (
      <p className="px-4 py-10 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    )
  }
  return (
    <div className="flex max-h-80 flex-col divide-y overflow-y-auto">
      {notifications.map((notification) => (
        <NotificationRow
          key={notification.id}
          notification={notification}
          onClick={
            onNotificationClick
              ? () => onNotificationClick(notification)
              : undefined
          }
        />
      ))}
    </div>
  )
}

export function NotificationCenter({
  notifications,
  onNotificationClick,
  onMarkAllRead,
  emptyMessage = "You're all caught up.",
  className,
}: NotificationCenterProps) {
  const unread = notifications.filter((n) => !n.read)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={
            unread.length > 0
              ? `Notifications (${unread.length} unread)`
              : "Notifications"
          }
          className={cn("relative", className)}
        >
          <Bell aria-hidden="true" />
          {unread.length > 0 ? (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium tabular-nums text-primary-foreground">
              {unread.length > 9 ? "9+" : unread.length}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-0"
        data-slot="notification-center"
      >
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <TabsList className="h-8">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                Unread
                {unread.length > 0 ? (
                  <span className="ml-1 tabular-nums text-muted-foreground">
                    {unread.length}
                  </span>
                ) : null}
              </TabsTrigger>
            </TabsList>
            {onMarkAllRead ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 px-2 text-xs text-muted-foreground"
                onClick={onMarkAllRead}
                disabled={unread.length === 0}
              >
                <Check className="size-3.5" aria-hidden="true" />
                Mark all read
              </Button>
            ) : null}
          </div>
          <TabsContent value="all">
            <NotificationList
              notifications={notifications}
              onNotificationClick={onNotificationClick}
              emptyMessage={emptyMessage}
            />
          </TabsContent>
          <TabsContent value="unread">
            <NotificationList
              notifications={unread}
              onNotificationClick={onNotificationClick}
              emptyMessage={emptyMessage}
            />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
