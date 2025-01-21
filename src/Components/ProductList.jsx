import React, { useState, useEffect } from "react";
import axios from "axios";
import imaging from "../Assets/img/Frame 174.svg";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const Divider = ({ color = "gray-300", thickness = "1" }) => {
    return (
      <hr
        className={`border-t border-${color} mb-4`}
        style={{ borderWidth: thickness }}
      />
    );
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      const containerHeight = window.innerHeight - 85;
      const rowHeight = 180;
      const rowsPerPage = Math.floor(containerHeight / rowHeight);

      if (window.innerWidth >= 1024) {
        setItemsPerPage(rowsPerPage * 3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(rowsPerPage * 2);
      } else {
        setItemsPerPage(rowsPerPage * 1);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, filter, sort, itemsPerPage]);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axios.get(
        `https://importa-kfql.onrender.com/api/v1/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError("Error fetching products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="p-4 h-full overflow-y-auto bg-white rounded-xl">
      {selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          onBack={handleBackToList}
          Divider={Divider}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold">
              Products{" "}
              <span className="text-[#7B7875]">({products?.length || 0})</span>
            </h1>
            <div className="flex gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="All">Filter by</option>
                <option value="Apparel">Apparel</option>
                <option value="Electronics">Electronics</option>
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="Default">Sort by</option>
                <option value="PriceLowToHigh">Price: Low to High</option>
                <option value="PriceHighToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border rounded-xl p-4 cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <img
                        src={product.image || imaging}
                        alt={product.name}
                        className="w-21 h-21 object-cover mb-4"
                      />
                      <div>
                        <h2 className="text-lg font-normal">{product.name}</h2>
                        <p className="text-lg font-bold text-[#0A0500]">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Divider color="blue-500" thickness="2" />
                  <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                    {product.inStock ? "In stock" : "Out of stock"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const ProductDetails = ({ product, onBack, Divider }) => {
  const [activeTab, setActiveTab] = useState("description");
  return (
    <div className="p-0 h-full bg--400 display: flex flex-col">
      <div className="bg-white mb-10">
        <button onClick={onBack} className="text-blue-500 mb-4">
          &larr; Back to Product List
        </button>
        <div className="display: flex gap-10 px-16">
          <div className="w-1/3">
            <img
              src={product.image || imaging}
              alt={product.name}
              className="w-full "
            />
          </div>

          <div className="bg-white p-4 rounded-lg border w-2/3">
            <div className="display: flex justify-between mb-4">
              <h2 className="text-md text-[#7B7875] ">item#{product.SKU}</h2>
              <h2 className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-lg">
                {product.inStock ? "In stock" : "Out of stock"}
              </h2>
            </div>
            <h2 className="text-lg font-bold text-[#0A0500] mb-4">
              {product.name}
            </h2>
            <h2 className="text-md font-bold mb-4 p-2 bg-[#F5F5F5] text-[#7B7875] rounded-lg">
              {product.tags}
            </h2>
            <Divider color="blue-500" thickness="2" />
            <h2 className="text-3xl font-extrabold mb-4">₦{product.price}</h2>
            <h2 className="text-md text-[#7B7875]  mb-4">
              Variations available:{" "}
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-[#F5F5F5] h-full">
        <div className="flex space-x-4 border-b border-gray-300">
          <button
            className={`px-4 py-2 ${
              activeTab === "description"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "analytics"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
        </div>

        <div className="mt-4 p-2">
          {activeTab === "description" ? (
            <p>{product.description || "No description available."}</p>
          ) : (
            <p>{product.analytics || "No analytics available."}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
