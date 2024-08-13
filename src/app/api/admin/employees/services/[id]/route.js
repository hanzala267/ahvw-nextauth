// File: app/api/admin/employees/services/[id]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const services = await prisma.employeeHours.findMany({
      where: {
        employeeId: id,
        createdAt: {
          gte: today,
        },
      },
      include: {
        service: {
          include: {
            vehicle: {
              include: {
                owner: true,
              },
            },
            invoice: true,
          },
        },
      },
    });

    const formattedServices = services.map((service) => ({
      clientName: `${service.service.vehicle.owner?.firstName || ""} ${
        service.service.vehicle.owner?.lastName || ""
      }`,
      serviceName: service.service.status,
      invoiceNumber: service.service.invoice?.id || "N/A",
      hours: service.hours,
    }));

    return NextResponse.json(formattedServices);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
