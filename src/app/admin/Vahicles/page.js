"use client";
import { useState } from "react";
// import Navbar from "@/app/Admin/components/Navbar";
import Navbar from "../components/Navbar";
import VahiclesDetails from "@/app/admin/components/VahiclesDetails";
import VehiclePast from "@/app/admin/components/VahiclesPast";
import VehicleUpcoming from "@/app/admin/components/VahiclesUpcoming";
import MenuIcon from "@/app/admin/components/MenuIcon";
import { Input } from "@/components/ui/input";
import { withRoleProtection } from "../../../components/withRoleProtection";

const vehicles = [
  { id: "cajd6hcx", name: "Vehicle 1" },
  { id: "dajd7hdy", name: "Vehicle 2" },
  { id: "eajd8hez", name: "Vehicle 3" },
  { id: "fajd9hfa", name: "Vehicle 4" },
];

const AdminVahicle = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  selectedVehicle.id === vehicle.id
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
          <VahiclesDetails vehicle={selectedVehicle} />
          <VehiclePast vehicle={selectedVehicle} />
          <VehicleUpcoming vehicle={selectedVehicle} />
        </main>
      </div>
    </>
  );
};

export default withRoleProtection(AdminVahicle, ["admin"]);
