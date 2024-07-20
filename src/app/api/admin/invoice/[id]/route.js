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

export async function GET(request, { params }) {
  const session = await checkAdminSession();
  if (!session) return;

  try {
    const { id } = params;
    const invoice = await prisma.invoice.findFirst({
      where: { serviceId: parseInt(id) },
      include: {
        service: {
          include: {
            vehicle: {
              include: {
                owner: true,
              },
            },
            serviceItems: true,
            inventoryItems: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoice" },
      { status: 500 }
    );
  }
}
