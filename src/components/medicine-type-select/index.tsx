import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import prisma from "@/lib/db";

const MedicineTypeSelect = async () => {
  const medicineTypes = (await prisma?.medicineType.findMany()) ?? [];
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Medicine Type" />
      </SelectTrigger>
      <SelectContent>
        {medicineTypes.map((type) => (
          <SelectItem key={type.id} value={type.name}>
            {type.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MedicineTypeSelect;
