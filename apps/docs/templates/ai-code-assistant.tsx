"use client"

import * as React from "react"
import {
  Code2,
  Folder,
  FolderOpen,
  FileCode,
  FileJson,
  FileText,
  Search,
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  Info,
  Check,
  GitPullRequest,
  Bot,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

type Severity = "critical" | "warning" | "info"

type FileNode = {
  id: string
  name: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  changes: string
  issues: number
}

type DiffLine = {
  type: "context" | "add" | "del"
  num: string
  text: string
}

type Suggestion = {
  id: string
  fileId: string
  severity: Severity
  line: number
  title: string
  detail: string
  rule: string
}

const FILE_GROUPS: { folder: string; files: FileNode[] }[] = [
  {
    folder: "src/auth",
    files: [
      { id: "login", name: "login.ts", path: "src/auth/login.ts", icon: FileCode, changes: "+42 -9", issues: 3 },
      { id: "session", name: "session.ts", path: "src/auth/session.ts", icon: FileCode, changes: "+11 -2", issues: 1 },
    ],
  },
  {
    folder: "src/api",
    files: [
      { id: "users", name: "users.ts", path: "src/api/users.ts", icon: FileCode, changes: "+7 -1", issues: 1 },
      { id: "schema", name: "schema.json", path: "src/api/schema.json", icon: FileJson, changes: "+3 -0", issues: 0 },
    ],
  },
  {
    folder: "docs",
    files: [
      { id: "readme", name: "README.md", path: "docs/README.md", icon: FileText, changes: "+5 -5", issues: 0 },
    ],
  },
]

const DIFFS: Record<string, DiffLine[]> = {
  login: [
    { type: "context", num: "12", text: "export async function login(email: string, password: string) {" },
    { type: "del", num: "13", text: "  const user = db.query(`SELECT * FROM users WHERE email='${email}'`)" },
    { type: "add", num: "13", text: "  const user = await db.query('SELECT * FROM users WHERE email = ?', [email])" },
    { type: "context", num: "14", text: "  if (!user) throw new AuthError('no_user')" },
    { type: "del", num: "15", text: "  if (password == user.password) {" },
    { type: "add", num: "15", text: "  if (await bcrypt.compare(password, user.passwordHash)) {" },
    { type: "context", num: "16", text: "    const token = createToken(user.id)" },
    { type: "add", num: "17", text: "    logger.info('login.success', { userId: user.id })" },
    { type: "context", num: "18", text: "    return { token, user }" },
    { type: "context", num: "19", text: "  }" },
    { type: "context", num: "20", text: "  throw new AuthError('bad_credentials')" },
    { type: "context", num: "21", text: "}" },
  ],
  session: [
    { type: "context", num: "4", text: "export function refreshSession(token: string) {" },
    { type: "del", num: "5", text: "  const data = jwt.decode(token)" },
    { type: "add", num: "5", text: "  const data = jwt.verify(token, env.JWT_SECRET)" },
    { type: "context", num: "6", text: "  return rotate(data.sub)" },
    { type: "context", num: "7", text: "}" },
  ],
  users: [
    { type: "context", num: "20", text: "router.get('/users/:id', async (req, res) => {" },
    { type: "add", num: "21", text: "  const id = Number(req.params.id)" },
    { type: "context", num: "22", text: "  const user = await getUser(id)" },
    { type: "context", num: "23", text: "  res.json(user)" },
    { type: "context", num: "24", text: "})" },
  ],
  schema: [
    { type: "context", num: "1", text: "{" },
    { type: "add", num: "2", text: "  \"version\": \"2.0\"," },
    { type: "context", num: "3", text: "  \"types\": [\"User\", \"Session\"]" },
    { type: "context", num: "4", text: "}" },
  ],
  readme: [
    { type: "context", num: "1", text: "# Acme Auth Service" },
    { type: "del", num: "2", text: "Run the app with npm start." },
    { type: "add", num: "2", text: "Run the app with `pnpm dev` after copying `.env.example`." },
  ],
}

const SUGGESTIONS: Suggestion[] = [
  {
    id: "s1",
    fileId: "login",
    severity: "critical",
    line: 13,
    title: "SQL injection via string interpolation",
    detail: "User input is concatenated directly into the query. Use a parameterized statement to prevent injection.",
    rule: "security/no-sql-injection",
  },
  {
    id: "s2",
    fileId: "login",
    severity: "critical",
    line: 15,
    title: "Plaintext password comparison",
    detail: "Passwords must never be compared in plaintext. Hash with bcrypt and use a constant-time compare.",
    rule: "security/password-hashing",
  },
  {
    id: "s3",
    fileId: "login",
    severity: "warning",
    line: 17,
    title: "Log statement may leak PII",
    detail: "Confirm the logger redacts user identifiers in production transports.",
    rule: "privacy/pii-logging",
  },
  {
    id: "s4",
    fileId: "session",
    severity: "warning",
    line: 5,
    title: "Verify token signature, do not decode",
    detail: "`jwt.decode` skips signature checks. Switching to `jwt.verify` is correct here.",
    rule: "security/jwt-verify",
  },
  {
    id: "s5",
    fileId: "users",
    severity: "info",
    line: 21,
    title: "Add input validation for :id param",
    detail: "Guard against NaN when `req.params.id` is not numeric before querying.",
    rule: "style/input-validation",
  },
]

const SEVERITY_META: Record<Severity, { label: string; icon: React.ComponentType<{ className?: string }>; badge: "destructive" | "secondary" | "outline"; dot: string }> = {
  critical: { label: "Critical", icon: ShieldAlert, badge: "destructive", dot: "bg-destructive" },
  warning: { label: "Warning", icon: AlertTriangle, badge: "secondary", dot: "bg-primary" },
  info: { label: "Info", icon: Info, badge: "outline", dot: "bg-muted-foreground" },
}

export default function AiCodeAssistantTemplate() {
  const [activeFile, setActiveFile] = React.useState<string>("login")
  const [filter, setFilter] = React.useState<"all" | Severity>("all")
  const [applied, setApplied] = React.useState<Record<string, boolean>>({})

  const allFiles = FILE_GROUPS.flatMap((g) => g.files)
  const current = allFiles.find((f) => f.id === activeFile) ?? allFiles[0]
  const diff = DIFFS[activeFile] ?? []

  const fileSuggestions = SUGGESTIONS.filter((s) => s.fileId === activeFile)
  const visible = fileSuggestions.filter((s) => filter === "all" || s.severity === filter)

  const counts = {
    all: fileSuggestions.length,
    critical: fileSuggestions.filter((s) => s.severity === "critical").length,
    warning: fileSuggestions.filter((s) => s.severity === "warning").length,
    info: fileSuggestions.filter((s) => s.severity === "info").length,
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">ReviewPilot</span>
        </div>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
          <GitPullRequest className="h-4 w-4 text-primary" />
          <span className="font-medium text-foreground">#482</span>
          <span>Harden auth flow</span>
          <Badge variant="outline" className="ml-1 text-[11px]">feature/auth-hardening</Badge>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-md border px-2 py-1.5 text-sm text-muted-foreground lg:flex">
            <Search className="h-3.5 w-3.5" />
            <span>Ask the assistant</span>
          </div>
          <Button size="sm" variant="outline" className="hidden sm:inline-flex">
            <Sparkles className="h-4 w-4" />
            Re-run review
          </Button>
          <Button size="sm">Approve PR</Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">RA</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex flex-1 flex-col lg:flex-row">
        <nav className="w-full shrink-0 border-b bg-muted/30 lg:w-64 lg:border-b-0 lg:border-r" aria-label="Changed files">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Changed files</h2>
            <Badge variant="secondary" className="text-[11px]">{allFiles.length}</Badge>
          </div>
          <div className="px-3 pb-4">
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Filter files" className="h-8 pl-8 text-sm" aria-label="Filter files" />
            </div>
            <div className="space-y-3">
              {FILE_GROUPS.map((group) => (
                <div key={group.folder}>
                  <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-muted-foreground">
                    <FolderOpen className="h-3.5 w-3.5" />
                    {group.folder}
                  </div>
                  <ul className="mt-0.5 space-y-0.5">
                    {group.files.map((file) => {
                      const Icon = file.icon
                      const isActive = file.id === activeFile
                      return (
                        <li key={file.id}>
                          <button
                            type="button"
                            onClick={() => setActiveFile(file.id)}
                            className={cn(
                              "group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                              isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"
                            )}
                          >
                            <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                            <span className="flex-1 truncate">{file.name}</span>
                            {file.issues > 0 ? (
                              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-primary-foreground">
                                {file.issues}
                              </span>
                            ) : (
                              <Check className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </nav>

        <section className="flex min-w-0 flex-1 flex-col border-b lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 border-b px-4 py-2.5">
            <Code2 className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">{current.path}</span>
            <Badge variant="outline" className="ml-1 font-mono text-[11px]">{current.changes}</Badge>
            <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
              <span>Diff</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">Unified</span>
            </div>
          </div>
          <div className="flex-1 overflow-x-auto bg-card">
            <pre className="min-w-full font-mono text-xs leading-relaxed">
              <code className="block">
                {diff.map((line, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start",
                      line.type === "add" && "bg-primary/10",
                      line.type === "del" && "bg-destructive/10"
                    )}
                  >
                    <span className="w-12 shrink-0 select-none border-r px-2 py-0.5 text-right text-muted-foreground">
                      {line.num}
                    </span>
                    <span
                      className={cn(
                        "w-5 shrink-0 select-none px-1.5 py-0.5 text-center",
                        line.type === "add" && "text-primary",
                        line.type === "del" && "text-destructive",
                        line.type === "context" && "text-muted-foreground/40"
                      )}
                    >
                      {line.type === "add" ? "+" : line.type === "del" ? "-" : ""}
                    </span>
                    <span
                      className={cn(
                        "whitespace-pre px-2 py-0.5",
                        line.type === "del" && "text-destructive",
                        line.type === "add" && "text-foreground",
                        line.type === "context" && "text-muted-foreground"
                      )}
                    >
                      {line.text}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </section>

        <aside className="flex w-full shrink-0 flex-col lg:w-96" aria-label="AI suggestions">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">AI suggestions</h2>
            <Badge variant="secondary" className="ml-auto text-[11px]">{counts.all} for this file</Badge>
          </div>

          <div className="border-b px-4 py-3">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | Severity)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="text-xs">All {counts.all}</TabsTrigger>
                <TabsTrigger value="critical" className="text-xs">Critical {counts.critical}</TabsTrigger>
                <TabsTrigger value="warning" className="text-xs">Warn {counts.warning}</TabsTrigger>
                <TabsTrigger value="info" className="text-xs">Info {counts.info}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {visible.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-12 text-center">
                <Check className="h-6 w-6 text-muted-foreground" />
                <p className="text-sm font-medium">No matching suggestions</p>
                <p className="text-xs text-muted-foreground">
                  Nothing to review under this filter for {current.name}.
                </p>
              </div>
            ) : (
              visible.map((s) => {
                const meta = SEVERITY_META[s.severity]
                const Icon = meta.icon
                const isApplied = applied[s.id]
                return (
                  <div key={s.id} className="rounded-lg border bg-card p-3.5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className={cn("h-2 w-2 rounded-full", meta.dot)} aria-hidden="true" />
                      <Badge variant={meta.badge} className="gap-1 text-[11px]">
                        <Icon className="h-3 w-3" />
                        {meta.label}
                      </Badge>
                      <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                        {current.name}:{s.line}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-sm font-semibold leading-snug">{s.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {s.rule}
                      </code>
                      <div className="ml-auto flex items-center gap-1.5">
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                          Dismiss
                        </Button>
                        <Button
                          size="sm"
                          variant={isApplied ? "secondary" : "default"}
                          className="h-7 px-2.5 text-xs"
                          onClick={() => setApplied((prev) => ({ ...prev, [s.id]: !prev[s.id] }))}
                        >
                          {isApplied ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              Applied
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-3.5 w-3.5" />
                              Apply fix
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <footer className="border-t bg-muted/30 px-4 py-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{Object.values(applied).filter(Boolean).length} fixes staged</span>
              <Button size="sm" variant="outline" className="h-7 text-xs">
                Commit applied fixes
              </Button>
            </div>
          </footer>
        </aside>
      </main>
    </div>
  )
}
