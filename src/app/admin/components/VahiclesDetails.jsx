import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const vehicleDetailsData = [
  {
    Vehicle: "cajd6hcx",
    description: "YV98PN",
    Service_ID: "AMANAT-YN52RU-2023919_178",
    next_Service_Schedule: "20/11/2024",
    Status: "Active",
  },
  {
    Vehicle: "dajd7hdy",
    description: "YV99PN",
    Service_ID: "AMANAT-YN53RU-2023920_179",
    next_Service_Schedule: "21/11/2024",
    Status: "Active",
  },
  {
    Vehicle: "eajd8hez",
    description: "YV100PN",
    Service_ID: "AMANAT-YN54RU-2023921_180",
    next_Service_Schedule: "22/11/2024",
    Status: "Active",
  },
  {
    Vehicle: "fajd9hfa",
    description: "YV101PN",
    Service_ID: "AMANAT-YN55RU-2023922_181",
    next_Service_Schedule: "23/11/2024",
    Status: "Active",
  },
];

export default function VehicleDetails({ vehicle }) {
  const details = vehicleDetailsData.find(
    (detail) => detail.Vehicle === vehicle.id
  );

  if (!details) {
    return <div>No details available for this vehicle.</div>;
  }

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Vehicle: {details.Vehicle}</CardTitle>
        <CardDescription>{details.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardTitle>Next Service: {details.next_Service_Schedule}</CardTitle>
        <Button size="sm" className="mt-3" variant="secondary">
          {details.Status}
        </Button>
      </CardContent>
    </Card>
  );
}
