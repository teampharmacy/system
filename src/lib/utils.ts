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

export async function fetchMedicineTypes() {
  try {
    const response = await fetch("http://localhost:3000/medicine-type.json"); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error(`Error fetching medicine types: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getMedicineByName(name: string) {
  try {
    const response = await fetchMedicines();

    // Ensure the data is an array before filtering
    if (!Array.isArray(response)) {
      throw new Error("Invalid data format, expected an array.");
    }
    // Filter medicines by name
    return response.filter(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
