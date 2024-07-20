import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const ServiceInvoice = ({ serviceId }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (serviceId) {
      fetchInvoice(serviceId);
    }
  }, [serviceId]);

  const fetchInvoice = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/invoice/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch invoice");
      }
      const data = await res.json();
      setInvoice(data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendInvoice = async () => {
    setSending(true);
    try {
      const res = await fetch("/api/admin/sendInvoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceId: invoice.id }),
      });

      if (!res.ok) {
        throw new Error("Failed to send invoice");
      }

      toast.success("Invoice sent successfully");
    } catch (error) {
      console.error("Error sending invoice:", error);
      toast.error("Failed to send invoice");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/4 mb-2" />
        <Skeleton className="h-8 w-1/3" />
      </Card>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!invoice) {
    return <div>No invoice selected</div>;
  }

  const formatPrice = (price) => {
    return typeof price === "number" ? price.toFixed(2) : "0.00";
  };

  return (
    <section className="grid md:grid-cols-1 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:gap-10 items-start">
            <div className="grid gap-4">
              <div className="grid gap-2 text-sm leading-loose">
                <p>
                  Thank you for your business with AHVW Service. Please find the
                  details of your recent service below.
                </p>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <span className="font-medium">Invoice #:</span>
                  <span>{invoice.id || "N/A"}</span>
                  <span className="font-medium">Service ID:</span>
                  <span>{invoice.serviceId || "N/A"}</span>
                  <span className="font-medium">Date:</span>
                  <span>{new Date().toISOString().split("T")[0]}</span>
                  <span className="font-medium">Customer:</span>
                  <span>{`${invoice.service?.vehicle?.owner?.firstName || ""} ${
                    invoice.service?.vehicle?.owner?.lastName || ""
                  }`}</span>
                  <span className="font-medium">Email:</span>
                  <span>{invoice.service?.vehicle?.owner?.email || "N/A"}</span>
                  <span className="font-medium">Vehicle:</span>
                  <span>{invoice.service?.vehicle?.licensePlate || "N/A"}</span>
                  <span className="font-medium">Status:</span>
                  <span>{invoice.status || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <h2 className="font-bold text-xl">Service Items</h2>
                <div className="grid gap-2 border-t border-gray-200 pt-2 dark:border-gray-800">
                  <div className="grid grid-cols-[1fr_80px] items-center gap-4">
                    <span className="font-medium">Service</span>
                    <span className="font-medium text-right">Price</span>
                  </div>
                  {invoice.service?.serviceItems?.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[1fr_80px] items-center gap-4"
                    >
                      <span>{item.name || "Unknown Service"}</span>
                      <span className="text-right">
                        ${formatPrice(item.price)}
                      </span>
                    </div>
                  )) || <div>No service items</div>}
                </div>
              </div>

              <div className="grid gap-2">
                <h2 className="font-bold text-xl">Inventory Items</h2>
                <div className="grid gap-2 border-t border-gray-200 pt-2 dark:border-gray-800">
                  <div className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4">
                    <span className="font-medium">Part Name</span>
                    <span className="font-medium text-right">Quantity</span>
                    <span className="font-medium text-right">Unit Price</span>
                    <span className="font-medium text-right">Total Price</span>
                  </div>
                  {invoice.service?.inventoryItems?.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4"
                    >
                      <span>{item.inventory?.partName || "Unknown Part"}</span>
                      <span className="text-right">{item.quantity || 0}</span>
                      <span className="text-right">
                        ${formatPrice(item.inventory?.sellPrice)}
                      </span>
                      <span className="text-right">
                        $
                        {formatPrice(item.inventory?.sellPrice * item.quantity)}
                      </span>
                    </div>
                  )) || <div>No inventory items</div>}
                </div>
              </div>

              <div className="grid gap-2 border-t border-gray-200 pt-2 dark:border-gray-800">
                <div className="grid grid-cols-[1fr_80px] items-center gap-4">
                  <span className="font-medium">Total Amount</span>
                  <span className="text-right font-bold text-lg">
                    ${formatPrice(invoice.amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={sendInvoice} disabled={sending} className="w-full">
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Invoice"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ServiceInvoice;
