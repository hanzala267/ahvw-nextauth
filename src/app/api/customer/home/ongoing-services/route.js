// File: /api/customer/home/ongoing-services/route.js
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "customer") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const ongoingServices = await prisma.service.findMany({
      where: {
        vehicle: {
          ownerId: session.user.id,
        },
        status: {
          in: ["Ongoing", "Booked"],
        },
      },
      include: {
        vehicle: true,
      },
      take: 5,
    });

    return NextResponse.json(ongoingServices);
  } catch (error) {
    console.error("Error fetching ongoing services:", error);
    return NextResponse.json(
      { error: "Failed to fetch ongoing services" },
      { status: 500 }
    );
  }
}
