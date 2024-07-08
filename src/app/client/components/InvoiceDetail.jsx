import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function InvoiceDetail({ invoice }) {
  const isPaid = invoice.status === "paid"; // Assuming there's a 'status' field in the invoice object

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
              {isPaid ? "Paid" : "Unpaid"}
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
                <span className="font-medium text-right">Price</span>
                <span className="font-medium text-right">Tax</span>
              </div>
              {invoice.parts.map((part, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4"
                >
                  <span>{part.name}</span>
                  <span className="text-right">{part.qty}</span>
                  <span className="text-right">{part.price}</span>
                  <span className="text-right">{part.tax}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-2 border-t border-gray-200 pt-2 dark:border-gray-800">
            <div className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4">
              <span className="font-medium">Subtotal</span>
              <span />
              <span className="text-right">{invoice.subtotal}</span>
              <span className="text-right">{invoice.tax}</span>
            </div>
            <div className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4">
              <span className="font-medium">Total</span>
              <span />
              <span className="text-right font-bold text-lg">
                {invoice.total}
              </span>
              <span />
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
            <div className="grid grid-cols-[100px_1fr_80px] gap-2">
              <span className="font-medium">Parts:</span>
              <span>{invoice.subtotal}</span>
              <span className="text-right">{invoice.tax}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr_80px] gap-2">
              <span className="font-medium">Total:</span>
              <span className="font-bold">{invoice.total}</span>
              <span />
            </div>
          </div>
        </div>
        <Button className="w-full" size="lg">
          Send Invoice
        </Button>
      </div>
    </section>
  );
}
