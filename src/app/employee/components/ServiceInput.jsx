import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const serviceItemSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  price: z.string().min(1, "Price is required").transform(Number),
});

const serviceSchema = z.object({
  vehicleId: z.string().min(1, "Vehicle is required"),
  serviceItems: z
    .array(serviceItemSchema)
    .min(1, "At least one service item is required"),
  inventoryItems: z
    .array(
      z.object({
        id: z.string().min(1, "Inventory item is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "At least one inventory item is required"),
});

export default function ServiceInput() {
  const [vehicles, setVehicles] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      vehicleId: "",
      serviceItems: [{ name: "", price: "" }],
      inventoryItems: [{ id: "", quantity: 1 }],
    },
  });

  const {
    fields: serviceItemFields,
    append: appendServiceItem,
    remove: removeServiceItem,
  } = useFieldArray({
    control: form.control,
    name: "serviceItems",
  });

  const {
    fields: inventoryItemFields,
    append: appendInventoryItem,
    remove: removeInventoryItem,
  } = useFieldArray({
    control: form.control,
    name: "inventoryItems",
  });

  useEffect(() => {
    fetchVehicles();
    fetchInventoryItems();
  }, []);

  async function fetchVehicles() {
    try {
      const response = await fetch("/api/admin/vehicle/all");
      if (!response.ok) throw new Error("Failed to fetch vehicles");
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      toast.error("Failed to fetch vehicles");
      console.error("Error fetching vehicles:", error);
    }
  }

  async function fetchInventoryItems() {
    try {
      const response = await fetch("/api/employee/inventory/all");
      if (!response.ok) throw new Error("Failed to fetch inventory items");
      const data = await response.json();
      setInventoryItems(data);
    } catch (error) {
      toast.error("Failed to fetch inventory items");
      console.error("Error fetching inventory items:", error);
    }
  }

  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/employee/create-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create service");
      }

      toast.success("Service created successfully");
      form.reset();
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error.message);
      console.error("Error creating service:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="m-12">Create New Service</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create New Service</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a vehicle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem
                          key={vehicle.id}
                          value={vehicle.id.toString()}
                        >
                          {vehicle.name} - {vehicle.licensePlate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Service Items</FormLabel>
              {serviceItemFields.map((field, index) => (
                <div key={field.id} className="flex items-end space-x-2 mt-2">
                  <FormField
                    control={form.control}
                    name={`serviceItems.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input {...field} placeholder="Service name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`serviceItems.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="number" placeholder="Price" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeServiceItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => appendServiceItem({ name: "", price: "" })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Service Item
              </Button>
            </div>

            <div>
              <FormLabel>Inventory Items</FormLabel>
              {inventoryItemFields.map((field, index) => (
                <div key={field.id} className="flex items-end space-x-2 mt-2">
                  <FormField
                    control={form.control}
                    name={`inventoryItems.${index}.id`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an inventory item" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {inventoryItems.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                              >
                                {item.partName} - {item.brand}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`inventoryItems.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                            min={1}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeInventoryItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => appendInventoryItem({ id: "", quantity: 1 })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Inventory Item
              </Button>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Service"}
            </Button>
          </form>
        </Form>
      </DialogContent>
      <Toaster position="top-right" reverseOrder={false} />
    </Dialog>
  );
}
