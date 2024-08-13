// File: app/api/customer/vehicle/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function checkCustomerSession() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "customer") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return session;
}

export async function GET(request) {
  const session = await checkCustomerSession();
  if (!session) return;

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        ownerId: session.user.id,
      },
      include: {
        services: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    const currentDate = new Date();
    const formattedVehicles = vehicles.map((vehicle) => {
      const lastService = vehicle.services[0];
      const nextServiceDate = lastService
        ? new Date(lastService.completionDate || lastService.createdAt)
        : new Date(vehicle.createdAt);
      nextServiceDate.setDate(nextServiceDate.getDate() + 90);

      const status = currentDate > nextServiceDate ? "overdue" : "upcoming";

      return {
        id: vehicle.id,
        name: vehicle.name,
        licensePlate: vehicle.licensePlate,
        lastServiceDate: lastService
          ? (lastService.completionDate || lastService.createdAt).toISOString()
          : null,
        nextServiceDate: nextServiceDate.toISOString(),
        status: status,
      };
    });

    return NextResponse.json(formattedVehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
