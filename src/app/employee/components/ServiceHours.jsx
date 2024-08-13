"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ServiceHours({ serviceId }) {
  const { data: session } = useSession();
  const [hours, setHours] = useState("");
  const [submittedHours, setSubmittedHours] = useState(null);

  useEffect(() => {
    // Fetch the existing hours for this employee and service
    async function fetchHours() {
      const res = await fetch(`/api/employee/service-hours?id=${serviceId}`);
      const data = await res.json();

      if (res.ok && data.hours !== null) {
        setSubmittedHours(data.hours);
      }
    }

    fetchHours();
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/employee/service-hours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceId,
        hours: Number(hours),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setSubmittedHours(data.hours);
    } else {
      alert("Failed to submit hours");
    }
  };

  if (submittedHours !== null) {
    return <p>You have logged {submittedHours} hours for this service.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        required
      />
      <button type="submit">Submit Hours</button>
    </form>
  );
}
