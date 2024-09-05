import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../../ui/tabs";
import { ScrollArea } from "../../../../ui/scroll-area";
import StatementCard from "./StatementCard";


const ActivitiesStatementFiles = ({ activity }) => {
  return (
    <div className="flex flex-col items-center">
      <Tabs defaultValue="activitiesStatemenFiles">
        <TabsList>
          <TabsTrigger value="activitiesStatemenFiles">Sao kê</TabsTrigger>
        </TabsList>
      </Tabs>
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          {activity.activityStatementFiles &&
          activity.activityStatementFiles.length > 0 ? (
            activity.activityStatementFiles.map((file, index) => (
              <StatementCard
                key={index}
                statementImage={file.link}
                statementCreatedDate={file.createDate}
              />
            ))
          ) : (
            <p>Chưa có hình ảnh sao kê cho hoạt động</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ActivitiesStatementFiles;