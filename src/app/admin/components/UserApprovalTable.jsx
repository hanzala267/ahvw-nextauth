import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function UserApprovalTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
      const initialStatus = {};
      data.forEach((user) => {
        initialStatus[user.id] = user.isApproved;
      });
      setApprovalStatus(initialStatus);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalChange = (userId, newStatus) => {
    setApprovalStatus((prev) => ({
      ...prev,
      [userId]: newStatus === "yes",
    }));
  };

  const saveChanges = async () => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const updatePromises = Object.entries(approvalStatus).map(
          ([userId, isApproved]) =>
            fetch(`/api/admin/approve-user/${userId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ isApproved }),
            })
        );

        const results = await Promise.all(updatePromises);

        if (results.some((response) => !response.ok)) {
          throw new Error("Failed to update one or more user statuses");
        }

        await fetchUsers();
        resolve();
      } catch (err) {
        reject(err);
      }
    });

    toast.promise(promise, {
      loading: "Updating user statuses...",
      success: "User statuses updated successfully",
      error: (err) => `Error: ${err.message || "Something went wrong"}`,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <Toaster position="top-right" />
      <Table>
        <TableCaption>
          A list of all users and their approval status.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Approved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleApprovalChange(user.id, value)
                  }
                  defaultValue={approvalStatus[user.id] ? "yes" : "no"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center">
        <Button className="w-full sm:w-auto" onClick={saveChanges}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
