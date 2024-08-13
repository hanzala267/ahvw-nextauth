// File: /api/admin/services/route.js
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  try {
    const services = await prisma.service.findMany({
      where: {
        OR: [
          {
            vehicle: {
              licensePlate: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            id: search ? parseInt(search, 10) || undefined : undefined,
          },
        ],
        status: status || undefined,
      },
      include: {
        vehicle: true,
      },
    });
    console.log(services);
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
