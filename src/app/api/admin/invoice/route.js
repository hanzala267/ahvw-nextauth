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

export async function GET(request) {
  const session = await checkAdminSession();
  if (!session) return;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search") || "";

    const whereClause = {
      ...(status && { status }),
      OR: [
        {
          service: {
            vehicle: {
              licensePlate: { contains: search, mode: "insensitive" },
            },
          },
        },
        {
          service: {
            vehicle: {
              owner: {
                OR: [
                  { firstName: { contains: search, mode: "insensitive" } },
                  { lastName: { contains: search, mode: "insensitive" } },
                  { email: { contains: search, mode: "insensitive" } },
                ],
              },
            },
          },
        },
      ],
    };

    const invoices = await prisma.invoice.findMany({
      where: whereClause,
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
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}
