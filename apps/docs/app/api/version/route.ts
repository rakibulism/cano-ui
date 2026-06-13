import { NextResponse } from "next/server"

import { SITE_VERSION } from "@/lib/version"

// Always reflect the live deployment's version, never a cached value.
export const dynamic = "force-dynamic"

export function GET() {
  return NextResponse.json(
    { version: SITE_VERSION },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  )
}
