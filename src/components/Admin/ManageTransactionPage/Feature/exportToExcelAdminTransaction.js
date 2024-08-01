import xlsx from "json-as-xlsx";
import { axiosPrivate } from "../../../../api/axiosInstance";


export async function exportToExcelAdminTransaction() {
  const formatAmount = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue + " VND";
  };
  try {
    const response = await axiosPrivate.get(
      `/api/transaction/all/statement/send-transaction`
    );

  
    if (response.status === 200) {
      console.log("Fetched data:", response?.data?.data);

      let banking = response?.data?.data?.list.map((banking) => ({
        // "ID chiến dịch": banking?.campaignID,
    //     date: "Ngày",
    // time: "Giờ",
    // sendAccount: "Tài khoản gửi",
    // receiveAccount: "Tài khoản nhận",
    // campaignName: "Tên chiến dịch",
    // platform: "Nền tảng",
    // amount: "Số tiền",
    // status: "Trạng thái",
    // actions:"Xem ảnh"
        "Ngày": banking?.date,
        "Giờ": banking?.time ,
        "Tài khoản gửi": banking?.sendAccount,
        "Tài khoản nhận": banking?.receiveAccount,
        "Tên chiến dịch" :banking?.campaignName,
        "Nền tảng" :banking?.platform,
        "Số tiền" :banking?.amount ? formatAmount(banking?.amount) : "",
        "Trạng thái" :banking?.status,
        "Ảnh giao dịch" :banking?.transactionImageUrl


      }));

      let columns = [
        {
          sheet: "Giao dịch sao kê Admin",
          columns: [
            // { label: "ID chiến dịch", value: "ID chiến dịch" },
            { label: "Ngày", value: "Ngày" },
            { label: "Giờ", value: "Giờ" },
            { label: "Tài khoản gửi", value: "Tài khoản gửi" },
            { label: "Tài khoản nhận", value: "Tài khoản nhận" },
            { label: "Tên chiến dịch", value: "Tên chiến dịch" },
            { label: "Nền tảng", value: "Nền tảng" },
            { label: "Số tiền", value: "Số tiền" },
            { label: "Trạng thái", value: "Trạng thái" },
            { label: "Ảnh giao dịch", value: "Ảnh giao dịch" },


          ],
          content: banking,
        },
      ];

      let settings = {
        fileName: "Bảng danh sách giao dịch quản lý hệ thống",
      };

      xlsx(columns, settings);
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Handle error as needed
  }
}
