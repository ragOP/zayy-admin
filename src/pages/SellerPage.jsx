import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SellerPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [businessType, setBusinessType] = useState("brand");

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
        "https://zayy-backend-iz7q.onrender.com/api/admin/getAllSeller",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ business_type: businessType }),
        }
      );
      if (response.ok) {
        const seller = await response.json();
        toast.update(loadingToastId, {
          render: seller.message,
          type: "success",
          autoClose: 2000,
        });
        setData(seller.sellers);
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
  }, [businessType]);

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
        <div>
          <select
            className="p-2 ms-10 mt-4 mb-2 rounded-md border border-gray-300"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          >
            <option value="brand">Brand</option>
            <option value="boutique">Boutique</option>
          </select>
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
                        Bussiness Type
                      </th>
                      <th className="bg-gray-900 text-gray-50 border px-4 py-2">
                        Website
                      </th>
                      <th className="bg-gray-900 text-gray-50 border px-4 py-2">
                        Email
                      </th>
                      <th className="bg-gray-900 text-gray-50 border px-4 py-2">
                        Address
                      </th>
                      <th className="bg-gray-900 text-gray-50 border px-4 py-2">
                        State
                      </th>
                      <th className="bg-gray-900 text-gray-50 border px-4 py-2">
                        Logo
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
                        <td className="border px-4 py-2 font-semibold">
                          {item.business_type}
                        </td>
                        <td className="border px-4 py-2 font-semibold">
                          {item.website}
                        </td>
                        <td className="border px-4 py-2 font-semibold">
                          {"  "}
                          {item.email}
                        </td>
                        <td className="border px-4 py-2 font-semibold">
                          {"  "}
                          {item.address}
                        </td>
                        <td className="border px-4 py-2 font-semibold">
                          {item.state}
                        </td>
                        <td className="border px-4 py-2 font-semibold">
                          <img src={item.logo} width={100} alt="logo" />
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
      </div>
    </>
  );
};

export default SellerPage;
