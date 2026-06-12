"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { countryFlag } from "@/registry/ui/country-input"

export interface Language {
  /** BCP 47 language code, e.g. "en". */
  code: string
  name: string
  nativeName: string
  /** ISO country code used for the flag, e.g. "GB". */
  flag: string
}

const data: [string, string, string, string][] = [
  ["en", "English", "English", "GB"],
  ["es", "Spanish", "Español", "ES"],
  ["fr", "French", "Français", "FR"],
  ["de", "German", "Deutsch", "DE"],
  ["it", "Italian", "Italiano", "IT"],
  ["pt", "Portuguese", "Português", "BR"],
  ["nl", "Dutch", "Nederlands", "NL"],
  ["sv", "Swedish", "Svenska", "SE"],
  ["da", "Danish", "Dansk", "DK"],
  ["no", "Norwegian", "Norsk", "NO"],
  ["fi", "Finnish", "Suomi", "FI"],
  ["pl", "Polish", "Polski", "PL"],
  ["cs", "Czech", "Čeština", "CZ"],
  ["uk", "Ukrainian", "Українська", "UA"],
  ["ru", "Russian", "Русский", "RU"],
  ["el", "Greek", "Ελληνικά", "GR"],
  ["tr", "Turkish", "Türkçe", "TR"],
  ["he", "Hebrew", "עברית", "IL"],
  ["ar", "Arabic", "العربية", "SA"],
  ["fa", "Persian", "فارسی", "IR"],
  ["hi", "Hindi", "हिन्दी", "IN"],
  ["bn", "Bengali", "বাংলা", "BD"],
  ["ur", "Urdu", "اردو", "PK"],
  ["ta", "Tamil", "தமிழ்", "LK"],
  ["th", "Thai", "ไทย", "TH"],
  ["vi", "Vietnamese", "Tiếng Việt", "VN"],
  ["id", "Indonesian", "Bahasa Indonesia", "ID"],
  ["ms", "Malay", "Bahasa Melayu", "MY"],
  ["zh", "Chinese", "中文", "CN"],
  ["ja", "Japanese", "日本語", "JP"],
  ["ko", "Korean", "한국어", "KR"],
  ["ro", "Romanian", "Română", "RO"],
  ["hu", "Hungarian", "Magyar", "HU"],
  ["bg", "Bulgarian", "Български", "BG"],
  ["hr", "Croatian", "Hrvatski", "HR"],
  ["sw", "Swahili", "Kiswahili", "KE"],
  ["am", "Amharic", "አማርኛ", "ET"],
]

export const languages: Language[] = data.map(
  ([code, name, nativeName, flag]) => ({ code, name, nativeName, flag })
)

export interface LanguageSearchProps {
  /** Selected language code. */
  value?: string
  onValueChange?: (language: Language) => void
  placeholder?: string
  options?: Language[]
  /** Max list height before scrolling, default 256px. */
  className?: string
}

export function LanguageSearch({
  value,
  onValueChange,
  placeholder = "Search languages…",
  options = languages,
  className,
}: LanguageSearchProps) {
  return (
    <Command
      data-slot="language-search"
      className={cn("rounded-lg border", className)}
    >
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>No language found.</CommandEmpty>
        <CommandGroup>
          {options.map((language) => (
            <CommandItem
              key={language.code}
              value={`${language.name} ${language.nativeName}`}
              onSelect={() => onValueChange?.(language)}
            >
              <span aria-hidden="true">{countryFlag(language.flag)}</span>
              <span className="flex min-w-0 flex-1 items-baseline gap-2">
                <span className="truncate">{language.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {language.nativeName}
                </span>
              </span>
              <Check
                aria-hidden="true"
                className={cn(
                  language.code === value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
