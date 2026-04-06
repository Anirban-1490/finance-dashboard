import { useEffect, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react";
import type { FinanceCategory, Transaction } from "@/type";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransactionFilter } from "@/store/transaction-filter";

type Payment = {
  id: string;
  amount: number;
  category: FinanceCategory;
  date: string;
  type: "income" | "expense";
  name: string;
};

export function TransactionTable({
  pageSize = 5,
  enablePagination,
  extraColumns = [],
  data,
  showActions,
}: {
  pageSize?: number;
  enablePagination?: boolean;
  extraColumns?: ColumnDef<Payment>[];
  data: Transaction[];
  showActions?: boolean;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const filterState = useTransactionFilter((state) => state.filter);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "name",
    },

    {
      accessorKey: "amount",

      cell({ row }) {
        const amount = parseFloat(row.getValue("amount"));
        const formatedAmount = new Intl.NumberFormat("en-us", {
          currency: "USD",
          style: "currency",
        }).format(amount);
        return <div className=" font-medium">{formatedAmount}</div>;
      },
      filterFn: (row, columnId, value) => {
        const [min, max] = value as [number, number];
        const rowValue = row.getValue(columnId) as number;

        if (!min && !max) return true;
        if (min && rowValue < min) return false;
        if (max && rowValue > max) return false;

        return true;
      },
    },
    {
      accessorKey: "date",
    },
    {
      accessorKey: "category",
    },
    {
      accessorKey: "type",
    },
    {
      id: "actions",
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                {" "}
                <Edit className=" text-green-500" /> Edit
              </DropdownMenuItem>

              <DropdownMenuItem>
                {" "}
                <Trash className=" text-red-500" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns: [...columns, ...extraColumns],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    defaultColumn: {
      header({ column, header }) {
        if (header.id === "actions") return null;
        return (
          <Button
            variant="ghost"
            className=" capitalize px-0!"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() !== "desc")
            }
          >
            {header.id}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {
    table.setPageSize(pageSize);
  }, []);

  useEffect(() => {
    if (table) {
      table.getColumn("category")?.setFilterValue(filterState?.category);
      table.getColumn("type")?.setFilterValue(filterState?.type);

      const minVal = filterState?.minAmount
        ? parseFloat(`${filterState.minAmount}`)
        : 0;
      const maxVal = filterState?.maxAmount
        ? parseFloat(`${filterState.maxAmount}`)
        : 0;
      table.getColumn("amount")?.setFilterValue([minVal, maxVal]);
    }
  }, [filterState]);

  return (
    <div className="flex flex-col w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className=" opacity-75 font-light" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id === "actions" && !showActions) return null;
                  return (
                    <TableCell className="py-4!" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {enablePagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
