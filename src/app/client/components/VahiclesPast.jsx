// File: app/client/components/VehiclePast.js
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function VehiclePast({ vehicleId }) {
  const [pastServices, setPastServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastServices = async () => {
      try {
        const response = await fetch(`/api/customer/vehicle/${vehicleId}/services`);
        if (!response.ok) {
          throw new Error('Failed to fetch past services');
        }
        const data = await response.json();
        setPastServices(data.filter(service => service.status === 'Closed'));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching past services:', error);
        setLoading(false);
      }
    };

    if (vehicleId) {
      fetchPastServices();
    }
  }, [vehicleId]);

  if (loading) {
    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Past Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full mb-2" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Past Services</CardTitle>
      </CardHeader>
      <CardContent>
        {pastServices.length > 0 ? (
          pastServices.map((service) => (
            <div key={service.id} className="mb-4 p-4 border rounded">
              <h3 className="font-semibold">Service ID: {service.id}</h3>
              <p>Date: {new Date(service.completionDate || service.createdAt).toLocaleDateString()}</p>
              <p>Total Cost: ${service.totalCost.toFixed(2)}</p>
              <h4 className="font-semibold mt-2">Items:</h4>
              <ul>
                {service.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - ${item.price.toFixed(2)}
                    {item.type === 'part' && ` (Quantity: ${item.quantity})`}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div>No past services available.</div>
        )}
      </CardContent>
    </Card>
  );
}
