// File: /api/customer/home/upcoming-services/route.js
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
    const upcomingServices = await prisma.service.findMany({
      where: {
        vehicle: {
          ownerId: session.user.id,
        },
        status: "Closed",
      },
      include: {
        vehicle: true,
      },
      take: 5,
    });

    return NextResponse.json(upcomingServices);
  } catch (error) {
    console.error("Error fetching upcoming services:", error);
    return NextResponse.json(
      { error: "Failed to fetch upcoming services" },
      { status: 500 }
    );
  }
}
