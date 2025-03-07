import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/InvoiceList.css";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // Default: Newest first
  const [storeFilter, setStoreFilter] = useState("");

  useEffect(() => {
    axios
      .get("/assets/invoices.json")
      .then((response) => {
        console.log("Fetched Invoices:", response.data); // Debugging
        setInvoices(response.data);
      })
      .catch((error) => console.error("Error fetching invoices:", error));
  }, []);

  // 🔍 **Search Filter**
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.orderID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔽 **Sort by Date**
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    return sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  // 🏪 **Store Filter**
  const storeOptions = [...new Set(invoices.map((inv) => inv.storeName))]; // Unique store names
  const finalInvoices = storeFilter
    ? sortedInvoices.filter((inv) => inv.storeName === storeFilter)
    : sortedInvoices;

  return (
    <div className="invoice-list-container">
      <h1>Invoices</h1>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by store or order ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ⏳ Sort Dropdown */}
      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>

      {/* 🏪 Store Filter Dropdown */}
      <select
        onChange={(e) => setStoreFilter(e.target.value)}
        value={storeFilter}
      >
        <option value="">All Stores</option>
        {storeOptions.map((store, index) => (
          <option key={index} value={store}>
            {store}
          </option>
        ))}
      </select>

      {/* 🧾 Invoice List */}
      {finalInvoices.length > 0 ? (
        finalInvoices.map((invoice) => (
          <div key={invoice.id} className="invoice-card">
            <h3>{invoice.storeName}</h3>
            <p>Order ID: {invoice.orderID}</p>
            <p>Date: {invoice.date}</p>
            <p>
              Total: ₹
              {invoice.items.reduce(
                (sum, item) => sum + item.dealPrice * item.quantity,
                0
              )}
            </p>
            <Link to={`/invoice/${invoice.id}`}>View Details</Link>
          </div>
        ))
      ) : (
        <p>No invoices available</p>
      )}
    </div>
  );
};

export default InvoiceList;
