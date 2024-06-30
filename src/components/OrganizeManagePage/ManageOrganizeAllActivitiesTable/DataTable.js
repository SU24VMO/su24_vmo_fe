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
import SkeletonActivitiesTable from "./SkeletonActivitiesTable/SkeletonActivitiesTable";

export function DataTable({ 
  columns,
  data,
  loading,
  pageSize,
  pageNo,
  setPageSize,
  setPageNo,
  totalPages,
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
  const [state, setState] = React.useState({
    ...table.initialState, //populate the initial state with all of the default state values from the table instance
    pagination: {
      pageIndex: pageNo - 1,
      pageSize,
    },
  })

  table.setOptions(prev => ({
    ...prev, //preserve any other options that we have set up above
    state, //our fully controlled state overrides the internal state
    onStateChange: setState //any state changes will be pushed up to our own state management
  }))



  const handlePreviousPage = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };

  const handleNextPage = () => {
    if (pageNo < totalPages) setPageNo(pageNo + 1);
  };
  return (
    <>
      <div className="my-4">
      <p className="font-bold text-2xl">Manage Activities Page</p>
      </div>

      <div className="flex items-center py-4">
        <Input
          type="search"
          placeholder="Tìm kiếm ..."
          value={table.getColumn("title")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="w-full flex justify-end">
        <Link to="/createActivityOM">
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Tạo bài đăng
        </button>
        
        </Link>
      </div>
      <div className="rounded-md border">
        {loading ? (
          <SkeletonActivitiesTable />
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
