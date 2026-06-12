export const CANO_REGISTRY_URL =
  process.env.CANO_REGISTRY_URL ?? "https://canoui.dev/r"

// shadcn primitives our components build on are resolved from the official
// shadcn registry, so an existing shadcn install keeps working untouched.
const SHADCN_REGISTRY_URLS = [
  "https://ui.shadcn.com/r/styles/new-york-v4",
  "https://ui.shadcn.com/r/styles/new-york",
]

export interface RegistryFile {
  path: string
  content: string
  type: string
  target?: string
}

export interface RegistryItem {
  name: string
  type: string
  title?: string
  description?: string
  category?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
  cssVars?: Record<string, Record<string, string>>
  source: "cano" | "shadcn"
}

export interface RegistryIndexItem {
  name: string
  title: string
  description: string
  category: string
}

async function fetchJson(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "cano-ui-cli" },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function fetchIndex(
  registryUrl = CANO_REGISTRY_URL
): Promise<RegistryIndexItem[]> {
  const data = await fetchJson(`${registryUrl}/index.json`)
  if (!data || !Array.isArray(data)) {
    throw new Error(
      `Could not reach the cano registry at ${registryUrl}. Check your network or CANO_REGISTRY_URL.`
    )
  }
  return data as RegistryIndexItem[]
}

export async function fetchItem(
  name: string,
  registryUrl = CANO_REGISTRY_URL
): Promise<RegistryItem | null> {
  // Full URLs are fetched as-is (shadcn-style remote registry references).
  if (name.startsWith("http://") || name.startsWith("https://")) {
    const item = (await fetchJson(name)) as RegistryItem | null
    return item ? { ...item, source: "cano" } : null
  }

  const cano = (await fetchJson(`${registryUrl}/${name}.json`)) as
    | RegistryItem
    | null
  if (cano) return { ...cano, source: "cano" }

  for (const base of SHADCN_REGISTRY_URLS) {
    const item = (await fetchJson(`${base}/${name}.json`)) as
      | RegistryItem
      | null
    if (item) return { ...item, source: "shadcn" }
  }
  return null
}

/**
 * Breadth-first resolution of an item set including registryDependencies,
 * deduped by name. cano items win over shadcn items of the same name.
 */
export async function resolveTree(
  names: string[],
  registryUrl = CANO_REGISTRY_URL
): Promise<{ items: RegistryItem[]; missing: string[] }> {
  const resolved = new Map<string, RegistryItem>()
  const missing: string[] = []
  const queue = [...names]
  const seen = new Set<string>()

  while (queue.length > 0) {
    const name = queue.shift()!
    const key = name.split("/").pop()!.replace(/\.json$/, "")
    if (seen.has(key)) continue
    seen.add(key)

    const item = await fetchItem(name, registryUrl)
    if (!item) {
      missing.push(name)
      continue
    }
    resolved.set(item.name ?? key, item)
    for (const dep of item.registryDependencies ?? []) {
      queue.push(dep)
    }
  }

  return { items: [...resolved.values()], missing }
}
