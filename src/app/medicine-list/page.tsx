"use client";

import { fetchMedicines } from "@/lib/utils";
import { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const MedicineListPage = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const medicinesData = await fetchMedicines();
        setMedicines(medicinesData || []);
      } catch (error) {
        console.error("Failed to load medicines:", error);
      }
    }

    loadData();
  }, []);

  return (
    <div>
      {/* <div>Medicine List Page</div> */}
      <div className="container mx-auto py-4">
        <DataTable columns={columns} data={medicines} />
      </div>
    </div>
  );
};

export default MedicineListPage;
