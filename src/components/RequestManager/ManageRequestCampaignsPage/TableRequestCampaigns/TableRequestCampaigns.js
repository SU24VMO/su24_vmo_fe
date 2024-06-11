import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import EditMemberForm from "../Feature/EditMemberForm";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      create_campaign_request_id: "1",
      campaing_id: "1",
      name: "Chiến dịch gây dựng cây xanh cho một trái đất XANH",
      create_by_user: "Khoa nè",
      create_by_om: "",
      approved_by: "Van Dung",
      update_by: "",
      create_date: "2024/09/30",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_campaign_request_id: "2",
      campaign_id: "2",
      name: "Chiến dịch bảo vệ rừng già",
      create_by_user: "",
      create_by_om: "FPT University",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/01",
      is_approved: false,
      is_rejected: true,
      is_pending: false,
      is_locked: false
    },
    {
      create_campaign_request_id: "3",
      campaign_id: "3",
      name: "Chiến dịch làm sạch biển xanh",
      create_by_user: "Minh Hoang",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/02",
      is_approved: true,
      is_rejected: false,
      is_pending: false,
      is_locked: false
    },
    {
      create_campaign_request_id: "4",
      campaign_id: "4",
      name: "Chiến dịch giảm thiểu rác thải nhựa",
      create_by_user: "",
      create_by_om: "Công ty TruongMagnus",
      approved_by: "PhatRM",
      update_by: "",
      create_date: "2024/10/03",
      is_approved: true,
      is_rejected: false,
      is_pending: false,
      is_locked: false
    },
    {
      create_campaign_request_id: "5",
      campaign_id: "5",
      name: "Chiến dịch tiết kiệm năng lượng",
      create_by_user: "Phuong Linh",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/04",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_campaign_request_id: "6",
      campaign_id: "6",
      name: "Chiến dịch bảo vệ động vật hoang dã",
      create_by_user: "Quoc Khanh",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/05",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_campaign_request_id: "7",
      campaign_id: "7",
      name: "Chiến dịch sử dụng năng lượng tái tạo",
      create_by_user: "Thanh Tu",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/06",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_campaign_request_id: "8",
      campaign_id: "8",
      name: "Chiến dịch bảo vệ nguồn nước",
      create_by_user: "Van Anh",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/07",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_campaign_request_id: "9",
      campaign_id: "9",
      name: "Chiến dịch giảm thiểu khí thải",
      create_by_user: "Xuan Truong",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/08",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_campaign_request_id: "10",
      campaign_id: "10",
      name: "Chiến dịch bảo vệ tầng ozone",
      create_by_user: "Yen Nhi",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/09",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_campaign_request_id: "10",
      campaign_id: "10",
      name: "Chiến dịch bảo vệ tầng ozone",
      create_by_user: "Yen Nhi",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/09",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_campaign_request_id: "11",
      campaign_id: "11",
      name: "Chiến dịch giáo dục môi trường",
      create_by_user: "Anh Khoa",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/10",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_campaign_request_id: "12",
      campaign_id: "12",
      name: "Chiến dịch trồng cây xanh",
      create_by_user: "Bao Tran",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/11",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_campaign_request_id: "13",
      campaign_id: "13",
      name: "Chiến dịch tái chế rác thải",
      create_by_user: "Chi Nguyen",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/12",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },
    {
      create_campaign_request_id: "14",
      campaign_id: "14",
      name: "Chiến dịch chống ô nhiễm môi trường",
      create_by_user: "Duc Anh",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/13",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    },

    {
      create_campaign_request_id: "15",
      campaign_id: "15",
      name: "Chiến dịch bảo vệ đất",
      create_by_user: "Dung Nguyen",
      create_by_om: "",
      approved_by: "DungRM",
      update_by: "",
      create_date: "2024/10/14",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false
    }

   
    // ...
  ];
}

const TableMembers = () => {
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
        <EditMemberForm
          isOpen={isDialogOpen}
          member={selectedRow}
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

export default TableMembers;
