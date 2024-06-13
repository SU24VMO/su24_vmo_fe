import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import EditStatusForm from "../Feature/EditStatusForm";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      create_post_request_id: "1",
      post_id: "1",
      name: "Chiến dịch gây dựng cây xanh cho một trái đất XANH",
      create_by: "Khoa nè",
      approved_by_user: "Khoa nè",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/09/30",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_post_request_id: "2",
      post_id: "2",
      name: "Chiến dịch bảo vệ rừng già",
      create_by: "",
      approved_by_user: "",
      approved_by_om: "FPT University",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/01",
      is_approved: false,
      is_rejected: true,
      is_pending: false,
      is_locked: false
    },
    {
      create_post_request_id: "3",
      post_id: "3",
      name: "Chiến dịch làm sạch biển xanh",
      create_by: "Minh Hoang",
      approved_by_user: "Minh Hoang",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/02",
      is_approved: true,
      is_rejected: false,
      is_pending: false,
      is_locked: false
    },
    {
      create_post_request_id: "4",
      post_id: "4",
      name: "Chiến dịch giảm thiểu rác thải nhựa",
      create_by: "",
      approved_by_user: "",
      approved_by_om: "Công ty TruongMagnus",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/03",
      is_approved: true,
      is_rejected: false,
      is_pending: false,
      is_locked: false
    },
    {
      create_post_request_id: "5",
      post_id: "5",
      name: "Chiến dịch tiết kiệm năng lượng",
      create_by: "Phuong Linh",
      approved_by_user: "Phuong Linh",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/04",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_post_request_id: "6",
      post_id: "6",
      name: "Chiến dịch bảo vệ động vật hoang dã",
      create_by: "Quoc Khanh",
      approved_by_user: "Quoc Khanh",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/05",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_post_request_id: "7",
      post_id: "7",
      name: "Chiến dịch sử dụng năng lượng tái tạo",
      create_by: "Thanh Tu",
      approved_by_user: "Thanh Tu",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/06",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_post_request_id: "8",
      post_id: "8",
      name: "Chiến dịch bảo vệ nguồn nước",
      create_by: "Van Anh",
      approved_by_user: "Van Anh",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/07",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_post_request_id: "9",
      post_id: "9",
      name: "Chiến dịch giảm thiểu khí thải",
      create_by: "Xuan Truong",
      approved_by_user: "Xuan Truong",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/08",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_post_request_id: "10",
      post_id: "10",
      name: "Chiến dịch bảo vệ tầng ozone",
      create_by: "Yen Nhi",
      approved_by_user: "Yen Nhi",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/09",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_post_request_id: "10",
      post_id: "10",
      name: "Chiến dịch bảo vệ tầng ozone",
      create_by: "Yen Nhi",
      approved_by_user: "Yen Nhi",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/09",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_post_request_id: "11",
      post_id: "11",
      name: "Chiến dịch giáo dục môi trường",
      create_by: "Anh Khoa",
      approved_by_user: "Anh Khoa",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/10",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_post_request_id: "12",
      post_id: "12",
      name: "Chiến dịch trồng cây xanh",
      create_by: "Bao Tran",
      approved_by_user: "Bao Tran",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/11",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_post_request_id: "13",
      post_id: "13",
      name: "Chiến dịch tái chế rác thải",
      create_by: "Chi Nguyen",
      approved_by_user: "Chi Nguyen",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/12",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_post_request_id: "14",
      post_id: "14",
      name: "Chiến dịch chống ô nhiễm môi trường",
      create_by: "Duc Anh",
      approved_by_user: "Duc Anh",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/13",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },

    {
      create_post_request_id: "15",
      post_id: "15",
      name: "Chiến dịch bảo vệ đất",
      create_by: "Dung Nguyen",
      approved_by_user: "Dung Nguyen",
      approved_by_om: "",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/14",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    }

   
    // ...
  ];
}

const TableRequestNews = () => {
  const [data, setData] = useState([]); // State lưu dữ liệu trả về từ API, ban đầu là mảng rỗng
  const [selectedRow, setSelectedRow] = useState(null); // State lưu thông tin của row được chọn
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State quản lý việc mở dialog cho edit hoặc delete

  const onEdit = React.useCallback((row) => {
    // Implement edit logic here.
    setIsDialogOpen(true); // Mở dialog
    setSelectedRow(row);
  }, []);

  const onDelete = React.useCallback((row) => {
    // Implement delete logic here.
    alert(`Deleting user with ID: ${row.id}`);
  }, []);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        <EditStatusForm
          isOpen={isDialogOpen}
          campaign={selectedRow}
          onOpenChange={(value) => {
            setIsDialogOpen(value);
            if (!value) {
              setSelectedRow(null);
            }
          }}
        />
      </div>
      <DataTable columns={columns({ onEdit, onDelete })} data={data} />
    </div>
  );
};

export default TableRequestNews;
