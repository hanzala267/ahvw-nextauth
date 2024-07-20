import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const lowStockItems = await prisma.inventory.findMany({
      where: {
        totalStock: {
          lt: 12,
        },
      },
      select: {
        id: true,
        partName: true,
        brand: true,
        partDescription: true,
        totalStock: true,
        updatedAt: true,
      },
      orderBy: {
        totalStock: "asc",
      },
    });

    return NextResponse.json(lowStockItems);
  } catch (error) {
    console.error("Error fetching low stock items:", error);
    return NextResponse.json(
      { error: "Failed to fetch low stock items" },
      { status: 500 }
    );
  }
}
