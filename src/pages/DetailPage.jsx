import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const DetailPage = () => {
  const { id } = useParams();
  const [dropdown, setDropdown] = useState("Cart");
  const [data, setData] = useState({});

  const handleDropdownChange = (e) => {
    setDropdown(e.target.value);
  };

  const token = localStorage.getItem("token");
  console.log(token);
  let loadingToastId;

  const fetchData = async() => {
   try {
    loadingToastId = toast.info("Fetching cart data, please wait...", {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
    if(dropdown === 'Cart'){
     const response = await fetch(
       `https://zayy-backend.onrender.com/api/admin/getUserCart/${id}`,
       {
         method: "GET",
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );

     if (response.ok) {
      const products = await response.json();
      setData(products.data);
      toast.update(loadingToastId, {
        render: "Data fetched successfully",
        type: "success",
        autoClose: 2000,
      });
    }else{
     toast.update(loadingToastId, {
      render: "No Data Found.",
      type: "error",
      autoClose: 2000,
    });
    }
    }
    if(dropdown === 'Wishlist'){
     const response = await fetch(
      `https://zayy-backend.onrender.com/api/admin/getUserWishlist/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
     const products = await response.json();
     setData(products.data);
     toast.update(loadingToastId, {
       render: "Data fetched successfully",
       type: "success",
       autoClose: 2000,
     });
   }else{
    toast.update(loadingToastId, {
     render: "No Data Found.",
     type: "error",
     autoClose: 2000,
   });
   }
    }
   console.log(data);
  } catch (error) {
    console.log("Error message:", error);
    toast.update(loadingToastId, {
      render: error.message,
      type: "error",
      autoClose: 2000,
    });
  }
  }

  useEffect(() => {
   fetchData();
  }, [dropdown])

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
        <div>
          <div className="m-3">
            <select
              value={dropdown}
              onChange={handleDropdownChange}
              className="px-5 border-none outline-none py-3"
            >
              <option value="Cart">Cart</option>
              <option value="Wishlist">Wishlist</option>
            </select>
          </div>
          <div>
              {data.length && data.map((item) => (
                <div key={item._id} className="p-4 border border-gray-300 mb-4">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-gray-600">Price: ₹{item.price}</p>
                  <p className="text-gray-600">Category: {item.category}</p>
                  <p className="text-gray-600">Type: {item.type}</p>
                  <p className="text-gray-600">Description: {item.description}</p>
                  <div className="flex space-x-2">
                    {item.images.map((image, index) => (
                      <img key={index} src={image} alt={item.name} className="w-20 h-20 object-cover" />
                    ))}
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-600">Colors: {item.color.join(', ')}</p>
                    <p className="text-gray-600">Sizes: {item.size.join(', ')}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
