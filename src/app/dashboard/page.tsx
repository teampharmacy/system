"use client";

import AppCard from "@/components/app-card";
import { Banknote, HandCoins, ChevronFirst } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  // Data for the cards
  const cards = [
    {
      name: "Орлого",
      icon: Banknote,
      number: 30000,
      iconColor: "text-green-500",
      to: "#",
    },
    {
      name: "Ашиг",
      icon: HandCoins,
      number: 30000,
      iconColor: "text-red-500",
      to: "#",
    },
    {
      name: "Агуулахын тоо",
      icon: ChevronFirst,
      number: 30000,
      iconColor: "text-blue-500",
      to: "#",
    },
  ];

  // Handle navigation
  const handleClick = (to: string) => {
    router.push(to);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold">Дашбоард</h1>
        <p className="text-gray-600">
          Бараа материалыг шүүж үзэх мэдээллийн тойм
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Additional Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Aгуулах Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Агуулах</h2>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-gray-500">Нийт эмийн тоо</p>
              <p className="text-xl font-bold">298</p>
            </div>
            <div>
              <p className="text-gray-500">Эмийн төрөл</p>
              <p className="text-xl font-bold">24</p>
            </div>
          </div>
        </div>

        {/* Тайлан Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Тайлан</h2>
            <select className="text-sm border border-gray-300 rounded-md p-1">
              <option>January 2025</option>
              <option>December 2024</option>
            </select>
          </div>
          <div className="mt-4">
            <p className="text-gray-500">Нийт борлуулсан эм</p>
            <p className="text-xl font-bold">70,856</p>
            <p className="text-gray-500 mt-2">Нэхэмжлэл</p>
            <p className="text-xl font-bold">5,288</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
