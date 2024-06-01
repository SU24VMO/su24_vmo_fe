// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../../../ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";
import { Button } from "../../../ui/button";
import {
  ArrowUpDown,
  // , MoreHorizontal
} from "lucide-react";

// This object is used to define the shape of our data.
// export const Payment = {
//   id: String,
//   amount: Number,
//   status: ["pending", "processing", "success", "failed"],
//   email: String,
// };

export const columns = [
  {
    accessorKey: "donatorName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Người ủng hộ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "donationAmount",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
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

      return <div className="text-start font-medium">{formatted}</div>;
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
  //   {
  //     id: "actions",
  //     cell: ({ row }) => {
  //       const payment = row.original;

  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem
  //               onClick={() => navigator.clipboard.writeText(payment.id)}
  //             >
  //               Copy payment ID
  //             </DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>View customer</DropdownMenuItem>
  //             <DropdownMenuItem>View payment details</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },
];
