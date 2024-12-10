"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Define the type for the props
interface MedicineTypeSelectProps {
  onChange: (selectedValue: string) => void; // Type the onChange prop
}

const MedicineTypeSelect: React.FC<MedicineTypeSelectProps> = ({
  onChange,
}) => {
  const [medicineTypes, setMedicineTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedicineTypes() {
      try {
        const response = await fetch("/api/medicine-types");
        if (!response.ok) throw new Error("Failed to fetch medicine types");

        console.log("Response Status:", response.status);
        const data = await response.json();
        console.log("Fetched Data:", data);
        setMedicineTypes(data || []);
      } catch (error) {
        console.error(error);
        setMedicineTypes([]); // Ensure `medicineTypes` is always an array
      } finally {
        setLoading(false);
      }
    }

    fetchMedicineTypes();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Select onValueChange={onChange}>
      {" "}
      {/* Directly pass the value to onChange */}
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Medicine Type" />
      </SelectTrigger>
      <SelectContent>
        {medicineTypes.map((type) => (
          <SelectItem key={type.id} value={type.id.toString()}>
            {type.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MedicineTypeSelect;
