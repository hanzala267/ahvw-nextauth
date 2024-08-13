// src/app/api/employee/add-hours/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const addHoursSchema = z.object({
  hours: z.number().min(0).max(12),
});

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "employee") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const employeeId = session.user.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const { hours } = addHoursSchema.parse(await request.json());

    const existingEntry = await prisma.employeeStats.findFirst({
      where: {
        employeeId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: "Hours already entered for today" },
        { status: 400 }
      );
    }

    const newEntry = await prisma.employeeStats.create({
      data: {
        employeeId,
        hours,
        date: today,
      },
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error("Error adding hours:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
