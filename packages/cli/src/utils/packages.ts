import fs from "node:fs"
import path from "node:path"
import { spawn } from "node:child_process"

export type PackageManager = "pnpm" | "yarn" | "bun" | "npm"

export function detectPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm"
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn"
  if (fs.existsSync(path.join(cwd, "bun.lock")) || fs.existsSync(path.join(cwd, "bun.lockb")))
    return "bun"
  return "npm"
}

export function readInstalledDeps(cwd: string): Set<string> {
  const installed = new Set<string>()
  try {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(cwd, "package.json"), "utf8")
    )
    for (const key of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
    ] as const) {
      for (const dep of Object.keys(pkg[key] ?? {})) installed.add(dep)
    }
  } catch {
    // no package.json — caller validates separately
  }
  return installed
}

export function installPackages(
  cwd: string,
  packages: string[],
  dev = false
): Promise<void> {
  if (packages.length === 0) return Promise.resolve()
  const pm = detectPackageManager(cwd)
  const args =
    pm === "npm"
      ? ["install", ...(dev ? ["--save-dev"] : []), ...packages]
      : ["add", ...(dev ? ["-D"] : []), ...packages]

  return new Promise((resolve, reject) => {
    const child = spawn(pm, args, { cwd, stdio: "inherit", shell: true })
    child.on("close", (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${pm} ${args.join(" ")} exited with code ${code}`))
    })
    child.on("error", reject)
  })
}
