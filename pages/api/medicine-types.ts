// pages/api/medicine-types.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const medicineTypes = await prisma.medicineType.findMany();
      res.status(200).json(medicineTypes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch medicine types" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
