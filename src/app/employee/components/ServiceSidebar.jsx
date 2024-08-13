"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import useServiceStore from "@/stores/useServiceStore";

const ServiceSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  searchQuery,
  setSearchQuery,
}) => {
  const [services, setServices] = useState([]);
  const { selectedService, setSelectedService } = useServiceStore();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/employee/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside
      className={`fixed inset-0 z-40 flex-none w-64 bg-white border-r border-gray-200 p-4 shadow-md transition-transform transform md:relative md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="text-xl font-medium text-gray-900 mb-4">Services</h2>
      <Input
        type="text"
        placeholder="Search by license plate"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      <ul>
        {filteredServices.map((service) => (
          <li
            key={service.id}
            className={`p-2 cursor-pointer rounded-lg ${
              selectedService?.id === service.id
                ? "bg-primary text-white"
                : "hover:bg-primary/90 my-4 hover:text-white"
            }`}
            onClick={() => {
              setSelectedService(service);
              setSidebarOpen(false);
            }}
          >
            {service.vehicle.licensePlate} - {service.status}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ServiceSidebar;
