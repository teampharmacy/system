"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MedicineTypeSelect from "@/components/medicine-type-select";

const formSchema = z.object({
  id: z.number().min(1, "Invalid ID"), // ID must be present and valid
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  typeId: z.number().min(1, "Type ID must be at least 1"),
  numberLeft: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().min(0, "Number left must be at least 1")
  ),
  numberPurchased: z.number().min(0, "Number purchased must be at least 0"),
  instruction: z
    .string()
    .min(1, "Instruction cannot be empty")
    .max(255, "Instruction must not exceed 255 characters"),
  sideEffect: z
    .string()
    .min(1, "Side effect cannot be empty")
    .max(255, "Side effect must not exceed 255 characters"),
  price: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().min(0, "Price must be at least 1")
  ),
});

const EditMedicinePage = () => {
  const searchParams = useSearchParams();
  const params = searchParams?.get("id");

  const [loading, setLoading] = useState(true);
  // Ensure the router is mounted before accessing params

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: Number(params) || 0,
      name: "",
      typeId: 1,
      numberLeft: 0,
      numberPurchased: 0,
      instruction: "",
      sideEffect: "",
      price: 0,
    },
  });

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch(`/api/get-medicine?id=${params}`);
        if (!response.ok) throw new Error("Failed to fetch medicine");

        const { medicine } = await response.json();
        if (medicine) {
          // form.setValue("id", medicine.id || "");
          form.setValue("name", medicine.name || "");
          form.setValue("typeId", medicine.typeId || 1);
          form.setValue("numberLeft", medicine.numberLeft || 0);
          // form.setValue("numberPurchased", medicine.numberPurchased || 0);
          form.setValue("instruction", medicine.instruction || "");
          form.setValue("sideEffect", medicine.sideEffect || "");
          form.setValue("price", medicine.price || 0);
        }
      } catch (error) {
        console.error("Error fetching medicine:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [params]);

  const handleMedicineTypeChange = (selectedValue: string) => {
    const selectedTypeId = parseInt(selectedValue, 10);
    console.log("Selected Type ID:", selectedTypeId);
    form.setValue("typeId", selectedTypeId);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form values:", values);
    setLoading(true);
    if (!values.id) {
      toast({
        title: "Error",
        description: "Missing medicine ID. Cannot submit.",
      });
      return;
    }
    try {
      const response = await fetch("/api/edit-medicine", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Medicine updated successfully!",
        });
        // router.push("/medicine-list");
      } else {
        toast({
          title: "Error",
          description: "Failed to update the medicine.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the medicine.",
      });
    }
    setLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter medicine name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type ID</FormLabel>
              <FormControl>
                <MedicineTypeSelect onChange={handleMedicineTypeChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberLeft"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter remaining quantity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instruction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instruction</FormLabel>
              <FormControl>
                <Input placeholder="Enter usage instructions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sideEffect"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Side Effect</FormLabel>
              <FormControl>
                <Input placeholder="Enter potential side effects" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default EditMedicinePage;
