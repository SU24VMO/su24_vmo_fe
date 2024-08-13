import React from "react";
import { differenceInCalendarDays, parseISO } from "date-fns";

const CustomCalculateDayLeft = ({ data }) => {
  // Chuyển đổi expectedEndDate từ string sang Date và tính toán số ngày còn lại
  const calculateDaysLeft = (endDate) => {
    const today = new Date(); // Ngày hiện tại
    const end = parseISO(endDate); // Chuyển đổi endDate sang định dạng Date
    return differenceInCalendarDays(end, today); // Tính toán số ngày còn lại
  };
  return (
    <>
      {data.donatePhase.isProcessing === true &&
      data.donatePhase.isEnd === false ? (
        <p className="text-sm laptop:text-base font-bold">
          {/* <p className="text-sm laptop:text-base font-bold">
          {calculateDaysLeft(data.expectedEndDate)} ngày
        </p> */}
          Đang thực hiện
        </p>
      ) : (
        <p className="text-sm font-bold">Đã hết thời gian ủng hộ</p>
      )}
    </>
  );
};

export default CustomCalculateDayLeft;
