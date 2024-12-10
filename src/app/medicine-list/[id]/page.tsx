import MedicineCard from "./medicine-card";
import { Button } from "@/components/ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import prisma from "@/lib/db";
import Link from "next/link";
import DeleteButton from "./delete-button";
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
        <Link
          href={{
            pathname: "/edit-medicine",
            query: { id: medicine?.id },
          }}
        >
          <Button className="flex bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            {" "}
            <PencilLine /> Засах
          </Button>
        </Link>
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
      <DeleteButton id={medicine?.id.toString() || ""} />
    </div>
  );
};

export default DynamicMedicinePage;
