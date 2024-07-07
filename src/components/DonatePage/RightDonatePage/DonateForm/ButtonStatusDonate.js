import React from "react";
import { Button } from "../../../ui/button";
import { Loader2 } from "lucide-react";
import { axiosPublic } from "../../../../api/axiosInstance";
import { CHECK_TRANSACTION_BY_ORDER_ID } from "../../../../api/apiConstants";

export function ButtonStatusDonate({ orderID, firstName, lastName, email }) {
  const [status, setStatus] = React.useState("checking"); // 'checking', 'paid', 'notPaid'

  React.useEffect(() => {
    const checkTransactionStatus = async () => {
      try {
        const response = await axiosPublic.post(CHECK_TRANSACTION_BY_ORDER_ID, {
          orderID,
          firstName,
          lastName,
          email,
        });
        if (response.data.data === "PAID") {
          setStatus("paid");
        } else if (
          response.data.data === "PENDING" ||
          response.data.data === null
        ) {
          setStatus("checking");
        } else {
          // Keep checking if neither PAID nor null
          setTimeout(checkTransactionStatus, 1000); // Retry after 1 seconds    
        }
      } catch (error) {
        console.error("Error checking transaction status:", error);
        setStatus("checking"); // Assume not paid on error
      }
    };

    checkTransactionStatus();
  }, [orderID, firstName, lastName, email]);

  if (status === "checking") {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Đang kiểm tra...
      </Button>
    );
  } else if (status === "paid") {
    return <Button>Tôi đã thanh toán</Button>;
  } else {
    // Handle notPaid or error state
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Đang kiểm tra...
      </Button>
    );
  }
}
