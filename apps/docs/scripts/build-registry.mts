/**
 * Builds the static registry served at /r/*.json from the component sources
 * in registry/ui + their meta files in registry/meta.
 *
 * Output is shadcn registry-item compatible: the cano CLI consumes it, but
 * `npx shadcn add https://canoui.dev/r/<name>.json` works too.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const metaDir = path.join(root, "registry", "meta")
const outDir = path.join(root, "public", "r")

interface Meta {
  name: string
  title: string
  description: string
  category: string
  dependencies: string[]
  registryDependencies: string[]
  files: string[]
  cssVars?: Record<string, Record<string, string>>
}

fs.mkdirSync(outDir, { recursive: true })

const metas: Meta[] = fs
  .readdirSync(metaDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(metaDir, f), "utf8")))

let count = 0
for (const meta of metas) {
  const files = meta.files.map((rel) => {
    const source = fs.readFileSync(path.join(root, rel), "utf8")
    return {
      path: rel.replace(/^registry\/ui\//, "components/ui/"),
      // Cross-component imports use @/registry/ui locally (so the docs site
      // resolves them); consumers get them at @/components/ui.
      content: source.replaceAll("@/registry/ui/", "@/components/ui/"),
      type: "registry:component",
    }
  })

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: meta.name,
    type: "registry:component",
    title: meta.title,
    description: meta.description,
    category: meta.category,
    dependencies: meta.dependencies,
    registryDependencies: meta.registryDependencies,
    files,
    ...(meta.cssVars ? { cssVars: meta.cssVars } : {}),
  }

  fs.writeFileSync(
    path.join(outDir, `${meta.name}.json`),
    JSON.stringify(item, null, 2)
  )
  count++
}

const index = metas
  .map((m) => ({
    name: m.name,
    title: m.title,
    description: m.description,
    category: m.category,
    dependencies: m.dependencies,
    registryDependencies: m.registryDependencies,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

fs.writeFileSync(
  path.join(outDir, "index.json"),
  JSON.stringify(index, null, 2)
)

console.log(`Built ${count} registry items + index.json → public/r/`)
