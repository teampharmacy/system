'use server'
import { PrismaClient } from '@prisma/client';  // Import PrismaClient
import SaleSearch from "@/components/sale-search";  // Import SaleSearch component
import { Medicine } from '@prisma/client'; 

const prisma = new PrismaClient();  // Instantiate PrismaClient

export default async function PaymentPage() {
  // Fetch all medicines (you may adjust the query as needed)
  const medicines = await prisma.medicine.findMany(); 
  //await prisma.$disconnect(); 
  console.log(medicines)
  return (
    <div>
      <SaleSearch medicines={medicines as Medicine[]} />
    </div>
  );
}
