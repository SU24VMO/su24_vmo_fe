import * as React from "react";

import { Card, CardContent } from "../../../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../../../ui/carousel";
import hero_image_carousel_1 from "../../../../assets/images/home-page/hero-section/hero_img_carousel_1.png";
import hero_image_carousel_2 from "../../../../assets/images/home-page/hero-section/hero_img_carousel_2.png";
import hero_image_carousel_3 from "../../../../assets/images/home-page/hero-section/hero_img_carousel_3.png";
import hero_image_carousel_4 from "../../../../assets/images/home-page/hero-section/hero_img_carousel_4.png";
import hero_image_carousel_5 from "../../../../assets/images/home-page/hero-section/hero_img_carousel_5.png";
import hero_image_carousel_6 from "../../../../assets/images/home-page/hero-section/hero_img_carousel_6.png";
import { AspectRatio } from "../../../ui/aspect-ratio";

export function CarouselAutoScroll() {
  const images = [
    hero_image_carousel_1,
    hero_image_carousel_2,
    hero_image_carousel_3,
    hero_image_carousel_4,
    hero_image_carousel_5,
    hero_image_carousel_6,
  ];

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
        {images.map((image, index) => (
          <CarouselItem key={index} 
          className="aspect-square"
          >
            <AspectRatio ratio={1 / 1} className="bg-muted">
              <img
                src={image}
                alt={`Carousel ${index + 1}`}
                className="w-full h-full rounded-md object-cover"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
