"use client"

import { ChevronRight, FileText, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/registry/ui/item"

export default function ItemDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <ItemGroup className="rounded-lg border">
        <Item>
          <ItemMedia variant="icon">
            <Package />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              @acme/ui <Badge variant="secondary">v2.1.0</Badge>
            </ItemTitle>
            <ItemDescription>
              Design-led components for serious products.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon" aria-label="Open">
              <ChevronRight />
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia variant="icon">
            <FileText />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Changelog</ItemTitle>
            <ItemDescription>Every notable change, newest first.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              View
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  )
}
