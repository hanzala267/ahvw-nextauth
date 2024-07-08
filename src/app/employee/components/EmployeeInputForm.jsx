import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EmployeeInputForm = ({ onSubmit }) => {
  const [day, setDay] = useState("");
  const [hours, setHours] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (day && hours) {
      onSubmit({ day, hours: Number(hours) });
      setDay("");
      setHours("");
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
            <Label htmlFor="day">Day</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  {day ? day : "Select a day"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-black shadow-lg">
                  {daysOfWeek.map((dayOfWeek) => (
                    <DropdownMenuItem
                      key={dayOfWeek}
                      onSelect={() => setDay(dayOfWeek)}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground"
                    >
                      {dayOfWeek}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hours">Hours</Label>
            <Input
              id="hours"
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="e.g. 8"
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
