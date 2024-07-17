import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import React from "react";
import { Link } from "react-router-dom";
import SkeletonNewsTable from "./SkeletonNewsTable/SkeletonNewsTable";

export function DataTable({ 
  columns,
  data,
  loading,
  pageSize,
  pageNo,
  setPageSize,
  setPageNo,
  totalPages,
  setTitle
 }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Pagination
    getSortedRowModel: getSortedRowModel(), // Sort
    onSortingChange: setSorting, // Sort
    onColumnFiltersChange: setColumnFilters, // Filter
    getFilteredRowModel: getFilteredRowModel(), // Filter
    state: {
      sorting,
      columnFilters,
    },
  });

  // const [state, setState] = React.useState({
  //   ...table.initialState, //populate the initial state with all of the default state values from the table instance
  //   pagination: {
  //     pageIndex: pageNo - 1,
  //     pageSize,
  //   },
  // })

  // table.setOptions(prev => ({
  //   ...prev, //preserve any other options that we have set up above
  //   state, //our fully controlled state overrides the internal state
  //   onStateChange: setState //any state changes will be pushed up to our own state management
  // }))

//update ui lại mỗi khi có thây đổi state (onStateChange ko bắt đc liên tục
  // việc có biến thay đổi trừ khi có hoạt động liên quan trong state
  // được khởi tạo của nó mà cụ thể là pagination là 1 state)
  React.useEffect(() => {
    table.setPageSize(pageSize);
    table.setPageIndex(pageNo - 1);
  }, [pageNo, pageSize, table]);

  const handlePreviousPage = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };

  const handleNextPage = () => {
    if (pageNo < totalPages) setPageNo(pageNo + 1);
  };
  return (
    <>
     <div className="my-4 w-fit bg-vmo pr-10 pl-5 py-2 rounded-tr-md rounded-br-2xl drop-shadow-md animate-slide-in-left">
      <p className="font-bold text-base mobile:text-2xl">Danh sách tin tức</p>
      </div>

      <div className="flex items-center py-4">
        <Input
          type="search"
          placeholder="Tìm kiếm tên tiêu đề ..."
          onChange={(event) =>
            setTitle(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="w-full flex justify-end">
        <Link to="/createNews">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Tạo tin tức
          </button>
        </Link>
      </div>
      <div className="rounded-md border">
        {loading ? (
          <SkeletonNewsTable />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không có kết quả tìm kiếm 😥
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-between p-2">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Trang {pageNo} trên {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={pageNo === 1}
          >
            Trang trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={pageNo === totalPages}
          >
            Trang sau
          </Button>
          {/* <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select> */}
        </div>
      </div>
    </>
  );
}
