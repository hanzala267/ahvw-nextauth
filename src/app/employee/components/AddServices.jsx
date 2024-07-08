"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

export default function ServiceForm() {
  const [dateIn, setDateIn] = React.useState();
  const [dateOut, setDateOut] = React.useState();
  const [status, setStatus] = React.useState("ongoing");

  return (
    <div className="flex items-center justify-center min-h-[80vh] ">
      <Card className="w-full max-w-lg mx-4">
        <CardHeader>
          <CardTitle className="text-2xl">Add Service</CardTitle>
          <CardDescription>Enter service details below</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="service-id">Service ID</Label>
            <Input
              id="service-id"
              type="text"
              placeholder="AMANAT-YN52RU-2023919_178"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="vehicle">Vehicle</Label>
            <Input id="vehicle" type="text" placeholder="egg8nwh7" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date-in">Date In</Label>
            <DatePicker date={dateIn} setDate={setDateIn} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date-out">Date Out</Label>
            <DatePicker date={dateOut} setDate={setDateOut} />
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <ToggleGroup
              type="single"
              value={status}
              onValueChange={setStatus}
              variant="outline"
            >
              <ToggleGroupItem value="ongoing">Ongoing</ToggleGroupItem>
              <ToggleGroupItem value="booked">Booked</ToggleGroupItem>
              <ToggleGroupItem value="closed">Closed</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function DatePicker({ date, setDate }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
