import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../ui/carousel";
import React from "react";
import avatar_img1 from "../../../../assets/avatars/01.png";
import avatar_img2 from "../../../../assets/avatars/02.png";
import avatar_img3 from "../../../../assets/avatars/03.png";
import avatar_img4 from "../../../../assets/avatars/04.png";
import avatar_img5 from "../../../../assets/avatars/05.png";
import CustomFeedBackCard from "./CustomFeedBackCard";

const feedbackData = [
  {
    avatar: avatar_img2,
    name: "Dũng",
    category: "Front End Dev",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    avatar: avatar_img3,
    name: "Khoa",
    category: "Front End Dev",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    avatar: avatar_img4,
    name: "Phát",
    category: "Back End Dev",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    avatar: avatar_img1,
    name: "Trường",
    category: "Project Manager",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    avatar: avatar_img5,
    name: "Dương Mentor",
    category: "Giảng Viên Hướng Dẫn",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  // ... add more feedback objects here
];

const CarouselFeedBack = () => {
  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-screen-laptop"
      >
        <CarouselContent>
        {feedbackData.map((feedback, index) => (
            <CarouselItem
              key={index}
              className="tablet:basis-1/2 laptop:basis-1/3"
            >
              <div className="p-1">
              <CustomFeedBackCard {...feedback}/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default CarouselFeedBack;
