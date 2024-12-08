'use server'
import { PrismaClient } from '@prisma/client';  // Import PrismaClient
import SaleSearch from "@/components/sale-search";  // Import SaleSearch component
import { Medicine } from '@prisma/client'; 

import prisma from '@/lib/prisma';

export default async function PaymentPage() {
  const medicines = (await prisma?.medicine.findMany()) ?? [];

  return (
    <div>
      <SaleSearch medicines={medicines as Medicine[]} />
    </div>
  );
}
