import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../../../ui/badge";
import DataTableRowActions from "../Feature/DataTableRowAction";
import { format } from "date-fns";

export const columns = ({ onEdit, onDelete, onSort }) => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("Name")}
        >
          Tên người quản lí tổ chức
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("PhoneNumber")}
        >
          Số điện thoại
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
          onClick={() => onSort("Address")}
        >
          Địa chỉ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "citizenIdentification",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("CitizenIdentification")}
        >
          Mã CCCD
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "personalTaxCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("PersonalTaxCode")}
        >
          Mã số thuế cá nhân
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "moderator",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("Moderator.FirstName")}
        >
          Người duyệt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      
      const moderator = row.original?.moderator ? (row.original.moderator?.firstName + " " + row.original.moderator?.lastName) : "Chưa có";
      return <div className="">{moderator}</div>;
    },
  },
  {
    accessorKey: "createDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("CreateDate")}
        >
          Ngày tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createDate = row?.getValue("createDate") ? format(new Date(row.getValue("createDate")), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có";
      return <div className="">{createDate}</div>;
    },
  },
  {
    accessorKey: "approvedDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("ApprovedDate")}
        >
          Ngày duyệt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const approvedDate =  row?.getValue("approvedDate") ? format(new Date(row.getValue("approvedDate")), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có";
      return <div className="">{approvedDate}</div>;
    },
  },
  {
    accessorKey: "isApproved",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("IsApproved")}
        >
          Xác thực
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isApproved = row.original.isApproved;
      const isLocked = row.original.isLocked;
      const isPending = row.original.isPending;
      const isRejected = row.original.isRejected;
      let statusBadge;
      if (isApproved === true) {
        statusBadge = <Badge variant="success">Đồng ý</Badge>;
      } else if (isLocked === true) {
        statusBadge = <Badge variant="warning">Đang khóa</Badge>;
      } else if (isRejected === true) {
        statusBadge = <Badge variant="destructive">Từ chối</Badge>;
      }  else if (isPending === true) {
        statusBadge = <Badge variant="info">Đang chờ</Badge>;
      }
      return (
        <div>{statusBadge}</div>
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
