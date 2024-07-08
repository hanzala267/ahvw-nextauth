"use client";
import { useState } from "react";
import Navbar from "@/app/client/components/Navbar";
import InvoiceDetail from "@/app/client/components/InvoiceDetail";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { withRoleProtection } from "../../../components/withRoleProtection";

const paidInvoices = [
  {
    id: "INV-2023-05-25",
    date: "2023-05-25",
    client: "Jared Palmer",
    address: "123 Main St, Anytown USA",
    parts: [
      { name: "Brake Pads", qty: 2, price: "$49.99", tax: "$7.00" },
      { name: "Oil Filter", qty: 1, price: "$24.99", tax: "$1.75" },
      { name: "Air Filter", qty: 1, price: "$19.99", tax: "$0.00" },
    ],
    subtotal: "$94.97",
    tax: "$8.75",
    total: "$103.72",
    services: [{ name: "Oil Change", price: "$59.99" }],
    status: "paid",
  },
  // Add more paid invoices here
];

const unpaidInvoices = [
  {
    id: "INV-2023-06-25",
    date: "2023-06-25",
    client: "Alice Johnson",
    address: "456 Elm St, Anytown USA",
    parts: [
      { name: "Brake Pads", qty: 2, price: "$49.99", tax: "$7.00" },
      { name: "Oil Filter", qty: 1, price: "$24.99", tax: "$1.75" },
      { name: "Air Filter", qty: 1, price: "$19.99", tax: "$0.00" },
    ],
    subtotal: "$94.97",
    tax: "$8.75",
    total: "$103.72",
    services: [{ name: "Oil Change", price: "$59.99" }],
    status: "unpaid",
  },
  {
    id: "INV-2023-06-25",
    date: "2023-06-25",
    client: "Alice Johnson",
    address: "456 Elm St, Anytown USA",
    parts: [
      { name: "Brake Pads", qty: 2, price: "$49.99", tax: "$7.00" },
      { name: "Oil Filter", qty: 1, price: "$24.99", tax: "$1.75" },
      { name: "Air Filter", qty: 1, price: "$19.99", tax: "$0.00" },
    ],
    subtotal: "$94.97",
    tax: "$8.75",
    total: "$103.72",
    services: [{ name: "Oil Change", price: "$59.99" }],
    status: "unpaid",
  },
  // Add more unpaid invoices here
];

function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-2xl font-bold my-6 mx-auto text-center">
              Paid Invoices
            </div>
            {paidInvoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Paid Invoice</CardTitle>
                    <Badge
                      className="bg-green-500 text-white"
                      variant="default"
                    >
                      Paid
                    </Badge>
                  </div>
                  <CardDescription>
                    <div>Invoice ID: {invoice.id}</div>
                    <div>Client: {invoice.client}</div>
                    <div>Date: {invoice.date}</div>
                  </CardDescription>
                  <Button
                    className="my-3"
                    onClick={() => handleInvoiceClick(invoice)}
                  >
                    See Details
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div>
            <div className="text-2xl font-bold my-6 mx-auto text-center">
              Unpaid Invoices
            </div>
            {unpaidInvoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Unpaid Invoice</CardTitle>
                    <Badge className="bg-red-500 text-white" variant="default">
                      Unpaid
                    </Badge>
                  </div>
                  <CardDescription>
                    <div>Invoice ID: {invoice.id}</div>
                    <div>Client: {invoice.client}</div>
                    <div>Date: {invoice.date}</div>
                    <div>
                      Due Date: {new Date(invoice.date).toLocaleDateString()}
                    </div>
                  </CardDescription>
                  <Button
                    className="my-3"
                    onClick={() => handleInvoiceClick(invoice)}
                  >
                    See Details
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        {selectedInvoice && <InvoiceDetail invoice={selectedInvoice} />}
      </div>
    </div>
  );
}

export default withRoleProtection(InvoicesPage, ["customer"]);
