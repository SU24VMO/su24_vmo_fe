import * as React from "react"
 
import { Card, CardContent } from "../../../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../ui/carousel"
 
export function CarouselAutoScroll() {

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      autoplay
      interval={500}
      className="w-full mobile:max-w-sm max-w-[300px]"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}