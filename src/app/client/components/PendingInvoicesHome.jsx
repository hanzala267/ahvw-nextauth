import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function PendingInvoices() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$1,234.56</div>
        <p className="text-xs text-muted-foreground">Due in 3 days</p>
      </CardContent>
      <CardFooter>
        <Button>See Full Invoice</Button>
      </CardFooter>
    </Card>
  );
}
