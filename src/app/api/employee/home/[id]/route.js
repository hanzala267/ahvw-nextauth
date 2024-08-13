import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PUT(req, { params }) {
  console.log("Request received to update service status");

  const session = await getServerSession(authOptions);
  console.log("Session data:", session);

  if (!session) {
    console.log("No session found");
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (session.user.role !== "employee") {
    console.log(`User role is not admin, it is: ${session.user.role}`);
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = params;
  const { status } = await req.json();
  console.log(`Updating service ID: ${id} to status: ${status}`);

  try {
    const updatedService = await prisma.service.update({
      where: { id: parseInt(id, 10) },
      data: { status },
    });
    console.log("Service updated successfully", updatedService);
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}
