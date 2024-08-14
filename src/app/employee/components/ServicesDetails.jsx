import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ServiceDetails = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/employee/home');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to fetch services. Please try again later.');
    }
  };

  const ServiceCard = ({ service }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{service.vehicle.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Service ID:</strong> {service.id}</p>
        <p><strong>Status:</strong> {service.status}</p>
        <p><strong>License Plate:</strong> {service.vehicle.licensePlate}</p>
        <p><strong>Created At:</strong> {new Date(service.createdAt).toLocaleDateString()}</p>
        {service.completionDate && (
          <p><strong>Completion Date:</strong> {new Date(service.completionDate).toLocaleDateString()}</p>
        )}
      </CardContent>
    </Card>
  );

  const filterServicesByStatus = (status) => 
    services.filter(service => service.status === status);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {['Booked', 'Ongoing', 'Closed'].map(status => (
        <div key={status}>
          <h2 className="text-xl font-semibold mb-4">{status}</h2>
          {filterServicesByStatus(status).map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ServiceDetails;