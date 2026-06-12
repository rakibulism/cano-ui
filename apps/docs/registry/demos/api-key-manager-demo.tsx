"use client"

import * as React from "react"

import { ApiKeyManager, type ApiKey } from "@/registry/ui/api-key-manager"

const initialKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production server",
    maskedKey: "sk_live_••••4f2a",
    createdAt: "Jan 12, 2026",
    lastUsed: "2 minutes ago",
  },
  {
    id: "2",
    name: "Staging",
    maskedKey: "sk_test_••••9c1d",
    createdAt: "Feb 3, 2026",
    lastUsed: "yesterday",
  },
  {
    id: "3",
    name: "Old CI runner",
    maskedKey: "sk_live_••••77b0",
    createdAt: "Aug 21, 2025",
    revoked: true,
  },
]

export default function ApiKeyManagerDemo() {
  const [keys, setKeys] = React.useState(initialKeys)

  return (
    <div className="mx-auto w-full max-w-xl">
      <ApiKeyManager
        keys={keys}
        getCopyValue={(key) => `demo-${key.id}`}
        onCreate={(name) =>
          setKeys((prev) => [
            {
              id: String(prev.length + 1),
              name,
              maskedKey: "sk_live_••••" + String(1000 + prev.length * 731).slice(-4),
              createdAt: "Just now",
            },
            ...prev,
          ])
        }
        onRevoke={(key) =>
          setKeys((prev) =>
            prev.map((k) => (k.id === key.id ? { ...k, revoked: true } : k))
          )
        }
      />
    </div>
  )
}
