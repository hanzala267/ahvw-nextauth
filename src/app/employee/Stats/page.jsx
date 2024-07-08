"use client";
import { useState } from "react";
import EmployeeCharts from "@/app/employee/components/EmployeeCharts";
import EmployeeInputForm from "@/app/employee/components/EmployeeInputForm";
import Navbar from "@/app/employee/components/Navbar";
import { withRoleProtection } from "../../../components/withRoleProtection";

const initialWeeklyData = [
  { day: "Mon", hours: 6 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 8 },
  { day: "Fri", hours: 2 },
  { day: "Sat", hours: 7 },
  { day: "Sun", hours: 3 },
];

const initialMonthlyData = [
  { month: "Jan", hours: 35 },
  { month: "Feb", hours: 30 },
  { month: "Mar", hours: 35 },
  { month: "Apr", hours: 38 },
  { month: "May", hours: 40 },
  { month: "June", hours: 40 },
  { month: "July", hours: 30 },
  { month: "Aug", hours: 25 },
  { month: "Sept", hours: 26 },
  { month: "Oct", hours: 40 },
  { month: "Nov", hours: 30 },
  { month: "Dec", hours: 8 },
];

const EmployeeStats = () => {
  const [weeklyData, setWeeklyData] = useState(initialWeeklyData);
  const [monthlyData, setMonthlyData] = useState(initialMonthlyData);

  const updateWeeklyData = (newEntry) => {
    setWeeklyData((prevData) =>
      prevData.map((data) =>
        data.day === newEntry.day ? { ...data, hours: newEntry.hours } : data
      )
    );

    // For simplicity, we'll just update the monthly total based on weekly input
    const currentMonth = "June"; // Assume we're in June
    const totalHours = weeklyData.reduce(
      (total, entry) => total + entry.hours,
      0
    );

    setMonthlyData((prevData) =>
      prevData.map((data) =>
        data.month === currentMonth ? { ...data, hours: totalHours } : data
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50">
        <EmployeeInputForm onSubmit={updateWeeklyData} />
        <EmployeeCharts weeklyData={weeklyData} monthlyData={monthlyData} />
      </div>
    </>
  );
};

export default withRoleProtection(EmployeeStats, ["employee"]);
