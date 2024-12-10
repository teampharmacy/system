import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid or missing medicine ID" });
  }

  try {
    const medicine = await prisma.medicine.findUnique({
      where: { id: Number(id) },
    });

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    return res.status(200).json({ medicine });
  } catch (error) {
    console.error("Error fetching medicine:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
