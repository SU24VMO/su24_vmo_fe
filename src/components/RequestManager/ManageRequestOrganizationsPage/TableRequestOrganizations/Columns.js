import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import DataTableRowActions from "../Feature/DataTableRowAction";
import { format } from "date-fns";

export const columns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "organizationName",
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
    accessorKey: "organizationManagerEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
 
  {
    accessorKey: "organizationTaxCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã số thuế
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "areaOfActivity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lĩnh vực hoạt động
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Địa chỉ tổ chức
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "approvedBy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Được duyệt bởi
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
    accessorKey: "isApproved",
    header: () => <div>Xác thực</div>,
    cell: ({ row }) => {
      const isApproved = row.getValue("isApproved");

      return (
        <div>
          {isApproved === true  ? (
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
