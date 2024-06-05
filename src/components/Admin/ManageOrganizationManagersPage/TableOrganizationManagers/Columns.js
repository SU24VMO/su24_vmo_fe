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
    accessorKey: "avatar",
    header: () => <div>Ảnh đại diện</div>,
    cell: ({ row }) => {
      const organizationManagerAvatar = row.getValue("avatar");
      return (
        <Avatar>
          <AvatarImage src={organizationManagerAvatar} />
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên người dùng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên tổ chức
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
    accessorKey: "is_block",
    header: () => <div>Đang hoạt động</div>,
    cell: ({ row }) => {
      const is_block = row.getValue("is_block");
      return (
        <div>
          {is_block === true ? (
            <Badge variant="success">Có</Badge>
          ) : (
            <Badge variant="destructive">Không</Badge>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "create_at",
    header: () => <div>Ngày tạo</div>,
    cell: ({ row }) => {
      const create_at = row.getValue("create_at");
      return <div>{create_at}</div>;
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
