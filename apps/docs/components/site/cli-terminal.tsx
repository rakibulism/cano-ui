import { cn } from "@/lib/utils"
import { TerminalWindow } from "@/components/site/terminal-window"

const MENU = [
  "Install components",
  "Browse UI library",
  "Create project",
  "Sync library",
]

export function CliTerminal({ className }: { className?: string }) {
  return (
    <TerminalWindow title="cano — ~/projects/acme" className={cn(className)}>
      <div className="flex flex-col gap-3">
        <p>
          <span className="text-white/40">$ </span>
          <span className="text-white">cano</span>
        </p>

        <div className="flex flex-col gap-0.5">
          <span className="font-semibold tracking-[0.3em] text-white">
            C A N O
          </span>
          <span className="text-white/50">
            Install, browse, and manage Cano UI — right in your terminal.
          </span>
        </div>

        <p className="text-white/40">
          <span className="text-[#27c93f]">●</span> ~/projects/acme · Next.js
          detected
        </p>

        <ul className="flex flex-col gap-0.5">
          {MENU.map((label, i) => (
            <li
              key={label}
              className={cn(
                i === 0 ? "text-white" : "text-white/55"
              )}
            >
              <span className={i === 0 ? "text-[#27c93f]" : "text-white/30"}>
                {i === 0 ? "❯ " : "  "}
              </span>
              {label}
            </li>
          ))}
        </ul>

        <p className="text-white/30">
          /&nbsp;commands&nbsp;&nbsp;&nbsp;↑↓&nbsp;move&nbsp;&nbsp;&nbsp;⏎&nbsp;select&nbsp;&nbsp;&nbsp;esc&nbsp;back
        </p>
      </div>
    </TerminalWindow>
  )
}
