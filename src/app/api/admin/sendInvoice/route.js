import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import { renderInvoiceEmail } from "./InvoiceEmail";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

async function checkAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return session;
}

async function generateInvoicePDF(invoice) {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const page = pdfDoc.addPage();
  const { height } = page.getSize();
  const fontSize = 12;

  page.drawText("Invoice from AHVW Service", {
    x: 50,
    y: height - 50,
    size: 20,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  const invoiceDetails = [
    `Invoice Number: ${invoice.id}`,
    `Service ID: ${invoice.serviceId}`,
    `Customer: ${invoice.service.vehicle.owner.firstName} ${invoice.service.vehicle.owner.lastName}`,
    `Vehicle: ${invoice.service.vehicle.licensePlate}`,
  ];

  let yPosition = height - 80;
  invoiceDetails.forEach((detail) => {
    page.drawText(detail, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
  });

  yPosition -= 20;
  page.drawText("Service Items", {
    x: 50,
    y: yPosition,
    size: 16,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 20;
  invoice.service.serviceItems.forEach((item) => {
    page.drawText(`${item.name}: $${item.price.toFixed(2)}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
  });

  yPosition -= 20;
  page.drawText("Inventory Items", {
    x: 50,
    y: yPosition,
    size: 16,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 20;
  invoice.service.inventoryItems.forEach((item) => {
    page.drawText(
      `${item.inventory.partName} (${item.quantity}): $${(
        item.inventory.sellPrice * item.quantity
      ).toFixed(2)}`,
      {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      }
    );
    yPosition -= 20;
  });

  yPosition -= 20;
  page.drawText(`Total Amount: $${invoice.amount.toFixed(2)}`, {
    x: 50,
    y: yPosition,
    size: 14,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export async function POST(request) {
  const session = await checkAdminSession();
  if (!session) return;

  try {
    const { invoiceId } = await request.json();

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

    const pdfBytes = await generateInvoicePDF(invoice);

    const pdfBuffer = Buffer.from(pdfBytes);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "mhanzala267@gmail.com",
        pass: "byjuetuwkqkpkiru",
      },
    });

    const pdfUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/invoices/${invoice.id}.pdf`;
    const emailHtml = renderInvoiceEmail(invoice, pdfUrl);

    try {
      const info = await transporter.sendMail({
        from: '"AHVW Service" <no-reply@ahvwservice.com>',
        to: invoice.service.vehicle.owner.email,
        subject: `Invoice #${invoice.id} for Your Recent Service`,
        html: emailHtml,
        attachments: [
          {
            filename: `invoice_${invoice.id}.pdf`,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      });

      await prisma.invoice.update({
        where: { id: invoiceId },
        data: { sent: true },
      });

      return NextResponse.json({ message: "Invoice sent successfully", info });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { error: "Failed to send invoice email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing invoice:", error);
    return NextResponse.json(
      { error: "Failed to process invoice" },
      { status: 500 }
    );
  }
}
