"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/client/components/Navbar";
import OngoingServices from "@/app/client/components/OngoingService";
import UpcomingServices from "@/app/client/components/UpcomingService";
import ClosedServices from "@/app/client/components/ClosedServices";
import { withRoleProtection } from "@/components/withRoleProtection";
import { Toaster } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/customer/services");
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      const data = await response.json();
      console.log("Fetched services:", data); // Add this line for debugging
      setServices(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to fetch services");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const ongoingServices = services.filter(
    (service) => service.status === "Ongoing"
  );
  const upcomingServices = services.filter(
    (service) => service.status === "Booked"
  );
  const closedServices = services.filter(
    (service) => service.status === "Closed"
  );

  const ServicesSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <div className="text-2xl font-bold my-6 mx-auto text-center">
              Booked Services
            </div>
            {loading ? (
              <ServicesSkeleton />
            ) : error ? (
              <p>{error}</p>
            ) : upcomingServices.length > 0 ? (
              upcomingServices.map((service) => (
                <UpcomingServices key={service.id} service={service} />
              ))
            ) : (
              <p>No Booked services</p>
            )}
          </div>
          <div>
            <div className="text-2xl font-bold my-6 mx-auto text-center">
              Ongoing Services
            </div>
            {loading ? (
              <ServicesSkeleton />
            ) : error ? (
              <p>{error}</p>
            ) : ongoingServices.length > 0 ? (
              ongoingServices.map((service) => (
                <OngoingServices key={service.id} service={service} />
              ))
            ) : (
              <p>No ongoing services</p>
            )}
          </div>
          <div>
            <div className="text-2xl font-bold my-6 mx-auto text-center">
              Closed Services
            </div>
            {loading ? (
              <ServicesSkeleton />
            ) : error ? (
              <p>{error}</p>
            ) : closedServices.length > 0 ? (
              closedServices.map((service) => (
                <ClosedServices key={service.id} service={service} />
              ))
            ) : (
              <p>No closed services</p>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default withRoleProtection(ServicesPage, ["customer"]);
