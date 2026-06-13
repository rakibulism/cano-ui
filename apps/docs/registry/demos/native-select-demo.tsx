"use client"

import { Label } from "@/components/ui/label"
import { NativeSelect } from "@/registry/ui/native-select"

export default function NativeSelectDemo() {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="region">Region</Label>
      <NativeSelect id="region" defaultValue="us-east">
        <optgroup label="Americas">
          <option value="us-east">US East (N. Virginia)</option>
          <option value="us-west">US West (Oregon)</option>
          <option value="sa-east">South America (São Paulo)</option>
        </optgroup>
        <optgroup label="Europe">
          <option value="eu-west">Europe (Ireland)</option>
          <option value="eu-central">Europe (Frankfurt)</option>
        </optgroup>
        <optgroup label="Asia Pacific">
          <option value="ap-south">Asia Pacific (Mumbai)</option>
          <option value="ap-northeast">Asia Pacific (Tokyo)</option>
        </optgroup>
      </NativeSelect>
    </div>
  )
}
