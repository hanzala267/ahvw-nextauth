"use client";

import React from "react";
import ServicesDetails from "@/app/admin/components/ServicesDetails";
import ServiceInvoice from "@/app/admin/components/ServiceInvoice";
import Navbar from "../components/Navbar";
import { withRoleProtection } from "../../../components/withRoleProtection";
import ServiceInput from "@/app/admin/components/ServiceInput";
import useInvoiceStore from "@/app/stores/invoiceStore";

function AdminServices() {
  const { selectedInvoice, setSelectedInvoice } = useInvoiceStore();

  const handleServiceSelect = (serviceId) => {
    setSelectedInvoice(null); // Clear the current selection
    // Fetch the new invoice data
    fetch(`/api/admin/invoice/${serviceId}`)
      .then((res) => res.json())
      .then((data) => setSelectedInvoice(data))
      .catch((error) => console.error("Error fetching invoice:", error));
  };

  return (
    <>
      <Navbar />
      <ServiceInput />
      <div className="text-2xl font-semibold text-center mb-6">Services</div>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <div className="sm:col-span-1 mx-auto container justify-center">
          <ServicesDetails onServiceSelect={handleServiceSelect} />
        </div>
        <div className="sm:col-span-2 mx-auto container justify-center">
          <ServiceInvoice serviceId={selectedInvoice?.serviceId} />
        </div>
      </div>
    </>
  );
}

export default withRoleProtection(AdminServices, ["admin"]);
