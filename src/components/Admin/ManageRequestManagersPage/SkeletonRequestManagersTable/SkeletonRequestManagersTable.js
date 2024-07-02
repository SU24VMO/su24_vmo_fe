import React from "react";
import { Skeleton } from "../../../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table";

const SkeletonRequestManagersTable = () => {
  const columns = 7; // Adjust this number based on the actual number of columns
  const rows = 10; // Adjust this number based on the number of rows you want to show as skeleton

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {[...Array(columns)].map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-10 w-40"/>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(rows)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(columns)].map((_, cellIndex) => (
                <TableCell key={cellIndex}>
                  <Skeleton className="h-10 w-40" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SkeletonRequestManagersTable;
