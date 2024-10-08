"use client";

import React from "react";
import ServicesDetails from "@/app/employee/components/ServicesDetails";
import ServiceInput from "@/app/employee/components/ServiceInput";
import Navbar from "./components/Navbar";
import { withRoleProtection } from "../../components/withRoleProtection";

function EmployeeDashboard() {
  return (
    <>
      <Navbar />
      <ServiceInput />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Services</h1>
        <ServicesDetails />
      </div>
    </>
  );
}

export default withRoleProtection(EmployeeDashboard, ["employee"]);
