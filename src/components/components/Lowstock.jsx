import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Component() {
  const lowPartStockData = [
    {
      Brand: "BRAKETEK",
      Part_Category: "Axle.Drum.BrakeShoe",
      Part_Description: 'BRAKE SHOE KIT 4515Q 16.5"X7" BT23K',
      date: "2023-06-23",
      quantity: "12 pc",
    },
    {
      Brand: "BRAKETEK",
      Part_Category: "Axle.Drum.BrakeShoe",
      Part_Description: 'BRAKE SHOE KIT 4515Q 16.5"X7" BT23K',
      date: "2023-06-23",
      quantity: "12 pc",
    },
    {
      Brand: "BRAKETEK",
      Part_Category: "Axle.Drum.BrakeShoe",
      Part_Description: 'BRAKE SHOE KIT 4515Q 16.5"X7" BT23K',
      date: "2023-06-23",
      quantity: "12 pc",
    },
    {
      Brand: "BRAKETEK",
      Part_Category: "Axle.Drum.BrakeShoe",
      Part_Description: 'BRAKE SHOE KIT 4515Q 16.5"X7" BT23K',
      date: "2023-06-23",
      quantity: "12 pc",
    },
    {
      Brand: "BRAKETEK",
      Part_Category: "Axle.Drum.BrakeShoe",
      Part_Description: 'BRAKE SHOE KIT 4515Q 16.5"X7" BT23K',
      date: "2023-06-23",
      quantity: "12 pc",
    },
  ];

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Low Part Stock</CardTitle>
          <CardDescription>These parts are low in stock</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            View All <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead className="">Part Category</TableHead>
              <TableHead className="hidden xl:table-column">
                Part Description
              </TableHead>
              <TableHead className="hidden xl:table-column">Date</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowPartStockData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{item.Brand}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {item.Part_Description}
                  </div>
                </TableCell>
                <TableCell className="">{item.Part_Category}</TableCell>
                <TableCell className="hidden xl:table-column">
                  <Badge className="text-xs" variant="outline">
                    {item.Part_Description}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
