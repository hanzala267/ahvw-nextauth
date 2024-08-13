// File: app/api/customer/vehicle/[id]/services/route.js
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

export async function GET(request, { params }) {
  const session = await checkCustomerSession();
  if (!session) return;

  const { id } = params;

  try {
    const services = await prisma.service.findMany({
      where: {
        vehicleId: parseInt(id),
        vehicle: {
          ownerId: session.user.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        serviceItems: true,
        inventoryItems: {
          include: {
            inventory: true,
          },
        },
      },
    });

    const formattedServices = services.map((service) => ({
      id: service.id,
      status: service.status,
      totalCost: service.totalCost,
      createdAt: service.createdAt.toISOString(),
      completionDate: service.completionDate ? service.completionDate.toISOString() : null,
      items: [
        ...service.serviceItems.map((item) => ({
          name: item.name,
          price: item.price,
          type: 'service',
        })),
        ...service.inventoryItems.map((item) => ({
          name: item.inventory.partName,
          price: item.inventory.sellPrice * item.quantity,
          quantity: item.quantity,
          type: 'part',
        })),
      ],
    }));

    return NextResponse.json(formattedServices);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}