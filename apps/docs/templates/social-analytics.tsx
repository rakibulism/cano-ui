"use client"

import * as React from "react"
import {
  Users,
  Heart,
  Eye,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MessageCircle,
  Share2,
  Bookmark,
  Filter,
  Download,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

type PlatformKey = "all" | "instagram" | "tiktok" | "x" | "youtube"

type Kpi = {
  label: string
  value: string
  delta: number
  icon: React.ComponentType<{ className?: string }>
}

type DayBar = { day: string; value: number }

type Post = {
  rank: number
  title: string
  platform: string
  handle: string
  reach: string
  engagement: string
  rate: number
}

const PLATFORMS: { key: PlatformKey; label: string }[] = [
  { key: "all", label: "All platforms" },
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
  { key: "x", label: "X" },
  { key: "youtube", label: "YouTube" },
]

const KPIS: Record<PlatformKey, Kpi[]> = {
  all: [
    { label: "Followers", value: "842.6K", delta: 4.2, icon: Users },
    { label: "Engagement", value: "5.8%", delta: 1.1, icon: Heart },
    { label: "Reach", value: "3.4M", delta: 8.7, icon: Eye },
    { label: "Shares", value: "61.2K", delta: -2.3, icon: Share2 },
  ],
  instagram: [
    { label: "Followers", value: "412.0K", delta: 3.5, icon: Users },
    { label: "Engagement", value: "6.4%", delta: 2.0, icon: Heart },
    { label: "Reach", value: "1.6M", delta: 9.4, icon: Eye },
    { label: "Shares", value: "28.9K", delta: 1.2, icon: Share2 },
  ],
  tiktok: [
    { label: "Followers", value: "268.4K", delta: 7.8, icon: Users },
    { label: "Engagement", value: "9.1%", delta: 3.4, icon: Heart },
    { label: "Reach", value: "1.2M", delta: 14.2, icon: Eye },
    { label: "Shares", value: "19.6K", delta: 5.6, icon: Share2 },
  ],
  x: [
    { label: "Followers", value: "98.1K", delta: 1.1, icon: Users },
    { label: "Engagement", value: "3.2%", delta: -0.6, icon: Heart },
    { label: "Reach", value: "420.0K", delta: 2.1, icon: Eye },
    { label: "Shares", value: "7.4K", delta: -4.8, icon: Share2 },
  ],
  youtube: [
    { label: "Subscribers", value: "64.1K", delta: 2.9, icon: Users },
    { label: "Engagement", value: "4.7%", delta: 0.8, icon: Heart },
    { label: "Watch reach", value: "180.0K", delta: 6.3, icon: Eye },
    { label: "Shares", value: "5.3K", delta: 3.1, icon: Share2 },
  ],
}

const ENGAGEMENT_BY_DAY: Record<PlatformKey, DayBar[]> = {
  all: [
    { day: "Mon", value: 62 },
    { day: "Tue", value: 78 },
    { day: "Wed", value: 55 },
    { day: "Thu", value: 91 },
    { day: "Fri", value: 84 },
    { day: "Sat", value: 100 },
    { day: "Sun", value: 73 },
  ],
  instagram: [
    { day: "Mon", value: 70 },
    { day: "Tue", value: 65 },
    { day: "Wed", value: 80 },
    { day: "Thu", value: 88 },
    { day: "Fri", value: 76 },
    { day: "Sat", value: 100 },
    { day: "Sun", value: 90 },
  ],
  tiktok: [
    { day: "Mon", value: 88 },
    { day: "Tue", value: 95 },
    { day: "Wed", value: 72 },
    { day: "Thu", value: 100 },
    { day: "Fri", value: 90 },
    { day: "Sat", value: 84 },
    { day: "Sun", value: 67 },
  ],
  x: [
    { day: "Mon", value: 54 },
    { day: "Tue", value: 100 },
    { day: "Wed", value: 61 },
    { day: "Thu", value: 70 },
    { day: "Fri", value: 48 },
    { day: "Sat", value: 39 },
    { day: "Sun", value: 44 },
  ],
  youtube: [
    { day: "Mon", value: 60 },
    { day: "Tue", value: 52 },
    { day: "Wed", value: 66 },
    { day: "Thu", value: 74 },
    { day: "Fri", value: 100 },
    { day: "Sat", value: 92 },
    { day: "Sun", value: 81 },
  ],
}

const TOP_POSTS: Record<PlatformKey, Post[]> = {
  all: [
    { rank: 1, title: "Behind the scenes: launch week", platform: "TikTok", handle: "@northwind", reach: "612K", engagement: "48.2K", rate: 9.4 },
    { rank: 2, title: "5 tips we wish we knew sooner", platform: "Instagram", handle: "@northwind", reach: "388K", engagement: "31.7K", rate: 8.2 },
    { rank: 3, title: "Customer spotlight reel", platform: "Instagram", handle: "@northwind", reach: "274K", engagement: "22.1K", rate: 7.6 },
    { rank: 4, title: "Hot take on remote teams", platform: "X", handle: "@northwind", reach: "196K", engagement: "9.8K", rate: 5.0 },
    { rank: 5, title: "Full product walkthrough", platform: "YouTube", handle: "Northwind", reach: "142K", engagement: "6.4K", rate: 4.5 },
  ],
  instagram: [
    { rank: 1, title: "5 tips we wish we knew sooner", platform: "Instagram", handle: "@northwind", reach: "388K", engagement: "31.7K", rate: 8.2 },
    { rank: 2, title: "Customer spotlight reel", platform: "Instagram", handle: "@northwind", reach: "274K", engagement: "22.1K", rate: 7.6 },
    { rank: 3, title: "Carousel: design refresh", platform: "Instagram", handle: "@northwind", reach: "201K", engagement: "15.3K", rate: 6.9 },
    { rank: 4, title: "Story poll recap", platform: "Instagram", handle: "@northwind", reach: "154K", engagement: "10.2K", rate: 6.1 },
  ],
  tiktok: [
    { rank: 1, title: "Behind the scenes: launch week", platform: "TikTok", handle: "@northwind", reach: "612K", engagement: "48.2K", rate: 9.4 },
    { rank: 2, title: "POV: shipping on a Friday", platform: "TikTok", handle: "@northwind", reach: "441K", engagement: "39.0K", rate: 8.9 },
    { rank: 3, title: "Office trend, our version", platform: "TikTok", handle: "@northwind", reach: "318K", engagement: "27.4K", rate: 8.1 },
  ],
  x: [
    { rank: 1, title: "Hot take on remote teams", platform: "X", handle: "@northwind", reach: "196K", engagement: "9.8K", rate: 5.0 },
    { rank: 2, title: "Thread: how we cut churn 30%", platform: "X", handle: "@northwind", reach: "148K", engagement: "6.9K", rate: 4.6 },
    { rank: 3, title: "We shipped it. AMA.", platform: "X", handle: "@northwind", reach: "92K", engagement: "3.4K", rate: 3.7 },
  ],
  youtube: [
    { rank: 1, title: "Full product walkthrough", platform: "YouTube", handle: "Northwind", reach: "142K", engagement: "6.4K", rate: 4.5 },
    { rank: 2, title: "How we built it in 6 weeks", platform: "YouTube", handle: "Northwind", reach: "88K", engagement: "3.9K", rate: 4.4 },
    { rank: 3, title: "Team Q&A live replay", platform: "YouTube", handle: "Northwind", reach: "54K", engagement: "2.1K", rate: 3.9 },
  ],
}

function DeltaPill({ delta }: { delta: number }) {
  const up = delta >= 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        up ? "bg-primary/10 text-primary" : "bg-muted text-destructive"
      )}
    >
      {up ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      {up ? "+" : ""}
      {delta.toFixed(1)}%
    </span>
  )
}

export default function SocialAnalyticsDashboard() {
  const [platform, setPlatform] = React.useState<PlatformKey>("all")

  const kpis = KPIS[platform]
  const days = ENGAGEMENT_BY_DAY[platform]
  const posts = TOP_POSTS[platform]
  const peak = days.reduce((a, b) => (b.value > a.value ? b : a), days[0])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">Pulse</span>
            <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
              Analytics
            </Badge>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Filter className="mr-1.5 h-4 w-4" />
              Last 7 days
            </Button>
            <Button size="sm">
              <Download className="mr-1.5 h-4 w-4" />
              Export
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>NW</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Social performance
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              How @northwind is trending across channels this week.
            </p>
          </div>
          <Badge variant="outline" className="w-fit gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Synced 12 min ago
          </Badge>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {PLATFORMS.map((p) => {
            const active = p.key === platform
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setPlatform(p.key)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {p.label}
              </button>
            )
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => {
            const Icon = k.icon
            return (
              <Card key={k.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>{k.label}</CardDescription>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight">
                    {k.value}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <DeltaPill delta={k.delta} />
                    <span className="text-xs text-muted-foreground">
                      vs last week
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Engagement by day</CardTitle>
                  <CardDescription>
                    Relative interactions over the past week
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Peak {peak.day}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end gap-3 sm:gap-4">
                {days.map((d) => {
                  const isPeak = d.day === peak.day
                  return (
                    <div
                      key={d.day}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <span className="text-xs font-medium text-muted-foreground">
                        {d.value}
                      </span>
                      <div
                        className={cn(
                          "w-full rounded-t-md transition-all",
                          isPeak ? "bg-primary" : "bg-primary/30"
                        )}
                        style={{ height: d.value + "%" }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {d.day}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interaction mix</CardTitle>
              <CardDescription>Share of total engagement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Likes", value: 58, icon: Heart },
                { label: "Comments", value: 22, icon: MessageCircle },
                { label: "Shares", value: 13, icon: Share2 },
                { label: "Saves", value: 7, icon: Bookmark },
              ].map((m) => {
                const Icon = m.icon
                return (
                  <div key={m.label}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Icon className="h-4 w-4" />
                        {m.label}
                      </span>
                      <span className="font-medium">{m.value}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: m.value + "%" }}
                      />
                    </div>
                  </div>
                )
              })}
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Avg. engagement rate</span>
                <span className="font-semibold text-primary">
                  {kpis[1].value}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top posts</CardTitle>
                <CardDescription>
                  Best performing content for the selected channel
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View all
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0 sm:px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>Post</TableHead>
                  <TableHead className="hidden sm:table-cell">Platform</TableHead>
                  <TableHead className="text-right">Reach</TableHead>
                  <TableHead className="hidden text-right md:table-cell">
                    Engagement
                  </TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.rank}>
                    <TableCell className="text-muted-foreground">
                      {post.rank}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {post.handle}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">{post.platform}</Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {post.reach}
                    </TableCell>
                    <TableCell className="hidden text-right tabular-nums md:table-cell">
                      {post.engagement}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-medium text-primary tabular-nums">
                        {post.rate.toFixed(1)}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-between border-t pt-4 text-sm text-muted-foreground">
            <span>Showing {posts.length} posts</span>
            <span>Ranked by engagement rate</span>
          </CardFooter>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span>Pulse Analytics</span>
          <span>Data refreshes every 15 minutes</span>
        </div>
      </footer>
    </div>
  )
}
