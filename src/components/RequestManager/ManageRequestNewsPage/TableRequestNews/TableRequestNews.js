import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import EditStatusForm from "../Feature/EditStatusForm";
import img_placeholder from "../../../../assets/images/placeholder.svg";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      create_post_request_id: "1",
      post_id: "1",
      title: "Chiến dịch gây dựng cây xanh cho một trái đất XANH",
      create_by_user: "3123213asdf",
      create_by_om: null,
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "2",
      post_id: "2",
      title: "Chiến dịch bảo vệ rừng già",
      create_by: "",
      create_by_om: "3123213asdf",
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "3",
      post_id: "3",
      title: "Chiến dịch làm sạch biển xanh",
      create_by_user: "3123213asdf",
      create_by_om: null,
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "4",
      post_id: "4",
      title: "Chiến dịch giảm thiểu rác thải nhựa",
      create_by: "",
      create_by_om: "3123213asdf",
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "5",
      post_id: "5",
      title: "Chiến dịch tiết kiệm năng lượng",
      create_by_user: "3123213asdf",
      create_by_om: null,
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "6",
      post_id: "6",
      title: "Chiến dịch bảo vệ động vật hoang dã",
      create_by_user: null,
      create_by_om: "3123213asdf",
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "7",
      post_id: "7",
      title: "Chiến dịch sử dụng năng lượng tái tạo",
      create_by_user: "3123213asdf",
      create_by_om: null,
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "8",
      post_id: "8",
      title: "Chiến dịch bảo vệ nguồn nước",
      create_by_user: null,
      create_by_om: "3123213asdf",
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "9",
      post_id: "9",
      title: "Chiến dịch giảm thiểu khí thải",
      create_by_user: "3123213asdf",
      create_by_om: null,
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "10",
      post_id: "10",
      title: "Chiến dịch bảo vệ tầng ozone",
      create_by_user: null,
      create_by_om: "3123213asdf",
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "10",
      post_id: "10",
      title: "Chiến dịch bảo vệ tầng ozone",
      create_by_user: "3123213asdf",
      create_by_om: null,
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "11",
      post_id: "11",
      title: "Chiến dịch giáo dục môi trường",
      create_by_user: null,
      create_by_om: "3123213asdf",
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "12",
      post_id: "12",
      title: "Chiến dịch trồng cây xanh",
      create_by_user: "3123213asdf",
      create_by_om: null,
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "13",
      post_id: "13",
      title: "Chiến dịch tái chế rác thải",
      create_by_user: null,
      create_by_om: "3123213asdf",
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "14",
      post_id: "14",
      title: "Chiến dịch chống ô nhiễm môi trường",
      create_by_user: "3123213asdf",
      create_by_om: null,
      cover: img_placeholder,
      image: img_placeholder,
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
      create_post_request_id: "15",
      post_id: "15",
      title: "Chiến dịch bảo vệ đất",
      create_by_user: "3123213asdf",
      create_by_om: null,
      cover: img_placeholder,
      image: img_placeholder,
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
          post={selectedRow}
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
