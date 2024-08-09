import React from "react";
import { useStepper } from "../../../ui/stepper";
import { Badge } from "../../../ui/badge";
import CardDonatePhase from "./CardDonatePhase";
import CardProcessingPhase from "./CardProcessingPhase";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../../ui/hover-card";
import { Button } from "../../../ui/button";
import { CalendarDays, TriangleAlert } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import vmo_avatar from "../../../../assets/images/512x512.svg";
import { format } from "date-fns";


const CustomStepperCampaignDetail = ({ data }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-3">
      <CardDonatePhase data={data} />
      <CardProcessingPhase data={data} />
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
                  Chúng tôi nhận thấy rằng các hành động và thông tin trong
                  chiến dịch này không hoàn toàn minh bạch và rõ ràng, điều này
                  có thể gây ảnh hưởng xấu đến tổ chức và uy tín của chúng tôi.
                  Chúng tôi hiện tại đang kiểm tra và xử lý vấn đề này kịp thời
                  để đảm bảo tính minh bạch và uy tín của các chiến dịch trong
                  tương lai.
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
      {data.isComplete ? <MyStepperSuccess /> : null}
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
