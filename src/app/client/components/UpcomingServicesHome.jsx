import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpcomingServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/customer/home/upcoming-services");
        if (!response.ok) {
          throw new Error("Failed to fetch upcoming services");
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-3/4" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Skeleton className="h-10 w-1/3" />
        </CardFooter>
      </Card>
    );
  }

  if (error) return <div>Error loading upcoming services: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="my-6 text-xl">Closed Services</CardTitle>
        <CardDescription>
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="mb-2">
                <div>Service ID: {service.id}</div>
                <div>Vehicle: {service.vehicle.name}</div>
                <div>Status: {service.status}</div>
                <div className="my-4">
                  <hr />
                </div>
              </div>
            ))
          ) : (
            <div>No closed services</div>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
