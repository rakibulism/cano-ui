import {
  GitBranch,
  Globe,
  KeyRound,
  Rocket,
  Settings,
  UserPlus,
} from "lucide-react"

import {
  ActivityFeed,
  type ActivityFeedGroup,
} from "@/registry/ui/activity-feed"

const groups: ActivityFeedGroup[] = [
  {
    label: "Today",
    items: [
      {
        id: "evt_01",
        icon: Rocket,
        actor: "Elena Vasquez",
        action: "deployed",
        target: "acme-web to production",
        timestamp: "2:48 PM",
        meta: (
          <code className="inline-flex items-center rounded-sm border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
            9f2c1ab
          </code>
        ),
      },
      {
        id: "evt_02",
        icon: UserPlus,
        actor: "Marcus Chen",
        action: "invited",
        target: "daniel@acme.dev",
        timestamp: "11:32 AM",
      },
      {
        id: "evt_03",
        icon: GitBranch,
        actor: "Priya Raghavan",
        action: "opened a preview deployment for",
        target: "feature/billing-portal",
        timestamp: "9:14 AM",
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      {
        id: "evt_04",
        icon: Settings,
        actor: "Elena Vasquez",
        action: "changed the default branch to",
        target: "main",
        timestamp: "5:21 PM",
      },
      {
        id: "evt_05",
        icon: KeyRound,
        actor: "Tom Okafor",
        action: "rotated the production API key",
        timestamp: "3:02 PM",
      },
      {
        id: "evt_06",
        icon: Globe,
        actor: "Marcus Chen",
        action: "verified the domain",
        target: "acme.dev",
        timestamp: "10:45 AM",
      },
    ],
  },
]

export default function ActivityFeedDemo() {
  return <ActivityFeed groups={groups} className="max-w-md" />
}
