import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <section className="grid md:grid-cols-1 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl">Invoice</h1>
          <div className="grid gap-2 text-sm leading-loose">
            <p>
              Thank you for your business with AHVW Service. Please find the
              details of your recent purchase below.
            </p>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="font-medium">Invoice #:</span>
              <span>INV-2023-05-25</span>
              <span className="font-medium">Date:</span>
              <span>2023-05-25</span>
              <span className="font-medium">Client:</span>
              <span>Jared Palmer</span>
              <span className="font-medium">Address:</span>
              <span>123 Main St, Anytown USA</span>
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
              <div className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4">
                <span>Brake Pads</span>
                <span className="text-right">2</span>
                <span className="text-right">$49.99</span>
                <span className="text-right">$7.00</span>
              </div>
              <div className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4">
                <span>Oil Filter</span>
                <span className="text-right">1</span>
                <span className="text-right">$24.99</span>
                <span className="text-right">$1.75</span>
              </div>
              <div className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4">
                <span>Air Filter</span>
                <span className="text-right">1</span>
                <span className="text-right">$19.99</span>
                <span className="text-right">$0.00</span>
              </div>
            </div>
          </div>
          <div className="grid gap-2 border-t border-gray-200 pt-2 dark:border-gray-800">
            <div className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4">
              <span className="font-medium">Subtotal</span>
              <span />
              <span className="text-right">$94.97</span>
              <span className="text-right">$8.75</span>
            </div>
            <div className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-4">
              <span className="font-medium">Total</span>
              <span />
              <span className="text-right font-bold text-lg">$103.72</span>
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
            <div className="grid grid-cols-[100px_1fr_80px] gap-2">
              <span className="font-medium">Service:</span>
              <span>Oil Change</span>
              <span className="text-right">$59.99</span>
            </div>
            <div className="grid grid-cols-[100px_1fr_80px] gap-2">
              <span className="font-medium">Parts:</span>
              <span>$94.97</span>
              <span className="text-right">$8.75</span>
            </div>
            <div className="grid grid-cols-[100px_1fr_80px] gap-2">
              <span className="font-medium">Total:</span>
              <span className="font-bold">$163.71</span>
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
