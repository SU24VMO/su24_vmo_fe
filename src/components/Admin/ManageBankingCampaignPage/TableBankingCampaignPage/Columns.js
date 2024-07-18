import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import { format } from "date-fns";
import DataTableRowActions from "../Feature/DataTableRowAction";

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
          Tên chiến dịch
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "bankingName",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => onSort("BankingName")}
      >
        Tên ngân hàng
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  // {
  //   accessorKey: "isActived",
  //   header: ({ column }) => (
  //     <Button
  //       className="px-0 py-0"
  //       variant="ghost"
  //       onClick={() => onSort("IsActived")}
  //     >
  //       Trạng thái
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => {
  //     const isActived = row.getValue("isActived");
  //     return (
  //       <div className="w-max">
  //         {isActived === true ? (
  //           <Badge variant="success">Đang hoạt động</Badge>
  //         ) : (
  //           <Badge variant="destructive">Tạm dừng</Badge>
  //         )}
  //       </div>
  //     );
  //   },
  // },

  {
    accessorKey: "accountName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("AccountName")}
        >
          Tên tài khoản
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
