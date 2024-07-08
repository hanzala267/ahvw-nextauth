"use client";

import { useState } from "react";
// import Navbar from "@/app/Admin/components/Navbar";
import Navbar from "./components/Navbar";
import { Calendar } from "@/components/ui/calendar";
import Lowstock from "@/app/admin/components/Lowstock";
import Todayservises from "@/app/admin/components/Todayservices";
import { withRoleProtection } from "../../components/withRoleProtection";

function AdminDashboard() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Services</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Low Part Stock</h2>
          <Lowstock />
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Today Services</h2>
        <Todayservises />
      </div>
    </>
  );
}

export default withRoleProtection(AdminDashboard, ["admin"]);
