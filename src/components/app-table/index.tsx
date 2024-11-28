import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { flexRender, Row, Table as TanstackTable } from "@tanstack/react-table";

interface AppTableProps<TData> {
  table: TanstackTable<TData>; // The table instance from @tanstack/react-table
  data: TData[]; // The data used in the table
}

const AppTable = <TData,>({ table, data }: AppTableProps<TData>) => {
  // Retrieve the number of visible columns
  const visibleColumnsCount = table.getVisibleFlatColumns().length;

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className="px-4 py-2 text-left font-semibold text-gray-600"
              >
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
        {data && table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="hover:bg-gray-50 cursor-pointer"
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="px-4 py-3 text-sm text-gray-800"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={visibleColumnsCount}
              className="h-24 text-center text-gray-400"
            >
              No results found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AppTable;
