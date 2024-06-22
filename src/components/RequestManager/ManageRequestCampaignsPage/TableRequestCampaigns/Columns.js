import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import DataTableRowActions from "../Feature/DataTableRowAction";
import { format } from "date-fns";

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
          Tên chiến dịch
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      
      const name = row.original.campaign.name;
      return <div className="">{name}</div>;
    },
  },
  // {
  //   accessorKey: "create_by_user",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="px-0 py-0"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Tạo bởi thành viên
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
 
  // {
  //   accessorKey: "create_by_om",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="px-0 py-0"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Tạo bởi tổ chức
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "approvedBy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Người duyệt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "update_by",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Đã cập nhật từ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
    
  {
    accessorKey: "createDate",
    header: () => <div>Ngày tạo</div>,
    cell: ({ row }) => {
      const createDate = format(new Date(row.getValue("createDate")), 'MMMM do yyyy, h:mm:ss a');
      return <div className="">{createDate}</div>;
    },
  },
  {
    accessorKey: "approvedDate",
    header: () => <div>Ngày duyệt</div>,
    cell: ({ row }) => {
      const approvedDate = format(new Date(row.getValue("approvedDate")), 'MMMM do yyyy, h:mm:ss a');
      return <div className="">{approvedDate}</div>;
    },
  },
  {
    accessorKey: "is_approved",
    header: () => <div>Xác thực</div>,
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
 
  // Thêm Actions vào columns
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];
