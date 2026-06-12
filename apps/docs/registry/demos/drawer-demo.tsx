"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Drawer } from "@/registry/ui/drawer"

export default function DrawerDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center gap-3">
      <Drawer
        trigger={<Button variant="outline">Open from left</Button>}
        side="left"
        title="Filters"
        description="Narrow down the deployment list."
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="drawer-env">Environment</Label>
            <Input id="drawer-env" placeholder="production" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="drawer-branch">Branch</Label>
            <Input id="drawer-branch" placeholder="main" />
          </div>
        </div>
      </Drawer>
      <Drawer
        trigger={<Button>Edit project</Button>}
        title="Edit project"
        description="Changes are saved to the acme-web project."
        size="lg"
        footer={
          <>
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="drawer-name">Project name</Label>
            <Input id="drawer-name" defaultValue="acme-web" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="drawer-desc">Description</Label>
            <Textarea
              id="drawer-desc"
              defaultValue="Marketing site and dashboard for Acme Inc."
              rows={4}
            />
          </div>
        </div>
      </Drawer>
    </div>
  )
}
