import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../../../ui/carousel";
import CustomCardDonator from "./CustomCardDonator";
import { axiosPublic } from "../../../../api/axiosInstance";
import { GET_ALL_RECENTLY_TRANSACTION } from "../../../../api/apiConstants";
import CarouselDonatorSkeleton from "./CarouselDonatorSkeleton/CarouselDonatorSkeleton";
import { useToast } from "../../../ui/use-toast";
import { ToastAction } from "../../../ui/toast";
import axios from "axios";

export function CarouselAutoScrollDonator() {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [data, setData] = React.useState([]);
  const { toast } = useToast();

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchUnreadNotification() {
      try {
        // toast({
        //   title: "Đang tải các giao dịch gần đây...",
        //   action: <ToastAction altText="undo">Ẩn</ToastAction>,
        // });
        const response = await axiosPublic.get(
          GET_ALL_RECENTLY_TRANSACTION +
            `?pageSize=10&pageNo=1&numberOfTransaction=6`,
          { signal }
        );
        if (response.status === 200) {
          console.log("Các giao dịch gần đây: ", response.data.data.list);
          setData(response.data.data.list);
          setDataLoaded(true);
          // toast({
          //   title: "Tải các giao dịch gần đây thành công!",
          //   action: <ToastAction altText="undo">Ẩn</ToastAction>,
          // });
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Lỗi khi lấy dữ liệu từ API:", error);
          toast({
            variant: "destructive",
            title: "Lỗi!",
            description: "Có lỗi xảy ra khi hiển thị các giao dịch gần đây" + error,
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
        }
      }
    }
    fetchUnreadNotification();
    return () => {
      abortController.abort();
    };
  }, [toast]);

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
      <CarouselContent className="-mt-1 h-[200px] max-w-lg">
        {dataLoaded ? (
          data.length > 0 ? (
            data.map((item) => (
              <CarouselItem
                key={item.transactionID}
                className="pt-1 md:basis-1/2"
              >
                <div className="p-1">
                  <CustomCardDonator
                    avatar_img={item.avatar}
                    name={item.payerName}
                    donation={item.amount}
                    time={item.donatationPeriod}
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselDonatorSkeleton />
          )
        ) : (
          <CarouselDonatorSkeleton />
        )}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
