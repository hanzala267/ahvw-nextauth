import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function UpcomingServices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Services</CardTitle>
        <CardDescription>
          <div>Service ID: 002</div>
          <div>Service Name: Future Service</div>
          <div>Date In: 2023-07-01</div>
          <div>Date Out: 2023-07-15</div>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>See Details</Button>
      </CardFooter>
    </Card>
  );
}
