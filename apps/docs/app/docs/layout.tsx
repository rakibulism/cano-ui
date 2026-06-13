import { SiteHeader } from "@/components/site/header"
import { DocsSidebar } from "@/components/site/docs-sidebar"
import { DocsPager } from "@/components/site/docs-pager"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto grid w-full max-w-5xl flex-1 gap-10 px-6 py-10 md:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden md:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-6">
            <DocsSidebar />
          </div>
        </aside>
        <main className="min-w-0">
          {children}
          <DocsPager />
        </main>
      </div>
    </div>
  )
}
