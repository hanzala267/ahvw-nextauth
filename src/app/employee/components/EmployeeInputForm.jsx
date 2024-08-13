import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { z } from "zod";
import useEmployeeStore from "@/stores/employeeStore";

const hoursSchema = z.number().min(0).max(12);

const EmployeeInputForm = () => {
  const [hours, setHours] = useState("");
  const { setIsLoading, addWeeklyHours } = useEmployeeStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      hoursSchema.parse(Number(hours));
      setIsLoading(true);
      const response = await fetch("/api/employee/add-hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hours: Number(hours) }),
      });

      if (response.ok) {
        toast.success("Hours added successfully");
        setHours("");

        // Add the new hours to the chart instantly
        addWeeklyHours(Number(hours));
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to add hours");
      }
    } catch (error) {
      toast.error(error.message || "Invalid input");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Daily Work Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 w-full">
          <div className="grid gap-2">
            <Label htmlFor="hours">Hours (0-12)</Label>
            <Input
              id="hours"
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="e.g. 8"
              min="0"
              max="12"
              step="0.5"
              required
            />
          </div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployeeInputForm;
