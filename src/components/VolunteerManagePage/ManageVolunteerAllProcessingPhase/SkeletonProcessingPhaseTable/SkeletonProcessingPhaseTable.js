import React from "react";
import { Skeleton } from "../../../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table";

const SkeletonProcessingPhaseTable = () => {
  const columns = 7; // Số cột loading
  const rows = 10; // Số hàng loading

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

export default SkeletonProcessingPhaseTable;
