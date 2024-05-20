import React from "react";
import { Card } from "../../ui/card";
import img_demo from "../../../assets/images/placeholder.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import TransactionTable from "./TransactionTable/TransactionTable";

const LeftDetailCampaignSection = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        <p className="text-3xl text-muted-foreground font-bold">
          Tên Chiến Dịch
        </p>
        <Card className=" max-h-[600px] overflow-hidden flex flex-col items-stretch justify-center">
          <div className="relative">
            <img
              alt="Campaign img"
              className="object-cover rounded-lg w-full h-auto"
              src={img_demo}
            />
          </div>
        </Card>
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Mô tả</TabsTrigger>
            <TabsTrigger value="transaction">Danh sách ủng hộ</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="leading-relaxed">
            Đánh cắp mặt trời là chiến dịch đặc biệt do Từ Thiện Thật tổ chức
            nhằm mục đích mang Điện năng lượng mặt trời đến với các bản vùng
            cao, vùng sâu vùng xa và các xóm nghèo chưa có điện tại Việt Nam và
            tương lai xa hơn nữa với mong muốn vươn ra thế giới đến với những
            nơi người dân còn đói khổ và chưa có điện. Vào năm 2019 thông qua
            các chuyến từ thiện và kết hợp khảo sát, Từ Thiện Thật nhận thấy tại
            các bản làng vùng sâu vùng xa người dân đã sống rất nhiều năm trong
            hoàn cảnh không có điện. Các em nhỏ tại đây chưa có cơ hội được học
            tập trong điều kiện đầy đủ ánh sáng vào buổi tối.Để có thể góp phần
            giúp cuộc sống của những người dân trên các bản vùng sâu vùng xa tốt
            hơn, Từ Thiện Thật đã ấp ủ và triển khai chiến dịch mang tên “Đánh
            Cắp Mặt Trời”Thông điêp : Cùng Từ Thiện Thật “Đánh cắp mặt trời mang
            điện đến muôn nơi“
          </TabsContent>
          <TabsContent value="transaction">
            <TransactionTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LeftDetailCampaignSection;
