// components/CustomerCard.jsx
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
const CustomerCard = ({ customer }) => {
  return (
    <Card className="my-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 my-4">
        <CardTitle className="flex font-bold text-lg">
          Customer_Nickname:
          <div className="font-medium ml-4">{customer.Customer_Nickname}</div>
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>{" "}
      <Separator className="mb-6 mt-2" />
      <CardContent>
        <div className="text-md font-medium">
          <span className="font-bold">Company:</span> {customer.Company_Name}
        </div>
        <div className="text-md">
          <span className="font-bold">Status:</span> {customer.Status}
        </div>
        <div className="text-md">
          <span className="font-bold">Invoicing Contact:</span>
          {customer.Invoicing_Contact}
        </div>
        <div className="text-md ">
          <Separator className="my-6" />
          <span className="font-bold">Vehicle:</span>
          <span>
            <Badge variant="default" className={"rounded-3xl ml-2"}>
              {customer.Vehicle}
            </Badge>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
