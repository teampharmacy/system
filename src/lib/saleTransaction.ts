'use server'
import { Medicine } from '@prisma/client'; 
import prisma from "@/lib/prisma"
class SaleTransaction {
  private saleList: { medicine: Medicine; quantity: number }[] = [];
  private totalAmount: number = 0;

  constructor() {}

  // Add medicine to the sale transaction
  addMedicine(medicine: Medicine, quantity: number) {
    const existingItemIndex = this.saleList.findIndex(item => item.medicine.id === medicine.id);
    
    if (existingItemIndex >= 0) {
      this.saleList[existingItemIndex].quantity += quantity;
    } else {
      this.saleList.push({ medicine, quantity });
    }

    this.updateTotalAmount();
  }

  // Update the total amount of the sale
  private updateTotalAmount() {
    this.totalAmount = this.saleList.reduce(
      (total, item) => total + item.medicine.price * item.quantity,
      0
    );
  }

  // Get the total amount
  getTotalAmount() {
    return this.totalAmount;
  }

  // Get the current sale list
  getSaleList() {
    return this.saleList;
  }

async completeSale(paymentInfo: string) {
  // Wrap the sale transaction and medicine updates in a single transaction
  const result = await prisma.$transaction(async (tx) => {
    // Create sale transaction
    const saleTransaction = await tx.saleTransaction.create({
      data: {
        amount: this.totalAmount,
        saleItems: {
          create: this.saleList.map((item) => ({
            quantity: item.quantity,
            price: item.medicine.price,
            medicineId: item.medicine.id,
          })),
        },
      },
    });

    // Update medicines in a loop
    for (const item of this.saleList) {
      await tx.medicine.update({
        where: { id: item.medicine.id },
        data: {
          numberPurchased: item.medicine.numberPurchased + item.quantity,
          numberLeft: item.medicine.numberLeft - item.quantity,
        },
      });
    }

    return saleTransaction; // You can return the transaction result if needed
  });

  // Clear sale list and total amount after completing the sale
  this.saleList = [];
  this.totalAmount = 0;
  return result;
}

}

export default SaleTransaction;
