import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VehicleDetails({ vehicle }) {
  if (!vehicle) {
    return <div>No details available for this vehicle.</div>;
  }

  const latestService = vehicle.services[0];

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Vehicle: {vehicle.name}</CardTitle>
        <CardDescription>License Plate: {vehicle.licensePlate}</CardDescription>
      </CardHeader>
      <CardContent>
        {latestService && (
          <>
            <CardTitle>
              Latest Service:{" "}
              {new Date(latestService.createdAt).toLocaleDateString()}
            </CardTitle>
            <Button size="sm" className="mt-3" variant="secondary">
              {latestService.status}
            </Button>
          </>
        )}
        {!latestService && <CardTitle>No services scheduled</CardTitle>}
      </CardContent>
    </Card>
  );
}
