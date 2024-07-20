"use client";

import { useState, useEffect } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/app/admin/components/Navbar";
import { withRoleProtection } from "../../../components/withRoleProtection";

function AdminCustomer() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/customer-page?search=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }
      const data = await response.json();
      setCustomers(data);
      if (data.length > 0 && !selectedCustomer) {
        setSelectedCustomer(data[0]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Failed to load customers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const CustomerListSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </>
  );

  const CustomerDetailsSkeleton = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );

  const RecentServicesSkeleton = () => (
    <>
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3 md:p-10">
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-4 text-lg font-semibold">All Customers</div>
          <Input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-4"
          />
          <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
            {loading ? (
              <CustomerListSkeleton />
            ) : customers.length === 0 ? (
              <div>No customers found</div>
            ) : (
              customers.map((customer) => (
                <div
                  key={customer.id}
                  className={`flex items-center justify-between rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:bg-gray-800 dark:focus:bg-gray-800 ${
                    selectedCustomer?.id === customer.id
                      ? "bg-gray-100 dark:bg-gray-800"
                      : ""
                  }`}
                  onClick={() => handleCustomerClick(customer)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={customer.image || "/placeholder-user.jpg"}
                      />
                      <AvatarFallback>
                        {customer.firstName
                          ? customer.firstName.slice(0, 1).toUpperCase()
                          : ""}
                        {customer.lastName
                          ? customer.lastName.slice(0, 1).toUpperCase()
                          : ""}
                      </AvatarFallback>
                    </Avatar>
                    <span>
                      {customer.firstName} {customer.lastName}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {selectedCustomer && (
          <>
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 text-lg font-semibold">Customer Details</div>
              {loading ? (
                <CustomerDetailsSkeleton />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        alt={`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}
                        src={selectedCustomer.image || "/placeholder-user.jpg"}
                      />
                      <AvatarFallback>
                        {selectedCustomer.firstName
                          ? selectedCustomer.firstName.slice(0, 1).toUpperCase()
                          : ""}
                        {selectedCustomer.lastName
                          ? selectedCustomer.lastName.slice(0, 1).toUpperCase()
                          : ""}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold">
                        {selectedCustomer.firstName} {selectedCustomer.lastName}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedCustomer.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedCustomer.isApproved ? "Approved" : "Pending"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Role</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedCustomer.role}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Vehicles</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedCustomer.vehicles.length}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 text-lg font-semibold">Recent Services</div>
              {loading ? (
                <RecentServicesSkeleton />
              ) : (
                <div className="space-y-2">
                  {selectedCustomer.vehicles
                    .flatMap((vehicle) =>
                      vehicle.services.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center justify-between rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage
                                alt={`Service ${service.id}`}
                                src="/placeholder-service.jpg"
                              />
                              <AvatarFallback>S{service.id}</AvatarFallback>
                            </Avatar>
                            <div>
                              <span>{`Service for ${vehicle.name}`}</span>
                              <p className="text-gray-500 dark:text-gray-400 text-xs">
                                {new Date(
                                  service.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )
                    .slice(0, 3)}
                  {selectedCustomer.vehicles.flatMap(
                    (vehicle) => vehicle.services
                  ).length === 0 && <div>No recent services</div>}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default withRoleProtection(AdminCustomer, ["admin"]);
