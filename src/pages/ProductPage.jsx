import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ProductPage = () => {
  const [data, setData] = useState([]);

  const getAllProductData = async () => {
    let loadingToastId;
    try {
      loadingToastId = toast.info("Fetching All Products...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://zayy-backend.onrender.com/api/admin/getAllProducts",
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
          render: product.message,
          type: "success",
          autoClose: 2000,
        });
        setData(product.products);
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
  useEffect(() => {
    getAllProductData();
  }, []);

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
        {data.length > 0 && (
          <div style={{ marginLeft: "20px", width: "calc(100% - 20px)" }}>
            <div className="overflow-x-auto p-5">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="bg-gray-900 text-gray-50 border px-4 py-2">
                      Name
                    </th>
                    <th className="bg-gray-900 text-gray-50 border px-4 py-2">
                      Status
                    </th>
                    <th className="bg-gray-900 text-gray-50 border px-4 py-2">
                      Type
                    </th>
                    <th className="bg-gray-900 text-gray-50 border px-4 py-2">
                      Price
                    </th>
                    <th className="bg-gray-900 text-gray-50 border px-4 py-2">
                      Sale Price
                    </th>
                    <th className="bg-gray-900 text-gray-50 border px-4 py-2">
                      Category
                    </th>
                    <th className="bg-gray-900 text-gray-50 border px-4 py-2">
                      On Sale
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="border px-4 py-2 font-semibold">
                        <Link to={`/api/admin/getProduct/${item._id}`}>
                          {item.name}
                        </Link>
                      </td>
                      <td className="border px-4 py-2">
                        <span
                          className={`p-2 rounded-lg text-gray-50 font-semibold ${
                            item.status === "pending"
                              ? "bg-red-500"
                              : item.status === "approved"
                              ? "bg-green-500"
                              : "bg-gray-900"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="border px-4 py-2 font-semibold">
                        {item.type}
                      </td>
                      <td className="border px-4 py-2 font-semibold">
                        ₹{"  "}
                        {item.price}
                      </td>
                      <td className="border px-4 py-2 font-semibold">
                        ₹{"  "}
                        {item.salesprice}
                      </td>
                      <td className="border px-4 py-2 font-semibold">
                        {item.category}
                      </td>
                      <td className="border px-4 py-2 font-semibold">
                        {item.onsale ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPage;
