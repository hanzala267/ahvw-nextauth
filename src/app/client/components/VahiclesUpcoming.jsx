import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VehicleUpcoming({ vehicle }) {
  const nextServiceDate = new Date(vehicle.nextServiceDate);
  const currentDate = new Date();
  const daysUntilService = Math.ceil(
    (nextServiceDate - currentDate) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Upcoming Service</CardTitle>
      </CardHeader>
      <CardContent>
        {daysUntilService > 0 ? (
          <>
            <p>Next service due: {nextServiceDate.toLocaleDateString()}</p>
            <p>Days until next service: {daysUntilService}</p>
          </>
        ) : (
          <p className="text-red-500 font-semibold">
            Service overdue by {Math.abs(daysUntilService)} days. Please
            schedule a service as soon as possible.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
