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
import React,{useEffect} from "react";
import { ChevronDown, File } from "lucide-react";
import { exportToExcel } from "../Feature/exportToExcel";
import SkeletonVolunteersTable from "../SkeletonVolunteersTable/SkeletonVolunteersTable";

export function DataTable({ 
  columns,
  data,
  loading,
  pageSize,
  pageNo,
  setPageSize,
  setPageNo,
  totalPages,
  setVolunteerName
 }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]); //filter
  const [columnVisibility, setColumnVisibility] = React.useState({}); //column visibility (dropdown menu)
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
     
    },
  });
  //Name of column dropdown
  const columnHeaders =  {
    memberName: "Tên thành viên",
    email: "Email",
    memberAddress: "Địa chỉ",
    moderator: "Người duyệt",
    createDate: "Ngày tạo đơn",
    approvedDate: "Ngày duyệt",
    isApproved:"Xác thực",
    actions: "Thao tác"
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

  useEffect(() => {
    console.log("Data Length:", data.length);
    console.log("Table Rows Length:", table.getRowModel().rows?.length);
  }, [data, table]);

  const handlePreviousPage = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };

  const handleNextPage = () => {
    if (pageNo < totalPages) setPageNo(pageNo + 1);
  };



  return (
    <div>
      <div className="flex items-center py-4">
      {/* Search filter tên người dùng */}
        <Input
          type="search"
          placeholder="Nhập tên thành viên cần tìm ..."
        
          onChange={(event) =>
            setVolunteerName(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Xuất excel */}
        <Button onClick={() => exportToExcel()} className="ml-4" variant="outline">
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
              .filter((column) => column.getCanHide())
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
                    {columnHeaders[column.id] || column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        {loading ? (
          <SkeletonVolunteersTable  />
        ) : (
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
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Không có kết quả tìm kiếm 😥
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-between p-2">
       
        {/* Đang ở trang bao nhiêu/tổng số trang */}
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
