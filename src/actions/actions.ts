"use server";

import prisma from "@/lib/db";

export async function addMedicines(formData: FormData) {
  try {
    // Debug formData
    console.log("Form Data:", Object.fromEntries(formData.entries()));

    // Parse fields
    const name = formData.get("name")?.toString();
    const typeId = Number(formData.get("typeId"));
    const numberLeft = Number(formData.get("numberLeft"));
    const numberPurchased = Number(formData.get("numberPurchased"));
    const price = Number(formData.get("price"));
    const instruction = formData.get("instruction")?.toString();
    const sideEffect = formData.get("sideEffect")?.toString();

    if (!name || !instruction || !sideEffect || isNaN(typeId)) {
      throw new Error("Invalid or missing required fields");
    }

    // Create medicine
    const medicine = await prisma.medicine.create({
      data: {
        name,
        typeId,
        numberLeft,
        numberPurchased,
        price,
        instruction,
        sideEffect,
      },
    });

    console.log("Medicine added successfully:", medicine);
  } catch (error) {
    console.error("Error adding medicine:", error);
    throw error; // Ensure error propagates for debugging
  }
}
