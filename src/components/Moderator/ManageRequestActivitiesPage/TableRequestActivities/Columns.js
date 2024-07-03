import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../../../ui/badge";
import DataTableRowActions from "../Feature/DataTableRowAction";
import { format } from "date-fns";

export const columns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "activity.title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tiêu đề
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tạo bởi thành viên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      
      const user = row.original?.user ? (row.original?.user?.firstName + row.original?.user?.lastName) : "Chưa có";
      return <div className="">{user}</div>;
    },
  },
 
  {
    accessorKey: "organizationManager",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tạo bởi tổ chức
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      
      const organizationManager = row.original?.organizationManager ? (row.original?.organizationManager?.firstName + row.original?.organizationManager?.lastName) : "Chưa có";
      return <div className="">{organizationManager}</div>;
    },
  },
  // // Ẩn cột create_by_user
  // {
  //   accessorKey: "create_by_user",
  //   header: () => <div className="hidden"></div>,
  //   cell: ({ row }) => {
  //     const create_by_user = row.getValue("create_by_user");
  //     return <div className="hidden">{create_by_user}</div>;
  //   },
  // },
  // // Ẩn cột create_by_om
  // {
  //   accessorKey: "create_by_om",
  //   header: () => <div className="hidden"></div>,
  //   cell: ({ row }) => {
  //     const create_by_om = row.getValue("create_by_om");
  //     return <div className="hidden">{create_by_om}</div>;
  //   },
  // },
  {
    accessorKey: "approvedDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày duyệt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const approvedDate =  row?.getValue("approvedDate") ? format(new Date(row.getValue("approvedDate")), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có";
      return <div className="">{approvedDate}</div>;
    },
  },
  {
    accessorKey: "updateDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày cập nhật
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const updateDate =  row?.getValue("updateDate") ? format(new Date(row.getValue("updateDate")), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có";
      return <div className="">{updateDate}</div>;
    },
  },
  {
    accessorKey: "createDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createDate = row?.getValue("createDate") ? format(new Date(row.getValue("createDate")), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có";
      return <div className="">{createDate}</div>;
    },
  },
  {
    accessorKey: "isApproved",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Xác thực
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isApproved = row.getValue("isApproved");

      return (
        <div>
          {isApproved === true ? (
            <Badge variant="success">Đồng ý</Badge>
          ) : (
            <Badge variant="destructive">Từ chối</Badge>
          )}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "is_pending",
  //   header: () => <div className="w-max">Trạng thái chờ</div>,
  //   cell: ({ row }) => {
  //     const is_pending = row.getValue("is_pending");
  //     return (
  //       <div>
  //         {is_pending === true ? (
  //           <Badge variant="success">Đang chờ</Badge>
  //         ) : (
  //           <Badge variant="destructive">Chưa chờ</Badge>
  //         )}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "is_locked",
  //   header: () => <div className="w-max">Trạng thái khóa</div>,
  //   cell: ({ row }) => {
  //     const is_locked = row.getValue("is_locked");
  //     return (
  //       <div>
  //         {is_locked === true ? (
  //           <Badge variant="success">Đã khóa</Badge>
  //         ) : (
  //           <Badge variant="destructive">Chưa khóa</Badge>
  //         )}
  //       </div>
  //     );
  //   },
  // },
  // Thêm Actions vào columns
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];