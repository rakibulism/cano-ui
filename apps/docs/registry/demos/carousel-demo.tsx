"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/ui/carousel"

export default function CarouselDemo() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {Array.from({ length: 6 }, (_, i) => (
            <CarouselItem key={i}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold tabular-nums">
                    {i + 1}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Drag, use the arrows, or press ← / →.
      </p>
    </div>
  )
}
