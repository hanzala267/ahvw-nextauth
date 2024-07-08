"use client";
import { useState } from "react";
import EmployeeCharts from "@/app/admin/components/EmployeeCharts";
import EmployeeServices from "@/app/admin/components/EmployeeServices";
import Navbar from "@/app/admin/components/Navbar";
import MenuIcon from "@/app/admin/components/MenuIcon";
import { withRoleProtection } from "../../../components/withRoleProtection";

// Sample data for employees
const employees = [
  {
    id: 1,
    name: "Alice",
    weeklyData: [
      { day: "Mon", hours: 8 },
      { day: "Tue", hours: 7 },
      { day: "Wed", hours: 6 },
      { day: "Thu", hours: 5 },
      { day: "Fri", hours: 8 },
      { day: "Sat", hours: 4 },
      { day: "Sun", hours: 2 },
    ],
    monthlyData: [
      { month: "Jan", hours: 160 },
      { month: "Feb", hours: 140 },
      { month: "Mar", hours: 150 },
      { month: "Apr", hours: 170 },
      { month: "May", hours: 160 },
      { month: "June", hours: 150 },
      { month: "July", hours: 140 },
      { month: "Aug", hours: 160 },
      { month: "Sept", hours: 150 },
      { month: "Oct", hours: 170 },
      { month: "Nov", hours: 160 },
      { month: "Dec", hours: 170 },
    ],
    services: [
      {
        clientName: "John Doe",
        serviceName: "Oil Change",
        invoiceNumber: "12345",
        avatar: "/avatars/01.png",
      },
      {
        clientName: "Jane Smith",
        serviceName: "Tire Rotation",
        invoiceNumber: "12346",
        avatar: "/avatars/02.png",
      },
    ],
  },
  {
    id: 2,
    name: "Bob",
    weeklyData: [
      { day: "Mon", hours: 7 },
      { day: "Tue", hours: 6 },
      { day: "Wed", hours: 8 },
      { day: "Thu", hours: 7 },
      { day: "Fri", hours: 6 },
      { day: "Sat", hours: 5 },
      { day: "Sun", hours: 4 },
    ],
    monthlyData: [
      { month: "Jan", hours: 150 },
      { month: "Feb", hours: 130 },
      { month: "Mar", hours: 140 },
      { month: "Apr", hours: 160 },
      { month: "May", hours: 150 },
      { month: "June", hours: 140 },
      { month: "July", hours: 130 },
      { month: "Aug", hours: 150 },
      { month: "Sept", hours: 140 },
      { month: "Oct", hours: 160 },
      { month: "Nov", hours: 150 },
      { month: "Dec", hours: 160 },
    ],
    services: [
      {
        clientName: "Michael Brown",
        serviceName: "Battery Check",
        invoiceNumber: "12347",
        avatar: "/avatars/03.png",
      },
      {
        clientName: "Emily Davis",
        serviceName: "Brake Inspection",
        invoiceNumber: "12348",
        avatar: "/avatars/04.png",
      },
    ],
  },
  {
    id: 3,
    name: "Charlie",
    weeklyData: [
      { day: "Mon", hours: 6 },
      { day: "Tue", hours: 8 },
      { day: "Wed", hours: 7 },
      { day: "Thu", hours: 6 },
      { day: "Fri", hours: 8 },
      { day: "Sat", hours: 7 },
      { day: "Sun", hours: 5 },
    ],
    monthlyData: [
      { month: "Jan", hours: 140 },
      { month: "Feb", hours: 120 },
      { month: "Mar", hours: 130 },
      { month: "Apr", hours: 150 },
      { month: "May", hours: 140 },
      { month: "June", hours: 130 },
      { month: "July", hours: 120 },
      { month: "Aug", hours: 140 },
      { month: "Sept", hours: 130 },
      { month: "Oct", hours: 150 },
      { month: "Nov", hours: 140 },
      { month: "Dec", hours: 150 },
    ],
    services: [
      {
        clientName: "Olivia Wilson",
        serviceName: "AC Repair",
        invoiceNumber: "12349",
        avatar: "/avatars/05.png",
      },
      {
        clientName: "Liam Johnson",
        serviceName: "Transmission Service",
        invoiceNumber: "12350",
        avatar: "/avatars/06.png",
      },
    ],
  },
  {
    id: 4,
    name: "David",
    weeklyData: [
      { day: "Mon", hours: 8 },
      { day: "Tue", hours: 7 },
      { day: "Wed", hours: 5 },
      { day: "Thu", hours: 6 },
      { day: "Fri", hours: 7 },
      { day: "Sat", hours: 6 },
      { day: "Sun", hours: 4 },
    ],
    monthlyData: [
      { month: "Jan", hours: 160 },
      { month: "Feb", hours: 140 },
      { month: "Mar", hours: 150 },
      { month: "Apr", hours: 170 },
      { month: "May", hours: 160 },
      { month: "June", hours: 150 },
      { month: "July", hours: 140 },
      { month: "Aug", hours: 160 },
      { month: "Sept", hours: 150 },
      { month: "Oct", hours: 170 },
      { month: "Nov", hours: 160 },
      { month: "Dec", hours: 170 },
    ],
    services: [
      {
        clientName: "Emma Garcia",
        serviceName: "Engine Overhaul",
        invoiceNumber: "12351",
        avatar: "/avatars/07.png",
      },
      {
        clientName: "Noah Martinez",
        serviceName: "Wheel Alignment",
        invoiceNumber: "12352",
        avatar: "/avatars/08.png",
      },
    ],
  },
  {
    id: 5,
    name: "Eve",
    weeklyData: [
      { day: "Mon", hours: 6 },
      { day: "Tue", hours: 8 },
      { day: "Wed", hours: 7 },
      { day: "Thu", hours: 5 },
      { day: "Fri", hours: 6 },
      { day: "Sat", hours: 8 },
      { day: "Sun", hours: 4 },
    ],
    monthlyData: [
      { month: "Jan", hours: 140 },
      { month: "Feb", hours: 120 },
      { month: "Mar", hours: 130 },
      { month: "Apr", hours: 150 },
      { month: "May", hours: 140 },
      { month: "June", hours: 130 },
      { month: "July", hours: 120 },
      { month: "Aug", hours: 140 },
      { month: "Sept", hours: 130 },
      { month: "Oct", hours: 150 },
      { month: "Nov", hours: 140 },
      { month: "Dec", hours: 150 },
    ],
    services: [
      {
        clientName: "Ava Moore",
        serviceName: "Cooling System",
        invoiceNumber: "12353",
        avatar: "/avatars/09.png",
      },
      {
        clientName: "James Taylor",
        serviceName: "Exhaust Repair",
        invoiceNumber: "12354",
        avatar: "/avatars/10.png",
      },
    ],
  },
  {
    id: 6,
    name: "Frank",
    weeklyData: [
      { day: "Mon", hours: 9 },
      { day: "Tue", hours: 8 },
      { day: "Wed", hours: 7 },
      { day: "Thu", hours: 6 },
      { day: "Fri", hours: 8 },
      { day: "Sat", hours: 5 },
      { day: "Sun", hours: 3 },
    ],
    monthlyData: [
      { month: "Jan", hours: 170 },
      { month: "Feb", hours: 150 },
      { month: "Mar", hours: 160 },
      { month: "Apr", hours: 180 },
      { month: "May", hours: 170 },
      { month: "June", hours: 160 },
      { month: "July", hours: 150 },
      { month: "Aug", hours: 170 },
      { month: "Sept", hours: 160 },
      { month: "Oct", hours: 180 },
      { month: "Nov", hours: 170 },
      { month: "Dec", hours: 180 },
    ],
    services: [
      {
        clientName: "Lucas White",
        serviceName: "Suspension Repair",
        invoiceNumber: "12355",
        avatar: "/avatars/11.png",
      },
      {
        clientName: "Mia Thompson",
        serviceName: "Interior Detailing",
        invoiceNumber: "12356",
        avatar: "/avatars/12.png",
      },
    ],
  },
  {
    id: 7,
    name: "Grace",
    weeklyData: [
      { day: "Mon", hours: 7 },
      { day: "Tue", hours: 6 },
      { day: "Wed", hours: 8 },
      { day: "Thu", hours: 7 },
      { day: "Fri", hours: 6 },
      { day: "Sat", hours: 5 },
      { day: "Sun", hours: 4 },
    ],
    monthlyData: [
      { month: "Jan", hours: 150 },
      { month: "Feb", hours: 130 },
      { month: "Mar", hours: 140 },
      { month: "Apr", hours: 160 },
      { month: "May", hours: 150 },
      { month: "June", hours: 140 },
      { month: "July", hours: 130 },
      { month: "Aug", hours: 150 },
      { month: "Sept", hours: 140 },
      { month: "Oct", hours: 160 },
      { month: "Nov", hours: 150 },
      { month: "Dec", hours: 160 },
    ],
    services: [
      {
        clientName: "Sophia Harris",
        serviceName: "Glass Repair",
        invoiceNumber: "12357",
        avatar: "/avatars/13.png",
      },
      {
        clientName: "Jackson Lewis",
        serviceName: "Sound System Installation",
        invoiceNumber: "12358",
        avatar: "/avatars/14.png",
      },
    ],
  },
];

const AdminEmployee = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row">
        <aside
          className={`fixed inset-0 z-40 flex-none w-64 bg-white border-r border-gray-200 p-4 shadow-md transition-transform transform md:relative md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-xl font-medium text-gray-900 mb-4">Employees</h2>
          <ul>
            {employees.map((employee) => (
              <li
                key={employee.id}
                className={`p-2 cursor-pointer rounded-lg ${
                  selectedEmployee.id === employee.id
                    ? "bg-primary text-white"
                    : "hover:bg-primary/90 my-4 hover:text-white"
                }`}
                onClick={() => {
                  setSelectedEmployee(employee);
                  setSidebarOpen(false);
                }}
              >
                {employee.name}
              </li>
            ))}
          </ul>
        </aside>
        <div className="md:hidden p-4">
          <MenuIcon onClick={handleSidebarToggle} />
        </div>
        <main className="flex-1 p-6 bg-gray-50 space-y-6">
          <EmployeeCharts
            weeklyData={selectedEmployee.weeklyData}
            monthlyData={selectedEmployee.monthlyData}
          />
          <EmployeeServices services={selectedEmployee.services} />
        </main>
      </div>
    </>
  );
};

export default withRoleProtection(AdminEmployee, ["admin"]);
