"use client"

import * as React from "react"

import { LanguageSearch, type Language } from "@/registry/ui/language-search"

export default function LanguageSearchDemo() {
  const [language, setLanguage] = React.useState<Language | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <LanguageSearch
        value={language?.code ?? "en"}
        onValueChange={setLanguage}
        className="**:data-[slot=command-input-wrapper]:h-11 [&_[cmdk-list]]:max-h-64"
      />
      <p className="text-center text-sm text-muted-foreground" role="status">
        Interface language:{" "}
        <span className="font-medium text-foreground">
          {language ? `${language.name} (${language.nativeName})` : "English"}
        </span>
      </p>
    </div>
  )
}
