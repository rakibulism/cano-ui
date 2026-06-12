import fs from "node:fs"
import path from "node:path"

export interface ComponentsConfig {
  $schema?: string
  style?: string
  rsc?: boolean
  tsx?: boolean
  tailwind?: {
    config?: string
    css?: string
    baseColor?: string
    cssVariables?: boolean
  }
  aliases?: Record<string, string>
  iconLibrary?: string
}

export function getProjectRoot(cwd: string): string {
  return path.resolve(cwd)
}

export function readConfig(cwd: string): ComponentsConfig | null {
  const file = path.join(cwd, "components.json")
  if (!fs.existsSync(file)) return null
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as ComponentsConfig
  } catch {
    throw new Error(
      `Could not parse components.json at ${file}. Fix or delete it, then re-run.`
    )
  }
}

export function writeConfig(cwd: string, config: ComponentsConfig) {
  fs.writeFileSync(
    path.join(cwd, "components.json"),
    JSON.stringify(config, null, 2) + "\n"
  )
}

/**
 * Resolve an import alias (e.g. "@/components/ui") to an absolute directory,
 * using tsconfig/jsconfig path mappings when available, falling back to the
 * src/ vs root heuristic.
 */
export function resolveAlias(cwd: string, alias: string): string {
  const mappings = readPathMappings(cwd)
  for (const [pattern, targets] of Object.entries(mappings)) {
    const prefix = pattern.replace(/\*$/, "")
    if (alias === prefix.replace(/\/$/, "") || alias.startsWith(prefix)) {
      const target = targets[0]?.replace(/\*$/, "") ?? "./"
      const rest = alias.slice(prefix.length)
      return path.resolve(cwd, target, rest)
    }
  }
  // Heuristic fallback: "@/x" -> ./src/x if src exists, else ./x
  const rest = alias.replace(/^@\//, "")
  const srcDir = path.join(cwd, "src")
  return fs.existsSync(srcDir)
    ? path.join(srcDir, rest)
    : path.join(cwd, rest)
}

function readPathMappings(cwd: string): Record<string, string[]> {
  for (const name of ["tsconfig.json", "jsconfig.json"]) {
    const file = path.join(cwd, name)
    if (!fs.existsSync(file)) continue
    try {
      const raw = fs.readFileSync(file, "utf8")
      // Strip // and /* */ comments + trailing commas (tsconfig is JSONC).
      const json = raw
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "")
        .replace(/,(\s*[}\]])/g, "$1")
      const parsed = JSON.parse(json)
      const paths = parsed?.compilerOptions?.paths
      if (paths && typeof paths === "object") return paths
    } catch {
      // ignore unparseable tsconfig, fall through to heuristic
    }
  }
  return {}
}

export interface ResolvedPaths {
  ui: string
  components: string
  lib: string
  hooks: string
  utils: string // file path without extension
  css: string | null
}

export function resolvePaths(cwd: string, config: ComponentsConfig): ResolvedPaths {
  const aliases = config.aliases ?? {}
  const components = aliases.components ?? "@/components"
  const ui = aliases.ui ?? `${components}/ui`
  const lib = aliases.lib ?? "@/lib"
  const hooks = aliases.hooks ?? "@/hooks"
  const utils = aliases.utils ?? `${lib}/utils`
  return {
    ui: resolveAlias(cwd, ui),
    components: resolveAlias(cwd, components),
    lib: resolveAlias(cwd, lib),
    hooks: resolveAlias(cwd, hooks),
    utils: resolveAlias(cwd, utils),
    css: config.tailwind?.css ? path.resolve(cwd, config.tailwind.css) : null,
  }
}
