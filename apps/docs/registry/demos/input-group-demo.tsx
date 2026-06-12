"use client"

import { Copy, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon } from "@/registry/ui/input-group"

export default function InputGroupDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <Input placeholder="yoursite" defaultValue="cano-ui.vercel" />
        <InputGroupAddon>.app</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <Input readOnly defaultValue="npx cano-ui add input-group" className="font-mono" />
        <Button variant="outline" aria-label="Copy command">
          <Copy />
        </Button>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <Input placeholder="Search orders…" />
        <Button>Search</Button>
      </InputGroup>
    </div>
  )
}
