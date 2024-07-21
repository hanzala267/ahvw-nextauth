import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Todayservises({ services }) {
  return (
    <Card className="sm:hover:scale-105 transition ease-in-out duration-200">
      <CardHeader>
        <CardTitle>Services</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {services.map((service, index) => (
          <div key={service.id} className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage
                src={`/avatars/${(index % 5) + 1}.png`}
                alt="Avatar"
              />
              <AvatarFallback>
                {service.vehicle?.owner?.firstName?.slice(0, 1) || "U"}
                {service.vehicle?.owner?.lastName?.slice(0, 1) || "N"}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {service.vehicle?.owner?.firstName || "Unknown"}{" "}
                {service.vehicle?.owner?.lastName || "Owner"}
              </p>
              <p className="text-sm text-muted-foreground">
                {service.vehicle?.licensePlate || "No plate"}
              </p>
            </div>
            <div className="ml-auto font-medium">
              <Badge
                variant={
                  service.status === "Completed" ? "default" : "secondary"
                }
              >
                {service.status}
              </Badge>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <p className="text-center text-muted-foreground">
            No services for this date.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
