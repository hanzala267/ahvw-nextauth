"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import ServiceSidebar from "@/app/employee/components/ServiceSidebar";
import ServiceDetails from "@/app/employee/components/ServiceDetailsServicePage";
import MenuIcon from "@/app/employee/components/MenuIcon";
import { withRoleProtection } from "../../../components/withRoleProtection";
import { Toaster } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import useServiceStore from "@/stores/useServiceStore";

const EmployeeServices = () => {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedService, setSelectedService, resetHasAddedHours } =
    useServiceStore();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    resetHasAddedHours();
  };

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <Toaster position="top-right" reverseOrder={false} />
        <div className="min-h-screen flex flex-col md:flex-row">
          <Skeleton className="w-full md:w-1/4 h-64" />
          <div className="flex-1 p-6">
            <Skeleton className="h-12 mb-4" />
            <Skeleton className="h-40 mb-4" />
            <Skeleton className="h-40 mb-4" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen flex flex-col md:flex-row">
        <ServiceSidebar
          selectedService={selectedService}
          setSelectedService={handleServiceSelection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="md:hidden p-4">
          <MenuIcon onClick={handleSidebarToggle} />
        </div>
        <main className="flex-1 p-6 bg-gray-50 space-y-6">
          {selectedService ? (
            <ServiceDetails service={selectedService} />
          ) : (
            <div className="text-center text-gray-500">
              Select a service to view and update
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default withRoleProtection(EmployeeServices, ["employee"]);
