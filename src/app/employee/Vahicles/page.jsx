"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/employee/components/Navbar";
import VehicleDetails from "@/app/employee/components/VehicleDetails";
import VehiclePast from "@/app/employee/components/VehiclePast";
import VehicleUpcoming from "@/app/employee/components/VehicleUpcoming";
import MenuIcon from "@/app/employee/components/MenuIcon";
import { Input } from "@/components/ui/input";
import { withRoleProtection } from "../../../components/withRoleProtection";

const EmployeeVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/employee/vehicle/fetch");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicles(data);
        if (data.length > 0) {
          setSelectedVehicle(data[0]);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/employee/vehicle/fetch?search=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to search vehicles");
      }
      const data = await response.json();
      setVehicles(data);
      if (data.length > 0) {
        setSelectedVehicle(data[0]);
      } else {
        setSelectedVehicle(null);
      }
    } catch (error) {
      console.error("Error searching vehicles:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
          <div className="flex mb-4">
            <Input
              type="text"
              placeholder="Search vehicles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <button
              onClick={handleSearch}
              className="ml-2 px-4 py-2 bg-primary text-white rounded-md"
            >
              Search
            </button>
          </div>
          <ul>
            {vehicles.map((vehicle) => (
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
          {selectedVehicle ? (
            <>
              <VehicleDetails vehicle={selectedVehicle} />
              <VehiclePast vehicle={selectedVehicle} />
              <VehicleUpcoming vehicle={selectedVehicle} />
            </>
          ) : (
            <div>No vehicle selected</div>
          )}
        </main>
      </div>
    </>
  );
};

export default withRoleProtection(EmployeeVehicle, ["employee"]);
