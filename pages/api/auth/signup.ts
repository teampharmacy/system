import prisma from "@/lib/db";
import { hash } from "bcryptjs";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, name, password } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Email, password, and name are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the new user (not approved by default)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        approved: false, // Admin must approve the user
        role: "user", // Default role
        accounts: {
          create: {
            provider: "credentials",
            providerAccountId: email, // Use email as the account ID for credentials
            passwordHash: hashedPassword,
          },
        },
      },
    });

    return res.status(201).json({
      message: "User created. Awaiting admin approval.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong.", error });
  }
}
