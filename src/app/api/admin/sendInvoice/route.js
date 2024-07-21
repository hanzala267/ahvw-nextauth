import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import { renderInvoiceEmail } from "./InvoiceEmail";

async function checkAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return session;
}

export async function POST(request) {
  const session = await checkAdminSession();
  if (!session) return;

  try {
    const { invoiceId } = await request.json();

    // Fetch invoice data from the database
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
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
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "mhanzala267@gmail.com",
        pass: "byjuetuwkqkpkiru",
      },
    });

    // Generate email HTML using React Email
    const emailHtml = renderInvoiceEmail(invoice);

    // Send email
    const info = await transporter.sendMail({
      from: '"AHVW Service" <no-reply@ahvwservice.com>',
      to: invoice.service.vehicle.owner.email,
      subject: `Invoice #${invoice.id} for Your Recent Service`,
      html: emailHtml,
    });

    // Update invoice to mark as sent
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { sent: true },
    });

    return NextResponse.json({ message: "Invoice sent successfully", info });
  } catch (error) {
    console.error("Error sending invoice:", error);
    return NextResponse.json(
      { error: "Failed to send invoice" },
      { status: 500 }
    );
  }
}
