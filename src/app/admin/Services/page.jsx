"use client";

import React, { useState } from "react";
import ServicesDetails from "@/app/admin/components/ServicesDetails";
import ServiceInvoice from "@/app/admin/components/ServiceInvoice";
import Navbar from "../components/Navbar";
import { withRoleProtection } from "../../../components/withRoleProtection";
import ServiceInput from "@/app/admin/components/ServiceInput";

function AdminServices() {
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  return (
    <>
      <Navbar />
      <ServiceInput />
      <div className="text-2xl font-semibold text-center mb-6">Services</div>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <div className="sm:col-span-1 mx-auto container justify-center">
          <ServicesDetails onServiceSelect={setSelectedServiceId} />
        </div>
        <div className="sm:col-span-2 mx-auto container justify-center">
          <ServiceInvoice serviceId={selectedServiceId} />
        </div>
      </div>
    </>
  );
}

export default withRoleProtection(AdminServices, ["admin"]);
