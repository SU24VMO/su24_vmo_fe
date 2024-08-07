import React from "react";
import { Step, Stepper, useStepper } from "../../../ui/stepper";
import { Badge } from "../../../ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../ui/hover-card";
import { Button } from "../../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { CalendarDays, TriangleAlert } from "lucide-react";
import { format } from "date-fns";
import vmo_avatar from "../../../../assets/images/512x512.svg";

const CustomStepperCampaignDetail = ({ data }) => {
  const steps = [
    {
      label: data.donatePhase.name,
      description: data.donatePhase.startDate
        ? `Ngày bắt đầu: ${format(
            new Date(data.donatePhase.startDate),
            "dd/MM/yyyy, h:mm:ss a"
          )}\nNgày kết thúc: ${
            data.donatePhase.endDate
              ? format(
                  new Date(data.donatePhase.endDate),
                  "dd/MM/yyyy, h:mm:ss a"
                )
              : "Chưa có"
          }`
        : "Chưa bắt đầu giai đoạn",
    },
    {
      label: data.processingPhases[0].name,
      description: data.processingPhases[0].startDate
        ? `Ngày bắt đầu: ${format(
            new Date(data.processingPhases[0].startDate),
            "dd/MM/yyyy, h:mm:ss a"
          )}\nNgày kết thúc: ${
            data.processingPhases[0].endDate
              ? format(
                  new Date(data.processingPhases[0].endDate),
                  "dd/MM/yyyy, h:mm:ss a"
                )
              : "Chưa có"
          }`
        : "Chưa bắt đầu giai đoạn",
    },
    {
      label: data.statementPhase.name,
      description: data.statementPhase.startDate
        ? `Ngày bắt đầu: ${format(
            new Date(data.statementPhase.startDate),
            "dd/MM/yyyy, h:mm:ss a"
          )}\nNgày kết thúc: ${
            data.statementPhase.endDate
              ? format(
                  new Date(data.statementPhase.endDate),
                  "dd/MM/yyyy, h:mm:ss a"
                )
              : "Chưa có"
          }`
        : "Chưa bắt đầu giai đoạn",
    },
  ];

  let initialStep = 0;
  if (
    data.donatePhase.isProcessing === true &&
    data.donatePhase.isEnd === false
  ) {
    initialStep = 0;
  } else if (
    data.processingPhases[0].isProcessing === true &&
    data.processingPhases[0].isEnd === false
  ) {
    initialStep = 1;
  } else if (
    data.statementPhase.isProcessing === true &&
    data.statementPhase.isEnd === false
  ) {
    initialStep = 2;
  } else {
    initialStep = 3;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Stepper
        size="lg"
        variant={"circle"}
        orientation={"vertical"}
        initialStep={initialStep}
        steps={steps}
        state={data.isTransparent ? "loading" : "error"}
        className="w-full h-full"
      >
        {steps.map((stepProps) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              {data.isTransparent ? null : (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="link"
                      className="px-0 py-0 w-full text-red-500 underline"
                    >
                      <TriangleAlert /> Chiến dịch này đã bị cấm
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src={vmo_avatar} />
                        <AvatarFallback>VMO</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Hệ thống VMO</h4>
                        <p className="text-sm">
                          Chúng tôi nhận thấy rằng các hành động và thông tin
                          trong chiến dịch này không hoàn toàn minh bạch và rõ
                          ràng, điều này có thể gây ảnh hưởng xấu đến tổ chức và
                          uy tín của chúng tôi. Chúng tôi hiện tại đang kiểm tra
                          và xử lý vấn đề này kịp thời để đảm bảo tính minh bạch
                          và uy tín của các chiến dịch trong tương lai.
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            Đã bị cấm vào{" "}
                            {format(
                              new Date(data.checkTransparentDate),
                              "dd/MM/yyyy, h:mm:ss a"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              )}
            </Step>
          );
        })}
        <MyStepperSuccess />
      </Stepper>
    </div>
  );
};

function MyStepperSuccess() {
  const { activeStep, steps } = useStepper();
  if (activeStep !== steps.length) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-5">
      {/* test only */}
      <Badge variant="destructive">Chiến dịch này đã đóng!</Badge>
    </div>
  );
}

export default CustomStepperCampaignDetail;
