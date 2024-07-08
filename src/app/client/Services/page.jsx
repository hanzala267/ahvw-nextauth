// import Navbar from "@/app/Client/components/Navbar";
import Navbar from "../components/Navbar";
import OngoingServices from "@/app/client/components/OngoingServices";
import UpcomingServices from "@/app/client/components/UpcomingServices";
import ClosedServices from "@/app/client/components/ClosedServices";
import { withRoleProtection } from "../../../components/withRoleProtection";

const ongoingServices = [
  {
    id: "service1",
    name: "Example Service 1",
    dateIn: "2023-06-01",
    dateOut: "2023-06-30",
  },
  {
    id: "service2",
    name: "Example Service 2",
    dateIn: "2023-06-05",
    dateOut: "2023-06-25",
  },
];

const upcomingServices = [
  {
    id: "service3",
    name: "Future Service 1",
    dateIn: "2023-07-01",
    dateOut: "2023-07-15",
  },
  {
    id: "service4",
    name: "Future Service 2",
    dateIn: "2023-07-10",
    dateOut: "2023-07-20",
  },
];

const closedServices = [
  {
    id: "service5",
    name: "Past Service 1",
    dateIn: "2023-05-01",
    dateOut: "2023-05-15",
  },
  {
    id: "service6",
    name: "Past Service 2",
    dateIn: "2023-04-10",
    dateOut: "2023-04-20",
  },
];

function ServicesPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <div className="text-2xl font-bold my-6 mx-auto text-center">
              Ongoing Services
            </div>
            {ongoingServices.map((service) => (
              <OngoingServices key={service.id} service={service} />
            ))}
          </div>
          <div>
            <div className="text-2xl font-bold my-6 mx-auto text-center">
              Upcoming Services
            </div>
            {upcomingServices.map((service) => (
              <UpcomingServices key={service.id} service={service} />
            ))}
          </div>
          <div>
            <div className="text-2xl font-bold my-6 mx-auto text-center">
              Closed Services
            </div>
            {closedServices.map((service) => (
              <ClosedServices key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRoleProtection(ServicesPage, ["customer"]);
