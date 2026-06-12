"use client"

import {
  TeamMembersTable,
  type TeamMember,
} from "@/registry/ui/team-members-table"

const members: TeamMember[] = [
  {
    id: "usr_01",
    name: "Elena Vasquez",
    email: "elena@acme.dev",
    role: "owner",
    lastActive: "2 minutes ago",
    status: "active",
  },
  {
    id: "usr_02",
    name: "Marcus Chen",
    email: "marcus@acme.dev",
    role: "admin",
    lastActive: "1 hour ago",
    status: "active",
  },
  {
    id: "usr_03",
    name: "Priya Raghavan",
    email: "priya@acme.dev",
    role: "admin",
    lastActive: "Yesterday",
    status: "active",
  },
  {
    id: "usr_04",
    name: "Tom Okafor",
    email: "tom@acme.dev",
    role: "member",
    lastActive: "3 days ago",
    status: "active",
  },
  {
    id: "usr_05",
    name: "Sofia Lindqvist",
    email: "sofia@acme.dev",
    role: "member",
    lastActive: "Last week",
    status: "active",
  },
  {
    id: "usr_06",
    name: "Daniel Mwangi",
    email: "daniel@acme.dev",
    role: "member",
    status: "pending",
  },
]

export default function TeamMembersTableDemo() {
  return (
    <TeamMembersTable
      members={members}
      onChangeRole={(member) => console.log("Change role", member.id)}
      onResendInvite={(member) => console.log("Resend invite", member.id)}
      onRemove={(member) => console.log("Remove", member.id)}
      onInvite={() => console.log("Invite member")}
    />
  )
}
