import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoiceList from "./components/InvoiceList";
import InvoiceDetail from "./components/InvoiceDetail";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
};

export default App;
