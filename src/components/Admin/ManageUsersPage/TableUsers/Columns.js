import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import DataTableRowActions from "../Feature/DataTableRowAction";

export const columns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "userAvatar",
    header: () => <div>Avatar</div>,
    cell: ({ row }) => {
      const userAvatar = row.getValue("userAvatar");
      return (
        <Avatar>
          <AvatarImage src={userAvatar} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên người dùng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "userEmail",
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
    accessorKey: "userPassword",
    header: () => <div>Mật khẩu</div>,
  },
  {
    accessorKey: "isActive",
    header: () => <div className="w-max">Trạng thái</div>,
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return (
        <div className="w-max">
          {isActive === true ? (
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
      const role = row.getValue("role");
      return (
        <div className="w-max">
          {role === "Admin" ? (
            <Badge variant="success">Admin</Badge>
          ) : role === "User" ? (
            <Badge variant="primary">User</Badge>
          ) : role === "Member" ? (
            <Badge variant="info">Member</Badge>
          ) : role === "OrganizationManager" ? (
            <Badge variant="warning">Organization Manager</Badge>
          ) : role === "RequestManager" ? (
            <Badge variant="danger">Request Manager</Badge>
          ) : (
            <Badge variant="secondary">Unknown</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createAt",
    header: () => <div className="w-max">Ngày tạo</div>,
    cell: ({ row }) => {
      const createAt = row.getValue("createAt");
      return <div className="w-max">{createAt}</div>;
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
