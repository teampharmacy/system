import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "DELETE") {
    const { id } = req.query; // Get the ID from the URL

    try {
      // Delete the medicine record
      const deletedMedicine = await prisma.medicine.delete({
        where: {
          id: Number(id), // Ensure that the ID is a number, assuming it's an integer
        },
      });

      // Return the deleted medicine data (optional)
      return res.status(200).json(deletedMedicine);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting medicine", error });
    }
  } else {
    // Handle any other HTTP method
    return res.status(405).json({ message: "Method not allowed" });
  }
}
