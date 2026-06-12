"use client"

import * as React from "react"
import { Check, Copy, KeyRound, Plus, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface ApiKey {
  id: string
  name: string
  /** Masked key shown in the list, e.g. "sk_live_••••4f2a". */
  maskedKey: string
  createdAt: string
  lastUsed?: string
  revoked?: boolean
}

export interface ApiKeyManagerProps extends React.ComponentProps<"div"> {
  keys: ApiKey[]
  onCreate?: (name: string) => void
  onRevoke?: (key: ApiKey) => void
  /** Returns the value to copy for a key; omit to hide the copy button. */
  getCopyValue?: (key: ApiKey) => string
  emptyMessage?: string
}

function CopyKeyButton({ value, name }: { value: string; name: string }) {
  const [copied, setCopied] = React.useState(false)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          aria-label={`Copy ${name}`}
          onClick={() => {
            void navigator.clipboard?.writeText(value)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          }}
        >
          {copied ? (
            <Check className="text-emerald-600" aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{copied ? "Copied" : "Copy key"}</TooltipContent>
    </Tooltip>
  )
}

function CreateKeyDialog({ onCreate }: { onCreate: (name: string) => void }) {
  const [name, setName] = React.useState("")
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus aria-hidden="true" />
          Create key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create API key</DialogTitle>
          <DialogDescription>
            Give the key a descriptive name so you can recognize it later.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="api-key-name">Key name</Label>
          <Input
            id="api-key-name"
            placeholder="e.g. Production server"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim()) {
                onCreate(name.trim())
                setName("")
                setOpen(false)
              }
            }}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={!name.trim()}
            onClick={() => {
              onCreate(name.trim())
              setName("")
              setOpen(false)
            }}
          >
            Create key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function ApiKeyManager({
  keys,
  onCreate,
  onRevoke,
  getCopyValue,
  emptyMessage = "No API keys yet. Create one to get started.",
  className,
  ...props
}: ApiKeyManagerProps) {
  return (
    <div
      data-slot="api-key-manager"
      className={cn("w-full rounded-lg border", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">API keys</h3>
          <p className="text-xs text-muted-foreground">
            Keys grant full access to your account. Keep them secret.
          </p>
        </div>
        {onCreate ? <CreateKeyDialog onCreate={onCreate} /> : null}
      </div>
      {keys.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <ul className="divide-y">
          {keys.map((key) => (
            <li
              key={key.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3",
                key.revoked && "opacity-60"
              )}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <KeyRound
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span className="truncate">{key.name}</span>
                  {key.revoked ? (
                    <Badge variant="outline" className="text-muted-foreground">
                      Revoked
                    </Badge>
                  ) : null}
                </span>
                <span className="flex gap-2 text-xs text-muted-foreground">
                  <code className="font-mono">{key.maskedKey}</code>
                  <span aria-hidden="true">·</span>
                  <span>
                    {key.lastUsed
                      ? `Last used ${key.lastUsed}`
                      : `Created ${key.createdAt}`}
                  </span>
                </span>
              </div>
              {!key.revoked && getCopyValue ? (
                <CopyKeyButton value={getCopyValue(key)} name={key.name} />
              ) : null}
              {!key.revoked && onRevoke ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive"
                      aria-label={`Revoke ${key.name}`}
                      onClick={() => onRevoke(key)}
                    >
                      <Trash2 aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Revoke key</TooltipContent>
                </Tooltip>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
