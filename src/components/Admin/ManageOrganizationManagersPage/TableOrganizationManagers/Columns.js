import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import DataTableRowActions from "../Feature/DataTableRowAction";

export const columns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "first_name",
    header: () => <div>Họ</div>,
    cell: ({ row }) => {
      const first_name = row.getValue("first_name");
      return <div>{first_name}</div>;
    },
  },
  {
    accessorKey: "last_name",
    header: () => <div>Tên</div>,
    cell: ({ row }) => {
      const last_name = row.getValue("last_name");
      return <div>{last_name}</div>;
    },
  },
  {
    accessorKey: "gender",
    header: () => <div className="w-max">Giới tính</div>,
    cell: ({ row }) => {
      const gender = row.getValue("gender");
      return (
        <div className="w-max">
          {gender === "Male" ? (
            <Badge variant="outline">Nam</Badge>
          ) : gender === "Female" ? (
            <Badge variant="outline">Nữ</Badge>
          ) : (
            <Badge variant="outline">Khác</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số điện thoại
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "is_verified",
    header: () => <div className="w-max">Xác thực</div>,
    cell: ({ row }) => {
      const is_verified = row.getValue("is_verified");
      return (
        <div className="w-max">
          {is_verified === true ? (
            <Badge variant="success">Đồng ý</Badge>
          ) : (
            <Badge variant="destructive">Từ chối</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "birthday",
    header: () => <div className="w-max">Sinh nhật</div>,
    cell: ({ row }) => {
      const birthday = row.getValue("birthday");
      return <div className="w-max">{birthday}</div>;
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
