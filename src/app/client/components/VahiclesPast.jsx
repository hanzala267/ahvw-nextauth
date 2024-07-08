import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VehiclePast({ vehicle }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Past Services</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Add past service details here */}
        <div>No past services available.</div>
      </CardContent>
    </Card>
  );
}
