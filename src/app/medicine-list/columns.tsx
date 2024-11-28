"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Medicine = {
  id: number;
  name: string;
  numberLeft: number;
  typeId: number;
};

export const columns: ColumnDef<Medicine>[] = [
  {
    accessorKey: "id",
    // header: "Эмийн дугаар",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Эмийн дугаар
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    // header: "Эмийн нэр",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Эмийн нэр
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link href={"/medicine-list/" + row.getValue("name")}>
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "typeId",
    header: "Төрөл",
  },
  {
    accessorKey: "numberLeft",
    header: "Ширхэг",
  },
];
