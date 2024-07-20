"use client";

import React, { useState, useEffect } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";

const schema = z.object({
  partName: z.string().nonempty("Part Name is required"),
  brand: z.string().nonempty("Brand is required"),
  invoiceNumber: z.string().nonempty("Invoice Number is required"),
  costPrice: z.number().min(0, "Cost Price must be greater than or equal to 0"),
  sellPrice: z.number().min(0, "Sell Price must be greater than or equal to 0"),
  totalStock: z
    .number()
    .min(0, "Total Stock must be greater than or equal to 0"),
  partDescription: z.string().optional(),
});

function InventoryTable() {
  const [inventory, setInventory] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/inventory");
      if (!response.ok) throw new Error("Failed to fetch inventory");
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setError("Failed to load inventory. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    toast.loading("Deleting item...");
    try {
      const response = await fetch(`/api/admin/inventory/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");
      fetchInventory(); // Refresh the list after deletion
      toast.dismiss();
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to delete item. Please try again.");
      toast.dismiss();
      toast.error("Failed to delete item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFormErrors({});
    toast.loading(currentItem?.id ? "Updating item..." : "Adding item...");

    const formData = {
      partName: e.target.partName.value,
      brand: e.target.brand.value,
      invoiceNumber: e.target.invoiceNumber.value,
      costPrice: parseFloat(e.target.costPrice.value),
      sellPrice: parseFloat(e.target.sellPrice.value),
      totalStock: parseInt(e.target.totalStock.value),
      partDescription: e.target.partDescription.value,
    };

    try {
      schema.parse(formData);

      const method = currentItem?.id ? "PUT" : "POST";
      const url = currentItem?.id
        ? `/api/admin/inventory/${currentItem.id}`
        : "/api/admin/inventory";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save item");
      }

      setIsDialogOpen(false);
      fetchInventory(); // Refresh the list after adding/updating
      toast.dismiss();
      toast.success(
        currentItem?.id
          ? "Item updated successfully"
          : "Item added successfully"
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodErrors = {};
        error.errors.forEach((err) => {
          zodErrors[err.path[0]] = err.message;
        });
        setFormErrors(zodErrors);
      } else {
        console.error("Error saving item:", error);
        setError(error.message || "Failed to save item. Please try again.");
        toast.dismiss();
        toast.error("Failed to save item");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
          <CardDescription>Manage your inventory items.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleAdd} className="mb-4">
            <Plus className="mr-2 h-4 w-4" /> Add New Item
          </Button>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Part Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Sell Price</TableHead>
                <TableHead>Total Stock</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9}>
                    <Skeleton className="h-8" />
                  </TableCell>
                </TableRow>
              ) : (
                inventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.partName}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.invoiceNumber}</TableCell>
                    <TableCell>${item.costPrice.toFixed(2)}</TableCell>
                    <TableCell>${item.sellPrice.toFixed(2)}</TableCell>
                    <TableCell>{item.totalStock}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(item.updatedAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(item)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentItem ? "Edit Inventory Item" : "Add New Inventory Item"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="partName" className="text-right">
                  Part Name
                </Label>
                <Input
                  id="partName"
                  name="partName"
                  value={currentItem?.partName || ""}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, partName: e.target.value })
                  }
                  className="col-span-3"
                />
                {formErrors.partName && (
                  <p className="text-red-500 col-span-4">
                    {formErrors.partName}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="text-right">
                  Brand
                </Label>
                <Input
                  id="brand"
                  name="brand"
                  value={currentItem?.brand || ""}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, brand: e.target.value })
                  }
                  className="col-span-3"
                />
                {formErrors.brand && (
                  <p className="text-red-500 col-span-4">{formErrors.brand}</p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="invoiceNumber" className="text-right">
                  Invoice Number
                </Label>
                <Input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={currentItem?.invoiceNumber || ""}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      invoiceNumber: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
                {formErrors.invoiceNumber && (
                  <p className="text-red-500 col-span-4">
                    {formErrors.invoiceNumber}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="costPrice" className="text-right">
                  Cost Price
                </Label>
                <Input
                  id="costPrice"
                  name="costPrice"
                  type="number"
                  value={currentItem?.costPrice || ""}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      costPrice: parseFloat(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
                {formErrors.costPrice && (
                  <p className="text-red-500 col-span-4">
                    {formErrors.costPrice}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sellPrice" className="text-right">
                  Sell Price
                </Label>
                <Input
                  id="sellPrice"
                  name="sellPrice"
                  type="number"
                  value={currentItem?.sellPrice || ""}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      sellPrice: parseFloat(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
                {formErrors.sellPrice && (
                  <p className="text-red-500 col-span-4">
                    {formErrors.sellPrice}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalStock" className="text-right">
                  Total Stock
                </Label>
                <Input
                  id="totalStock"
                  name="totalStock"
                  type="number"
                  value={currentItem?.totalStock || ""}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      totalStock: parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
                {formErrors.totalStock && (
                  <p className="text-red-500 col-span-4">
                    {formErrors.totalStock}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="partDescription" className="text-right">
                  Part Description
                </Label>
                <Textarea
                  id="partDescription"
                  name="partDescription"
                  value={currentItem?.partDescription || ""}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      partDescription: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InventoryTable;
