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

  const { id } = params;

  try {
    const customer = await prisma.user.findUnique({
      where: { id },
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
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json(
      { error: "Failed to fetch customer" },
      { status: 500 }
    );
  }
}
