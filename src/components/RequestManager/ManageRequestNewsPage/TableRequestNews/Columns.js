import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import DataTableRowActions from "../Feature/DataTableRowAction";

export const columns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên bài viết
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "create_by",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tạo bởi người dùng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
 
  {
    accessorKey: "approved_by_user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thành viên duyệt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "approved_by_om",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tổ chức duyệt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },  
  {
    accessorKey: "approved_date",
    header: () => <div className="w-max">Ngày duyệt</div>,
  },
  {
    accessorKey: "update_date",
    header: () => <div className="w-max">Ngày cập nhật</div>,
  },
  {
    accessorKey: "create_date",
    header: () => <div className="w-max">Ngày tạo</div>,
  },
  {
    accessorKey: "is_approved",
    header: () => <div className="w-max">Xác thực</div>,
    cell: ({ row }) => {
      const is_approved = row.getValue("is_approved");

      return (
        <div>
          {is_approved === true ? (
            <Badge variant="success">Đồng ý</Badge>
          ) : (
            <Badge variant="destructive">Từ chối</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "is_pending",
    header: () => <div className="w-max">Trạng thái chờ</div>,
    cell: ({ row }) => {
      const is_pending = row.getValue("is_pending");
      return (
        <div>
          {is_pending === true ? (
            <Badge variant="success">Đang chờ</Badge>
          ) : (
            <Badge variant="destructive">Chưa chờ</Badge>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "is_locked",
    header: () => <div className="w-max">Trạng thái khóa</div>,
    cell: ({ row }) => {
      const is_locked = row.getValue("is_locked");
      return (
        <div>
          {is_locked === true ? (
            <Badge variant="success">Đã khóa</Badge>
          ) : (
            <Badge variant="destructive">Chưa khóa</Badge>
          )}
        </div>
      );
    },
  },
  // Thêm Actions vào columns
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];
