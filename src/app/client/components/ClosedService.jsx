import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function ClosedServices({ service }) {
  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>Closed Service</CardTitle>
        <CardDescription>
          <div>Service ID: {service.id}</div>
          <div>Service Name: {service.name}</div>
          <div>Date In: {service.dateIn}</div>
          <div>Date Out: {service.dateOut}</div>
        </CardDescription>
        {/* <Button className="my-3">See Details</Button> */}
      </CardHeader>
    </Card>
  );
}
