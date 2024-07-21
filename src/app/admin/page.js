"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Calendar } from "@/components/ui/calendar";
import Lowstock from "@/app/admin/components/Lowstock";
import Todayservises from "@/app/admin/components/Todayservices";
import { withRoleProtection } from "../../components/withRoleProtection";
import { Skeleton } from "@/components/ui/skeleton";

function AdminDashboard() {
  const [date, setDate] = useState(new Date());
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/admin/services-by-date?date=${date.toISOString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, [date]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Services</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => setDate(newDate)}
            className="rounded-md border"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Low Part Stock</h2>
          <Lowstock />
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">
          Services for {date.toLocaleDateString()}
        </h2>
        {loading ? (
          <Skeleton className="h-48" />
        ) : (
          <Todayservises services={services} />
        )}
      </div>
    </>
  );
}

export default withRoleProtection(AdminDashboard, ["admin"]);
