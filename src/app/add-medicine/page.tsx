"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  typeId: z.number().min(1, "Type ID must be at least 1"),
  numberLeft: z.number().min(1, "Number left must be at least 1"),
  numberPurchased: z.number().min(0, "Number purchased must be at least 0"),
  instruction: z
    .string()
    .min(1, "Instruction cannot be empty")
    .max(255, "Instruction must not exceed 255 characters"),
  sideEffect: z
    .string()
    .min(1, "Side effect cannot be empty")
    .max(255, "Side effect must not exceed 255 characters"),
  price: z.number().min(1, "Price must be at least 1"),
});

const AddMedicinePage = () => {
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      typeId: 1,
      numberLeft: 1,
      numberPurchased: 0,
      instruction: "",
      sideEffect: "",
      price: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values);
    // Here, you could send the data to an API or perform a mutation.
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
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

        {/* Type ID Field */}
        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type ID</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter type ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Number Left Field */}
        <FormField
          control={form.control}
          name="numberLeft"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number Left</FormLabel>
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

        {/* Number Purchased Field */}
        <FormField
          control={form.control}
          name="numberPurchased"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number Purchased</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter purchased quantity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Instruction Field */}
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

        {/* Side Effect Field */}
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

        {/* Price Field */}
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add Medicine
        </Button>
      </form>
    </Form>
  );
};

export default AddMedicinePage;
