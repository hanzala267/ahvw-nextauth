import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Component() {
  const data = [
    {
      Vehicle: "1r9xrj3q",
      VIN: "6T9T25V9722AFA214",
      WS_Vehicle_Ref: "AMANAT7",
      status: "Available",
      Vehicle_Registration: "YV32OA",
      Customer: "Amanat Transport Pty Ltd",
      Service_Type: "A Service",
      Service_Schedule: {
        Schedule1: { Value: "04/01/2024" },
        Schedule2: { Value: "05/01/2024" },
        Schedule3: { Value: "06/01/2024" },
      },
      Next_Service_Date: "04/01/2024",
    },
  ];

  const vehicleData = data[0]; // Access the first object in the data array

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid">
          <CardTitle className="group flex items-center justify-center gap-2 text-xl">
            Vehicle Ref: {vehicleData.WS_Vehicle_Ref}
            <Button
              size="icon"
              variant="outdivne"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Badge
            variant={
              vehicleData.status === "Available" ? "default" : "secondary"
            }
          >
            {vehicleData.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Vehicle Details</div>
          <ul className="grid gap-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-semibold">VIN: </span>
              <span>{vehicleData.VIN}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-semibold">
                Vehicle Registration:
              </span>
              <span>{vehicleData.Vehicle_Registration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-semibold">
                Customer:
              </span>
              <span>{vehicleData.Customer}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-semibold">
                Service Type:
              </span>
              <span>{vehicleData.Service_Type}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-semibold">
                Next Service Date:
              </span>
              <span>{vehicleData.Next_Service_Date}</span>
            </div>
          </ul>
          <Separator className="my-2" />
          <div className="text-sm font-semibold">Next Booking Dates:</div>
          <div className="grid gap-3 grid-cols-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline">
                {vehicleData.Service_Schedule.Schedule1.Value}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="outline">
                {vehicleData.Service_Schedule.Schedule2.Value}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="outline">
                {vehicleData.Service_Schedule.Schedule3.Value}
              </Badge>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
      </CardContent>
    </Card>
  );
}
