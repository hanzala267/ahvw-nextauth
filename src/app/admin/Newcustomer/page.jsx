"use client";
import UserApprovalTable from "../components/UserApprovalTable";
import { withRoleProtection } from "../../../components/withRoleProtection";
import Navbar from "@/app/admin/components/Navbar";

function Newcustomer() {
  return (
    <div>
      <Navbar />
      <UserApprovalTable />
    </div>
  );
}

export default withRoleProtection(Newcustomer, ["admin"]);
