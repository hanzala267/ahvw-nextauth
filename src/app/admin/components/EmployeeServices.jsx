import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmployeeServices({ employeeId }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/admin/employees/services/${employeeId}`
        );
        if (response.ok) {
          const data = await response.json();
          setServices(data);
          console.log(data);
        } else {
          setError("Error fetching services");
        }
      } catch (error) {
        setError("Error fetching services");
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchServices();
    }
  }, [employeeId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Services</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="hidden md:grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
          <span>Client Name</span>
          <span>Service Name</span>
          <span>Invoice Number</span>
          <span>Hours</span>
        </div>
        {services.map((service, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
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
            <div className="font-medium">{service.hours} hours</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
