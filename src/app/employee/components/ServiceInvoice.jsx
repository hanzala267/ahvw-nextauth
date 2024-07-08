"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const ServiceInvoice = ({ service, setSelectedService }) => {
  const { name, parts, hours } = service;
  const [employeeName, setEmployeeName] = useState("");
  const [serviceHours, setServiceHours] = useState("");
  const [currentPart, setCurrentPart] = useState(null);

  const handleAddHours = () => {
    const newHours = {
      employeeName: employeeName,
      hours: Number(serviceHours),
      partName: currentPart.name,
    };
    const updatedHours = [...hours, newHours];
    setSelectedService({ ...service, hours: updatedHours });
    setEmployeeName("");
    setServiceHours("");
  };

  const openHoursDialog = (part) => {
    setCurrentPart(part);
  };

  return (
    <section className="grid md:grid-cols-1 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl">Service</h1>
          <div className="grid gap-2 text-sm leading-loose">
            <p>
              Thank you for your business with AHVW Service. Please find the
              details of your recent purchase below.
            </p>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="font-medium">Service:</span>
              <span>{name}</span>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h2 className="font-bold text-xl">Parts Purchased</h2>
            <div className="grid gap-2 border-t border-gray-200 pt-2 dark:border-gray-800">
              <div className="grid grid-cols-[1fr_80px_80px_80px_100px] items-center gap-4">
                <span className="font-medium">Part Name</span>
                <span className="font-medium text-right">Qty</span>
                <span className="font-medium text-right">Price</span>
                <span className="font-medium text-right">Tax</span>
                <span className="font-medium text-right">Actions</span>
              </div>
              {parts.map((part, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_80px_80px_80px_100px] items-center gap-4"
                >
                  <span>{part.name}</span>
                  <span className="text-right">{part.qty}</span>
                  <span className="text-right">xxxx</span>
                  <span className="text-right">xxxx</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => openHoursDialog(part)}>
                        Add Hours
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Add Service Hours for {currentPart?.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-2">
                        <Label htmlFor="employee-name">Employee Name</Label>
                        <Input
                          id="employee-name"
                          type="text"
                          value={employeeName}
                          onChange={(e) => setEmployeeName(e.target.value)}
                          placeholder="Employee Name"
                        />
                        <Label htmlFor="service-hours">Hours</Label>
                        <Input
                          id="service-hours"
                          type="number"
                          value={serviceHours}
                          onChange={(e) => setServiceHours(e.target.value)}
                          placeholder="Hours"
                        />
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddHours}>Add Hours</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <h2 className="font-bold text-xl">Service Hours</h2>
            <div className="grid gap-2 border-t border-gray-200 pt-2 dark:border-gray-800">
              <div className="grid grid-cols-[1fr_80px] items-center gap-4">
                <span className="font-medium">Employee</span>
                <span className="font-medium text-right">Hours</span>
              </div>
              {hours.map((hour, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_80px] items-center gap-4"
                >
                  <span>{hour.employeeName}</span>
                  <span className="text-right">{hour.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceInvoice;
