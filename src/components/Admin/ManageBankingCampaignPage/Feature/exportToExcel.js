import xlsx from "json-as-xlsx";
import { axiosPrivate } from "../../../../api/axiosInstance";


export async function exportToExcel() {
  const formatAmount = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue + " VND";
  };
  try {
    const response = await axiosPrivate.get(
      `/api/campaign/tier-i/all/filter/banking-account`
    );

  
    if (response.status === 200) {
      console.log("Fetched data:", response?.data?.data);

      let banking = response?.data?.data?.list.map((banking) => ({
        "ID chiến dịch": banking?.campaignID,
        "Tên chiến dịch": banking?.name,
        "Số tiền đã đạt": banking?.amount ? formatAmount(banking?.amount) : "" ,
        "Trạng thái quyên góp": banking?.donatePhaseIsEnd === true ? "Đã kết thúc" : "Chưa kết thúc",
        "Tên ngân hàng": banking?.bankingName,
        "Tên tài khoản": banking?.accountName,
        "Số tài khoản" :banking?.bankingAccountNumber,
        "QR code" :banking?.qrCode,
        "Ảnh sao kê" :banking?.transactionImage !== null ? (banking?.transactionImage) : "Chưa có"


      }));

      let columns = [
        {
          sheet: "Giao dịch sao kê Admin",
          columns: [
            { label: "ID chiến dịch", value: "ID chiến dịch" },
            { label: "Tên chiến dịch", value: "Tên chiến dịch" },
            { label: "Số tiền đã đạt", value: "Số tiền đã đạt" },
            { label: "Trạng thái quyên góp", value: "Trạng thái quyên góp" },
            { label: "Tên ngân hàng", value: "Tên ngân hàng" },
            { label: "Tên tài khoản", value: "Tên tài khoản" },
            { label: "QR code", value: "QR code" },
            { label: "Ảnh sao kê", value: "Ảnh sao kê" },

          ],
          content: banking,
        },
      ];

      let settings = {
        fileName: "Bảng danh sách sao kê giao dịch",
      };

      xlsx(columns, settings);
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Handle error as needed
  }
}
