"use client";
import { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { withRoleProtection } from "../../../components/withRoleProtection";

function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch("/api/customer/invoices");
      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const renderInvoiceCard = (invoice) => (
    <Card key={invoice.id}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            {invoice.status === "paid" ? "Paid Invoice" : "Unpaid Invoice"}
          </CardTitle>
          <Badge
            className={
              invoice.status === "paid"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }
            variant="default"
          >
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </Badge>
        </div>
        <CardDescription>
          <div>Invoice ID: {invoice.id}</div>
          <div>Client: {invoice.client}</div>
          <div>Date: {invoice.date}</div>
          <div>Total: {invoice.total}</div>
        </CardDescription>
        <Button className="my-3" onClick={() => handleInvoiceClick(invoice)}>
          See Details
        </Button>
      </CardHeader>
    </Card>
  );

  const renderSkeletonCard = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/3 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-10 w-1/3 mt-3" />
      </CardHeader>
    </Card>
  );

  const paidInvoices = invoices.filter((invoice) => invoice.status === "paid");
  const unpaidInvoices = invoices.filter(
    (invoice) => invoice.status !== "paid"
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-2xl font-bold my-6 mx-auto text-center">
              Paid Invoices
            </div>
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index}>{renderSkeletonCard()}</div>
                  ))
              : paidInvoices.map(renderInvoiceCard)}
            {!loading && paidInvoices.length === 0 && (
              <p className="text-center text-gray-500">
                No paid invoices found.
              </p>
            )}
          </div>
          <div>
            <div className="text-2xl font-bold my-6 mx-auto text-center">
              Unpaid Invoices
            </div>
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index}>{renderSkeletonCard()}</div>
                  ))
              : unpaidInvoices.map(renderInvoiceCard)}
            {!loading && unpaidInvoices.length === 0 && (
              <p className="text-center text-gray-500">
                No unpaid invoices found.
              </p>
            )}
          </div>
        </div>
        {selectedInvoice && <InvoiceDetail invoice={selectedInvoice} />}
      </div>
    </div>
  );
}

export default withRoleProtection(InvoicesPage, ["customer"]);
