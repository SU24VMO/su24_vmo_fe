import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import EditStatusForm from "../Feature/EditStatusForm";
import img_placeholder from "../../../../assets/images/placeholder.svg";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      create_activity_request_id: "1",
      activity_id: "1",
      processing_phase_id: "1",
      title: "Chiến dịch gây dựng cây xanh cho một trái đất XANH",
      create_by_user: "3123213asdf",
      create_by_om: null,
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/09/30",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_activity_request_id: "2",
      activity_id: "2",
      processing_phase_id: "2",
      title: "Chiến dịch bảo vệ rừng già",
      create_by: "",
      create_by_om: "3123213asdf",
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/01",
      is_approved: false,
      is_rejected: true,
      is_pending: false,
      is_locked: false,
    },
    {
      create_activity_request_id: "3",
      activity_id: "3",
      processing_phase_id: "3",
      title: "Chiến dịch làm sạch biển xanh",
      create_by_user: "3123213asdf",
      create_by_om: null,
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/02",
      is_approved: true,
      is_rejected: false,
      is_pending: false,
      is_locked: false,
    },
    {
      create_activity_request_id: "4",
      activity_id: "4",
      processing_phase_id: "4",
      title: "Chiến dịch giảm thiểu rác thải nhựa",
      create_by: "",
      create_by_om: "3123213asdf",
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/03",
      is_approved: true,
      is_rejected: false,
      is_pending: false,
      is_locked: false,
    },
    {
      create_activity_request_id: "5",
      activity_id: "5",
      processing_phase_id: "5",
      title: "Chiến dịch tiết kiệm năng lượng",
      create_by_user: "3123213asdf",
      create_by_om: null,
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/04",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_activity_request_id: "6",
      activity_id: "6",
      processing_phase_id: "6",
      title: "Chiến dịch bảo vệ động vật hoang dã",
      create_by_user: null,
      create_by_om: "3123213asdf",
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/05",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_activity_request_id: "7",
      activity_id: "7",
      processing_phase_id: "7",
      title: "Chiến dịch sử dụng năng lượng tái tạo",
      create_by_user: "3123213asdf",
      create_by_om: null,
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/06",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_activity_request_id: "8",
      activity_id: "8",
      processing_phase_id: "8",
      title: "Chiến dịch bảo vệ nguồn nước",
      create_by_user: null,
      create_by_om: "3123213asdf",
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/07",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_activity_request_id: "9",
      activity_id: "9",
      processing_phase_id: "9",
      title: "Chiến dịch giảm thiểu khí thải",
      create_by_user: "3123213asdf",
      create_by_om: null,
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/08",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_activity_request_id: "10",
      activity_id: "10",
      processing_phase_id: "10",
      title: "Chiến dịch bảo vệ tầng ozone",
      create_by_user: null,
      create_by_om: "3123213asdf",
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/09",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_activity_request_id: "10",
      activity_id: "10",
      processing_phase_id: "10",
      title: "Chiến dịch bảo vệ tầng ozone",
      create_by_user: "3123213asdf",
      create_by_om: null,
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/09",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_activity_request_id: "11",
      activity_id: "11",
      processing_phase_id: "11",
      title: "Chiến dịch giáo dục môi trường",
      create_by_user: null,
      create_by_om: "3123213asdf",
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/10",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_activity_request_id: "12",
      activity_id: "12",
      processing_phase_id: "12",
      title: "Chiến dịch trồng cây xanh",
      create_by_user: "3123213asdf",
      create_by_om: null,
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/11",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_activity_request_id: "13",
      activity_id: "13",
      processing_phase_id: "13",
      title: "Chiến dịch tái chế rác thải",
      create_by_user: null,
      create_by_om: "3123213asdf",
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/12",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },
    {
      create_activity_request_id: "14",
      activity_id: "14",
      processing_phase_id: "14",
      title: "Chiến dịch chống ô nhiễm môi trường",
      create_by_user: "3123213asdf",
      create_by_om: null,
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/13",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },

    {
      create_activity_request_id: "15",
      activity_id: "15",
      processing_phase_id: "15",
      title: "Chiến dịch bảo vệ đất",
      create_by_user: "3123213asdf",
      create_by_om: null,
      link: img_placeholder,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      approved_date: "2024/09/30",
      update_date: "2024/09/30",
      create_date: "2024/10/14",
      is_approved: false,
      is_rejected: false,
      is_pending: true,
      is_locked: false,
    },

    // ...
  ];
}

const TableRequestActivities = () => {
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
    alert(`Deleting activities with ID: ${row.activity_id}`);
  }, []);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        <EditStatusForm
          isOpen={isDialogOpen}
          activity={selectedRow}
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

export default TableRequestActivities;
