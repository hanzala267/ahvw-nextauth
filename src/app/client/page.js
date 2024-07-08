"use client";

// import Navbar from "@/app/Client/components/Navbar";
import Navbar from "./components/Navbar";
import OngoingServices from "@/app/client/components/OngoingServicesHome";
import UpcomingServices from "@/app/client/components/UpcomingServicesHome";
import PendingInvoices from "@/app/client/components/PendingInvoicesHome";
import { withRoleProtection } from "../../components/withRoleProtection";

function CustomerDashboard() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">OngoingServices</h2>
            <OngoingServices />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">UpcomingServices</h2>
            <UpcomingServices />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Pending Invoices</h2>
            <PendingInvoices />
          </div>
        </div>
      </div>
    </>
  );
}

export default withRoleProtection(CustomerDashboard, ["customer"]);
