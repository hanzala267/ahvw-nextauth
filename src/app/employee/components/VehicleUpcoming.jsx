import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VehicleUpcoming({ vehicle }) {
  const upcomingServices = vehicle.services.filter(
    (service) => service.status === "Booked" || service.status === "Ongoing"
  );

  if (upcomingServices.length === 0) {
    return <div>No upcoming services available for this vehicle.</div>;
  }

  return (
    <>
      <div className="text-2xl font-semibold text-center mt-12 mb-6">
        Upcoming Services
      </div>
      {upcomingServices.map((service, index) => (
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
            <Button size="default" className="mt-3 px-3" variant="secondary">
              {service.status}
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
