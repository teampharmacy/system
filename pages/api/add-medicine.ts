import { NextApiRequest, NextApiResponse } from "next"; // Import types from next
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        name,
        typeId,
        numberPurchased,
        numberLeft,
        instruction,
        sideEffect,
        price,
      } = req.body;

      // Ensure required fields are present
      if (!name || !instruction || !sideEffect) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create medicine in the database using Prisma
      await prisma.medicine.create({
        data: {
          name,
          typeId,
          instruction,
          sideEffect,
          numberPurchased,
          numberLeft,
          price,
        },
      });

      res.status(200).json({ message: "Medicine added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add medicine" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
