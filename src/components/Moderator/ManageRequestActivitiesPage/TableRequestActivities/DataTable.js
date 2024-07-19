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
import React, { useState } from "react";
import { ChevronDown, File } from "lucide-react";
import { exportToExcel } from "../Feature/exportToExcel";
import SkeletonTable from "../SkeletonTable/SkeletonTable";
import { TailSpin } from "react-loader-spinner";

export function DataTable({
  columns,
  data,
  loading,
  pageSize,
  pageNo,
  setPageSize,
  setPageNo,
  totalPages,
  setActivityName
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]); //filter
  const [columnVisibility, setColumnVisibility] = React.useState({}); //column visibility (dropdown menu)
  const table = useReactTable({
    data: data,
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
    "title": "Tiêu đề",
    "member": "Tạo bởi thành viên",
    "organizationManager": "Tạo bởi quản lí tổ chức",
    "moderator": "Người duyệt",
    "createDate": "Ngày tạo",
    "approvedDate": "Ngày duyệt",
    "update_date": "Ngày cập nhật",
    "isApproved": "Xác thực",
    "actions": "Thao tác",
  };

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

  const [loadingExport, setLoadingExport] = useState(false)


  const handleExport = async () => {
    setLoadingExport(true)

    try {
      await exportToExcel()
    } catch (error) {

    } finally {
      setLoadingExport(false)
    }
  }

  return (
    <div>
      <div className="flex items-center py-4">
        {/* Search filter tên người dùng */}
        <Input
          type="search"
          placeholder="Nhập tiêu đề hoạt động cần tìm ..."
          onChange={(event) =>
            setActivityName(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Xuất excel */}
        <Button
          onClick={() => handleExport()}
          className="ml-4 hover:bg-vmo hover:text-white transition-all"
          variant="outline"
        >
          {loadingExport ? (
            <div className="flex items-center">
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass="w-max h-screen mx-auto items-center"
              />
              <span className="ml-2">Tải xuống</span>
              <File className="ml-2 h-4 w-4" />
            </div>
          ) : (
            <div className="flex items-center">
              Tải xuống
              <File className="ml-2 h-4 w-4" />
            </div>
          )}
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
        {loading ? (
          <SkeletonTable />
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
    </div>
  );
}