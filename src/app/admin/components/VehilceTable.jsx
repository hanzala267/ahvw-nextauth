import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function VehicleTable() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    try {
      const response = await fetch("/api/admin/vehicle/all");
      if (!response.ok) throw new Error("Failed to fetch vehicles");
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      toast.error("Failed to fetch vehicles");
    }
  }

  async function deleteVehicle(id) {
    try {
      const response = await fetch(`/api/admin/vehicle/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete vehicle");
      toast.success("Vehicle deleted successfully");
      fetchVehicles(); // Refresh the list after deletion
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Table>
      <TableCaption>A list of all vehicles</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Owner Name</TableHead>
          <TableHead>License Plate</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell>{vehicle.name}</TableCell>
            <TableCell>{vehicle.ownerName}</TableCell>
            <TableCell>{vehicle.licensePlate}</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                onClick={() => deleteVehicle(vehicle.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
