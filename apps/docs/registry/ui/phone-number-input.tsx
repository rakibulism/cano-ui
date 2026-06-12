"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

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
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  countries,
  countryFlag,
  type Country,
} from "@/registry/ui/country-input"

export interface PhoneNumberValue {
  country: Country
  /** National digits only, e.g. "5551234567". */
  number: string
  /** E.164 formatted, e.g. "+15551234567" — empty until digits exist. */
  e164: string
}

export interface PhoneNumberInputProps {
  /** ISO code of the initial country, default "US". */
  defaultCountry?: string
  value?: string
  onValueChange?: (value: PhoneNumberValue) => void
  placeholder?: string
  options?: Country[]
  disabled?: boolean
  className?: string
}

/** Groups national digits for display: 555 123 4567. */
function formatNational(digits: string) {
  return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim()
}

export function PhoneNumberInput({
  defaultCountry = "US",
  value,
  onValueChange,
  placeholder = "555 123 4567",
  options = countries,
  disabled,
  className,
}: PhoneNumberInputProps) {
  const [open, setOpen] = React.useState(false)
  const [country, setCountry] = React.useState<Country>(
    () => options.find((c) => c.code === defaultCountry) ?? options[0]
  )
  const [internal, setInternal] = React.useState("")
  const digits = (value ?? internal).replace(/\D/g, "")

  function emit(nextCountry: Country, nextDigits: string) {
    onValueChange?.({
      country: nextCountry,
      number: nextDigits,
      e164: nextDigits ? `+${nextCountry.dialCode}${nextDigits}` : "",
    })
  }

  return (
    <div
      data-slot="phone-number-input"
      className={cn("isolate flex w-full items-stretch", className)}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={`Country code: ${country.name} +${country.dialCode}`}
            disabled={disabled}
            className="gap-1.5 rounded-r-none border-r-0 px-3 font-normal shadow-none"
          >
            <span aria-hidden="true">{countryFlag(country.code)}</span>
            <span className="text-muted-foreground tabular-nums">
              +{country.dialCode}
            </span>
            <ChevronDown
              aria-hidden="true"
              className="size-3.5 text-muted-foreground"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72 p-0">
          <Command>
            <CommandInput placeholder="Search countries…" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.code}
                    value={`${option.name} +${option.dialCode}`}
                    onSelect={() => {
                      setCountry(option)
                      emit(option, digits)
                      setOpen(false)
                    }}
                  >
                    <span aria-hidden="true">{countryFlag(option.code)}</span>
                    <span className="flex-1 truncate">{option.name}</span>
                    <span className="text-muted-foreground tabular-nums">
                      +{option.dialCode}
                    </span>
                    <Check
                      aria-hidden="true"
                      className={cn(
                        option.code === country.code
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        aria-label="Phone number"
        placeholder={placeholder}
        value={formatNational(digits)}
        disabled={disabled}
        onChange={(e) => {
          const next = e.target.value.replace(/\D/g, "").slice(0, 15)
          setInternal(next)
          emit(country, next)
        }}
        className="z-10 rounded-l-none tabular-nums shadow-none"
      />
    </div>
  )
}
