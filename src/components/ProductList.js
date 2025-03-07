import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import "../styles/ProductList.css"; // ✅ Updated import path

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("/api/products") // Replace with actual API URL
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleSave = (productData) => {
    if (isEditing) {
      setProducts(
        products.map((p) => (p.id === productData.id ? productData : p))
      );
    } else {
      setProducts([...products, { ...productData, id: Date.now().toString() }]);
    }
    setIsEditing(false);
    setSelectedProduct(null);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="product-list">
      <h2>Product Management</h2>
      {isEditing ? (
        <ProductForm
          product={selectedProduct}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <span>
                  {product.productName} - ₹{product.price}
                </span>
                <div>
                  <button className="edit" onClick={() => handleEdit(product)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ProductList;
