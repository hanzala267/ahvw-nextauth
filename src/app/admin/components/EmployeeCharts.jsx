// File: app/admin/components/EmployeeCharts.js
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EmployeeCharts = ({ employeeId }) => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weeklyResponse, monthlyResponse] = await Promise.all([
          fetch(`/api/admin/employees/weekly-stats/${employeeId}`),
          fetch(`/api/admin/employees/monthly-stats/${employeeId}`),
        ]);

        if (weeklyResponse.ok && monthlyResponse.ok) {
          const weeklyData = await weeklyResponse.json();
          const monthlyData = await monthlyResponse.json();
          setWeeklyData(weeklyData);
          setMonthlyData(monthlyData);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (employeeId) {
      fetchData();
    }
  }, [employeeId]);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium text-black">
          Employee Working Hours
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-2 sm:p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-medium text-center mb-4 text-black">
            Weekly Working Hours
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#2F2F31" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-2 sm:p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-medium text-center mb-4 text-gray-800">
            Monthly Working Hours
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#2F2F31"
                fill="#F4F4F5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCharts;
