// File: /api/admin/services/[id]/route.js
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = params;

  try {
    const service = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
      include: { vehicle: true },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = params;
  const { status } = await req.json();

  try {
    const updatedService = await prisma.service.update({
      where: { id: parseInt(id, 10) },
      data: { status },
    });
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

//
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = params;

  try {
    // Start a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Delete related ServiceItems
      await prisma.serviceItem.deleteMany({
        where: { serviceId: parseInt(id, 10) },
      });

      // Delete related ServiceInventory items
      await prisma.serviceInventory.deleteMany({
        where: { serviceId: parseInt(id, 10) },
      });

      // Delete the Service
      await prisma.service.delete({
        where: { id: parseInt(id, 10) },
      });
    });

    return NextResponse.json({
      message: "Service and related items deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
