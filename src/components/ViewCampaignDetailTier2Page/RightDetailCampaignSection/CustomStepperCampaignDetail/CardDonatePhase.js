import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Step, Stepper, useStepper, VerticalStep } from "../../../ui/stepper";
import { format } from "date-fns";

const CardDonatePhase = ({ data }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Giai đoạn ủng hộ</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <div className="space-y-1">
          <div className="text-sm font-medium text-muted-foreground">
            Ngày bắt đầu
          </div>
          <div>
            {data.donatePhase.startDate
              ? `${format(
                  new Date(data.donatePhase.startDate),
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
            {data.donatePhase.endDate
              ? `Ngày bắt đầu: ${format(
                  new Date(data.donatePhase.endDate),
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
                  ? data.donatePhase.endDate
                    ? "Đã hoàn thành"
                    : "Đang diễn ra"
                  : "Đã dừng"
              }
              description={""}
              state={data.isTransparent ? "loading" : "error"}
              isCurrentStep={data.donatePhase.endDate ? false : true}
              isCompletedStep={data.donatePhase.endDate ? true : false}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardDonatePhase;
