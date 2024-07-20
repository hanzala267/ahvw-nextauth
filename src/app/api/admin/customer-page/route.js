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

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  try {
    const customers = await prisma.user.findMany({
      where: {
        role: "customer",
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
      include: {
        vehicles: {
          include: {
            services: {
              include: {
                serviceItems: true,
                inventoryItems: {
                  include: {
                    inventory: true,
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
              take: 3,
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
