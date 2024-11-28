"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getMedicineByName } from "@/lib/utils";
import { useEffect, useState } from "react";
import MedicineCard from "./medicine-card";
import { useParams } from "next/navigation";

interface Medicine {
  name: string;
  id: number;
  typeId: number;
  numberPurchased: number;
  numberLeft: number;
  instruction: string;
  sideEffect: string;
  price: number;
}

const DynamicMedicinePage = () => {
  const params = useParams();
  const paramId = params?.id;

  const [medicine, setMedicine] = useState<Medicine | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const medicinesData = await getMedicineByName(
          paramId?.toString() || ""
        );
        if (medicinesData && medicinesData.length > 0) {
          setMedicine(medicinesData[0]); // Set the first medicine found
        } else {
          setMedicine(null); // No medicine found
        }
      } catch (error) {
        console.error("Failed to load medicines:", error);
      }
    }

    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex justify-between gap-10">
        <MedicineCard title="Эм">
          <div className="flex justify-between mt-4">
            <div>
              <p>{medicine?.id}</p>
              <p>Эмийн дугаар</p>
            </div>
            <div>
              <p>{medicine?.name}</p>
              <p>Эмийн нэр</p>
            </div>
          </div>
        </MedicineCard>
        <MedicineCard title="Тоо ширхэг">
          <div className="flex justify-between mt-4">
            <div>
              <p>{medicine?.numberPurchased}</p>
              <p>Нийт зарсан</p>
            </div>
            <div>
              <p>{medicine?.numberLeft}</p>
              <p>Үлдсэн</p>
            </div>
          </div>
        </MedicineCard>
      </div>
      <MedicineCard title="Хэрэглэх заавар">
        <p>{medicine?.instruction}</p>
      </MedicineCard>
      <MedicineCard title="Гаж нөлөө">
        <p>{medicine?.sideEffect}</p>
      </MedicineCard>
    </div>
  );
};

export default DynamicMedicinePage;
