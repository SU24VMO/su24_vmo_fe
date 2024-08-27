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
      "Ứng dụng thiện nguyện này mang đến cho người dùng một môi trường đáng tin cậy, nơi họ có thể cảm nhận rõ ràng về sự an tâm khi đóng góp. Mọi hoạt động, từ việc tiếp nhận quyên góp đến việc phân bổ nguồn lực, đều được hiển thị một cách rõ ràng, giúp người dùng hiểu rõ cách thức và tiến trình mà khoản đóng góp của mình đang trải qua.",
  },
  {
    avatar: avatar_img3,
    name: "Khoa",
    category: "",
    message:
      "Ứng dụng cũng đặc biệt chú trọng đến việc cung cấp thông tin chi tiết về các dự án và hoạt động từ thiện. Người dùng có thể dễ dàng truy cập và xem xét các báo cáo tài chính, cũng như theo dõi hành trình của từng khoản quyên góp, từ lúc bắt đầu tiếp nhận cho đến khi nó được sử dụng để giúp đỡ những người có hoàn cảnh khó khăn. Những thông tin này không chỉ là minh chứng cho tính hiệu quả của các hoạt động từ thiện mà còn giúp người dùng cảm nhận được vai trò quan trọng của họ trong việc tạo ra sự thay đổi tích cực trong cộng đồng.",
  },
  {
    avatar: avatar_img4,
    name: "Phát",
    category: "",
    message:
      "Giải pháp rất tuyệt vời giúp mình làm từ thiện dễ dàng chứng minh sự đúng đắn của mình, gia tăng tính cụ thể mục tiêu, tăng cường trách nhiệm giải trình, đưa cộng đồng vào cùng giám sát.",
  },
  {
    avatar: avatar_img1,
    name: "Trường",
    category: "",
    message:
      "Đây là dự án tại Việt Nam sử dụng công nghệ trong việc thiện nguyện. Sự trợ giúp này được công khai, rõ ràng hoàn toàn qua đó lan tỏa những điều tốt đẹp trong xã hội.",
  },
  {
    avatar: avatar_img5,
    name: "Dương Mentor",
    category: "Giảng Viên Hướng Dẫn",
    message:
      "App Thiện Nguyện với cách sử dụng rất là thuận lợi và mọi thông tin rất là rõ ràng thì đã đáp ứng được những mong mỏi của người làm công tác nhân đạo hiện nay.",
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
