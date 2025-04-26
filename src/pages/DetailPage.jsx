import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const DetailPage = () => {
  const { id } = useParams();
  const [dropdown, setDropdown] = useState("Cart");
  const [data, setData] = useState([]);

  const handleDropdownChange = (e) => {
    setDropdown(e.target.value);
  };

  const token = localStorage.getItem("token");
  let loadingToastId;

  const fetchData = async () => {
    try {
      loadingToastId = toast.info("Fetching data, please wait...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        theme: "light",
      });

      const url =
        dropdown === "Cart"
          ? `https://zayy-backend-1nsc.onrender.com/api/admin/getUserCart/${id}`
          : `https://zayy-backend-1nsc.onrender.com/api/admin/getUserWishlist/${id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const products = await response.json();
        setData(products.data);
        console.log(products.data);
        toast.update(loadingToastId, {
          render: "Data fetched successfully",
          type: "success",
          autoClose: 2000,
        });
      } else {
        setData([]);
        toast.update(loadingToastId, {
          render: "No Data Found.",
          type: "error",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.update(loadingToastId, {
        render: error.message,
        type: "error",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [dropdown]);

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
        <div style={{ width: "80%" }} className="px-5">
          <div className="my-3">
            <select
              value={dropdown}
              onChange={handleDropdownChange}
              className="px-5 border border-gray-300 rounded-md py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Cart">Cart</option>
              <option value="Wishlist">Wishlist</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.length > 0 &&
              data.map((item) => (
                <div
                  key={item._id}
                  className="p-4 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-xl font-bold mb-2 text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 mb-1">Price: ₹{item.price}</p>
                  <p className="text-gray-600 mb-1">
                    Category: {item.category}
                  </p>
                  <p className="text-gray-600 mb-1">Type: {item.type}</p>
                  <p className="text-gray-600 mb-2">
                    Description: {item.description}
                  </p>
                  <div className="flex space-x-2 mb-2">
                    {item.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ))}
                  </div>
                  {dropdown === "Cart" && (
                    <div className="mt-2">
                      <p className="text-gray-600 mb-1">Color: {item.color}</p>
                      <p className="text-gray-600">Size: {item.size}</p>
                    </div>
                  )}
                </div>
              ))}
            {data.length === 0 && (
              <p className="text-center text-gray-600">No items found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
