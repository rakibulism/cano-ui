import { cn } from "@/lib/utils"

/** Inline code for use inside docs prose. */
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  )
}

export function DocsArticle({
  title,
  lead,
  children,
  className,
}: {
  title: string
  lead?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <article className={cn("min-w-0 max-w-2xl", className)}>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {lead ? (
        <p className="mt-3 text-lg text-balance text-muted-foreground">
          {lead}
        </p>
      ) : null}
      <div
        className={cn(
          "mt-8 flex flex-col gap-4",
          "[&_h2]:mt-8 [&_h2]:scroll-mt-20 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
          "[&_h3]:mt-4 [&_h3]:font-medium [&_h3]:text-foreground",
          "[&_p]:leading-relaxed [&_p]:text-muted-foreground",
          "[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5",
          "[&_li]:list-disc [&_li]:leading-relaxed [&_li]:text-muted-foreground [&_li]:marker:text-muted-foreground/50",
          "[&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4",
          "[&_strong]:font-medium [&_strong]:text-foreground"
        )}
      >
        {children}
      </div>
    </article>
  )
}
