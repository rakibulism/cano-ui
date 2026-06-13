"use client"

import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/registry/ui/field"

export default function FieldDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-email">Email</FieldLabel>
          <Input id="field-email" type="email" placeholder="you@acme.com" />
          <FieldDescription>We&rsquo;ll only use this to sign you in.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="field-handle">Handle</FieldLabel>
          <Input id="field-handle" defaultValue="mia!" aria-invalid />
          <FieldError>Only letters, numbers, and dashes are allowed.</FieldError>
        </Field>
        <Field orientation="horizontal">
          <Switch id="field-news" defaultChecked />
          <FieldLabel htmlFor="field-news" className="font-normal">
            Email me product updates
          </FieldLabel>
        </Field>
      </FieldGroup>
    </div>
  )
}
