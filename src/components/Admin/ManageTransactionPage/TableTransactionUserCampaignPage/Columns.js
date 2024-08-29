import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import { format } from "date-fns";

export const columns = ({ onEdit, onDelete, onSort }) => [

  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("Date")}
        >
          Ngày
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date");
      return <div className=" ">{date}</div>;
    },
  },
  
  {
    accessorKey: "time",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => onSort("Time")}
      >
        Giờ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const time = row.getValue("time");
      return <div className=" ">{time}</div>;
    },
  },

  {
    accessorKey: "sendAccount",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => onSort("SendAccount")}
      >
        Tài khoản gửi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const sendAccount = row.original?.sendAccount;
      return <div className="line-clamp-1">{sendAccount}</div>;
    },
  },
  {
    accessorKey: "receiveAccount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("ReceiveAccount")}
        >
          Tài khoản nhận
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // const receiveAccount = row.original?.receiveAccount;
      return <div className="line-clamp-1">admin</div>;
    },
  },

  {
    accessorKey: "campaignName",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => onSort("CampaignName")}
      >
        Chiến dịch
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const campaignName = row.original?.campaignName;
      return <div className="line-clamp-1">{campaignName}</div>;
    },
  },
  

  {
    accessorKey: "platform",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => onSort("Platform")}
      >
        Nền tảng
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const platform = row.original?.platform;
      return <div className="line-clamp-1">{platform}</div>;
    },
  },
  {
    accessorKey: "spending",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        // onClick={() => onSort("spending")}
      >
        Giao dịch loại
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      // const spending = row.getValue("spending");
      return (
        <div className="w-max">
          {/* {spending === 1 ? (
            <Badge variant="success">Thành công</Badge>
          ) : (
            <Badge variant="destructive">Không thành công</Badge>
          )} */}
            <Badge variant="success">Thu tiền</Badge>

        </div>
      );
    },
  },

  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => onSort("Amount")}
      >
        Số tiền
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "VND",
      }).format(amount);

      return <div className="text-start font-medium text-green-600">{"+" + formatted}</div>;
    },
  },


  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => onSort("Status")}
      >
        Trạng thái
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="w-max">
          {status === 1 ? (
            <Badge variant="success">Thành công</Badge>
          ) : (
            <Badge variant="destructive">Không thành công</Badge>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "isCognito",
    header: ({ column }) => (
      <Button
        className="px-0 py-0"
        variant="ghost"
        onClick={() => onSort("IsCognito")}
      >
        Trạng thái ẩn danh
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const isCognito = row.getValue("isCognito");
      return (
        <div className="w-max">
          {isCognito === true ? (
            <Badge variant="success">Ẩn danh</Badge>
          ) : (
            <Badge variant="destructive">Không ẩn danh</Badge>
          )}
        </div>
      );
    },
  },


  // Thêm Actions vào columns
  // {
  //   id: "actions",
  //   cell: ({ row }) => (
  //     <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
  //   ),
  // },
];
