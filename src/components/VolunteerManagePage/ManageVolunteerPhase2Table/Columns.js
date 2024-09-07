import { Button } from "../../ui/button";
import { format } from "date-fns";

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
    accessorKey: "campaignTier",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
           onClick={() => onSort("CampaignTier")}
        >
          Loại chiến dịch
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const tier = row.original?.campaignTier;
      let statusBadge;
      if (tier === 1) {
        statusBadge = <Badge variant="blue">Toàn phần</Badge>;
      } else if (tier === 2) {
        statusBadge = <Badge variant="orange">Từng phần</Badge>;
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
      const targetAmount = parseFloat(row.getValue("targetAmount"));
      const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "VND",
      }).format(targetAmount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  // {
  //   accessorKey: "donatePhase.currentMoney",
  //   header: ({ column }) => (
  //     <Button
  //       className="px-0 py-0"
  //       variant="ghost"
  //       onClick={() => onSort("Title")}
  //     >
  //       Số tiền đạt được
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => {
  //     const donatePhase = parseFloat(row.original?.donatePhase.currentMoney);
  //     const formatted = new Intl.NumberFormat("it-IT", {
  //       style: "currency",
  //       currency: "VND",
  //     }).format(donatePhase);

  //     return <div className="font-medium">{formatted}</div>;
  //   },
  // },

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
      const startDate = row.original?.processingPhases[0]?.startDate ? (format(new Date(row.original?.processingPhases[0]?.startDate), 'dd/MM/yyyy, h:mm:ss a')) : "Chưa có";
    
      return <div className="w-max">{startDate}</div>;
    },
  },

  // {
  //   accessorKey: "actualEndDate",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="px-0 py-0"
  //         onClick={() => onSort("ActualEndDate")}
  //       >
  //         Thời gian kết thúc
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const actualEndDate = row?.original?.processingPhase?.endDate ? (format(new Date(row?.original?.processingPhase?.endDate), 'dd/MM/yyyy, h:mm:ss a')) : "Chưa có";
  //     return <div className="">{actualEndDate}</div>;
  //   },
  // },
  //   Thêm Actions vào columns
  {
    id: "actions",
    cell: ({ row }) => {
      const infoRow = row.original;
      console.log(infoRow);
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
            <DropdownMenuSeparator />
            {infoRow?.isActive === true ? (<DropdownMenuItem

            >
             {(infoRow?.campaignTier * 1) === 1 ? (<Link to={`/viewCampaigns/campaignDetail/tier1/${row.original?.campaignID}`}>
                    Xem chiến dịch toàn phần
                  </Link>) : (<Link to={`/viewCampaigns/campaignDetail/tier2/${row.original?.campaignID}`}>
                    Xem chiến dịch từng phần
                  </Link>)}
            </DropdownMenuItem>) : ""}
            {(infoRow?.campaignTier * 1) === 1 ? (
              <DropdownMenuItem
                onClick={() => onConfirm(row.original)}
              >
                Kết thúc giai đoạn
              </DropdownMenuItem>) : ""}

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
