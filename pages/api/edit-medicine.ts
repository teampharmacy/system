import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db"; // Update to match your Prisma import path

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      id,
      name,
      typeId,
      numberLeft,
      numberPurchased,
      instruction,
      sideEffect,
      price,
    } = req.body;

    // Validate required fields
    if (
      !id ||
      !name ||
      !typeId ||
      numberLeft === undefined ||
      numberPurchased === undefined ||
      !instruction ||
      !sideEffect ||
      price === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Update the medicine record in the database
    const updatedMedicine = await prisma.medicine.update({
      where: { id: Number(id) },
      data: {
        name,
        typeId: Number(typeId),
        numberLeft: Number(numberLeft),
        numberPurchased: Number(numberPurchased),
        instruction,
        sideEffect,
        price: Number(price),
      },
    });

    return res.status(200).json({
      message: "Medicine updated successfully",
      medicine: updatedMedicine,
    });
  } catch (error) {
    console.error("Error updating medicine:", error);

    return res
      .status(500)
      .json({ error: "An error occurred while updating the medicine" });
  }
}
