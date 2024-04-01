import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

function DashboardPage() {
  return (
    <div>
      <Header />
      <div style={contentStyle}>
        <Sidebar />
        <div style={{ marginLeft: "220px" }}>
          {" "}
          <h2 className="text-center mt-3 text-3xl font-bold">
            Welcome to the Dashboard!
          </h2>
        </div>
      </div>
    </div>
  );
}

const contentStyle = {
  display: "flex",
};

export default DashboardPage;
