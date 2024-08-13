import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Notification({ notifications }) {
  const overdueNotifications = notifications.filter(
    (notif) => notif.status === "overdue"
  );
  const upcomingNotifications = notifications.filter(
    (notif) => notif.status === "upcoming"
  );

  return (
    <div className="mb-4 space-y-4">
      {overdueNotifications.length > 0 && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Overdue Services</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5">
              {overdueNotifications.map((notif, index) => (
                <li key={index}>{notif.message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {upcomingNotifications.length > 0 && (
        <Alert variant="default">
          <CheckCircledIcon className="h-4 w-4" />
          <AlertTitle>Upcoming Services</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5">
              {upcomingNotifications.map((notif, index) => (
                <li key={index}>{notif.message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {notifications.length === 0 && (
        <Alert>
          <CheckCircledIcon className="h-4 w-4" />
          <AlertTitle>No Notifications</AlertTitle>
          <AlertDescription>All services are up to date.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
