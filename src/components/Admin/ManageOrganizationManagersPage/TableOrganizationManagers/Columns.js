import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import { format } from "date-fns";
import DataTableRowActions from "../Feature/DataTableRowAction";

export const columns = ({ onEdit, onDelete, onSort }) => [
  {
    accessorKey: "avatar",
    header: () => <div>Avatar</div>,
    cell: ({ row }) => {
      const avatar = row.getValue("avatar");
      return (
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("Username")}
        >
          Tên người dùng
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
        onClick={() => onSort("Email")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "isActived",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => onSort("IsActived")}
      >
        Trạng thái
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const isActived = row.getValue("isActived");
      return (
        <div className="w-max">
          {isActived === true ? (
            <Badge variant="success">Đang hoạt động</Badge>
          ) : (
            <Badge variant="destructive">Tạm dừng</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => <div className="w-max">Vai trò</div>,
    cell: ({ row }) => {
      // const role = row.getValue("role");
      return (
        <div className="w-max">
          <Badge variant="primary">Quản lý tổ chức</Badge>
          
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => onSort("CreatedAt")}
      >
        Ngày tạo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      
      const createdAt = format(new Date(row.getValue("createdAt")), 'dd/MM/yyyy, h:mm:ss a');;
      return <div className="w-max">{createdAt}</div>;
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
