import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function UpcomingServices({ service }) {
  return (
    <Card classname="my-2">
      <CardHeader>
        <CardTitle>Upcoming Service</CardTitle>
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
