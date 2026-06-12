"use client"

import * as React from "react"
import {
  Calendar,
  Github,
  MessageSquare,
  Slack,
  Webhook,
  Zap,
} from "lucide-react"

import {
  IntegrationCards,
  type Integration,
} from "@/registry/ui/integration-cards"

const initialIntegrations: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Send deploy and alert notifications to your channels.",
    logo: <Slack />,
    connected: true,
    tag: "Popular",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Link pull requests and trigger preview deployments.",
    logo: <Github />,
    connected: true,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automate workflows by connecting 6,000+ apps.",
    logo: <Zap />,
  },
  {
    id: "calendar",
    name: "Google Calendar",
    description: "Sync on-call schedules and maintenance windows.",
    logo: <Calendar />,
  },
  {
    id: "intercom",
    name: "Intercom",
    description: "Attach session context to customer conversations.",
    logo: <MessageSquare />,
    tag: "Beta",
  },
  {
    id: "webhooks",
    name: "Webhooks",
    description: "Push raw events to any HTTPS endpoint you control.",
    logo: <Webhook />,
    disabled: true,
    tag: "Enterprise",
  },
]

export default function IntegrationCardsDemo() {
  const [integrations, setIntegrations] = React.useState(initialIntegrations)

  return (
    <IntegrationCards
      integrations={integrations}
      onToggle={(integration, connected) =>
        setIntegrations((prev) =>
          prev.map((i) => (i.id === integration.id ? { ...i, connected } : i))
        )
      }
      onConfigure={() => {}}
    />
  )
}
