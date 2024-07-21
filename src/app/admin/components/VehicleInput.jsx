import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"; // Import useRouter

const vehicleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  ownerId: z.string().min(1, "Owner must be selected"),
  licensePlate: z
    .string()
    .min(2, "License plate must be at least 2 characters"),
});

export default function VehicleInput() {
  const [customers, setCustomers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage form submission
  const router = useRouter(); // Initialize router

  const form = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: "",
      ownerId: "",
      licensePlate: "",
    },
  });

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch("/api/admin/customers");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        toast.error("Failed to fetch customers");
      }
    }
    fetchCustomers();
  }, []);

  async function onSubmit(values) {
    setIsSubmitting(true); // Set submitting state to true
    try {
      const response = await fetch("/api/admin/vehicle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to create vehicle");

      toast.success("Vehicle created successfully");
      form.reset();
      setIsOpen(false);
      router.replace(router.asPath); // Revalidate the path
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create New Vehicle</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Vehicle</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter vehicle name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ownerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an owner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.firstName} {customer.lastName}
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
              name="licensePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Plate</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter license plate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Vehicle"}
            </Button>
          </form>
        </Form>
      </DialogContent>
      <Toaster position="top-right" reverseOrder={false} />
    </Dialog>
  );
}
