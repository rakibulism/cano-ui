"use client"

import * as React from "react"
import { CreditCard, GitPullRequest, ShieldAlert, UserPlus } from "lucide-react"

import {
  NotificationCenter,
  type NotificationItem,
} from "@/registry/ui/notification-center"

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Deployment blocked by failing checks",
    description: "acme-web #4821 failed 2 of 14 checks on main.",
    timestamp: "2 minutes ago",
    icon: ShieldAlert,
  },
  {
    id: "2",
    title: "Mia Park requested a review",
    description: "feat: migrate billing webhooks to the new queue",
    timestamp: "26 minutes ago",
    icon: GitPullRequest,
  },
  {
    id: "3",
    title: "New teammate joined",
    description: "Jonas Weber accepted your invite to Acme Inc.",
    timestamp: "3 hours ago",
    read: true,
    icon: UserPlus,
  },
  {
    id: "4",
    title: "Invoice paid",
    description: "Your April invoice of $249.00 was paid.",
    timestamp: "Yesterday",
    read: true,
    icon: CreditCard,
  },
]

export default function NotificationCenterDemo() {
  const [notifications, setNotifications] = React.useState(initialNotifications)

  return (
    <div className="flex min-h-[360px] w-full items-start justify-center pt-4">
      <NotificationCenter
        notifications={notifications}
        onNotificationClick={(notification) =>
          setNotifications((prev) =>
            prev.map((n) =>
              n.id === notification.id ? { ...n, read: true } : n
            )
          )
        }
        onMarkAllRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
      />
    </div>
  )
}
