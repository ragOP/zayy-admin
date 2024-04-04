import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SingleProductPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const token = localStorage.getItem("token");
  let loadingToastId;

  const handleApprove = async () => {
    try {
      loadingToastId = toast.info("Ipdating product, please wait...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
      const response = await fetch(
        `https://zayy-backend.onrender.com/api/admin/approveProduct/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const products = await response.json();
        toast.update(loadingToastId, {
          render: products.message,
          type: "success",
          autoClose: 2000,
        });
        setData(products.product);
      }
    } catch (error) {
      console.log("Error message:", error);
      toast.update(loadingToastId, {
        render: error.message,
        type: "error",
        autoClose: 2000,
      });
    }
  };

  const getSpecificData = async () => {
    try {
      loadingToastId = toast.info("Fetching product data, please wait...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
      const response = await fetch(
        `https://zayy-backend.onrender.com/api/admin/getProduct/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const product = await response.json();
        toast.update(loadingToastId, {
          render: "Data fetched sucessfully",
          type: "success",
          autoClose: 2000,
        });
        setData(product[0]);
      }
    } catch (error) {
      console.log("Error message:", error);
      toast.update(loadingToastId, {
        render: error.message,
        type: "error",
        autoClose: 2000,
      });
    }
  };
  console.log(data);
  useEffect(() => {
    getSpecificData();
  }, []);

  return (
    <div>
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
        <div className="bg-gray-200 shadow-md rounded-lg overflow-hidden w-full">
          <div className="flex items-center overflow-x-auto">
            {data &&
              data.images &&
              data.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="h-96 object-cover p-10"
                />
              ))}
          </div>
          <div className="p-4">
            <h2 className="text-gray-800 font-semibold text-4xl mb-2">
              {data.name}
            </h2>
            <h2 className="text-gray-800 text-lg mb-2">{data.description}</h2>
            <div className="flex justify-between">
              <p className="text-gray-600 font-semibold">
                Category: {data.category}
              </p>
              <p className="text-gray-600 font-semibold">Type: {data.type}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600 font-semibold">
                Instock: {data.instock}
              </p>
              <p className="text-gray-600 font-semibold">
                Total Stock: {data.totalstock}
              </p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-gray-600 font-semibold">
                Price: ₹{data.price}
              </p>
              {data.onsale && (
                <p className="text-green-600 font-semibold">
                  Sale Price: ₹{data.salesprice}
                </p>
              )}
            </div>
            <div className="flex justify-between mt-2">
              <p
                className={`font-semibold ${
                  data.status === "pending"
                    ? "text-red-500"
                    : data.status === "approved"
                    ? "text-green-500"
                    : ""
                }`}
              >
                Status: {data.status}
              </p>
              <p className="text-gray-600 font-semibold">
                Discount: {data.discount}% off
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleApprove}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
