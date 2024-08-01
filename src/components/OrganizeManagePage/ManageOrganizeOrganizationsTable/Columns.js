import { Button } from "../../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Badge } from "../../ui/badge";

export const columns = ({ onSort, onConfirm }) => [
  {
    accessorKey: "logo",
    header: () => <div>Logo</div>,
    cell: ({ row }) => {
      const avatar = row.getValue("logo");
      return (
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
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
          onClick={() => onSort("Name")}
        >
          Tổ chức
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const organizeName = row.getValue("name");
      return (
        <div className="w-52  line-clamp-3 ">
          {organizeName ? (
            <span className="bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">
              {organizeName}
            </span>
          ) : (
            <span className="bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">
              {organizeName}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("IsActive")}
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isApproved = row.original?.createOrganizationRequest?.isApproved;
      const isLocked = row.original?.createOrganizationRequest?.isLocked;
      const isPending = row.original?.createOrganizationRequest?.isPending;
      const isRejected = row.original?.createOrganizationRequest?.isRejected;
      let statusBadge;
      if (isApproved === true) {
        statusBadge = <Badge variant="success">Đã duyệt</Badge>;
      } else if (isLocked === true) {
        statusBadge = <Badge variant="warning">Bị khóa</Badge>;
      } else if (isRejected === true) {
        statusBadge = <Badge variant="destructive">Đã từ chối</Badge>;
      }  else if (isPending === true) {
        statusBadge = <Badge variant="info">Đang chờ</Badge>;
      }
      return (
        <div>{statusBadge}</div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("CreatedAt")}
        >
          Thời gian tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateCreate = format(new Date(row.getValue("createdAt")), 'dd/MM/yyyy, h:mm:ss a');
      return <div className="text-left">{dateCreate}</div>;
    },
  },

  //   Thêm Actions vào columns
  {
    id: "actions",
    cell: ({ row }) => {
      const infoRow = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành Động</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(infoRow.organizeName)
              }
            >
              Copy tên tổ chức
            </DropdownMenuItem>
            {row.original?.isActive === true ? (
              <div>
                <DropdownMenuSeparator />

                <DropdownMenuItem

                >
                  <Link to={`/organization/${row.original?.organizationID}`}>
                    Xem thông tin tổ chức
                  </Link>
                </DropdownMenuItem>
              </div>

            ) : ""}

            {infoRow?.createOrganizationRequest?.isPending === true ? (
              <div>
                <DropdownMenuSeparator />
                <DropdownMenuItem

                >
                  <Link to={`/updateOrganization/${row.original?.createOrganizationRequest?.createOrganizationRequestID}`}>
                    Chỉnh sửa tổ chức
                  </Link>
                </DropdownMenuItem>
              </div>
            ) : ""}
             {infoRow?.createOrganizationRequest?.isRejected === true ? (
              <div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    onConfirm(row.original)
                  }
                >
                  Ẩn
                </DropdownMenuItem>
              </div>
            ) : ""}

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
