"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/ui/resizable"

export default function ResizableDemo() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-64 rounded-lg border"
      >
        <ResizablePanel defaultSize={30} minSize={15}>
          <div className="flex h-full items-center justify-center p-6 text-sm font-medium">
            Sidebar
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60}>
              <div className="flex h-full items-center justify-center p-6 text-sm font-medium">
                Content
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <div className="flex h-full items-center justify-center p-6 text-sm font-medium">
                Console
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Drag the handles to resize.
      </p>
    </div>
  )
}
