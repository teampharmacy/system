import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface MedicineCardProps {
  title: string;
  children: React.ReactNode;
}

const MedicineCard = ({ title, children }: MedicineCardProps) => {
  return (
    <Card className="w-full p-4 shadow-md">
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="mt-4">{children}</CardContent>
    </Card>
  );
};

export default MedicineCard;
