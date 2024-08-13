import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default async function handler(req, res) {
  // Extract invoice data from the request body
  const { invoice } = req.body;

  if (!invoice) {
    return res.status(400).json({ error: "Invoice data is required" });
  }

  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Add a new page to the document
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;

    // Draw the header
    page.drawText("Invoice from AHVW Service", {
      x: 50,
      y: height - 50, // Moved down to avoid overlapping
      size: 20,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Draw invoice details
    const invoiceDetails = [
      `Invoice Number: ${invoice.id}`,
      `Service ID: ${invoice.serviceId}`,
      `Customer: ${invoice.service.vehicle.owner.firstName} ${invoice.service.vehicle.owner.lastName}`,
      `Vehicle: ${invoice.service.vehicle.licensePlate}`,
    ];

    let yPosition = height - 80; // Adjusted to avoid overlap with the header
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

    // Draw Service Items header
    yPosition -= 20;
    page.drawText("Service Items", {
      x: 50,
      y: yPosition,
      size: 16,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Draw Service Items
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

    // Draw Inventory Items header
    yPosition -= 20;
    page.drawText("Inventory Items", {
      x: 50,
      y: yPosition,
      size: 16,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Draw Inventory Items
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

    // Draw the Total Amount
    yPosition -= 20;
    page.drawText(`Total Amount: $${invoice.amount.toFixed(2)}`, {
      x: 50,
      y: yPosition,
      size: 14,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Save the PDF to a byte array
    const pdfBytes = await pdfDoc.save();

    // Set headers for the response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice_${invoice.id}.pdf`
    );

    // Send the PDF as the response
    res.status(200).send(pdfBytes);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}
