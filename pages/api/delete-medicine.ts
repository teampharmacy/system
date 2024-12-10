// File: pages/api/medicines/[id].ts

import prisma from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  switch (method) {
    case "DELETE":
      try {
        // Delete the medicine by its unique ID
        const deletedMedicine = await prisma.medicine.delete({
          where: { id: Number(id) },
        });

        return res.status(200).json({
          message: `Medicine with ID ${id} has been deleted.`,
          deletedMedicine,
        });
      } catch (error) {
        console.error("Error deleting medicine:", error);
        return res
          .status(500)
          .json({ message: "Something went wrong.", error });
      }

    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
