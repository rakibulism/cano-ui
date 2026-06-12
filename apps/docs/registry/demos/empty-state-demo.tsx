"use client"

import { FolderPlus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  EmptyState,
  EmptyStateDone,
  EmptyStateError,
  EmptyStateNoResults,
} from "@/registry/ui/empty-state"

export default function EmptyStateDemo() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="rounded-lg border">
        <EmptyState
          icon={FolderPlus}
          title="Create your first project"
          description="Projects keep your Acme deployments, environments, and team in one place."
          action={
            <Button>
              <Plus />
              New project
            </Button>
          }
          secondaryAction={
            <Button variant="link" size="sm" className="text-muted-foreground">
              Read the docs
            </Button>
          }
        />
      </div>
      <div className="rounded-lg border">
        <EmptyStateNoResults description='No projects match "acme-staging-v2". Try a different search.' />
      </div>
      <div className="rounded-lg border">
        <EmptyStateError
          description="We couldn't reach the Acme API. Check your connection and try again."
          onRetry={() => {}}
        />
      </div>
      <div className="rounded-lg border">
        <EmptyStateDone description="Every alert has been resolved. Nice work — new alerts will appear here." />
      </div>
    </div>
  )
}
