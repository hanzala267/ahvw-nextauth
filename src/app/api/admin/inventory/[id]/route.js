import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const inventorySchema = z.object({
  partName: z.string().min(1, { message: "Part name is required" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  invoiceNumber: z.string().min(1, { message: "Invoice number is required" }),
  costPrice: z
    .number()
    .positive({ message: "Cost price must be a positive number" }),
  sellPrice: z
    .number()
    .positive({ message: "Sell price must be a positive number" }),
  totalStock: z
    .number()
    .int()
    .nonnegative({ message: "Total stock must be a non-negative integer" }),
  partDescription: z
    .string()
    .min(1, { message: "Part description is required" }),
});

async function checkAuth(session) {
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userRole = session.user?.role;
  if (userRole !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null; // Authentication and authorization passed
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const authError = await checkAuth(session);
    if (authError) return authError;

    const body = await req.json();
    const data = inventorySchema.parse(body);

    const inventory = await prisma.inventory.create({
      data: {
        partName: data.partName,
        brand: data.brand,
        invoiceNumber: data.invoiceNumber,
        costPrice: data.costPrice,
        sellPrice: data.sellPrice,
        totalStock: data.totalStock,
        partDescription: data.partDescription,
      },
    });

    return NextResponse.json(inventory, { status: 201 });
  } catch (error) {
    console.error("Error adding inventory:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to add inventory" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    const authError = await checkAuth(session);
    if (authError) return authError;

    const inventory = await prisma.inventory.findMany();
    return NextResponse.json(inventory);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const authError = await checkAuth(session);
    if (authError) return authError;

    const { id } = params;
    const body = await req.json();
    const data = inventorySchema.parse(body);

    const updatedItem = await prisma.inventory.update({
      where: { id: parseInt(id) },
      data: {
        partName: data.partName,
        brand: data.brand,
        invoiceNumber: data.invoiceNumber,
        costPrice: data.costPrice,
        sellPrice: data.sellPrice,
        totalStock: data.totalStock,
        partDescription: data.partDescription,
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating inventory item:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update inventory item" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const authError = await checkAuth(session);
    if (authError) return authError;

    const { id } = params;
    await prisma.inventory.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    return NextResponse.json(
      { error: "Failed to delete inventory item" },
      { status: 500 }
    );
  }
}
