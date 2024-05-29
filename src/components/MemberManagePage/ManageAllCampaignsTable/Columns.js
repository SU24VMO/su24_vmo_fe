// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../../../ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";
import {
  ArrowUpDown,
  MoreHorizontal,
  // , MoreHorizontal
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";

// This object is used to define the shape of our data.
// export const Payment = {
//   id: String,
//   amount: Number,
//   status: ["pending", "processing", "success", "failed"],
//   email: String,
// };

export const columns = [
  {
    accessorKey: "numericalOrder",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          STT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stt = row.getValue("numericalOrder");
      return <div className="ml-2 text-start">{stt}</div>;
    },
  },
 
  {
    accessorKey: "nameOfCampaign",
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
    accessorKey: "statusCampaign",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const statusCampaign = row.getValue("statusCampaign");
      return <div>
        {statusCampaign ? <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{statusCampaign}</span> : <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{statusCampaign}</span>}
      </div>;
    },
  },
  {
    accessorKey: "donationAmount",
    header: ({ column }) => (
      <Button
        className="w-full px-0 py-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Số tiền ủng hộ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const donationAmount = parseFloat(row.getValue("donationAmount"));
      const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "VND",
      }).format(donationAmount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "donationDate",
    header: () => <div className="text-right">Thời gian ủng hộ</div>,
    cell: ({ row }) => {
      const donationDate = row.getValue("donationDate");
      return <div className="text-right">{donationDate}</div>;
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
                onClick={() => navigator.clipboard.writeText(infoRow.nameOfCampaign)}
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
