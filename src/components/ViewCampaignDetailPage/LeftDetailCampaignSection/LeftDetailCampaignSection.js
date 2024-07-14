/* eslint-disable no-unused-vars */
import React from "react";
import { Card } from "../../ui/card";
import img_demo from "../../../assets/images/placeholder.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import TransactionTable from "./TransactionTable/TransactionTable";
import { AspectRatio } from "../../ui/aspect-ratio";
import ActivitiesCampaign from "./ActivitiesCampaign/ActivitiesCampaign";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import DescriptionCampaign from "./DescriptionCampaign/DescriptionCampaign";
import StatementsCampaign from "./StatementsCampaign/StatementsCampaign";

const LeftDetailCampaignSection = ({ data }) => {
  const [transaction, setTransaction] = React.useState(data.transactions);
  const [activities, setActivities] = React.useState(
    data.processingPhase.activities
  );
  const [statementFiles, setStatementFiles] = React.useState(
    data.statementPhase.statementFiles
  );
  const [statement, setStatement] = React.useState(data.statementPhase);

  // console.log("Activities lấy được", activities);
  // console.log("StatementFiles lấy được", statementFiles);
  // console.log("Statement lấy được", statement);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        <p className="text-xl tablet:text-3xl text-muted-foreground font-bold">
          {data.name}
        </p>
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
          <ScrollArea>
            <div className="w-full relative h-10">
              <TabsList className="flex absolute h-10">
                <TabsTrigger value="description">Mô tả</TabsTrigger>
                <TabsTrigger value="transaction">Danh sách ủng hộ</TabsTrigger>
                <TabsTrigger
                  value="activities"
                  disabled={
                    !(
                      data.processingPhase.isProcessing ||
                      data.processingPhase.isEnd
                    )
                  }
                >
                  Hoạt động ({activities.length})
                </TabsTrigger>
                <TabsTrigger
                  value="statement"
                  disabled={
                    !(
                      data.statementPhase.isProcessing ||
                      data.statementPhase.isEnd
                    )
                  }
                >
                  Sao kê ({statementFiles.length})
                </TabsTrigger>
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <TabsContent value="description" className="leading-relaxed">
            <DescriptionCampaign campaignDescription={data.description} />
          </TabsContent>
          <TabsContent value="transaction">
            <TransactionTable transaction={transaction} />
          </TabsContent>
          <TabsContent value="activities">
            <ActivitiesCampaign activities={activities} />
          </TabsContent>
          <TabsContent value="statement">
            <StatementsCampaign
              statement={statement}
              statementFiles={statementFiles}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LeftDetailCampaignSection;
