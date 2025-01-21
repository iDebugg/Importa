import React, { useState } from "react";
import imaging from "../Assets/img/IMAGE.svg";

const AddProductForm = ({ setShowAddProductForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    SKU: "",
    category: "",
    details: "",
    price: "",
    discount: "",
    size: "",
    tags: [],
    images: [],
  });

  const [tagIndex, setTagIndex] = useState(1);

  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (index, value) => {
    const updatedTags = [...formData.tags];
    updatedTags[index] = value;
    setFormData((prev) => ({ ...prev, tags: updatedTags }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 4) {
      alert("You can upload a maximum of 4 images.");
      return;
    }
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleDeleteImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleAddTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, `Tag ${tagIndex}`],
    }));
    setTagIndex((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Saving product...", formData);

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Authentication token not found. Please log in.");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("SKU", formData.SKU);
    payload.append("category", formData.category);
    payload.append("price", formData.price);
    payload.append("size", formData.size);
    payload.append("inStock", true);

    if (formData.tags.length) {
      payload.append("tags", formData.tags.join(","));
    }

    formData.images.forEach((image, index) => {
      payload.append(`images`, image);
    });

    try {
      const response = await fetch(
        "https://importa-kfql.onrender.com/api/v1/products",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: payload,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(errorData.message || "Failed to save the product");
      }

      const result = await response.json();
      console.log("Product saved successfully:", result);
      alert("Product saved successfully!");

      setFormData({
        name: "",
        SKU: "",
        category: "",
        details: "",
        price: "",
        discount: "",
        size: "",
        tags: [],
        images: [],
      });
      setTagIndex(1);
    } catch (error) {
      console.error("Error saving product:", error);
      alert(`Failed to save the product. ${error.message}`);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      sku: "",
      category: "",
      details: "",
      price: "",
      discount: "",
      size: "",
      tags: [""],
      images: [],
    });
    setShowAddProductForm(false);
  };

  const renderPreview = () => (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">Preview Product</h3>
      <p>
        <strong>Name:</strong> {formData.name}
      </p>
      <p>
        <strong>SKU:</strong> {formData.SKU}
      </p>
      <p>
        <strong>Category:</strong> {formData.category}
      </p>
      <p>
        <strong>Details:</strong> {formData.details}
      </p>
      <p>
        <strong>Price:</strong> {formData.price}
      </p>
      <p>
        <strong>Discount:</strong> {formData.discount}
      </p>
      <p>
        <strong>Size:</strong> {formData.size}
      </p>
      <p>
        <strong>Tags:</strong> {formData.tags.join(", ")}
      </p>
      {formData.images && (
        <p>
          <strong>Images:</strong> {formData.images.length} file(s) selected
        </p>
      )}
      <button
        onClick={() => setPreviewMode(false)}
        className="mt-4 btn-primary"
      >
        Edit
      </button>
    </div>
  );

  return (
    <div className="p-4 bg-white rounded-xl h-full">
      {previewMode ? (
        renderPreview()
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <div className="display: flex justify-between gap-5">
            <div className="w-1/3">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-12 w-full max-w-md bg-gray-50">
                <div className="text-center">
                  <svg
                    className="h-12 w-12 mx-auto text-gray-400"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M47.5 7.5H12.5C9.73858 7.5 7.5 9.73858 7.5 12.5V47.5C7.5 50.2614 9.73858 52.5 12.5 52.5H47.5C50.2614 52.5 52.5 50.2614 52.5 47.5V12.5C52.5 9.73858 50.2614 7.5 47.5 7.5Z"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M22.5 27.5C25.2614 27.5 27.5 25.2614 27.5 22.5C27.5 19.7386 25.2614 17.5 22.5 17.5C19.7386 17.5 17.5 19.7386 17.5 22.5C17.5 25.2614 19.7386 27.5 22.5 27.5Z"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M52.5 37.4992L44.785 29.7842C43.8474 28.8469 42.5758 28.3203 41.25 28.3203C39.9242 28.3203 38.6526 28.8469 37.715 29.7842L15 52.4992"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="mt-4 text-sm text-gray-500">
                    Drop product’s image(s) here, or{" "}
                    <label
                      htmlFor="file-upload"
                      className="text-orange-500 font-medium cursor-pointer"
                    >
                      Browse
                    </label>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Supported files include: jpeg, jpg, png
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                  multiple
                  disabled={formData.images.length >= 4}
                />
              </div>
              <div className="mt-4">
                {formData.images.length > 0 && (
                  <div className="space-y-2">
                    {formData.images.map((image, index) => {
                      const truncatedName =
                        image.name.length > 15
                          ? `${image.name.substring(0, 15)}...`
                          : image.name;

                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-2 "
                        >
                          <div className="display flex w-11/12 justify-between border px-2 py-1 rounded-lg mb-3">
                            <div className="flex items-center space-x-4">
                              <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                className="w-5 h-5 object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium">
                                  {truncatedName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(image.size / 1024).toFixed(2)} KB
                                </p>
                              </div>
                            </div>
                            <button>
                              <svg
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0003 11.3337C10.4606 11.3337 10.8337 10.9606 10.8337 10.5003C10.8337 10.0401 10.4606 9.66699 10.0003 9.66699C9.54009 9.66699 9.16699 10.0401 9.16699 10.5003C9.16699 10.9606 9.54009 11.3337 10.0003 11.3337Z"
                                  stroke="#7B7875"
                                  stroke-width="1.66667"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10.0003 5.49967C10.4606 5.49967 10.8337 5.12658 10.8337 4.66634C10.8337 4.2061 10.4606 3.83301 10.0003 3.83301C9.54009 3.83301 9.16699 4.2061 9.16699 4.66634C9.16699 5.12658 9.54009 5.49967 10.0003 5.49967Z"
                                  stroke="#7B7875"
                                  stroke-width="1.66667"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10.0003 17.1667C10.4606 17.1667 10.8337 16.7936 10.8337 16.3333C10.8337 15.8731 10.4606 15.5 10.0003 15.5C9.54009 15.5 9.16699 15.8731 9.16699 16.3333C9.16699 16.7936 9.54009 17.1667 10.0003 17.1667Z"
                                  stroke="#7B7875"
                                  stroke-width="1.66667"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteImage(index)}
                            className="border p-1 rounded-lg"
                          >
                            <svg
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.5 5.5H17.5"
                                stroke="#CC0000"
                                stroke-width="1.25"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M15.8337 5.5V17.1667C15.8337 18 15.0003 18.8333 14.167 18.8333H5.83366C5.00033 18.8333 4.16699 18 4.16699 17.1667V5.5"
                                stroke="#CC0000"
                                stroke-width="1.25"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M6.66699 5.50033V3.83366C6.66699 3.00033 7.50033 2.16699 8.33366 2.16699H11.667C12.5003 2.16699 13.3337 3.00033 13.3337 3.83366V5.50033"
                                stroke="#CC0000"
                                stroke-width="1.25"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="w-2/3">
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <input
                  placeholder="Enter the products name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  required
                />
              </div>
              <div className="display: flex gap-3 mb-3">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    required
                  >
                    <option value="">Select the product’s category</option>
                    <option value="67824f97e99714c82345419b">Category 1</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">SKU</label>
                  <input
                    placeholder="0000"
                    type="text"
                    name="SKU"
                    value={formData.SKU}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Product details
                </label>
                <textarea
                  placeholder="Enter body here"
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div className="flex space-x-4 mb-3">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    placeholder="0.00"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Discount
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </div>
              </div>
              <div className="w-1/2 mb-3">
                <label className="block text-sm font-medium mb-1">Size</label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter size unit"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Tags</label>
                <div className="flex items-center gap-2">
                  {formData.tags.map((tag, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => console.log(`Tag sent: ${tag}`)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      {tag}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    + Add Tag
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="display: flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-[#D9851F] text-[#FDF4E9] text-sm rounded-md"
              >
                Save Product
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode(true)}
                className="border border-[#D9851F] text-[#D9851F] px-4 py-2 text-sm rounded-md"
              >
                Preview
              </button>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-[#F5F5F5] text-[#7B7875] text-sm rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProductForm;
