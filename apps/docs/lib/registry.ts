import fs from "node:fs"
import path from "node:path"

export interface RegistryMeta {
  name: string
  title: string
  description: string
  category: string
  dependencies: string[]
  registryDependencies: string[]
  files: string[]
}

const root = process.cwd()
const metaDir = path.join(root, "registry", "meta")

export function getRegistryItems(): RegistryMeta[] {
  return fs
    .readdirSync(metaDir)
    .filter((f) => f.endsWith(".json"))
    .map(
      (f) =>
        JSON.parse(
          fs.readFileSync(path.join(metaDir, f), "utf8")
        ) as RegistryMeta
    )
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getRegistryItem(name: string): RegistryMeta | null {
  const file = path.join(metaDir, `${name}.json`)
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, "utf8")) as RegistryMeta
}

/** Component source as consumers receive it (registry import paths rewritten). */
export function getComponentSource(meta: RegistryMeta): string {
  return meta.files
    .map((rel) =>
      fs
        .readFileSync(path.join(root, rel), "utf8")
        .replaceAll("@/registry/ui/", "@/components/ui/")
    )
    .join("\n\n")
}

export const CATEGORY_ORDER = [
  "layout",
  "data",
  "navigation",
  "input",
  "flow",
  "auth",
  "dashboard",
  "data-viz",
  "marketing",
  "profile",
  "feedback",
]

export function groupByCategory(items: RegistryMeta[]) {
  const groups = new Map<string, RegistryMeta[]>()
  for (const item of items) {
    if (!groups.has(item.category)) groups.set(item.category, [])
    groups.get(item.category)!.push(item)
  }
  return [...groups.entries()].sort(
    (a, b) =>
      (CATEGORY_ORDER.indexOf(a[0]) + 100) % 100 -
      ((CATEGORY_ORDER.indexOf(b[0]) + 100) % 100)
  )
}
