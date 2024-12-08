// pages/api/admin/makeAdmin.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../src/lib/db"; // Adjust path if necessary

const makeAdmin = async (email: string) => {
  await prisma.user.update({
    where: { email },
    data: { role: "admin" },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body; // Get email from the request body

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      // Call the makeAdmin function to promote the user to admin
      await makeAdmin(email);

      return res
        .status(200)
        .json({ message: `User ${email} has been promoted to admin.` });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to promote user to admin." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
