import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    fetch("/assets/invoices.json") // ✅ Fetching JSON dynamically
      .then((response) => response.json())
      .then((data) => {
        const foundInvoice = data.find((inv) => inv.id === id);
        setInvoice(foundInvoice);
      })
      .catch((error) => console.error("Error loading invoices:", error));
  }, [id]);

  if (!invoice) return <p>Loading invoice details...</p>;

  return (
    <div>
      <h2>{invoice.storeName}</h2>
      <p>Order ID: {invoice.orderID}</p>
      <p>Date: {invoice.date}</p>
      <h3>Items:</h3>
      <ul>
        {invoice.items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} x ₹{item.dealPrice}
          </li>
        ))}
      </ul>
      <p>
        <strong>Total:</strong> ₹
        {invoice.items.reduce(
          (total, item) => total + item.quantity * item.dealPrice,
          0
        )}
      </p>
    </div>
  );
};

export default InvoiceDetail;
