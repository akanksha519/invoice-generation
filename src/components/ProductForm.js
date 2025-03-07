import React, { useState, useEffect } from "react";
import "../styles/ProductForm.css"; // ✅ Updated import path

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    storeName: "",
    productName: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>Store Name:</label>
      <input
        type="text"
        name="storeName"
        value={formData.storeName}
        onChange={handleChange}
        required
      />

      <label>Product Name:</label>
      <input
        type="text"
        name="productName"
        value={formData.productName}
        onChange={handleChange}
        required
      />

      <label>Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <button type="submit">Save</button>
      <button type="button" className="cancel" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ProductForm;
