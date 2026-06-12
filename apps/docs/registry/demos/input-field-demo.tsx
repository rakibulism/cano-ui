"use client"

import { AtSign, Check, Globe } from "lucide-react"

import { InputField } from "@/registry/ui/input-field"

export default function InputFieldDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <InputField
        label="Email"
        type="email"
        required
        placeholder="you@company.com"
        icon={<AtSign />}
        description="We'll never share it with anyone."
      />
      <InputField
        label="Website"
        placeholder="acme.com"
        icon={<Globe />}
        defaultValue="acme.com"
        iconRight={<Check className="text-emerald-500" />}
      />
      <InputField
        label="Username"
        required
        defaultValue="mia!"
        error="Usernames can only contain letters, numbers, and dashes."
      />
    </div>
  )
}
