import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function checkAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "employee") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return session;
}

export async function POST(request) {
  const session = await checkAdminSession();
  if (!session) return;

  try {
    const body = await request.json();
    console.log("Received body:", body);

    const result = await prisma.$transaction(
      async (tx) => {
        // Calculate total cost from service items
        const serviceItemsCost = body.serviceItems.reduce(
          (total, item) => total + parseFloat(item.price),
          0
        );

        // Fetch inventory items to get their sell prices
        const inventoryItems = await tx.inventory.findMany({
          where: {
            id: {
              in: body.inventoryItems.map((item) => parseInt(item.id)),
            },
          },
          select: {
            id: true,
            sellPrice: true,
            totalStock: true,
          },
        });

        // Check if there's enough stock for each inventory item
        for (const item of body.inventoryItems) {
          const inventoryItem = inventoryItems.find(
            (invItem) => invItem.id === parseInt(item.id)
          );
          if (!inventoryItem || inventoryItem.totalStock < item.quantity) {
            throw new Error(`Insufficient stock for item ${item.id}`);
          }
        }

        // Calculate total cost from inventory items
        const inventoryItemsCost = body.inventoryItems.reduce((total, item) => {
          const inventoryItem = inventoryItems.find(
            (invItem) => invItem.id === parseInt(item.id)
          );
          return (
            total +
            (inventoryItem ? inventoryItem.sellPrice * item.quantity : 0)
          );
        }, 0);

        // Calculate total cost
        const totalCost = serviceItemsCost + inventoryItemsCost;

        // Create service
        const createdService = await tx.service.create({
          data: {
            vehicleId: parseInt(body.vehicleId),
            totalCost: totalCost,
            serviceItems: {
              create: body.serviceItems.map((item) => ({
                name: item.name,
                price: parseFloat(item.price),
              })),
            },
            inventoryItems: {
              create: body.inventoryItems.map((item) => ({
                inventoryId: parseInt(item.id),
                quantity: item.quantity,
              })),
            },
          },
          include: {
            serviceItems: true,
            inventoryItems: true,
          },
        });

        // Update inventory stock
        for (const item of body.inventoryItems) {
          await tx.inventory.update({
            where: { id: parseInt(item.id) },
            data: {
              totalStock: {
                decrement: item.quantity,
              },
            },
          });
        }

        // Create invoice
        const createdInvoice = await tx.invoice.create({
          data: {
            serviceId: createdService.id,
            amount: totalCost,
            status: "PENDING",
          },
        });

        return { service: createdService, invoice: createdInvoice };
      },
      {
        maxWait: 5000, // 5 seconds
        timeout: 10000, // 10 seconds
      }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating service and invoice:", error);
    return NextResponse.json(
      { error: "Failed to create service and invoice", details: error.message },
      { status: 500 }
    );
  }
}
