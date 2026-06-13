"use client"

import * as React from "react"
import {
  Bell,
  Check,
  CreditCard,
  Download,
  Mail,
  MoreHorizontal,
  Plus,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

type SectionId = "profile" | "account" | "notifications" | "billing" | "team"

const NAV: { id: SectionId; label: string; icon: React.ElementType; hint: string }[] = [
  { id: "profile", label: "Profile", icon: User, hint: "Your public details" },
  { id: "account", label: "Account", icon: Settings, hint: "Login & security" },
  { id: "notifications", label: "Notifications", icon: Bell, hint: "What we send you" },
  { id: "billing", label: "Billing", icon: CreditCard, hint: "Plan & invoices" },
  { id: "team", label: "Team", icon: Users, hint: "Members & roles" },
]

const NOTIFICATIONS: { id: string; title: string; desc: string; on: boolean }[] = [
  { id: "product", title: "Product updates", desc: "New features, improvements and changelog posts.", on: true },
  { id: "security", title: "Security alerts", desc: "Sign-ins from new devices and password changes.", on: true },
  { id: "comments", title: "Comments & mentions", desc: "When a teammate mentions you in a thread.", on: true },
  { id: "digest", title: "Weekly digest", desc: "A Monday summary of your workspace activity.", on: false },
  { id: "marketing", title: "Marketing emails", desc: "Tips, offers and the occasional newsletter.", on: false },
]

const INVOICES: { id: string; date: string; amount: string; status: "Paid" | "Pending" }[] = [
  { id: "INV-2026-006", date: "Jun 1, 2026", amount: "$48.00", status: "Paid" },
  { id: "INV-2026-005", date: "May 1, 2026", amount: "$48.00", status: "Paid" },
  { id: "INV-2026-004", date: "Apr 1, 2026", amount: "$48.00", status: "Paid" },
  { id: "INV-2026-003", date: "Mar 1, 2026", amount: "$48.00", status: "Paid" },
]

const TEAM: { name: string; email: string; role: string; initials: string }[] = [
  { name: "Mira Khan", email: "mira@plated.app", role: "Owner", initials: "MK" },
  { name: "Dev Anand", email: "dev@plated.app", role: "Admin", initials: "DA" },
  { name: "Sara Lopez", email: "sara@plated.app", role: "Member", initials: "SL" },
  { name: "Tom Reyes", email: "tom@plated.app", role: "Member", initials: "TR" },
]

export default function AccountSettings() {
  const [active, setActive] = React.useState<SectionId>("profile")
  const [notifs, setNotifs] = React.useState(() =>
    Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, n.on])) as Record<string, boolean>,
  )
  const [twoFactor, setTwoFactor] = React.useState(true)
  const [publicProfile, setPublicProfile] = React.useState(false)

  const current = NAV.find((n) => n.id === active)!

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Settings className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">Plated Settings</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your profile, security, notifications and billing.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Settings sections" className="lg:sticky lg:top-24 lg:self-start">
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {NAV.map((item) => {
                const Icon = item.icon
                const selected = item.id === active
                return (
                  <li key={item.id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => setActive(item.id)}
                      aria-current={selected ? "page" : undefined}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                        selected
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="hidden flex-col lg:flex">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-xs text-muted-foreground">{item.hint}</span>
                      </span>
                      <span className="font-medium lg:hidden">{item.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <section aria-label={current.label} className="min-w-0 space-y-6">
            {active === "profile" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>This information appears on your public profile.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="" alt="" />
                        <AvatarFallback className="text-lg">MK</AvatarFallback>
                      </Avatar>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Upload new</Button>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first">First name</Label>
                        <Input id="first" defaultValue="Mira" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last">Last name</Label>
                        <Input id="last" defaultValue="Khan" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="mira@plated.app" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" rows={3} defaultValue="Product designer building tools for restaurant teams." />
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="text-sm font-medium">Public profile</p>
                        <p className="text-sm text-muted-foreground">Allow anyone with the link to view your profile.</p>
                      </div>
                      <Switch checked={publicProfile} onCheckedChange={setPublicProfile} aria-label="Toggle public profile" />
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end gap-2 border-t">
                    <Button variant="ghost">Cancel</Button>
                    <Button>Save changes</Button>
                  </CardFooter>
                </Card>
              </>
            )}

            {active === "account" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Update the password used to sign in to your account.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" defaultValue="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new">New password</Label>
                      <Input id="new" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm">Confirm new password</Label>
                      <Input id="confirm" type="password" placeholder="••••••••" />
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end border-t">
                    <Button>Update password</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Two-factor authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Authenticator app</p>
                          <p className="text-sm text-muted-foreground">
                            {twoFactor ? "Enabled — codes required at sign-in." : "Disabled — turn on for stronger security."}
                          </p>
                        </div>
                      </div>
                      <Switch checked={twoFactor} onCheckedChange={setTwoFactor} aria-label="Toggle two-factor authentication" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-destructive/40">
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger zone</CardTitle>
                    <CardDescription>Permanently delete your account and all of its data.</CardDescription>
                  </CardHeader>
                  <CardFooter className="border-t">
                    <Button variant="destructive">Delete account</Button>
                  </CardFooter>
                </Card>
              </>
            )}

            {active === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Choose what you want to be notified about.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-sm text-muted-foreground">{n.desc}</p>
                      </div>
                      <Switch
                        checked={notifs[n.id]}
                        onCheckedChange={(v) => setNotifs((prev) => ({ ...prev, [n.id]: v }))}
                        aria-label={`Toggle ${n.title}`}
                      />
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="justify-end border-t">
                  <Button>Save preferences</Button>
                </CardFooter>
              </Card>
            )}

            {active === "billing" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Current plan</CardTitle>
                    <CardDescription>You are on the Pro plan, billed monthly.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-muted/30 p-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">Pro</span>
                          <Badge variant="secondary">Monthly</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          <span className="text-2xl font-semibold text-foreground">$48</span> / month · renews Jul 1, 2026
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">Change plan</Button>
                        <Button variant="ghost">Cancel</Button>
                      </div>
                    </div>
                    <Separator className="my-6" />
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-14 items-center justify-center rounded-md border bg-card">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 08 / 2028</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Update card</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Invoices</CardTitle>
                    <CardDescription>Download past invoices for your records.</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="pl-6">Invoice</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="pr-6 text-right">Download</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {INVOICES.map((inv) => (
                          <TableRow key={inv.id}>
                            <TableCell className="pl-6 font-medium">{inv.id}</TableCell>
                            <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                            <TableCell>{inv.amount}</TableCell>
                            <TableCell>
                              <Badge variant={inv.status === "Paid" ? "secondary" : "outline"}>{inv.status}</Badge>
                            </TableCell>
                            <TableCell className="pr-6 text-right">
                              <Button variant="ghost" size="icon" aria-label={`Download ${inv.id}`}>
                                <Download className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}

            {active === "team" && (
              <Card>
                <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
                  <div>
                    <CardTitle>Team members</CardTitle>
                    <CardDescription>Manage who has access to your workspace.</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4" />
                    Invite
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="pl-9" placeholder="colleague@plated.app" />
                    </div>
                    <Button variant="outline">Send invite</Button>
                  </div>
                  <Separator />
                  <ul className="divide-y">
                    {TEAM.map((m) => (
                      <li key={m.email} className="flex items-center justify-between gap-4 py-3 first:pt-0">
                        <div className="flex min-w-0 items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="" alt="" />
                            <AvatarFallback>{m.initials}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{m.name}</p>
                            <p className="truncate text-sm text-muted-foreground">{m.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={m.role === "Owner" ? "default" : "outline"}>{m.role}</Badge>
                          <Button variant="ghost" size="icon" aria-label={`More actions for ${m.name}`}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-primary" />
            All changes saved
          </span>
          <span>© 2026 Plated, Inc.</span>
        </div>
      </footer>
    </div>
  )
}
