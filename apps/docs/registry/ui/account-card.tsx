import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

type AccountMeta = {
  label: string
  value: string
}

interface AccountCardProps extends React.ComponentProps<typeof Card> {
  name: string
  email: string
  role?: string
  avatarUrl?: string
  meta?: AccountMeta[]
  actions?: React.ReactNode
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function AccountCard({
  name,
  email,
  role,
  avatarUrl,
  meta,
  actions,
  className,
  ...props
}: AccountCardProps) {
  return (
    <Card data-slot="account-card" className={cn("gap-0", className)} {...props}>
      <CardContent className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
        <Avatar className="size-16">
          {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
          <AvatarFallback className="text-base">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col items-center gap-1 sm:items-start">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="truncate font-semibold text-foreground">
              {name}
            </span>
            {role ? <Badge variant="secondary">{role}</Badge> : null}
          </div>
          <span className="truncate text-sm text-muted-foreground">
            {email}
          </span>
          {meta && meta.length > 0 ? (
            <div className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:justify-start">
              {meta.map((item) => (
                <span
                  key={item.label}
                  className="text-xs text-muted-foreground"
                >
                  {item.label}{" "}
                  <span className="font-medium text-foreground">
                    {item.value}
                  </span>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </CardContent>
      {actions ? (
        <CardFooter className="mt-4 justify-center gap-2 border-t sm:justify-start">
          {actions}
        </CardFooter>
      ) : null}
    </Card>
  )
}

export { AccountCard, type AccountCardProps, type AccountMeta }
