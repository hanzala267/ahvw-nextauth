// src/app/api/employee/service-hours/route.js

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  console.log("Session:", session);

  if (!session || session.user.role !== "employee") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const employeeId = session.user.id;
  const { serviceId, hours } = await request.json();

  try {
    const newServiceHours = await prisma.employeeHours.create({
      data: {
        serviceId: serviceId,
        employeeId: employeeId,
        hours: parseFloat(hours),
      },
    });

    console.log("New Service Hours added:", newServiceHours);
    return NextResponse.json(newServiceHours, { status: 201 });
  } catch (error) {
    console.error("Error creating service hours:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
