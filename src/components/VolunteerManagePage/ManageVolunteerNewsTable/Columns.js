import { Button } from "../../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Link } from "react-router-dom";
export const columns = ({ onSort }) => [

  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("Title")}
        >
          Tiêu đề
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue("title");
      return <div className="w-52  line-clamp-3 ">{title}</div>;
    },
  },
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
      const newStatus = row.getValue("isActive");
      return (
        <div className="w-max">
          {newStatus ? (
            <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              Đã duyệt
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              Chưa duyệt
            </span>
          )}
        </div>
      );
    },
  },

  // {
  //   accessorKey: "organizeName",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="px-0 py-0"
  //          onClick={() => onSort("Title")}
  //       >
  //         Tổ chức
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const organizeName = row.getValue("organizeName");
  //     return (
  //       <div>
  //         {organizeName ? (
  //           <span className="bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">
  //             {organizeName}
  //           </span>
  //         ) : (
  //           <span className="bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">
  //             {organizeName}
  //           </span>
  //         )}
  //       </div>
  //     );
  //   },
  // },

  {
    accessorKey: "createAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-0"
          onClick={() => onSort("CreateAt")}
        >
          Thời gian tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateCreate = format(new Date(row.getValue("createAt")), 'dd/MM/yyyy, h:mm:ss a');
      return <div className="w-max">{dateCreate}</div>;
    },
  },

  //   Thêm Actions vào columns
  {
    id: "actions",
    cell: ({ row }) => {
      const infoRow = row.original;//Khai báo row ban đầu

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
                navigator.clipboard.writeText(infoRow.newTitle)//Copy tên row tên news
              }
            >
              Copy tiêu đề
            </DropdownMenuItem>
            {infoRow?.isActive === true ? (
              <div>
                <DropdownMenuSeparator />
                <DropdownMenuItem

                >
                  <Link
                    to={`/news/newsDetail/${row.original?.postID}`}>Xem tin tức</Link>
                </DropdownMenuItem>
              </div>

            ) : ""}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
