import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function checkAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return session;
}

export async function GET(request) {
  const session = await checkAdminSession();
  if (!session) return;

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { licensePlate: { contains: search, mode: "insensitive" } },
        ],
      },
      include: {
        services: {
          where: {
            status: { in: ["Booked", "Ongoing", "Closed"] },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    return NextResponse.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
