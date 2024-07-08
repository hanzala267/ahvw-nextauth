import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Notification({ notifications }) {
  return (
    <div className="mb-4">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <Alert key={index} variant="destructive" className="my-4">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <div className="flex flex-col">
              <AlertTitle>Overdue Service</AlertTitle>
              <AlertDescription>{notification}</AlertDescription>
            </div>
          </Alert>
        ))
      ) : (
        <Alert>
          <div className="flex flex-col">
            <AlertTitle>No Notifications</AlertTitle>
            <AlertDescription>All services are up to date.</AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
}
