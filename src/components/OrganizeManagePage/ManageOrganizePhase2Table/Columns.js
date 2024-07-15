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

export const columns =({ onSort, onConfirm }) => [
  
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
    accessorKey: "organization",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("Organization.Name")}
        >
          Tổ chức
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const organizeName = row.original?.organization.name
      return (
        <div className="w-48 line-clamp-3">
            <span className="bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">
              {organizeName}
            </span>
          
        </div>
      );
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
      const startDate = format(new Date(row.original?.processingPhase?.startDate), 'dd/MM/yyyy, h:mm:ss a');
      return <div className="w-max">{startDate}</div>;
    },
  },
  // {
  //   accessorKey: "expectedEndDate",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="px-0 py-0"
  //         onClick={() => onSort("ExpectedEndDate")}
  //       >
  //         Thời gian kết thúc dự kiến
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const expectedEndDate = format(new Date(row.original?.processingPhase?.expectedEndDate), 'dd/MM/yyyy, h:mm:ss a');
  //     return <div className="w-max">{expectedEndDate}</div>;
  //   },
  // },
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
  //     const actualEndDate = row?.getValue("actualEndDate") ? (format(new Date(row.getValue("actualEndDate")), 'dd/MM/yyyy, h:mm:ss a')) : "Chưa có";
  //     return <div className="w-max">{actualEndDate}</div>;
  //   },
  // },
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
            <DropdownMenuSeparator />
            {infoRow?.isActive === true ? (<DropdownMenuItem
              
              >
              <Link to={`/viewCampaigns/campaignDetail/${row.original?.campaignID}`}>
              Xem chiến dịch 
              </Link>
              </DropdownMenuItem>) : "" }
              <DropdownMenuItem
           onClick={() => onConfirm(row.original)}
            >
              Kết thúc giai đoạn 2
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
