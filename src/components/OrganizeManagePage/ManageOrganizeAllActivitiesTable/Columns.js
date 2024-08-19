import { Button } from "../../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("Title")}
        >
          Tên hoạt động
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue("title");
      return <div className="w-52   line-clamp-3 ">{title}</div>;
    },
  },

  // {
  //   accessorKey: "nameOfCampaign",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="px-0 py-0"
  //        onClick={() => onSort("IsActived")}
  //       >
  //         Tên chiến dịch
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
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
      const isApproved = row.original?.createActivityRequest?.isApproved;
      const isLocked = row.original?.createActivityRequest?.isLocked;
      const isPending = row.original?.createActivityRequest?.isPending;
      const isRejected = row.original?.createActivityRequest?.isRejected;
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
    accessorKey: "campaignName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("CampaignName")}
        >
          Chiến dịch
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const campaignName = row.getValue("campaignName");
      return (
        <div className="w-52  line-clamp-3 ">

          <span className="bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-md dark:bg-orange-900 dark:text-orange-300">
            {campaignName}
          </span>

        </div>
      );
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
          Thời gian đăng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createDate = format(new Date(row.getValue("createDate")), 'dd/MM/yyyy, h:mm:ss a');
      return <div className="w-max">{createDate}</div>;
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
                

                  {(infoRow?.campaignTier * 1) === 1 ? (<Link to={`/viewCampaigns/campaignDetail/tier1/${row.original?.processingPhase?.campaignId}`}>
                    Xem chiến dịch toàn phần
                  </Link>) : (<Link to={`/viewCampaigns/campaignDetail/tier2/${row.original?.processingPhase?.campaignId}`}>
                    Xem chiến dịch từng phần
                  </Link>)}

                </DropdownMenuItem>
              </div>
            ) : ""}
            {infoRow?.createActivityRequest?.isPending === true ? (
              <div>
                <DropdownMenuSeparator />
                <DropdownMenuItem

                >
                  {(infoRow?.campaignTier * 1) === 1 ? (<Link to={`/updateActivityOrganizationManager/${row.original?.createActivityRequest?.createActivityRequestID}`}>
                    Chỉnh sửa hoạt động
                  </Link>) : (<Link to={`/updateActivityOrganizationManagerTier2/${row.original?.createActivityRequest?.createActivityRequestID}`}>
                    Chỉnh sửa hoạt động
                  </Link>)}
                </DropdownMenuItem>
              </div>
            ) : ""}

            {infoRow?.createActivityRequest?.isRejected  === true ? (
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
