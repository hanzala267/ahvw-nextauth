"use client";

import React from "react";
import EmployeeCharts from "@/app/employee/components/EmployeeCharts";
import EmployeeInputForm from "@/app/employee/components/EmployeeInputForm";
import Navbar from "@/app/employee/components/Navbar";
import { withRoleProtection } from "../../../components/withRoleProtection";
import { Toaster } from "react-hot-toast";

const EmployeeStats = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50">
        <EmployeeInputForm />
        <EmployeeCharts />
      </div>
      <Toaster />
    </>
  );
};

export default withRoleProtection(EmployeeStats, ["employee"]);
