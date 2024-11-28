"use client";
import AppCard from "@/components/app-card";
import { BriefcaseMedical } from "lucide-react";
import { useRouter } from "next/navigation";

const InventoryPage = () => {
  const router = useRouter();

  const cards = [
    {
      name: "Боломжтой эм",
      icon: BriefcaseMedical,
      number: 120,
      iconColor: "text-blue-500",
      to: "/medicine-list",
    },
    {
      name: "Эмийн төрөл",
      icon: BriefcaseMedical,
      number: 50,
      iconColor: "text-green-500",
      to: "#",
    },
  ];

  const handleClick = (to: string) => {
    router.push(to);
  };

  return (
    <div className=" grid grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <AppCard
          key={index}
          name={card.name}
          icon={card.icon}
          number={card.number}
          iconColor={card.iconColor}
          onClick={() => handleClick(card.to)}
        />
      ))}
    </div>
  );
};

export default InventoryPage;
