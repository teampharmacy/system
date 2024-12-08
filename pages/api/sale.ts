import prisma from '@/lib/prisma'; 
import { SaleItem } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
interface CompleteSaleArgs {
  saleList: SaleItem[];
  totalAmount: number;
}
const completeSale = async ({ saleList, totalAmount }: CompleteSaleArgs) => {
  const saleTransaction = await prisma.saleTransaction.create({
    data: {
      amount: totalAmount,
      saleItems: {
        create: saleList.map((item) => ({
          quantity: item.quantity,
          price: item.price,
          medicineId: item.id,
        })),
      },
    },
  });

  for (const item of saleList) {
    await prisma.medicine.update({
      where: { id: item.id },
      data: {
        numberPurchased: { increment: item.quantity }, 
        numberLeft: { decrement: item.quantity }, 
      },
    });
  }

  return saleTransaction;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { saleList, totalAmount }: CompleteSaleArgs = req.body;
      if (!Array.isArray(saleList) || saleList.length === 0 || typeof totalAmount !== 'number') {
        return res.status(400).json({ error: 'Invalid request data' });
      }
      const result = await completeSale({ saleList, totalAmount });
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred during the sale completion.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}