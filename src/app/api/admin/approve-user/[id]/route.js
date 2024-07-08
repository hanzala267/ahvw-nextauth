import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function PUT(req, { params }) {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = params;
  const { isApproved } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isApproved },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
