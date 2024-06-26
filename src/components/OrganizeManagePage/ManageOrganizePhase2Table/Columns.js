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

export const columns = [
  
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
  },

  {
    accessorKey: "targetAmount",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tổ chức
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const organizeName = row.original?.organization.name
      return (
        <div>
            <span className="bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">
              {organizeName}
            </span>
          
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: () => <div className="">Thời gian bắt đầu</div>,
    cell: ({ row }) => {
      const startDate = format(new Date(row.getValue("startDate")), 'dd/MM/yyyy, h:mm:ss a');
      return <div className="">{startDate}</div>;
    },
  },
  {
    accessorKey: "expectedEndDate",
    header: () => <div className="text-right">Thời gian kết thúc dự kiến</div>,
    cell: ({ row }) => {
      const expectedEndDate = format(new Date(row.getValue("expectedEndDate")), 'dd/MM/yyyy, h:mm:ss a');
      return <div className="text-right">{expectedEndDate}</div>;
    },
  },
  {
    accessorKey: "actualEndDate",
    header: () => <div className="">Thời gian kết thúc</div>,
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
            <DropdownMenuSeparator />
            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
            <DropdownMenuItem>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
