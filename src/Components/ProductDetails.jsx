import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get(
          `https://importa-kfql.onrender.com/api/v1/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(response.data);
      } catch (error) {
        setError("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-white rounded-xl">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md mx-auto rounded-lg my-4"
      />
      <p className="text-lg font-bold text-[#0A0500]">{product.price}</p>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="mt-4">
        <span
          className={`px-2 py-1 rounded text-sm ${
            product.inStock
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
};

export default ProductDetails;
