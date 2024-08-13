import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function ClosedServices({ service }) {
  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>Closed Service</CardTitle>
        <CardDescription>
          <div>Service ID: {service.id}</div>
          <div>
            Vehicle: {service.vehicle.name} ({service.vehicle.licensePlate})
          </div>
          <div>Status: {service.status}</div>
          <div>
            Created At: {new Date(service.createdAt).toLocaleDateString()}
          </div>
          <div>
            Updated At: {new Date(service.updatedAt).toLocaleDateString()}
          </div>
          <div>Total Cost: ${service.totalCost.toFixed(2)}</div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
