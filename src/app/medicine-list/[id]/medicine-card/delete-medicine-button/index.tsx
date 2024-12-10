// components/DeleteMedicineButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteMedicineButtonProps {
  id: string;
}

const DeleteMedicineButton: React.FC<DeleteMedicineButtonProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const deleteMedicine = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    try {
      const response = await fetch(`/api/medicine/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Redirect or handle success (e.g., show a success message)
        window.location.href = "/medicine-list"; // Redirect to admin panel or another page
      } else {
        const error = await response.json();
        alert(error.message || "Something went wrong");
      }
    } catch (error) {
      alert("An error occurred while deleting the medicine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-fit border-red-500 text-red-500 hover:text-white hover:bg-red-500"
      onClick={deleteMedicine}
      disabled={loading}
    >
      <Trash2 />
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteMedicineButton;
