import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VehicleUpcoming({ vehicle }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Upcoming Services</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Add upcoming service details here */}
        <div>No upcoming services available.</div>
      </CardContent>
    </Card>
  );
}
