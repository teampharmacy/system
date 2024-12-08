'use client'
import React, { useState, useEffect } from 'react';
import SaleTransaction from '@/lib/saleTransaction'; 
import { Medicine } from '@prisma/client'; 
interface SaleSearchProps {
  medicines: Medicine[];
}

const SaleSearch: React.FC<SaleSearchProps> = ({ medicines}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');  // For storing search input
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);  // Store filtered medicines
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});  // Track quantity for each medicine
  const [paymentInfo, setPaymentInfo] = useState<string>('');  // Payment info field
  const [saleList, setSaleList] = useState<{ medicine: Medicine; quantity: number }[]>([]);  // List of medicines in sale
  const [totalAmount, setTotalAmount] = useState<number>(0);  // Store total amount of sale
  const saleTransaction = new SaleTransaction(); 

  // Filter medicines whenever the search query changes
  useEffect(() => {
    if (searchQuery) {
      const filtered = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMedicines(filtered);
    } else {
      setFilteredMedicines([]);
    }
  }, [searchQuery, medicines]);

  // Function to handle adding medicine to the sale list
  const addToSale = (medicine: Medicine) => {
    const quantity = quantities[medicine.id] || 1;  // Get the quantity for this medicine

    // Check if quantity is valid and available in stock
    if (quantity <= 0 || quantity > medicine.numberLeft) {
      alert('Invalid quantity or not enough stock');
      return;
    }

    // Add medicine to sale transaction
    saleTransaction.addMedicine(medicine, quantity);
    
    // Add medicine to the sale list and update total amount
    setSaleList([...saleList, { medicine, quantity }]);
    setTotalAmount(saleTransaction.getTotalAmount());
  };

  // Function to handle the change in quantity for a specific medicine
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

  // Function to handle the completion of the sale
  const completeSale = () => {
    saleTransaction.completeSale(paymentInfo);
    setSaleList([]);
    setTotalAmount(0);
    setPaymentInfo('');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for a medicine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Display filtered medicines */}
      {searchQuery && filteredMedicines.length > 0 ? (
        <table className="min-w-full table-auto border-collapse mb-6">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Price</th>
              <th className="px-4 py-2 border-b text-left">Quantity</th>
              <th className="px-4 py-2 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((medicine) => (
              <tr key={medicine.id}>
                <td className="px-4 py-2 border-b">{medicine.name}</td>
                <td className="px-4 py-2 border-b">${medicine.price}</td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="number"
                    value={quantities[medicine.id] || 1}  // Use the quantity state for this medicine
                    onChange={(e) => handleQuantityChange(medicine.id, Number(e.target.value))}
                    min="1"
                    max={medicine.numberLeft}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => addToSale(medicine)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add to Sale
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : searchQuery ? (
        <div className="text-center text-gray-500">No matching medicines found</div>
      ) : null}

      {/* Display the sale transaction list */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Sale Transaction List</h3>
        <ul>
          {saleList.map((item) => (
            <li key={item.medicine.id} className="flex justify-between mb-2">
              <span>{item.medicine.name} x {item.quantity}</span>
              <span>${item.medicine.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <h4 className="text-lg font-semibold mt-4">Total Amount: ${totalAmount}</h4>
      </div>

      {/* Payment Information */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter payment info..."
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
          Complete Sale
        </button>
      </div>
    </div>
  );
};

export default SaleSearch;