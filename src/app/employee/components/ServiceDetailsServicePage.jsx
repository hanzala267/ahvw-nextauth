"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import useServiceStore from "@/stores/useServiceStore"; // Import the Zustand store

const ServiceDetails = ({ service }) => {
  const { data: session } = useSession();
  const [serviceHours, setServiceHours] = useState([]);
  const [newHours, setNewHours] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { hasAddedHours, setHasAddedHours, resetHasAddedHours } =
    useServiceStore(); // Use the Zustand store

  useEffect(() => {
    const fetchServiceHours = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/employee/service-hours/${service.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setServiceHours(data);
          if (data.length > 0) {
            setHasAddedHours(true); // Mark as added if service hours exist
          } else {
            resetHasAddedHours(); // Reset if no service hours exist
          }
        } else {
          console.error("Failed to fetch service hours");
          toast.error("Failed to fetch service hours");
        }
      } catch (error) {
        console.error("Error fetching service hours:", error);
        toast.error("Error fetching service hours");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceHours();
  }, [service.id, setHasAddedHours, resetHasAddedHours]);

  const handleAddServiceHours = async () => {
    try {
      const response = await fetch("/api/employee/service-hours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service.id,
          hours: parseFloat(newHours),
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setServiceHours([...serviceHours, data]);
        setNewHours(0);
        setHasAddedHours(true); // Update the store state
        toast.success("Service hours added successfully");
      } else {
        console.error("Failed to create service hours");
        toast.error("Failed to add service hours");
      }
    } catch (error) {
      console.error("Error creating service hours:", error);
      toast.error("Error adding service hours");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Service Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="license-plate" className="block font-medium">
            License Plate
          </label>
          <p>{service.vehicle.licensePlate}</p>
        </div>
        <div>
          <label htmlFor="status" className="block font-medium">
            Status
          </label>
          <p>{service.status}</p>
        </div>

        <div>
          <label htmlFor="service-hours" className="block font-medium">
            Service Hours
          </label>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <ul>
              {serviceHours.map((hour) => (
                <li key={hour.id}>
                  {hour.hours} hours by {hour.employee.firstName}{" "}
                  {hour.employee.lastName}
                </li>
              ))}
            </ul>
          )}
          {session?.user.role === "employee" && !hasAddedHours && (
            <div className="flex items-center space-x-2 mt-2">
              <Input
                type="number"
                value={newHours}
                onChange={(e) => setNewHours(e.target.value)}
                min={0}
                step={0.5}
                className="w-20"
              />
              <Button onClick={handleAddServiceHours}>Add Hours</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
