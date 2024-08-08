import { Button } from "../../ui/button";
import {
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("Name")}
        >
          Tên chiến dịch
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name");
      return <div className="w-52  line-clamp-3 ">{name}</div>;
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
      const isApproved = row.original?.createCampaignRequest?.isApproved;
      const isLocked = row.original?.createCampaignRequest?.isLocked;
      const isPending = row.original?.createCampaignRequest?.isPending;
      const isRejected = row.original?.createCampaignRequest?.isRejected;
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
    accessorKey: "targetAmount",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => onSort("TargetAmount")}
      >
        Số tiền mục tiêu
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const donationAmount = parseFloat(row.getValue("targetAmount"));
      const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "VND",
      }).format(donationAmount);

      return <div className="text-start font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("StartDate")}
        >
          Thời gian bắt đầu
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const startDate = format(new Date(row.getValue("startDate")), 'dd/MM/yyyy, h:mm:ss a');
      return <div className="w-max">{startDate}</div>;
    },
  },
  {
    accessorKey: "expectedEndDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0  "
          onClick={() => onSort("ExpectedEndDate")}
        >
          Thời gian kết thúc giai đoạn ủng hộ dự kiến
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const endDate = format(new Date(row.getValue("expectedEndDate")), 'dd/MM/yyyy, h:mm:ss a');
      return <div className="w-max">{endDate}</div>;
    },
  },

  {
    accessorKey: "actualEndDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("ActualEndDate")}
        >
          Thời gian kết thúc
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const actualEndDate = row?.getValue("actualEndDate") ? (format(new Date(row.getValue("actualEndDate")), 'dd/MM/yyyy, h:mm:ss a')) : "Chưa có";
      return <div className="">{actualEndDate}</div>;
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
                navigator.clipboard.writeText(infoRow.nameOfCampaign)
              }
            >
              Copy tên chiến dịch
            </DropdownMenuItem>

            {infoRow?.isActive === true ? (

              <div>
                <DropdownMenuSeparator />

                <DropdownMenuItem

                >

                  <Link to={`/viewCampaigns/campaignDetail/${row.original?.campaignID}`}>
                    Xem chiến dịch
                  </Link>
                </DropdownMenuItem>
              </div>) : ""}

              {infoRow?.createCampaignRequest?.isPending === true  ? (
              <div>
                <DropdownMenuSeparator />
                <DropdownMenuItem

                >
                  <Link to={`/updateCampaignOrganizationManager/${row.original?.createCampaignRequest?.createCampaignRequestID}`}>
                    Chỉnh sửa chiến dịch
                  </Link>
                </DropdownMenuItem>
              </div>
            ) : ""}
            {infoRow?.createCampaignRequest?.isRejected === true ? (
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
