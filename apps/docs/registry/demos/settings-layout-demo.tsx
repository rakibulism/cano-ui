import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SettingsContent,
  SettingsLayout,
  SettingsNav,
  SettingsSection,
} from "@/registry/ui/settings-layout"

const navItems = [
  { title: "Account", href: "#", active: true },
  { title: "Billing", href: "#" },
  { title: "Team", href: "#" },
  { title: "Notifications", href: "#" },
  { title: "Security", href: "#" },
]

export default function SettingsLayoutDemo() {
  return (
    <div className="w-full rounded-lg border p-6 md:p-10">
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="text-lg font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and workspace preferences.
        </p>
      </div>
      <SettingsLayout>
        <SettingsNav items={navItems} />
        <SettingsContent>
          <SettingsSection
            title="Profile"
            description="This information is visible to other members of your workspace."
            footer={<Button size="sm">Save changes</Button>}
          >
            <div className="flex max-w-md flex-col gap-2">
              <Label htmlFor="settings-demo-name">Full name</Label>
              <Input id="settings-demo-name" defaultValue="Maya Chen" />
            </div>
            <div className="flex max-w-md flex-col gap-2">
              <Label htmlFor="settings-demo-email">Email address</Label>
              <Input
                id="settings-demo-email"
                type="email"
                defaultValue="maya@acme.com"
              />
            </div>
          </SettingsSection>
          <SettingsSection
            title="Workspace"
            description="The workspace name and URL are shown in invites and shared links."
            footer={<Button size="sm">Save changes</Button>}
          >
            <div className="flex max-w-md flex-col gap-2">
              <Label htmlFor="settings-demo-workspace">Workspace name</Label>
              <Input id="settings-demo-workspace" defaultValue="Acme Inc" />
            </div>
            <div className="flex max-w-md flex-col gap-2">
              <Label htmlFor="settings-demo-slug">Workspace URL</Label>
              <Input id="settings-demo-slug" defaultValue="acme.app/acme-inc" />
            </div>
          </SettingsSection>
        </SettingsContent>
      </SettingsLayout>
    </div>
  )
}
