import { Activity, UserPen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AccountCard } from "@/registry/ui/account-card"

export default function AccountCardDemo() {
  return (
    <AccountCard
      className="w-full max-w-xl"
      name="Priya Sharma"
      email="priya@acme.dev"
      role="Admin"
      meta={[
        { label: "Joined", value: "Mar 2024" },
        { label: "Team", value: "Platform" },
      ]}
      actions={
        <>
          <Button variant="outline" size="sm">
            <UserPen />
            Edit profile
          </Button>
          <Button variant="outline" size="sm">
            <Activity />
            View activity
          </Button>
        </>
      }
    />
  )
}
