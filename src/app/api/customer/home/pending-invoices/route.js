// File: /api/customer/home/pending-invoices.js
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "customer") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const pendingInvoices = await prisma.invoice.findMany({
      where: {
        service: {
          vehicle: {
            ownerId: session.user.id,
          },
        },
        status: "PENDING",
      },
      include: {
        service: true,
      },
      take: 5,
    });

    const totalAmount = pendingInvoices.reduce(
      (sum, invoice) => sum + (invoice.amount || 0),
      0
    );

    return NextResponse.json({ pendingInvoices, totalAmount });
  } catch (error) {
    console.error("Error fetching pending invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch pending invoices" },
      { status: 500 }
    );
  }
}
