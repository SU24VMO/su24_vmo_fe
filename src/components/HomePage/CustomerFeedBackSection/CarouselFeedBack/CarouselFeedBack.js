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
    category: "",
    message:
      "Câu hỏi là làm thế nào để mình có thể minh bạch hoàn toàn việc thu, chi trong quá trình gây quỹ. Nếu như mà mình chỉ sử dụng những trang cá nhân của mình thì chỉ giải quyết được vấn đề tạm thời thì rất là may là App Thiện Nguyện giải quyết được vấn đề đó.",
  },
  {
    avatar: avatar_img3,
    name: "Khoa",
    category: "",
    message:
      "Sự ra đời của App Thiện Nguyện minh bạch đã giúp tôi có nhiều thời gian hơn để giúp đỡ người bị nạn mà không phải lo lắng đến vấn đề báo cáo không minh bạch hay báo cáo chậm với các nhà hảo tâm, đây cũng là giải pháp chuẩn nhất cho đến thời điểm hiện tại để có thể áp dụng quản lý chất lượng các chương trình thiện nguyện.",
  },
  {
    avatar: avatar_img4,
    name: "Phát",
    category: "",
    message:
      "Giải pháp rất tuyệt vời giúp mình làm từ thiện dễ dàng chứng minh sự đúng đắn của mình, gia tăng sự minh bạch, tăng cường trách nhiệm giải trình, đưa cộng đồng vào cùng giám sát.",
  },
  {
    avatar: avatar_img1,
    name: "Trường",
    category: "",
    message:
      "Đây là dự án đầu tiên tại Việt Nam sử dụng công nghệ trong việc thiện nguyện. Sự trợ giúp này được công khai, minh bạch hoàn toàn qua đó lan tỏa những điều tốt đẹp trong xã hội.",
  },
  {
    avatar: avatar_img5,
    name: "Dương Mentor",
    category: "Giảng Viên Hướng Dẫn",
    message:
      "App Thiện Nguyện với cách sử dụng rất là thuận lợi và mọi thông tin rất là minh bạch thì đã đáp ứng được những mong mỏi của người làm công tác nhân đạo hiện nay.",
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
        autoplay
        interval={500}
        className="w-full max-w-screen-laptop"
      >
        <CarouselContent>
          {feedbackData.map((feedback, index) => (
            <CarouselItem
              key={index}
              className="tablet:basis-1/2 laptop:basis-1/3"
            >
              <div className="p-1">
                <CustomFeedBackCard {...feedback} />
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
