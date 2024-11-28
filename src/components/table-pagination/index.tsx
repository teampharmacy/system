import { Button } from "../ui/button";
import { Table as TanstackTable } from "@tanstack/react-table";

interface TablePaginationProps<TData> {
  table: TanstackTable<TData>; // The table instance from @tanstack/react-table
}

const TablePagination = <TData,>({ table }: TablePaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} row(s).
      </div>
      <div className="space-x-2">
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
    </div>
  );
};

export default TablePagination;
