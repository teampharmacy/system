import MedicineCard from "./medicine-card";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import prisma from "@/lib/db";

const DynamicMedicinePage = async ({ params }: { params: { id: string } }) => {
  const medicine = await prisma?.medicine.findFirst({
    where: {
      name: params.id,
    },
  });

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h2>{medicine?.name}</h2>
        <Button className="flex bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          {" "}
          <PencilLine /> Засах
        </Button>
      </div>
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

// interface Medicine {
//   name: string;
//   id: number;
//   typeId: number;
//   numberPurchased: number;
//   numberLeft: number;
//   instruction: string;
//   sideEffect: string;
//   price: number;
// }

// const [medicine, setMedicine] = useState<Medicine | null>(null);

// useEffect(() => {
//   async function loadData() {
//     try {
//       const medicinesData = await getMedicineByName(
//         paramId?.toString() || ""
//       );
//       if (medicinesData && medicinesData.length > 0) {
//         setMedicine(medicinesData[0]); // Set the first medicine found
//       } else {
//         setMedicine(null); // No medicine found
//       }
//     } catch (error) {
//       console.error("Failed to load medicines:", error);
//     }
//   }

//   loadData();
// }, []);
