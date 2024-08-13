import React, { useEffect } from "react";
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
import useEmployeeStore from "@/stores/employeeStore";
import { Skeleton } from "@/components/ui/skeleton";

const EmployeeCharts = () => {
  const {
    weeklyData,
    monthlyData,
    isLoading,
    setWeeklyData,
    setMonthlyData,
    setIsLoading,
  } = useEmployeeStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [weeklyResponse, monthlyResponse] = await Promise.all([
          fetch("/api/employee/weekly-stats"),
          fetch("/api/employee/monthly-stats"),
        ]);
        const weeklyData = await weeklyResponse.json();
        const monthlyData = await monthlyResponse.json();
        setWeeklyData(weeklyData);
        setMonthlyData(monthlyData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium text-black">Your Stats</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-2 sm:p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-medium text-center mb-4 text-black">
            Weekly Spending Hours
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
          <h2 className="text-xl font-medium text-center mb-4 text-black">
            Monthly Spending Hours
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
