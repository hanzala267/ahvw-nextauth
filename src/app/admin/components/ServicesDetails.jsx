import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Trash2, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ServicesDetails = ({ onServiceSelect }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Booked");
  const [changingStatus, setChangingStatus] = useState({});
  const [deleting, setDeleting] = useState({});

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/services?status=${currentStatus}&search=${search}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch services");
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid data received from server");
      }
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [currentStatus, search]);

  const handleStatusChange = async (serviceId, newStatus) => {
    setChangingStatus((prev) => ({ ...prev, [serviceId]: true }));
    try {
      const res = await fetch(`/api/admin/services/${serviceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
      toast.success("Status updated successfully");
      fetchServices();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.message);
    } finally {
      setChangingStatus((prev) => ({ ...prev, [serviceId]: false }));
    }
  };

  const handleDeleteService = async (serviceId) => {
    setDeleting((prev) => ({ ...prev, [serviceId]: true }));
    try {
      const res = await fetch(`/api/admin/services/${serviceId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete service");
      }
      toast.success("Service deleted successfully");
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error(error.message);
    } finally {
      setDeleting((prev) => ({ ...prev, [serviceId]: false }));
    }
  };

  const ServiceCard = ({ service }) => (
    <Card className="my-3 p-3 hover:scale-105 transition ease-in-out">
      <Toaster position="top-right" reverseOrder={false} />

      <div>
        <div className="font-semibold">Service ID: {service.id}</div>
        <div className="font-mono">
          Vehicle: {service.vehicle?.licensePlate || "N/A"}
        </div>
        <div>Status: {service.status}</div>
        <Button
          variant="outline"
          className="my-1"
          onClick={() => onServiceSelect(service.id)}
        >
          View Invoice
        </Button>
        <Button
          variant="outline"
          className="my-1 ml-2"
          onClick={() =>
            handleStatusChange(
              service.id,
              service.status === "Booked" ? "Ongoing" : "Closed"
            )
          }
          disabled={changingStatus[service.id]}
        >
          {changingStatus[service.id] ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Change Status
        </Button>
        <Button
          variant="destructive"
          className="ml-2"
          onClick={() => handleDeleteService(service.id)}
          disabled={deleting[service.id]}
        >
          {deleting[service.id] ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Trash2 size={16} />
          )}
        </Button>
      </div>
    </Card>
  );

  const SkeletonCard = () => (
    <Card className="my-3 p-3">
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-1/4 mb-2" />
      <Skeleton className="h-8 w-1/3" />
    </Card>
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="Search services..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <Tabs
        defaultValue="Booked"
        className="w-full justify-center"
        onValueChange={setCurrentStatus}
      >
        <TabsList className="w-full">
          <TabsTrigger value="Booked">Booked</TabsTrigger>
          <TabsTrigger value="Ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="Closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value={currentStatus}>
          {loading ? (
            Array(3)
              .fill()
              .map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : services.length > 0 ? (
            services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <div>No services found.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesDetails;
