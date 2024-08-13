
// File: app/api/admin/employee/monthly-stats/[id]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);

  try {
    const monthlyStats = await prisma.employeeStats.groupBy({
      by: ['date'],
      where: {
        employeeId: id,
        date: {
          gte: startOfYear,
          lte: today,
        },
      },
      _sum: {
        hours: true,
      },
    });

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formattedStats = months.map((month, index) => {
      const stat = monthlyStats.find((s) => s.date.getMonth() === index);
      return {
        month,
        hours: stat ? stat._sum.hours : 0,
      };
    });

    return NextResponse.json(formattedStats);
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
