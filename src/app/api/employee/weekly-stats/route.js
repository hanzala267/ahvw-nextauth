import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "employee") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const employeeId = session.user.id;
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);

  try {
    const weeklyStats = await prisma.employeeStats.findMany({
      where: {
        employeeId,
        date: {
          gte: startOfWeek,
          lte: new Date(),
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const formattedStats = daysOfWeek.map((day) => {
      const stat = weeklyStats.find((s) => daysOfWeek[s.date.getDay()] === day);
      return {
        day,
        hours: stat ? stat.hours : 0,
      };
    });

    return NextResponse.json(formattedStats);
  } catch (error) {
    console.error("Error fetching weekly stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
