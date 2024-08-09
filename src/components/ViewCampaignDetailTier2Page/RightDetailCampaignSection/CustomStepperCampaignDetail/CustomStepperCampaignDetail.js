import React from "react";
import { useStepper} from "../../../ui/stepper";
import { Badge } from "../../../ui/badge";
import CardDonatePhase from "./CardDonatePhase";
import CardProcessingPhase from "./CardProcessingPhase";

const CustomStepperCampaignDetail = ({ data }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-3">
      <CardDonatePhase data={data} />
      <CardProcessingPhase data={data} />
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
