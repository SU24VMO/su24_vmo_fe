import React from "react";
import { Card } from "../../ui/card";
import img_demo from "../../../assets/images/placeholder.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import TransactionTable from "./TransactionTable/TransactionTable";
import { AspectRatio } from "../../ui/aspect-ratio";

const LeftDetailCampaignSection = ({ data }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        <p className="text-3xl text-muted-foreground font-bold">{data.name}</p>
        <Card className=" max-h-[600px] overflow-hidden flex flex-col items-stretch justify-center">
          <div className="relative">
            <AspectRatio ratio={16 / 9}>
              <img
                alt="Campaign img"
                className="w-full h-full object-cover"
                src={data.image ? data.image : img_demo}
              />
            </AspectRatio>
          </div>
        </Card>
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Mô tả</TabsTrigger>
            <TabsTrigger value="transaction">Danh sách ủng hộ</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="leading-relaxed">
            <p>{data.description}</p>
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
