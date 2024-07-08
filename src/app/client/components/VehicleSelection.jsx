"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const VehicleSelection = ({ vehicles }) => {
  const [search, setSearch] = useState("");

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="my-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 my-4">
        <CardTitle className="flex font-bold text-lg">Vehicles</CardTitle>
      </CardHeader>
      <Separator className="mb-6 mt-2" />
      <CardContent>
        <Input
          type="text"
          placeholder="Search for a vehicle"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="mt-4">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="text-md font-medium mb-4">
              <span className="font-bold">Vehicle Name:</span>
              <Badge variant="default" className={"rounded-3xl ml-2"}>
                {vehicle.name}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleSelection;
