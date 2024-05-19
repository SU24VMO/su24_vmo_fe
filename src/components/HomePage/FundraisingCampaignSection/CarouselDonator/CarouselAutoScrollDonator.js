import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../../../ui/carousel";
import avatar_img1 from "../../../../assets/avatars/01.png";
import avatar_img2 from "../../../../assets/avatars/02.png";
import avatar_img3 from "../../../../assets/avatars/03.png";
import avatar_img4 from "../../../../assets/avatars/04.png";
import avatar_img5 from "../../../../assets/avatars/05.png";
import CustomCardDonator from "./CustomCardDonator";

const cardData = [
  {
    avatar_img: avatar_img1,
    name: "Người ủng hộ ẩn danh 1",
    donation: "100.000đ",
    time: "1 giờ trước",
  },
  {
    avatar_img: avatar_img2,
    name: "Người ủng hộ ẩn danh 2",
    donation: "200.000đ",
    time: "2 giờ trước",
  },
  {
    avatar_img: avatar_img3,
    name: "Người ủng hộ ẩn danh 3",
    donation: "300.000đ",
    time: "3 giờ trước",
  },
  {
    avatar_img: avatar_img4,
    name: "Người ủng hộ ẩn danh 4",
    donation: "400.000đ",
    time: "4 giờ trước",
  },
  {
    avatar_img: avatar_img5,
    name: "Người ủng hộ ẩn danh 5",
    donation: "500.000đ",
    time: "5 giờ trước",
  },
];

export function CarouselAutoScrollDonator() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      autoplay
      interval={500}
      orientation="vertical"
      className="w-full max-w-lg"
    >
      <CarouselContent className="-mt-1 h-[100px]">
        {cardData.map((item, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <CustomCardDonator
                avatar_img={item.avatar_img}
                name={item.name}
                donation={item.donation}
                time={item.time}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
