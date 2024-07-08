"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServicesDetails = () => {
  const Services = [
    {
      Service_ID: "AMANAT-YV98PN-2023919_1031",
      Vehicle: "06luhq5j",
      VIN: "6HJVAWAUS9SE05712",
      WS_Vehicle_Ref: "AMANAT1",
      Vehicle_Registration: "YV98PN",
      Customer: "Amanat Transport Pty Ltd",
      Customer_Nickname: "AMANAT",
      Date_In: "19/09/2023",
      Date_Out: "19/09/2023",
      Status: "Booked",
      Service_Date: "19/09/2023",
      Service_KM: "",
      Service_Type: "A Service",
      Service_Schedule: "",
      Next_Service_Date: "18/12/2023",
      Next_Service_Type: "A Service",
    },
    {
      Service_ID: "AMANAT-YN52RU-2023919_178",
      Vehicle: "egg8nwh7",
      VIN: "6T9T25V9722AFA190",
      WS_Vehicle_Ref: "AMANAT2",
      Vehicle_Registration: "YN52RU",
      Customer: "Amanat Transport Pty Ltd",
      Customer_Nickname: "AMANAT",
      Date_In: "19/09/2023",
      Date_Out: "19/09/2023",
      Status: "Ongoing",
      Service_Date: "19/09/2023",
      Service_KM: "",
      Service_Type: "C Service",
      Service_Schedule: "",
      Next_Service_Date: "18/12/2023",
      Next_Service_Type: "A Service",
    },
    {
      Service_ID: "AMANAT-YQ14WC-2023107_178",
      Vehicle: "cajd6hcx",
      VIN: "6FH9079DB3M009379",
      WS_Vehicle_Ref: "AMANAT3",
      Vehicle_Registration: "YQ14WC",
      Customer: "Amanat Transport Pty Ltd",
      Customer_Nickname: "AMANAT",
      Date_In: "07/10/2023",
      Date_Out: "07/10/2023",
      Status: "Booked",
      Service_Date: "07/10/2023",
      Service_KM: "",
      Service_Type: "A Service",
      Service_Schedule: "",
      Next_Service_Date: "05/01/2024",
      Next_Service_Type: "A Service",
    },
    {
      Service_ID: "AMANAT-YV55GO-20231018_178",
      Vehicle: "9drcc36a",
      VIN: "6J6006636DA7W1115",
      WS_Vehicle_Ref: "AMANAT5",
      Vehicle_Registration: "YV55GO",
      Customer: "Amanat Transport Pty Ltd",
      Customer_Nickname: "AMANAT",
      Date_In: "18/10/2023",
      Date_Out: "18/10/2023",
      Status: "Closed",
      Service_Date: "18/10/2023",
      Service_KM: "",
      Service_Type: "A Service",
      Service_Schedule: "",
      Next_Service_Date: "16/01/2024",
      Next_Service_Type: "A Service",
    },
    {
      Service_ID: "AMANAT-YV56GO-20231018_178",
      Vehicle: "fa1anpoh",
      VIN: "6B90428001WAA6943",
      WS_Vehicle_Ref: "AMANAT6",
      Vehicle_Registration: "YV56GO",
      Customer: "Amanat Transport Pty Ltd",
      Customer_Nickname: "AMANAT",
      Date_In: "18/10/2023",
      Date_Out: "18/10/2023",
      Status: "Booked",
      Service_Date: "18/10/2023",
      Service_KM: "",
      Service_Type: "A Service",
      Service_Schedule: "",
      Next_Service_Date: "16/01/2024",
      Next_Service_Type: "A Service",
    },
    {
      Service_ID: "AMANAT-YV32OA-2023107_178",
      Vehicle: "1r9xrj3q",
      VIN: "6T9T25V9722AFA214",
      WS_Vehicle_Ref: "AMANAT7",
      Vehicle_Registration: "YV32OA",
      Customer: "Amanat Transport Pty Ltd",
      Customer_Nickname: "AMANAT",
      Date_In: "07/10/2023",
      Date_Out: "07/10/2023",
      Status: "Closed",
      Service_Date: "07/10/2023",
      Service_KM: "",
      Service_Type: "A Service",
      Service_Schedule: "",
      Next_Service_Date: "05/01/2024",
      Next_Service_Type: "A Service",
    },
  ];

  const [selectedService, setSelectedService] = useState(null);

  const handleDialogOpen = (service) => {
    setSelectedService(service);
  };

  const handleCloseDialog = () => {
    setSelectedService(null);
  };

  return (
    <div>
      <Tabs defaultValue="Booked" className="w-full justify-center">
        <TabsList className="w-full">
          <TabsTrigger value="Booked">Booked</TabsTrigger>
          <TabsTrigger value="Ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="Closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value="Booked">
          {Services.map((service) => {
            if (service.Status === "Booked") {
              return (
                <Card
                  key={service.Service_ID}
                  className="my-3 p-3 hover:scale-105 transition ease-in-out"
                >
                  <div>
                    <div className="font-semibold">{service.Service_ID}</div>
                    <div className="font-mono">{service.Vehicle}</div>
                    <div>Date In: {service.Date_In}</div>
                    <div>Date Out: {service.Date_Out}</div>
                    <Dialog>
                      <DialogTrigger onClick={() => handleDialogOpen(service)}>
                        <Button variant="outline" className="my-1">
                          Change Status
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>Status change</DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              );
            }
            return null;
          })}
        </TabsContent>

        <TabsContent value="Ongoing">
          {Services.map((service) => {
            if (service.Status === "Ongoing") {
              return (
                <Card
                  key={service.Service_ID}
                  className="my-3 p-3 hover:scale-105 transition ease-in-out"
                >
                  <div>
                    <div className="font-semibold">{service.Service_ID}</div>
                    <div className="font-mono">{service.Vehicle}</div>
                    <div>{service.Date_In}</div>
                    <div>{service.Date_Out}</div>
                    <Dialog>
                      <DialogTrigger onClick={() => handleDialogOpen(service)}>
                        <Button variant="outline" className="my-1">
                          Change Status
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>Status change</DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              );
            }
            return null;
          })}
        </TabsContent>

        <TabsContent value="Closed">
          {Services.map((service) => {
            if (service.Status === "Closed") {
              return (
                <Card
                  key={service.Service_ID}
                  className="my-3 p-3 hover:scale-105 transition ease-in-out"
                >
                  <div>
                    <div className="font-semibold">{service.Service_ID}</div>
                    <div className="font-mono">{service.Vehicle}</div>
                    <div>{service.Date_In}</div>
                    <div>{service.Date_Out}</div>
                    <Dialog>
                      <DialogTrigger onClick={() => handleDialogOpen(service)}>
                        <Button variant="outline" className="my-1">
                          Change Status
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>Status change</DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              );
            }
            return null;
          })}
        </TabsContent>
      </Tabs>
      <Dialog isOpen={selectedService !== null} onDismiss={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Status</DialogTitle>
            <DialogDescription>
              Change the status of the service
            </DialogDescription>
          </DialogHeader>
          <select>
            <option value="Booked">Booked</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Closed">Closed</option>
          </select>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesDetails;
