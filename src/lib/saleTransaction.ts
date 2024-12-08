import { Medicine, SaleItem, SaleTransaction, Report, Payment } from '@prisma/client';
import prisma from "@/lib/db";
interface CompleteSaleArgs {
  saleList: SaleItem[];
  totalAmount: number;
}
class Transaction {
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

 ;
}

export default Transaction;  