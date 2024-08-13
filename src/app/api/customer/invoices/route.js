import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function checkCustomerSession() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "customer") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return session;
}

export async function GET(request) {
  const session = await checkCustomerSession();
  if (!session) return;

  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        service: {
          vehicle: {
            ownerId: session.user.id,
          },
        },
      },
      include: {
        service: {
          include: {
            vehicle: true,
            serviceItems: true,
            inventoryItems: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedInvoices = invoices.map((invoice) => ({
      id: invoice.id,
      date: invoice.createdAt.toISOString().split("T")[0],
      client: `${session.user.firstName} ${session.user.lastName}`,
      address: "Address not available", // You might want to add address to the User model
      parts: invoice.service.inventoryItems.map((item) => ({
        name: item.inventory.partName,
        qty: item.quantity,
        price: `$${item.inventory.sellPrice.toFixed(2)}`,
        tax: `$${(item.inventory.sellPrice * 0.1).toFixed(2)}`, // Assuming 10% tax
      })),
      services: invoice.service.serviceItems.map((item) => ({
        name: item.name,
        price: `$${item.price.toFixed(2)}`,
      })),
      subtotal: `$${invoice.amount.toFixed(2)}`,
      tax: `$${(invoice.amount * 0.1).toFixed(2)}`, // Assuming 10% tax
      total: `$${invoice.amount.toFixed(2)}`, // Including tax
      status: invoice.status.toLowerCase(),
    }));
    console.log(formattedInvoices);

    return NextResponse.json(formattedInvoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}
