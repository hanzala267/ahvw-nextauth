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

export async function GET(request, { params }) {
  const session = await checkAdminSession();
  if (!session) return;

  try {
    if (params.id === "all") {
      const vehicles = await prisma.vehicle.findMany();
      return NextResponse.json(vehicles);
    } else {
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: parseInt(params.id) },
      });
      return NextResponse.json(vehicle);
    }
  } catch (error) {
    console.error("Error fetching vehicle(s):", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicle(s)" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const session = await checkAdminSession();
  if (!session) return;

  try {
    const body = await request.json();
    const vehicle = await prisma.vehicle.update({
      where: { id: parseInt(params.id) },
      data: body,
    });
    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const session = await checkAdminSession();
  if (!session) return;

  try {
    await prisma.vehicle.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
