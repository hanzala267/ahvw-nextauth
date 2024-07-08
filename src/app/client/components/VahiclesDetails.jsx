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
      </CardContent>
    </Card>
  );
}
