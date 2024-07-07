import React from "react";
import { Button } from "../../../ui/button";
import { Loader2 } from "lucide-react";
import { axiosPublic } from "../../../../api/axiosInstance";
import { CHECK_TRANSACTION_BY_ORDER_ID } from "../../../../api/apiConstants";
import { useToast } from "../../../ui/use-toast";
import { ToastAction } from "../../../ui/toast";
import { Link } from "react-router-dom";

export function ButtonStatusDonate({
  orderID,
  firstName,
  lastName,
  email,
  campaignID,
}) {
  const [status, setStatus] = React.useState("checking"); // 'checking', 'paid', 'notPaid'
  const intervalId = React.useRef(null);
  const { toast } = useToast();

  React.useEffect(() => {
    const checkTransactionStatus = async () => {
      try {
        const response = await axiosPublic.post(CHECK_TRANSACTION_BY_ORDER_ID, {
          orderID,
          firstName,
          lastName,
          email,
        });
        if (response.status === 200) {
          if (response.data.data === "PAID") {
            toast({
              title: "Thanh toán thành công!",
              description: "Cảm ơn bạn đã ủng hộ chiến dịch! Vui lòng quay lại trang chiến dịch để xem thông tin chi tiết.",
              action: <ToastAction altText="undo">Ẩn</ToastAction>,
            });
            setStatus("paid");
            clearInterval(intervalId.current);
          } else if (
            response.data.data === "PENDING" ||
            response.data.data === null
          ) {
            // Do nothing, wait for the next interval
          } else {
            // Handle unexpected status here if needed
          }
        } else {
          // Handle non-200 responses
          console.error("Response status not OK:", response.status);
        }
      } catch (error) {
        console.error("Error checking transaction status:", error);
        if (error.response && error.response.status === 500) {
          setStatus("error");
          clearInterval(intervalId.current);
        }
      }
    };

    intervalId.current = setInterval(checkTransactionStatus, 5000);

    return () => clearInterval(intervalId.current); // Cleanup on component unmount
  }, [orderID, firstName, lastName, email, toast]);

  if (status === "checking") {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Đang kiểm tra...
      </Button>
    );
  } else if (status === "paid") {
    return (
      <Link to={`/viewCampaigns/campaignDetail/${campaignID}`}>
        <Button variant="feature">Thanh toán thành công !</Button>
      </Link>
    );
  } else {
    // Handle notPaid or error state
    return (
      <p variant="destructive">
        Hết thời gian thanh toán, bạn vui lòng đóng popup này và bấm lại nút
        "ủng hộ" để thực hiện lại quá trình ủng hộ.
      </p>
    );
  }
}
