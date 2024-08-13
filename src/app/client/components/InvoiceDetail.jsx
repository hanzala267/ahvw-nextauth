import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function InvoiceDetail({ invoice }) {
  if (!invoice) {
    return <InvoiceDetailSkeleton />;
  }

  const isPaid = invoice.status === "paid";

  return (
    <section className="grid md:grid-cols-1 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl">Invoice</h1>
            <Badge
              className={
                isPaid ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }
              variant="default"
            >
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </Badge>
          </div>
          <div className="grid gap-2 text-sm leading-loose">
            <p>
              Thank you for your business with AHVW Service. Please find the
              details of your recent purchase below.
            </p>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="font-medium">Invoice #:</span>
              <span>{invoice.id}</span>
              <span className="font-medium">Date:</span>
              <span>{invoice.date}</span>
              <span className="font-medium">Client:</span>
              <span>{invoice.client}</span>
              <span className="font-medium">Address:</span>
              <span>{invoice.address}</span>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h2 className="font-bold text-xl">Parts Purchased</h2>
            <div className="grid gap-2 border-t border-gray-200 pt-2 dark:border-gray-800">
              <div className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4">
                <span className="font-medium">Part Name</span>
                <span className="font-medium text-right">Qty</span>
                <span className="font-medium text-right">Unit Price</span>
                <span className="font-medium text-right">Total Price</span>
              </div>
              {invoice.parts.map((part, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4"
                >
                  <span>{part.name}</span>
                  <span className="text-right">{part.qty}</span>
                  <span className="text-right">{part.price}</span>
                  <span className="text-right">
                    $
                    {(
                      part.qty * parseFloat(part.price.replace("$", ""))
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h2 className="font-bold text-xl">Service Details</h2>
          <div className="grid gap-2 text-sm leading-loose">
            <p>
              In addition to the parts purchased, your vehicle also received the
              following services:
            </p>
            {invoice.services.map((service, index) => (
              <div
                key={index}
                className="grid grid-cols-[100px_1fr_80px] gap-2"
              >
                <span className="font-medium">Service:</span>
                <span>{service.name}</span>
                <span className="text-right">{service.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-2 border-t border-gray-200 pt-2 dark:border-gray-800">
          <div className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4">
            <span className="font-medium">total</span>
            <span />
            <span className="text-right font-bold">{invoice.subtotal}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function InvoiceDetailSkeleton() {
  return (
    <div className="p-4">
      <Skeleton className="h-10 w-1/3 mb-4" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-10 w-1/4 mt-4" />
    </div>
  );
}
