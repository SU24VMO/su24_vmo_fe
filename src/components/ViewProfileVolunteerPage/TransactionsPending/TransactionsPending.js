import React from "react";
import CardTransactionSkeleton from "../CardTransactionSkeleton/CardTransactionSkeleton";
import { useToast } from "../../ui/use-toast";
import { axiosPublic } from "../../../api/axiosInstance";
import { GET_TRANSACTION_BY_ACCOUNT_ID } from "../../../api/apiConstants";
import { Button } from "../../ui/button";
import { ToastAction } from "../../ui/toast";
import CardTransactionPending from "../CardTransactionPending/CardTransactionPending";

const TransactionsPending = ({ accountId }) => {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [pageNo, setPageNo] = React.useState(1);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const { toast } = useToast();

  console.log("accountId bên TransactionPaid lấy được", accountId);
  // Hàm lấy dữ liệu notification từ API
  const fetchData = React.useCallback(
    async (page) => {
      toast({
        title: "Đang tải các giao dịch chưa thanh toán...",
        description: "Vui lòng chờ trong giây lát!",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
      try {
        const response = await axiosPublic.get(
          `${GET_TRANSACTION_BY_ACCOUNT_ID}${accountId}?pageSize=3&pageNo=${page}&transactionStatus=PENDING`
        );
        if (response.status === 200) {
          const fetchedData = response.data.data.list;
          if (fetchedData.length === 0) {
            setHasMore(false);
          } else if (page > 1) {
            setData((prevData) => [...prevData, ...fetchedData]);
            console.log("Transaction Pending khi ấn xem thêm", fetchedData);
          } else {
            setData(fetchedData);
            console.log("Transaction Pending lấy được lần đầu", fetchedData);
          }
          setDataLoaded(true);
          toast({
            title: "Đã tải thành công các giao dịch chưa thanh toán!",
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
        }
      } catch (error) {
        toast({
          title: "Lỗi!",
          variant: "destructive",
          description: "Đã xảy ra lỗi khi tải dữ liệu từ máy chủ!" + error,
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        console.error("Error fetching data from API:", error);
      } finally {
        setLoadingMore(false);
      }
    },
    [accountId, toast]
  );

  // Lấy dữ liệu notification từ API
  React.useEffect(() => {
    fetchData(1);
  }, [fetchData]); // Chỉ gọi lại khi fetchData thay đổi (thực ra nó chỉ chạy 1 lần duy nhất vì fetchData không thay đổi =)))

  // Chức năng load more (xem thêm notification)
  const handleLoadMore = () => {
    setLoadingMore(true);
    setPageNo((prevPageNo) => prevPageNo + 1);
    fetchData(pageNo + 1);
  };

  console.log("dataLoaded lúc này", dataLoaded);

  return (
    <div className="grid gap-4 my-3">
      {dataLoaded ? (
        <>
          {data.map((transactionPaid) => (
            <CardTransactionPending 
            key={transactionPaid.transactionID}
            amount={transactionPaid.amount}
            createDate={transactionPaid.createDate}
            campaignID={transactionPaid.campaignID}
            campaignName={transactionPaid.campaignName}
            payerName={transactionPaid.payerName}
            transactionID={transactionPaid.transactionID}
            note={transactionPaid.note}
            campaignTier={transactionPaid.campaign.campaignTier}
            />
          ))}
          {loadingMore ? (
            <CardTransactionSkeleton />
          ) : hasMore ? (
            <div className="mt-2 flex justify-center items-center">
              <Button variant="green_theme_primary" onClick={handleLoadMore}>
                Xem thêm
              </Button>
            </div>
          ) : (
            <p className="text-center text-sm font-medium mt-2">
              Đã tải hết các giao dịch chưa thanh toán!
            </p> // Hiển thị khi đã tải hết dữ liệu
          )}
        </>
      ) : (
        <CardTransactionSkeleton />
      )}
    </div>
  );
};

export default TransactionsPending;
