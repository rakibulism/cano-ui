"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface Country {
  /** ISO 3166-1 alpha-2 code, e.g. "US". */
  code: string
  name: string
  /** Calling code without the +, e.g. "44". */
  dialCode: string
}

/** ISO code → flag emoji via regional indicator symbols. */
export function countryFlag(code: string) {
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  )
}

const data: [string, string, string][] = [
  ["US", "United States", "1"], ["GB", "United Kingdom", "44"],
  ["CA", "Canada", "1"], ["AU", "Australia", "61"], ["DE", "Germany", "49"],
  ["FR", "France", "33"], ["ES", "Spain", "34"], ["IT", "Italy", "39"],
  ["NL", "Netherlands", "31"], ["BE", "Belgium", "32"],
  ["CH", "Switzerland", "41"], ["AT", "Austria", "43"], ["SE", "Sweden", "46"],
  ["NO", "Norway", "47"], ["DK", "Denmark", "45"], ["FI", "Finland", "358"],
  ["IE", "Ireland", "353"], ["PT", "Portugal", "351"], ["GR", "Greece", "30"],
  ["PL", "Poland", "48"], ["CZ", "Czechia", "420"], ["HU", "Hungary", "36"],
  ["RO", "Romania", "40"], ["BG", "Bulgaria", "359"], ["HR", "Croatia", "385"],
  ["SK", "Slovakia", "421"], ["SI", "Slovenia", "386"],
  ["UA", "Ukraine", "380"], ["RU", "Russia", "7"], ["TR", "Türkiye", "90"],
  ["IS", "Iceland", "354"], ["LU", "Luxembourg", "352"], ["MT", "Malta", "356"],
  ["CY", "Cyprus", "357"], ["EE", "Estonia", "372"], ["LV", "Latvia", "371"],
  ["LT", "Lithuania", "370"], ["RS", "Serbia", "381"],
  ["BA", "Bosnia and Herzegovina", "387"], ["AL", "Albania", "355"],
  ["MK", "North Macedonia", "389"], ["GE", "Georgia", "995"],
  ["AM", "Armenia", "374"], ["AZ", "Azerbaijan", "994"],
  ["KZ", "Kazakhstan", "7"], ["UZ", "Uzbekistan", "998"],
  ["IL", "Israel", "972"], ["SA", "Saudi Arabia", "966"],
  ["AE", "United Arab Emirates", "971"], ["QA", "Qatar", "974"],
  ["KW", "Kuwait", "965"], ["BH", "Bahrain", "973"], ["OM", "Oman", "968"],
  ["JO", "Jordan", "962"], ["LB", "Lebanon", "961"], ["IQ", "Iraq", "964"],
  ["IR", "Iran", "98"], ["AF", "Afghanistan", "93"], ["EG", "Egypt", "20"],
  ["MA", "Morocco", "212"], ["DZ", "Algeria", "213"], ["TN", "Tunisia", "216"],
  ["NG", "Nigeria", "234"], ["GH", "Ghana", "233"], ["KE", "Kenya", "254"],
  ["ET", "Ethiopia", "251"], ["TZ", "Tanzania", "255"], ["UG", "Uganda", "256"],
  ["ZA", "South Africa", "27"], ["IN", "India", "91"],
  ["PK", "Pakistan", "92"], ["BD", "Bangladesh", "880"],
  ["LK", "Sri Lanka", "94"], ["NP", "Nepal", "977"], ["CN", "China", "86"],
  ["JP", "Japan", "81"], ["KR", "South Korea", "82"], ["TW", "Taiwan", "886"],
  ["HK", "Hong Kong", "852"], ["SG", "Singapore", "65"],
  ["MY", "Malaysia", "60"], ["TH", "Thailand", "66"], ["VN", "Vietnam", "84"],
  ["PH", "Philippines", "63"], ["ID", "Indonesia", "62"],
  ["KH", "Cambodia", "855"], ["MM", "Myanmar", "95"],
  ["NZ", "New Zealand", "64"], ["FJ", "Fiji", "679"], ["BR", "Brazil", "55"],
  ["AR", "Argentina", "54"], ["CL", "Chile", "56"], ["CO", "Colombia", "57"],
  ["PE", "Peru", "51"], ["VE", "Venezuela", "58"], ["EC", "Ecuador", "593"],
  ["UY", "Uruguay", "598"], ["PY", "Paraguay", "595"],
  ["BO", "Bolivia", "591"], ["MX", "Mexico", "52"],
  ["GT", "Guatemala", "502"], ["CR", "Costa Rica", "506"],
  ["PA", "Panama", "507"], ["DO", "Dominican Republic", "1"],
  ["JM", "Jamaica", "1"], ["CU", "Cuba", "53"],
]

export const countries: Country[] = data.map(([code, name, dialCode]) => ({
  code,
  name,
  dialCode,
}))

export interface CountryInputProps {
  /** ISO code of the selected country. */
  value?: string
  onValueChange?: (country: Country) => void
  placeholder?: string
  /** Override or narrow the built-in list. */
  options?: Country[]
  disabled?: boolean
  className?: string
}

export function CountryInput({
  value,
  onValueChange,
  placeholder = "Select country…",
  options = countries,
  disabled,
  className,
}: CountryInputProps) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((c) => c.code === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={selected ? selected.name : placeholder}
          disabled={disabled}
          data-slot="country-input"
          className={cn(
            "w-full justify-between font-normal",
            !selected && "text-muted-foreground",
            className
          )}
        >
          {selected ? (
            <span className="flex min-w-0 items-center gap-2">
              <span aria-hidden="true">{countryFlag(selected.code)}</span>
              <span className="truncate">{selected.name}</span>
            </span>
          ) : (
            placeholder
          )}
          <ChevronsUpDown
            aria-hidden="true"
            className="text-muted-foreground"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder="Search countries…" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.name}
                  onSelect={() => {
                    onValueChange?.(country)
                    setOpen(false)
                  }}
                >
                  <span aria-hidden="true">{countryFlag(country.code)}</span>
                  <span className="flex-1 truncate">{country.name}</span>
                  <Check
                    aria-hidden="true"
                    className={cn(
                      country.code === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
