import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function OngoingServices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ongoing Services</CardTitle>
        <CardDescription>
          <div>Service ID: 001</div>
          <div>Service Name: Example Service</div>
          <div>Date In: 2023-06-01</div>
          <div>Date Out: 2023-06-30</div>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>See Details</Button>
      </CardFooter>
    </Card>
  );
}
