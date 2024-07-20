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
  Row,
  Column,
} from "@react-email/components";
import { render } from "@react-email/render";

export const InvoiceEmail = ({ invoice }) => (
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
        <Text style={text}>
          Your invoice for recent service is ready. Here are the details:
        </Text>
        <Section style={tableContainer}>
          <Row style={tableRow}>
            <Column style={tableHeaderColumn}>Item</Column>
            <Column style={tableHeaderColumn}>Description</Column>
          </Row>
          <Row style={tableRow}>
            <Column style={tableColumn}>Invoice Number</Column>
            <Column style={tableColumn}>{invoice.id}</Column>
          </Row>
          <Row style={tableRow}>
            <Column style={tableColumn}>Service ID</Column>
            <Column style={tableColumn}>{invoice.serviceId}</Column>
          </Row>
          <Row style={tableRow}>
            <Column style={tableColumn}>Vehicle</Column>
            <Column style={tableColumn}>
              {invoice.service.vehicle.licensePlate}
            </Column>
          </Row>
          <Row style={tableRow}>
            <Column style={tableColumn}>Total Amount</Column>
            <Column style={tableColumn}>${invoice.amount.toFixed(2)}</Column>
          </Row>
        </Section>

        <Heading style={h2}>Service Items</Heading>
        <Section style={tableContainer}>
          <Row style={tableRow}>
            <Column style={tableHeaderColumn}>Item</Column>
            <Column style={tableHeaderColumn}>Price</Column>
          </Row>
          {invoice.service.serviceItems.map((item, index) => (
            <Row style={tableRow} key={index}>
              <Column style={tableColumn}>{item.name}</Column>
              <Column style={tableColumn}>${item.price.toFixed(2)}</Column>
            </Row>
          ))}
        </Section>

        <Heading style={h2}>Inventory Items</Heading>
        <Section style={tableContainer}>
          <Row style={tableRow}>
            <Column style={tableHeaderColumn}>Item</Column>
            <Column style={tableHeaderColumn}>Quantity</Column>
            <Column style={tableHeaderColumn}>Price</Column>
          </Row>
          {invoice.service.inventoryItems.map((item, index) => (
            <Row style={tableRow} key={index}>
              <Column style={tableColumn}>{item.inventory.partName}</Column>
              <Column style={tableColumn}>{item.quantity}</Column>
              <Column style={tableColumn}>
                ${item.inventory.sellPrice.toFixed(2)}
              </Column>
            </Row>
          ))}
        </Section>

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

const h2 = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "20px 0 10px",
};

const text = {
  color: "#cccccc",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "10px 0",
};

const tableContainer = {
  border: "1px solid #444",
  borderRadius: "8px",
  overflow: "hidden",
  marginBottom: "20px",
};

const tableRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #444",
};

const tableHeaderColumn = {
  padding: "10px",
  backgroundColor: "#333",
  color: "#ffffff",
  fontWeight: "bold",
  flex: 1,
  textAlign: "center",
};

const tableColumn = {
  padding: "10px",
  color: "#cccccc",
  flex: 1,
  textAlign: "center",
};

export const renderInvoiceEmail = (invoice) =>
  render(<InvoiceEmail invoice={invoice} />);
