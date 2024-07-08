"use client";
import { useState } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Navbar from "@/app/admin/components/Navbar";
import { withRoleProtection } from "../../../components/withRoleProtection";

const customers = [
  {
    Company_Name: "AHLUWALIA FREIGHTLINES PTY LTD",
    Customer_Nickname: "AHLUWALIA",
    Status: "Closed",
    Type: "Customer",
    Postcode: "4040",
    Invoicing_Contact: "AHLUWALIA Chaudhary",
    Vehicle: "sdfsf6jh",
    Recent_Services: [
      { Service: "Oil Change", Date: "May 28, 2024" },
      { Service: "Tire Rotation", Date: "May 30, 2024" },
      { Service: "Oil Change ", Date: "June 30, 2024" },
      // Add more recent services if needed
    ],
  },
  {
    Company_Name: "ACE FREIGHTLINES PTY LTD",
    Customer_Nickname: "ACE",
    Status: "Active",
    Type: "Customer",
    Postcode: "3030",
    Invoicing_Contact: "Akash Chaudhary",
    Vehicle: "cajd6hcx",
    Recent_Services: [
      { Service: "Oil Change", Date: "May 24, 2024" },
      { Service: "Tire Rotation", Date: "May 15, 2024" },
      // Add more recent services if needed
    ],
  },
  {
    Company_Name: "AHLUWALIA FREIGHTLINES PTY LTD",
    Customer_Nickname: "AHLUWALIA",
    Status: "Closed",
    Type: "Customer",
    Postcode: "4040",
    Invoicing_Contact: "AHLUWALIA Chaudhary",
    Vehicle: "sdfsf6jh",
    Recent_Services: [
      { Service: "Oil Change", Date: "May 28, 2024" },
      { Service: "Tire Rotation", Date: "May 30, 2024" },
      { Service: "Oil Change ", Date: "June 30, 2024" },
      // Add more recent services if needed
    ],
  },
  {
    Company_Name: "ACE FREIGHTLINES PTY LTD",
    Customer_Nickname: "ACE",
    Status: "Active",
    Type: "Customer",
    Postcode: "3030",
    Invoicing_Contact: "Akash Chaudhary",
    Vehicle: "cajd6hcx",
    Recent_Services: [
      { Service: "Oil Change", Date: "May 24, 2024" },
      { Service: "Tire Rotation", Date: "May 15, 2024" },
      // Add more recent services if needed
    ],
  },
  {
    Company_Name: "AHLUWALIA FREIGHTLINES PTY LTD",
    Customer_Nickname: "AHLUWALIA",
    Status: "Closed",
    Type: "Customer",
    Postcode: "4040",
    Invoicing_Contact: "AHLUWALIA Chaudhary",
    Vehicle: "sdfsf6jh",
    Recent_Services: [
      { Service: "Oil Change", Date: "May 28, 2024" },
      { Service: "Tire Rotation", Date: "May 30, 2024" },
      { Service: "Oil Change ", Date: "June 30, 2024" },
      // Add more recent services if needed
    ],
  },
  {
    Company_Name: "ACE FREIGHTLINES PTY LTD",
    Customer_Nickname: "ACE",
    Status: "Active",
    Type: "Customer",
    Postcode: "3030",
    Invoicing_Contact: "Akash Chaudhary",
    Vehicle: "cajd6hcx",
    Recent_Services: [
      { Service: "Oil Change", Date: "May 24, 2024" },
      { Service: "Tire Rotation", Date: "May 15, 2024" },
      // Add more recent services if needed
    ],
  },
  // Add more customers if needed
];

function AdminCustomer() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3 md:p-10">
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-4 text-lg font-semibold">Recent Customers</div>
          <div className="space-y-2">
            {customers.map((customer, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                onClick={() => handleCustomerClick(customer)}
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>
                      {customer.Customer_Nickname.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{customer.Customer_Nickname}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-4 text-lg font-semibold">Details</div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  alt={selectedCustomer.Invoicing_Contact}
                  src="/placeholder-user.jpg"
                />
                <AvatarFallback>
                  {selectedCustomer.Customer_Nickname.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-lg font-semibold">
                  {selectedCustomer.Company_Name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedCustomer.Customer_Nickname}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedCustomer.Status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Type</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedCustomer.Type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Invoicing Contact</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedCustomer.Invoicing_Contact}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Vehicle</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedCustomer.Vehicle}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-4 text-lg font-semibold">Recent Services</div>
          <div className="space-y-2">
            {selectedCustomer.Recent_Services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:bg-gray-800 dark:focus:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      alt={service.Service}
                      src="/placeholder-user.jpg"
                    />
                    <AvatarFallback>
                      {service.Service.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span>{service.Service}</span>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {service.Date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default withRoleProtection(AdminCustomer, ["admin"]);
