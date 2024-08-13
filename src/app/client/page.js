"use client";

import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import { withRoleProtection } from "../../components/withRoleProtection";
import { Skeleton } from "@/components/ui/skeleton";

const OngoingServices = lazy(() => import("./components/OngoingServicesHome"));
const UpcomingServices = lazy(() =>
  import("./components/UpcomingServicesHome")
);
const PendingInvoices = lazy(() => import("./components/PendingInvoicesHome"));

function SkeletonCard() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-20 w-full mb-2" />
      <Skeleton className="h-20 w-full mb-2" />
      <Skeleton className="h-20 w-full mb-2" />
      <Skeleton className="h-10 w-1/3 mt-4" />
    </div>
  );
}

function CustomerDashboard() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense fallback={<SkeletonCard />}>
            <OngoingServices />
          </Suspense>
          <Suspense fallback={<SkeletonCard />}>
            <UpcomingServices />
          </Suspense>
          <Suspense fallback={<SkeletonCard />}>
            <PendingInvoices />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default withRoleProtection(CustomerDashboard, ["customer"]);
