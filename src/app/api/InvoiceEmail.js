import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Button,
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
            <Column style={tableColumn}>Status</Column>
            <Column style={tableColumn}>{invoice.status}</Column>
          </Row>
          <Row style={tableRow}>
            <Column style={tableColumn}>Total Amount</Column>
            <Column style={tableColumn}>${invoice.amount.toFixed(2)}</Column>
          </Row>
        </Section>
        <Button
          pX={20}
          pY={12}
          style={btn}
          href={`https://yourcompany.com/invoices/${invoice.id}`}
        >
          View Invoice
        </Button>
        <Text style={text}>Thank you for your business with AHVW Service.</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "35px 0",
  padding: "0",
  textAlign: "center",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

const btn = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "200px",
  margin: "20px auto",
};

const tableContainer = {
  border: "1px solid #ccc",
  borderRadius: "3px",
  margin: "20px 0",
};

const tableRow = {
  borderBottom: "1px solid #eee",
};

const tableHeaderColumn = {
  padding: "10px",
  backgroundColor: "#f4f4f4",
  fontWeight: "bold",
};

const tableColumn = {
  padding: "10px",
};

export const renderInvoiceEmail = (invoice) =>
  render(<InvoiceEmail invoice={invoice} />);
