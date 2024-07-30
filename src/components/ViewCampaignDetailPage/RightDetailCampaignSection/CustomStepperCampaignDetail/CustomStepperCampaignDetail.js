import React from "react";
import { Step, Stepper, useStepper } from "../../../ui/stepper";
import { Badge } from "../../../ui/badge";
import { format } from "date-fns";

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
      label: data.processingPhase.name,
      description: data.processingPhase.startDate
        ? `Ngày bắt đầu: ${format(
            new Date(data.processingPhase.startDate),
            "dd/MM/yyyy, h:mm:ss a"
          )}\nNgày kết thúc: ${
            data.processingPhase.endDate
              ? format(
                  new Date(data.processingPhase.endDate),
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
    data.processingPhase.isProcessing === true &&
    data.processingPhase.isEnd === false
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
        className="w-full h-full"
      >
        {steps.map((stepProps) => {
          return <Step key={stepProps.label} {...stepProps}></Step>;
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
