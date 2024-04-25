import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ThumbnailPage = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    brandId: "",
    type:""
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
      console.error('Error fetching brands:', error);
    }
  };

  const handleBrandChange = (event) => {
    const selectedBrandName = event.target.value;
    setSelectedBrand(selectedBrandName);
    const selectedBrand = brands.find(brand => brand.name === selectedBrandName);

    if (selectedBrand) {
      setSelectedBrandId(selectedBrand._id);
      setFormData(prevFormData => ({
        ...prevFormData,
        name: selectedBrandName,
        brandId: selectedBrand._id,
        type:selectedBrand.business_type
      }));
    } else {
      setSelectedBrandId('');
      setFormData(prevFormData => ({
        ...prevFormData,
        name: "",
        brandId: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loadingToastId;
    try {
      const formDataForRequest = new FormData();
      console.log(formData,"helooooo")
      for (const key in formData) {
        formDataForRequest.append(key, formData[key]);
      }
      loadingToastId = toast.info("Api Fetch. Please wait...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
      const token = localStorage.getItem("token")
      const response = await fetch(
        "https://zayy-backend.onrender.com/api/admin/thumbnails",
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
        toast.update(loadingToastId, {
          render: "Succesfully",
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
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col m-10">
          <h2 className="text-3xl font-bold mb-6">Select Brand</h2>
          <select
            className="p-3 mb-6 rounded-md border border-gray-300 shadow-md text-lg"
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            <option value="">Select a Brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
          {selectedBrandId && <p>Selected Brand ID: {selectedBrandId}</p>}
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              <label htmlFor="images" className="text-lg font-semibold text-gray-800">
                Thumbnail Images:
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleAddImages}
                  className="py-3 px-6 border border-transparent shadow-sm text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
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
                  style={{ maxWidth: "300px" }}
                />
              )}
            </div>
            <button
              type="submit"
              className="py-3 px-6 border border-transparent shadow-sm text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ThumbnailPage;
