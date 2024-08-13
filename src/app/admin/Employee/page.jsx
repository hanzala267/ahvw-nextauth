"use client";
import { useState, useEffect } from "react";
import { useEmployeeStore } from "@/stores/employee";
import EmployeeCharts from "@/app/admin/components/EmployeeCharts";
import EmployeeServices from "@/app/admin/components/EmployeeServices";
import Navbar from "@/app/admin/components/Navbar";
import MenuIcon from "@/app/admin/components/MenuIcon";
import { withRoleProtection } from "../../../components/withRoleProtection";

const AdminEmployee = () => {
  const { employees, selectedEmployee, setSelectedEmployee, fetchEmployees } =
    useEmployeeStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

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
                  selectedEmployee?.id === employee.id
                    ? "bg-primary text-white"
                    : "hover:bg-primary/90 my-4 hover:text-white"
                }`}
                onClick={() => {
                  setSelectedEmployee(employee);
                  setSidebarOpen(false);
                }}
              >
                {`${employee.firstName} ${employee.lastName}`}
              </li>
            ))}
          </ul>
        </aside>
        <div className="md:hidden p-4">
          <MenuIcon onClick={handleSidebarToggle} />
        </div>
        <main className="flex-1 p-6 bg-gray-50 space-y-6">
          {selectedEmployee && (
            <>
              <EmployeeCharts employeeId={selectedEmployee.id} />
              <EmployeeServices employeeId={selectedEmployee.id} />
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default withRoleProtection(AdminEmployee, ["admin"]);
