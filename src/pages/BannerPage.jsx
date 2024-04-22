import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const BannerPage = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    brandId: "",
    type: "",
  });

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://zayy-backend.onrender.com/api/admin/getAllSeller",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const sellerData = responseData.sellers;
        setBrands(sellerData);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleBrandChange = (event) => {
    const selectedBrandName = event.target.value;
    setSelectedBrand(selectedBrandName);
    const selectedBrand = brands.find(
      (brand) => brand.name === selectedBrandName
    );

    if (selectedBrand) {
      setSelectedBrandId(selectedBrand._id);
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: selectedBrandName,
        brandId: selectedBrand._id,
        type: selectedBrand.business_type,
      }));
    } else {
      setSelectedBrandId("");
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: "",
        brandId: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loadingToastId;
    try {
      const formDataForRequest = new FormData();
      console.log(formData, "helooooo");
      for (const key in formData) {
        formDataForRequest.append(key, formData[key]);
      }
      loadingToastId = toast.info("Uploading banner, please wait", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://zayy-backend.onrender.com/api/admin/banners",
        {
          method: "POST",
          body: formDataForRequest,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        console.log(data);
        toast.update(loadingToastId, {
          render: "Upload successfully",
          type: "success",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      const parsedError = JSON.parse(error.message);
      console.log("Error message:", parsedError.message);
      toast.update(loadingToastId, {
        render: parsedError.message,
        type: "error",
        autoClose: 2000,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const logoFile = files[0];
      setFormData({ ...formData, image: logoFile });
      previewImage(logoFile);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddImages = () => {
    fileInputRef.current.click();
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeButton={false}
        theme="light"
      />

      <div>
        <h2>Select Brand</h2>
        <select value={selectedBrand} onChange={handleBrandChange}>
          <option value="">Select a Brand</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
        {selectedBrandId && <p>Selected Brand ID: {selectedBrandId}</p>}
        <h2 className="text-4xl font-bold mb-4 text-gray-50">Add Product</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-50 py-5 px-3 min-w-fit"
        >
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Product Images:
            </label>
            <div className="mt-1 flex">
              <button
                type="button"
                onClick={handleAddImages}
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Images
              </button>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleChange}
                className="hidden"
              />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Product Preview"
                className="mt-2 rounded-md shadow-md"
                style={{ maxWidth: "200px" }}
              />
            )}
          </div>
          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default BannerPage;
