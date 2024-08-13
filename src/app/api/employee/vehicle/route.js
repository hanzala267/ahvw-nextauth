import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function checkAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "employee") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return session;
}

export async function POST(request) {
  const session = await checkAdminSession();
  if (!session) return;

  try {
    const body = await request.json();
    const vehicle = await prisma.vehicle.create({
      data: {
        name: body.name,
        ownerId: body.ownerId,
        licensePlate: body.licensePlate,
      },
    });
    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 }
    );
  }
}
