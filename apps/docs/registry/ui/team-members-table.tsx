"use client"

import * as React from "react"
import { MoreHorizontal, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type TeamMemberRole = "owner" | "admin" | "member"

export interface TeamMember {
  id: string
  name: string
  email: string
  role: TeamMemberRole
  lastActive?: string
  status: "active" | "pending"
  avatarUrl?: string
}

export interface TeamMembersTableProps {
  members: TeamMember[]
  onChangeRole?: (member: TeamMember) => void
  onResendInvite?: (member: TeamMember) => void
  onRemove?: (member: TeamMember) => void
  onInvite?: () => void
  title?: string
  className?: string
}

const roleBadgeVariant: Record<
  TeamMemberRole,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  owner: "default",
  admin: "secondary",
  member: "outline",
}

const roleLabel: Record<TeamMemberRole, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function TeamMembersTable({
  members,
  onChangeRole,
  onResendInvite,
  onRemove,
  onInvite,
  title = "Team members",
  className,
}: TeamMembersTableProps) {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          <span className="text-sm text-muted-foreground">
            {members.length}
          </span>
        </div>
        <Button size="sm" onClick={onInvite}>
          <Plus aria-hidden="true" />
          Invite member
        </Button>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last active</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => {
              const pending = member.status === "pending"
              return (
                <TableRow key={member.id}>
                  <TableCell className="py-3">
                    <div
                      className={cn(
                        "flex items-center gap-3",
                        pending && "opacity-60"
                      )}
                    >
                      <Avatar className="size-8">
                        {member.avatarUrl ? (
                          <AvatarImage
                            src={member.avatarUrl}
                            alt={member.name}
                          />
                        ) : null}
                        <AvatarFallback className="text-xs">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {member.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-1.5">
                      <Badge variant={roleBadgeVariant[member.role]}>
                        {roleLabel[member.role]}
                      </Badge>
                      {pending ? (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground"
                        >
                          Pending
                        </Badge>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-muted-foreground">
                    {pending ? "Invite sent" : (member.lastActive ?? "—")}
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          aria-label={`Open actions for ${member.name}`}
                        >
                          <MoreHorizontal aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem
                          onSelect={() => onChangeRole?.(member)}
                        >
                          Change role
                        </DropdownMenuItem>
                        {pending ? (
                          <DropdownMenuItem
                            onSelect={() => onResendInvite?.(member)}
                          >
                            Resend invite
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={() => onRemove?.(member)}
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
