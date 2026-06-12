"use client"

import { SliderField } from "@/registry/ui/slider-field"

export default function SliderFieldDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8">
      <SliderField label="Volume" defaultValue={[65]} formatValue={(v) => `${v}%`} />
      <SliderField
        label="Price range"
        min={0}
        max={1000}
        step={10}
        defaultValue={[200, 750]}
        formatValue={(v) => `$${v}`}
        showRange
      />
      <SliderField
        label="Memory per instance"
        min={1}
        max={64}
        defaultValue={[16]}
        formatValue={(v) => `${v} GB`}
        showRange
      />
      <SliderField label="Brightness" defaultValue={[40]} disabled />
    </div>
  )
}
