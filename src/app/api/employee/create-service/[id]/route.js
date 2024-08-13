// app/api/admin/create-service/[id]/route.js
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
      const services = await prisma.service.findMany({
        include: { vehicle: true, inventory: true },
      });
      return NextResponse.json(services);
    } else {
      const service = await prisma.service.findUnique({
        where: { id: parseInt(params.id) },
        include: { vehicle: true, inventory: true },
      });
      return NextResponse.json(service);
    }
  } catch (error) {
    console.error("Error fetching service(s):", error);
    return NextResponse.json(
      { error: "Failed to fetch service(s)" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const session = await checkAdminSession();
  if (!session) return;

  try {
    const body = await request.json();
    const service = await prisma.service.update({
      where: { id: parseInt(params.id) },
      data: {
        ...body,
        vehicleId: parseInt(body.vehicleId),
        inventoryId: parseInt(body.inventoryId),
      },
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const session = await checkAdminSession();
  if (!session) return;

  try {
    await prisma.service.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
