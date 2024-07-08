import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function PendingInvoices({ invoice }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${invoice.amount}</div>
        <p className="text-xs text-muted-foreground">Due in {invoice.dueIn} days</p>
        <Button className="my-3">See Full Invoice</Button>
      </CardContent>
    </Card>
  );
}
