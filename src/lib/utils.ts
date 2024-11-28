import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchMedicines() {
  try {
    const response = await fetch("http://localhost:3000/medicines.json"); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error(`Error fetching medicines: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
