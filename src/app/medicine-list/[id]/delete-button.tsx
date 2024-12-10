"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const DeleteButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState();

  const handleDelete = async ({ id }: { id: string }) => {
    try {
      const response = await fetch(`/api/medicines/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete medicine");
      }

      const data = await response.json();
      console.log(data.message); // "Medicine with ID abc123 has been deleted."
      return data;
    } catch (error) {
      console.error("Error deleting medicine:", error);
      return { error };
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-red-500 text-white w-fit hover:border-red-500 hover:bg-white hover:text-red-500 border-2 ">
          <Trash2 /> Устгах
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            data.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Cancelled",
                description: "Deletion has been cancelled.",
              });
            }}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-500 text-white"
            disabled={loading}
            onClick={() => handleDelete({ id })}
          >
            {loading ? "Deleting..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
