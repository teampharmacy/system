// "use client";

// import { fetchMedicineTypes } from "@/lib/utils";
// import { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import prisma from "@/lib/db";

const MedicineTypePage = async () => {
  const medicineTypes = (await prisma?.medicineType.findMany()) ?? [];
  return (
    <div>
      <div className="container mx-auto py-4">
        <DataTable columns={columns} data={medicineTypes} />
      </div>
    </div>
  );
};

export default MedicineTypePage;

// const [medicineTypes, setMedicineTypes] = useState([]);

// useEffect(() => {
//   async function loadData() {
//     try {
//       const medicineTypesData = await fetchMedicineTypes();
//       setMedicineTypes(medicineTypesData || []);
//     } catch (error) {
//       console.error("Failed to load medicineTypes:", error);
//     }
//   }

//   loadData();
// }, []);
