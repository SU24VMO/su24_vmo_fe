import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../../../ui/badge";
import DataTableRowActions from "../Feature/DataTableRowAction";
import { format } from "date-fns";

export const columns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "post.title",
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
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thành viên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      
      const user = row.original?.user ? (row.original.user?.firstName + row.original.user?.lastName) : "chưa có";
      return <div className="">{user}</div>;
    },
  },

  {
    accessorKey: "organizationManager",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quản lí tổ chức
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      
      const organizationManager = row.original?.organizationManager ? (row.original.organizationManager?.firstName + row.original.organizationManager?.lastName) : "chưa có";
      return <div className="">{organizationManager}</div>;
    },
  },

  {
    accessorKey: "createDate",
    header: () => <div>Ngày tạo</div>,
    cell: ({ row }) => {
      const createDate = row?.getValue("createDate") ? format(new Date(row.getValue("createDate")), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có";
      return <div className="">{createDate}</div>;
    },
  },

  {
    accessorKey: "approvedDate",
    header: () => <div>Ngày duyệt</div>,
    cell: ({ row }) => {
      const approvedDate =  row?.getValue("approvedDate") ? format(new Date(row.getValue("approvedDate")), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có";
      return <div className="">{approvedDate}</div>;
    },
  },
 
  {
    accessorKey: "requestManager",
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
    cell: ({ row }) => {
      
      const requestManager = row.original?.requestManager ? (row.original?.requestManager?.firstName + row.original?.requestManager?.lastName) : "Chưa có";
      return <div className="">{requestManager}</div>;
    },
  },
  {
    accessorKey: "isApproved",
    header: () => <div>Xác thực</div>,
    cell: ({ row }) => {
      const isApproved = row.getValue("isApproved");

      return (
        <div>
          {isApproved === true ? (
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