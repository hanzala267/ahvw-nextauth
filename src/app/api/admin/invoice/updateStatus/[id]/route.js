// File: /api/admin/invoice/[id]/updateStatus.js
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

export async function PUT(request, { params }) {
  const session = await checkAdminSession();
  if (!session) return;

  try {
    const { id } = params;
    const { status } = await request.json();

    const updatedInvoice = await prisma.invoice.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error("Error updating invoice status:", error);
    return NextResponse.json(
      { error: "Failed to update invoice status" },
      { status: 500 }
    );
  }
}