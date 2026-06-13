"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"

export default function AccordionDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Yes. It follows the WAI-ARIA disclosure pattern and is fully
            keyboard navigable.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Does it animate?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Yes — the height transitions smoothly as sections open and close.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can multiple be open?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Set <code>type="multiple"</code> to allow several sections open at
            once.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
