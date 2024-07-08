import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmployeeServices({ services }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Services</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="hidden md:grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
          <span>Client Name</span>
          <span>Service Name</span>
          <span>Invoice Number</span>
        </div>
        {services.map((service, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={service.avatar} alt="Avatar" />
                <AvatarFallback>{service.clientName[0]}</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium leading-none">
                {service.clientName}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {service.serviceName}
            </p>
            <div className="font-medium">{service.invoiceNumber}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
