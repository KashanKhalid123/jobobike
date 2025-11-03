// app/email/OrderConfirmationEmail.tsx

import * as React from "react";

interface OrderEmailProps {
  orderId: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

export const OrderConfirmationEmail = ({
  orderId,
  customerName,
  items,
  total,
}: OrderEmailProps) => (
  <div style={{ fontFamily: "Arial, sans-serif", color: "#222" }}>
    <h1>Thank you for your order, {customerName}!</h1>
    <p>
      Your order <strong>#{orderId}</strong> has been successfully received and
      paid.
    </p>

    <h3>Order Summary</h3>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th align="left">Item</th>
          <th>Qty</th>
          <th align="right">Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i}>
            <td>{item.name}</td>
            <td align="center">{item.quantity}</td>
            <td align="right">{item.price.toFixed(2)} NOK</td>
          </tr>
        ))}
      </tbody>
    </table>

    <p style={{ fontSize: "16px", marginTop: "16px" }}>
      <strong>Total:</strong> {total.toFixed(2)} NOK
    </p>

    <p>
      We’ll notify you once your order has been shipped.
      <br />
      You can reply to this email for any questions.
    </p>

    <footer style={{ marginTop: "30px", fontSize: "12px", color: "#888" }}>
      © {new Date().getFullYear()} JOBOBIKE — All rights reserved.
    </footer>
  </div>
);
