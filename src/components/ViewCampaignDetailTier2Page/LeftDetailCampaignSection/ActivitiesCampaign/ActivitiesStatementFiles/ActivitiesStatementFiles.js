import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../../ui/tabs";
import { ScrollArea } from "../../../../ui/scroll-area";
import StatementCard from "./StatementCard";

const ActivitiesStatementFiles = ({ activity, cardHeight }) => {
  const [scrollAreaHeight, setScrollAreaHeight] = React.useState("auto");

  React.useEffect(() => {
    if (cardHeight) {
      setScrollAreaHeight(`${cardHeight}px`);
    }
  }, [cardHeight]);

  return (
    <div className="flex flex-col items-center">
      <Tabs defaultValue="activitiesStatemenFiles">
        <TabsList>
          <TabsTrigger value="activitiesStatemenFiles">Sao kê</TabsTrigger>
        </TabsList>
      </Tabs>
      <ScrollArea
        className="w-full rounded-md border p-4"
        style={{ height: scrollAreaHeight }}
      >
        {activity.isActive ? (
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
        ) : (
          <p>Sao kê đang chờ được duyệt</p>
        )}
      </ScrollArea>
    </div>
  );
};

export default ActivitiesStatementFiles;
