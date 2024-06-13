import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../../../ui/badge";
import DataTableRowActions from "../Feature/DataTableRowAction";

export const columns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "title",
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
    id: "create_by",
    header: () => <div className="w-max">Tạo bởi</div>,
    cell: ({ row }) => {
      const create_by_user = row.getValue("create_by_user");
      const create_by_om = row.getValue("create_by_om");

      return (
        <div className="w-max">
          {create_by_user == null && create_by_om != null ? (
            <Badge variant="outline">Tạo bởi tổ chức</Badge>
          ) : (
            <Badge variant="outline">Tạo bởi người dùng</Badge>
          )}
        </div>
      );
    },
  },
  // Ẩn cột create_by_user
  {
    accessorKey: "create_by_user",
    header: () => <div className="hidden"></div>,
    cell: ({ row }) => {
      const create_by_user = row.getValue("create_by_user");
      return <div className="hidden">{create_by_user}</div>;
    },
  },
  // Ẩn cột create_by_om
  {
    accessorKey: "create_by_om",
    header: () => <div className="hidden"></div>,
    cell: ({ row }) => {
      const create_by_om = row.getValue("create_by_om");
      return <div className="hidden">{create_by_om}</div>;
    },
  },
  {
    accessorKey: "approved_date",
    header: () => <div className="w-max">Ngày duyệt</div>,
  },
  {
    accessorKey: "update_date",
    header: () => <div className="w-max">Ngày cập nhật</div>,
  },
  {
    accessorKey: "create_date",
    header: () => <div className="w-max">Ngày tạo</div>,
  },
  {
    accessorKey: "is_approved",
    header: () => <div className="w-max">Xác thực</div>,
    cell: ({ row }) => {
      const is_approved = row.getValue("is_approved");

      return (
        <div className="w-max">
          {is_approved === true ? (
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