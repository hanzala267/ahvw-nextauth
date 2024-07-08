import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function Component() {
  const data = [
    {
      WS_Vehicle_Ref: "AMANAT1",
      Vehicle_Registration: "YV98PN",
      Customer: "Amanat Transport Pty Ltd",
      Status: "Closed",
    },
    {
      WS_Vehicle_Ref: "AMANAT1",
      Vehicle_Registration: "YV98PN",
      Customer: "Amanat Transport Pty Ltd",
      Status: "Open",
    },
    {
      WS_Vehicle_Ref: "AMANAT1",
      Vehicle_Registration: "YV98PN",
      Customer: "Amanat Transport Pty Ltd",
      Status: "Open",
    },
    {
      WS_Vehicle_Ref: "AMANAT1",
      Vehicle_Registration: "YV98PN",
      Customer: "Amanat Transport Pty Ltd",
      Status: "Closed",
    },
    {
      WS_Vehicle_Ref: "AMANAT1",
      Vehicle_Registration: "YV98PN",
      Customer: "Amanat Transport Pty Ltd",
      Status: "Closed",
    },
  ];

  return (
    <Card className=" sm:hover:scale-105 transition ease-in-out duration-200">
      <CardHeader>
        <CardTitle> Today Services</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
              <AvatarFallback>
                {item.Customer.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {item.Customer}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.Vehicle_Registration}
              </p>
            </div>
            <div className="ml-auto font-medium ">
              <Badge
                variant={item.Status === "Closed" ? "default" : "secondary"}
              >
                {item.Status}
              </Badge>
            </div>{" "}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
