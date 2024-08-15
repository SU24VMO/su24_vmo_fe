import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Step } from "../../../ui/stepper";
import { format } from "date-fns";

const CardProcessingPhase = ({ data }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Giai đoạn sao kê</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <div className="space-y-1">
          <div className="text-sm font-medium text-muted-foreground">
            Ngày bắt đầu
          </div>
          <div>
            {data.processingPhases[0].startDate
              ? `${format(
                  new Date(data.processingPhases[0].startDate),
                  "dd/MM/yyyy, h:mm:ss a"
                )}`
              : "Chưa có"}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium text-muted-foreground">
            Ngày kết thúc
          </div>
          <div>
            {data.actualEndDate
              ? `Ngày bắt đầu: ${format(
                  new Date(data.actualEndDate),
                  "dd/MM/yyyy, h:mm:ss a"
                )}`
              : "Chưa có"}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium text-muted-foreground">
            Trạng thái
            <Step
              label={
                data.isTransparent
                  ? data.actualEndDate
                    ? "Đã hoàn thành"
                    : "Đang diễn ra"
                  : "Đã dừng"
              }
              description={""}
              state={data.isTransparent ? "loading" : "error"}
              isCurrentStep={data.actualEndDate ? false : true}
              isCompletedStep={data.actualEndDate ? true : false}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProcessingPhase;
