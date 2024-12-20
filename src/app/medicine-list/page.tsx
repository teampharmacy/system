// "use client";

// import { fetchMedicines } from "@/lib/utils";
// import { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import prisma from "@/lib/db";
import Link from "next/link";

const MedicineListPage = async () => {
  const medicines = (await prisma?.medicine.findMany()) ?? [];

  return (
    <div>
      <div className="flex justify-between">
        <h2>Борлуулах боломжтой эмийн жагсаалт</h2>
        <Link href={"/add-medicine"}>
          <Button className="flex bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            {" "}
            <Plus /> Эм нэмэх
          </Button>
        </Link>
      </div>
      <div className="container mx-auto py-4">
        <DataTable columns={columns} data={medicines} />
      </div>
    </div>
  );
};

export default MedicineListPage;

// const [medicines, setMedicines] = useState([]);

// useEffect(() => {
//   async function loadData() {
//     try {
//       const medicinesData = await fetchMedicines();
//       setMedicines(medicinesData || []);
//     } catch (error) {
//       console.error("Failed to load medicines:", error);
//     }
//   }

//   loadData();
// }, []);
