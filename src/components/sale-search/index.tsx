'use client';

import React, { useState, useEffect } from 'react';
import Transaction from '@/lib/saleTransaction'; 
import { Medicine } from '@prisma/client'; 

interface SaleSearchProps {
  medicines: Medicine[];
}

const SaleSearch: React.FC<SaleSearchProps> = ({ medicines }) => {
  
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]); 
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); 
  const [paymentInfo, setPaymentInfo] = useState<string>(''); 
  const [saleList, setSaleList] = useState<{ medicine: Medicine; quantity: number }[]>([]);  
  const [totalAmount, setTotalAmount] = useState<number>(0);  
  const saleTransaction = new Transaction(); 

  useEffect(() => {
    if (searchQuery) {
      const filtered = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMedicines(filtered);
    } else {
      setFilteredMedicines(medicines);
    }
  }, [searchQuery, medicines]);

  const addToSale = (medicine: Medicine) => {
    const quantity = quantities[medicine.id] || 1;  

    if (quantity <= 0 || quantity > medicine.numberLeft) {
      return;
    }
    saleTransaction.addMedicine(medicine, quantity);
    setSaleList((prevSaleList) => [...prevSaleList, { medicine, quantity }]);
    setTotalAmount(saleTransaction.getTotalAmount());
  };
  const handleQuantityChange = (medicineId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [medicineId]: 1,  // Prevent zero or negative quantities
      }));
    } else {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [medicineId]: newQuantity,
      }));
    }
  };
  const completeSale = async () => {
    if (saleList.length === 0 || !paymentInfo) {
      return;
    }

    const saleData = {
      saleList: saleList.map((item) => ({
        id: item.medicine.id,
        quantity: item.quantity,
        price: item.medicine.price,
      })),
      totalAmount,
    };
      const response = await fetch('/api/sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData),
      });

      const result = await response.json();
      if (response.ok) {
        setSaleList([]);
        setTotalAmount(0);
        setPaymentInfo('');
      }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Эм хайх..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Medicine List Table */}
      {searchQuery && filteredMedicines.length > 0 ? (
        <table className="min-w-full table-auto border-collapse mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Эмийн нэр</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Үнэ</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Тоо ширхэг</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((medicine) => (
              <tr key={medicine.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{medicine.name}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">${medicine.price}</td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={quantities[medicine.id] || 1}  
                    onChange={(e) => handleQuantityChange(medicine.id, Number(e.target.value))}
                    min="1"
                    max={medicine.numberLeft}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => addToSale(medicine)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Жагсаалтад нэмэх
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : searchQuery ? (
        <div className="text-center text-gray-500">Хайсан эм олдсонгүй</div>
      ) : null}

      {/* Sale List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Худалдан авалтын жагсаалт</h3>
        <div className="bg-white shadow-sm rounded-lg p-4">
          <ul>
            {saleList.map((item) => (
              <li key={item.medicine.id} className="flex justify-between mb-2 py-2 border-b">
                <span className="text-sm text-gray-900">{item.medicine.name} x {item.quantity}</span>
                <span className="text-sm text-gray-500">${item.medicine.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <h4 className="text-lg font-semibold">Нийт үнэ:</h4>
            <span className="text-lg font-semibold text-green-500">{totalAmount}₮</span>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Төлбөрийн мэдээлэл оруулах..."
          value={paymentInfo}
          onChange={(e) => setPaymentInfo(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Complete Sale Button */}
      <div className="text-center">
        <button
          onClick={completeSale}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Худалдах
        </button>
      </div>
    </div>
  );
};

export default SaleSearch;
