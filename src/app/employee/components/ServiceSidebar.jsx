"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";

// Dummy data for services
const services = [
  {
    id: "1",
    name: "Brake Service",
    parts: [{ name: "Brake Pads", qty: 2, price: 49.99, tax: 7.0 }],
    hours: []
  },
  {
    id: "2",
    name: "Oil Change",
    parts: [{ name: "Oil Filter", qty: 1, price: 24.99, tax: 1.75 }],
    hours: []
  },
  {
    id: "3",
    name: "Air Filter Replacement",
    parts: [{ name: "Air Filter", qty: 1, price: 19.99, tax: 0.0 }],
    hours: []
  },
  // Add more services as needed
];

const ServiceSidebar = ({
  selectedService,
  setSelectedService,
  sidebarOpen,
  setSidebarOpen,
  searchQuery,
  setSearchQuery,
}) => {
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        placeholder="Search services"
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
            {service.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ServiceSidebar;
