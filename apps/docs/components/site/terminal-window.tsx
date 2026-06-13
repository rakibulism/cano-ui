import { cn } from "@/lib/utils"

export function TerminalWindow({
  title = "cano",
  className,
  children,
}: {
  title?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-black/10 bg-[#0c0c0c] shadow-sm dark:border-white/10",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f56]" />
          <span className="size-3 rounded-full bg-[#ffbd2e]" />
          <span className="size-3 rounded-full bg-[#27c93f]" />
        </span>
        <span className="ml-2 truncate font-mono text-xs text-white/40">
          {title}
        </span>
      </div>
      <div className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/85">
        {children}
      </div>
    </div>
  )
}
