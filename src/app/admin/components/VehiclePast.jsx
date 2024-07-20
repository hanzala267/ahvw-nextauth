import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VehiclePast({ vehicle }) {
  const pastServices = vehicle.services.filter(
    (service) => service.status === "Closed"
  );

  if (pastServices.length === 0) {
    return <div>No past services available for this vehicle.</div>;
  }

  return (
    <>
      <div className="text-2xl font-semibold text-center mt-12 mb-6">
        Past Services
      </div>
      {pastServices.map((service, index) => (
        <Card key={index} className="my-4">
          <CardHeader>
            <CardTitle>Vehicle: {vehicle.name}</CardTitle>
            <CardDescription>
              License Plate: {vehicle.licensePlate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle>
              Service Date: {new Date(service.createdAt).toLocaleDateString()}
            </CardTitle>
            <Button size="default" className="mt-3 px-3" variant="destructive">
              {service.status}
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
