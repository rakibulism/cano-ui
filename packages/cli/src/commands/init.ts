import fs from "node:fs"
import path from "node:path"
import { Command } from "commander"
import prompts from "prompts"
import {
  readConfig,
  writeConfig,
  resolvePaths,
  type ComponentsConfig,
} from "../utils/config.js"
import { installPackages, readInstalledDeps } from "../utils/packages.js"
import { TOKENS_CSS, UTILS_TS } from "../utils/tokens.js"
import { logger, highlight } from "../utils/logger.js"

const CSS_CANDIDATES = [
  "app/globals.css",
  "src/app/globals.css",
  "styles/globals.css",
  "src/styles/globals.css",
  "app/tailwind.css",
]

const BASE_DEPS = [
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "lucide-react",
  "tw-animate-css",
]

export const init = new Command()
  .name("init")
  .description("set up components.json, the cn() utility, and design tokens")
  .option("-y, --yes", "skip prompts and use defaults", false)
  .option("--force", "overwrite an existing components.json", false)
  .option("-c, --cwd <cwd>", "working directory", process.cwd())
  .action(async (opts: { yes: boolean; force: boolean; cwd: string }) => {
    const cwd = path.resolve(opts.cwd)

    if (!fs.existsSync(path.join(cwd, "package.json"))) {
      logger.error(
        `No package.json found in ${cwd}. Run init inside a project.`
      )
      process.exitCode = 1
      return
    }

    const existing = readConfig(cwd)
    if (existing && !opts.force) {
      logger.success(
        "Found an existing components.json — you're already set up."
      )
      logger.dim(
        `cano components are shadcn-compatible. Run ${highlight(
          "npx cano-ui add <component>"
        )} to start. (Use --force to rewrite the config.)`
      )
      return
    }

    const detectedCss = CSS_CANDIDATES.find((p) =>
      fs.existsSync(path.join(cwd, p))
    )

    let css = detectedCss ?? "app/globals.css"
    let rsc = true
    if (!opts.yes) {
      const answers = await prompts(
        [
          {
            type: "text",
            name: "css",
            message: "Where is your global CSS file?",
            initial: css,
          },
          {
            type: "confirm",
            name: "rsc",
            message: "Are you using React Server Components?",
            initial: true,
          },
        ],
        { onCancel: () => process.exit(1) }
      )
      css = answers.css
      rsc = answers.rsc
    }

    const config: ComponentsConfig = {
      $schema: "https://ui.shadcn.com/schema.json",
      style: "new-york",
      rsc,
      tsx: true,
      tailwind: {
        config: "",
        css,
        baseColor: "neutral",
        cssVariables: true,
      },
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
        lib: "@/lib",
        hooks: "@/hooks",
      },
      iconLibrary: "lucide",
    }
    writeConfig(cwd, config)
    logger.success("Wrote components.json")

    const paths = resolvePaths(cwd, config)

    // cn() utility
    const utilsFile = `${paths.utils}.ts`
    if (!fs.existsSync(utilsFile)) {
      fs.mkdirSync(path.dirname(utilsFile), { recursive: true })
      fs.writeFileSync(utilsFile, UTILS_TS)
      logger.success(`Wrote ${path.relative(cwd, utilsFile)}`)
    } else {
      logger.dim(`Kept existing ${path.relative(cwd, utilsFile)}`)
    }

    // Design tokens
    const cssFile = path.resolve(cwd, css)
    if (fs.existsSync(cssFile)) {
      const content = fs.readFileSync(cssFile, "utf8")
      if (content.includes("--background")) {
        logger.dim(
          `Design tokens already present in ${css} — left untouched (shadcn tokens work as-is).`
        )
      } else {
        fs.writeFileSync(cssFile, content.trimEnd() + "\n" + TOKENS_CSS)
        logger.success(`Appended cano design tokens to ${css}`)
      }
    } else {
      fs.mkdirSync(path.dirname(cssFile), { recursive: true })
      fs.writeFileSync(cssFile, `@import "tailwindcss";\n` + TOKENS_CSS)
      logger.success(`Created ${css} with cano design tokens`)
    }

    // Base dependencies
    const installed = readInstalledDeps(cwd)
    const toInstall = BASE_DEPS.filter((d) => !installed.has(d))
    if (toInstall.length > 0) {
      logger.step(`Installing ${toInstall.join(", ")}…`)
      await installPackages(cwd, toInstall)
    }

    logger.break()
    logger.success("Done. Add your first component:")
    logger.info(`  ${highlight("npx cano-ui add data-table-pro")}`)
  })
