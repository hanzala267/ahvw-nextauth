// File: app/customer/vehicle/page.js
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/client/components/Navbar";
import Notification from "@/app/client/components/Notification";
import VehicleDetails from "@/app/client/components/VahiclesDetails";
import VehiclePast from "@/app/client/components/VahiclesPast";
import VehicleUpcoming from "@/app/client/components/VahiclesUpcoming";
import MenuIcon from "@/app/client/components/MenuIcon";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { withRoleProtection } from "../../../components/withRoleProtection";

const CustomerVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("/api/customer/vehicle");
      if (!response.ok) {
        throw new Error("Failed to fetch vehicles");
      }
      const data = await response.json();
      setVehicles(data);
      if (data.length > 0) {
        setSelectedVehicle(data[0]);
      }
      const overdueNotifications = data
        .filter((vehicle) => vehicle.status === "overdue")
        .map((vehicle) => `${vehicle.name} has an overdue service.`);
      setNotifications(overdueNotifications);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setLoading(false);
    }
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col md:flex-row p-6">
          <Skeleton className="w-64 h-screen" />
          <div className="flex-1 space-y-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row">
        <aside
          className={`fixed inset-0 z-40 flex-none w-64 bg-white border-r border-gray-200 p-4 shadow-md transition-transform transform md:relative md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-xl font-medium text-gray-900 mb-4">Vehicles</h2>
          <Input
            type="text"
            placeholder="Search vehicles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          <ul>
            {filteredVehicles.map((vehicle) => (
              <li
                key={vehicle.id}
                className={`p-2 cursor-pointer rounded-lg ${
                  selectedVehicle?.id === vehicle.id
                    ? "bg-primary text-white"
                    : "hover:bg-primary/90 my-4 hover:text-white"
                }`}
                onClick={() => {
                  setSelectedVehicle(vehicle);
                  setSidebarOpen(false);
                }}
              >
                {vehicle.name}
              </li>
            ))}
          </ul>
        </aside>
        <div className="md:hidden p-4">
          <MenuIcon onClick={handleSidebarToggle} />
        </div>
        <main className="flex-1 p-6 bg-gray-50 space-y-6">
          <Notification className="" notifications={notifications} />
          {selectedVehicle && (
            <>
              <VehicleDetails vehicle={selectedVehicle} />
              <VehiclePast vehicleId={selectedVehicle.id} />
              <VehicleUpcoming vehicle={selectedVehicle} />
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default withRoleProtection(CustomerVehicle, ["customer"]);
