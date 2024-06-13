"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";

import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import React from "react";
import { ChevronDown, File } from "lucide-react";
import { exportToExcel } from "../Feature/exportToExcel";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]); //filter
  const [columnVisibility, setColumnVisibility] = React.useState({}); //column visibility (dropdown menu)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Pagination
    getSortedRowModel: getSortedRowModel(), // Sort
    onSortingChange: setSorting, // Sort
    onColumnFiltersChange: setColumnFilters, // Filter
    getFilteredRowModel: getFilteredRowModel(), // Filter
    onColumnVisibilityChange: setColumnVisibility, // Column visibility
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  //Name of column dropdown
  const columnHeaders = {
    title: "Tên bài viết",
    create_by: "Tạo bởi",
    approved_date: "Ngày duyệt",
    update_date: "Ngày cập nhật",
    create_date: "Ngày tạo",
    is_approved: "Xác thực",
    is_pending: "Trạng thái chờ",
    is_locked: "Trạng thái khóa",
    actions: "Thao tác",
  };

  return (
    <div>
      <div className="flex items-center py-4">
        {/* Search filter tên người dùng */}
        <Input
          type="search"
          placeholder="Nhập tên bài viết cần tìm ..."
          value={table.getColumn("title")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Xuất excel */}
        <Button
          onClick={() => exportToExcel({ post: data })}
          className="ml-4"
          variant="outline"
        >
          Tải xuống <File className="ml-2 h-4 w-4" />
        </Button>
        {/* Ẩn, hiện cột và hàng */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Cột hiển thị <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  column.getCanHide() && columnHeaders.hasOwnProperty(column.id)
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnHeaders[column.id]}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="truncate max-w-14">
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
      </div>
      <div className="flex items-center justify-between p-2">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        {/* <div className="flex items-center space-x-6 lg:space-x-8"> */}
        {/* Hàng trên mỗi trang  */}
        {/* <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Hàng trên mỗi trang</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
        {/* Đang ở trang bao nhiêu/tổng số trang */}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Trang {table.getState().pagination.pageIndex + 1} trên{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trang trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Trang sau
          </Button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
