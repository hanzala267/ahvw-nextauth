import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VehicleDetails({ vehicle }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Vehicle Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div>ID: {vehicle.id}</div>
        <div>Name: {vehicle.name}</div>
        <div>License Plate: {vehicle.licensePlate}</div>
        <div>
          Last Service Date:{" "}
          {vehicle.lastServiceDate
            ? new Date(vehicle.lastServiceDate).toLocaleDateString()
            : "N/A"}
        </div>
        <div>
          Next Service Date:{" "}
          {new Date(vehicle.nextServiceDate).toLocaleDateString()}
        </div>
        <div>
          Status:{" "}
          {vehicle.status === "overdue" ? "Service Overdue" : "Up to date"}
        </div>
      </CardContent>
    </Card>
  );
}
