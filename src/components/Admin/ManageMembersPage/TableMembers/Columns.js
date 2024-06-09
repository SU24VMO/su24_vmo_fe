import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import DataTableRowActions from "../Feature/DataTableRowAction";

export const columns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Họ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
    accessorKey: "gender",
    header: () => <div>Giới tính</div>,
    cell: ({ row }) => {
      const gender = row.getValue("gender");
      return (
        <div>
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
    accessorKey: "birthday",
    header: () => <div>Năm sinh</div>,
  },
  {
    accessorKey: "is_verified",
    header: () => <div>Xác thực</div>,
    cell: ({ row }) => {
      const is_verified = row.getValue("is_verified");
      return (
        <div>
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
    accessorKey: "facebook_url",
    header: () => <div>Link facebook</div>,
    cell: ({ row }) => {
      const facebookUrl = row.getValue("facebook_url");
      return (
        <div className="max-w-[100px] min-w-[100px] truncate">
          {facebookUrl === "" ? (
            <p className="truncate"></p>
          ) : (
            <p className="truncate">{facebookUrl}</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "youtube_url",
    header: () => <div>Link youtube</div>,
    cell: ({ row }) => {
      const youtubeUrl = row.getValue("youtube_url");
      return (
        <div className="max-w-[100px] min-w-[100px] truncate">
          {youtubeUrl === "" ? (
            <p className="truncate"></p>
          ) : (
            <p className="truncate">{youtubeUrl}</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "tiktok_url",
    header: () => <div>Link tiktok</div>,
    cell: ({ row }) => {
      const tiktokUrl = row.getValue("tiktok_url");
      return (
        <div className="max-w-[100px] min-w-[100px] truncate">
          {tiktokUrl === "" ? (
            <p className="truncate"></p>
          ) : (
            <p className="truncate">{tiktokUrl}</p>
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
