import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Button,
} from "@react-email/components";
import { render } from "@react-email/render";

export const InvoiceEmail = ({ invoice, pdfUrl }) => (
  <Html>
    <Head />
    <Preview>Your invoice from AHVW Service</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Invoice from AHVW Service</Heading>
        <Text style={text}>
          Dear {invoice.service.vehicle.owner.firstName}{" "}
          {invoice.service.vehicle.owner.lastName},
        </Text>

        <Text style={text}>Thank you for your business with AHVW Service.</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#1c1c1c",
  color: "#ffffff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  padding: "20px",
};

const container = {
  margin: "0 auto",
  padding: "20px 0",
  width: "560px",
  backgroundColor: "#2c2c2c",
  borderRadius: "8px",
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px",
  textAlign: "center",
};

const text = {
  color: "#cccccc",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "10px 0",
};

const buttonContainer = {
  textAlign: "center",
  margin: "20px 0",
};

const button = {
  backgroundColor: "#007bff",
  borderRadius: "4px",
  color: "#ffffff",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center",
  display: "inline-block",
};

export const renderInvoiceEmail = (invoice, pdfUrl) =>
  render(<InvoiceEmail invoice={invoice} pdfUrl={pdfUrl} />);
