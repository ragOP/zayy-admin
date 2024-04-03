import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ProductPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

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
  const handlePageChange = (page) => {
    setCurrentPage(page);
    toast.success(`Page ${page} loaded`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
                  {currentItems.map((item) => (
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
              <div className="flex justify-center mt-4">
                <nav className="inline-flex">
                  <ul className="flex items-center">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <li key={index}>
                        <button
                          className={`px-5 py-1 rounded-md  text-center focus:outline-none ${
                            currentPage === index + 1
                              ? "bg-gray-900 text-gray-50"
                              : "bg-gray-300 text-gray-900"
                          }`}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPage;
