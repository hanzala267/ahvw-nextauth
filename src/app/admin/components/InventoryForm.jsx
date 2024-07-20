import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

// Zod schema defined inside the component
const inventorySchema = z.object({
  partName: z.string().min(1, { message: "Part name is required" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  invoiceNumber: z.string().min(1, { message: "Invoice number is required" }),
  costPrice: z
    .number()
    .positive({ message: "Cost price must be a positive number" }),
  sellPrice: z
    .number()
    .positive({ message: "Sell price must be a positive number" }),
  totalStock: z
    .number()
    .int()
    .nonnegative({ message: "Total stock must be a non-negative integer" }),
  partDescription: z
    .string()
    .min(1, { message: "Part description is required" }),
});

export default function InventoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(inventorySchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          throw new Error("You must be logged in to add inventory");
        } else if (response.status === 403) {
          throw new Error("You do not have permission to add inventory");
        } else {
          throw new Error(errorData.error || "Failed to add inventory");
        }
      }

      toast.success("Inventory item added successfully!");
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error adding inventory:", error);
      toast.error(error.message || "Failed to add inventory");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <Card>
        <CardHeader>
          <CardTitle>Add Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="partName">Part Name</Label>
              <Input id="partName" {...register("partName")} />
              {errors.partName && (
                <p className="text-red-500">{errors.partName.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" {...register("brand")} />
              {errors.brand && (
                <p className="text-red-500">{errors.brand.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input id="invoiceNumber" {...register("invoiceNumber")} />
              {errors.invoiceNumber && (
                <p className="text-red-500">{errors.invoiceNumber.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="costPrice">Cost Price</Label>
                <Input
                  id="costPrice"
                  type="number"
                  step="0.01"
                  {...register("costPrice", { valueAsNumber: true })}
                />
                {errors.costPrice && (
                  <p className="text-red-500">{errors.costPrice.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sellPrice">Sell Price</Label>
                <Input
                  id="sellPrice"
                  type="number"
                  step="0.01"
                  {...register("sellPrice", { valueAsNumber: true })}
                />
                {errors.sellPrice && (
                  <p className="text-red-500">{errors.sellPrice.message}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalStock">Total Stock</Label>
              <Input
                id="totalStock"
                type="number"
                {...register("totalStock", { valueAsNumber: true })}
              />
              {errors.totalStock && (
                <p className="text-red-500">{errors.totalStock.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="partDescription">Part Description</Label>
              <Textarea id="partDescription" {...register("partDescription")} />
              {errors.partDescription && (
                <p className="text-red-500">{errors.partDescription.message}</p>
              )}
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add to Inventory"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
