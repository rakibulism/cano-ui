import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/site/copy-button"

export function CodeBlock({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border bg-muted/50 py-2 pl-4 pr-2 font-mono text-sm",
        className
      )}
    >
      <code className="select-all overflow-x-auto whitespace-pre">
        {children}
      </code>
      <CopyButton value={children} />
    </div>
  )
}
