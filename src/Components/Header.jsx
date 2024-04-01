import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-gray-50 p-2 flex items-center justify-between px-6">
      <h2 className="text-3xl font-semibold text-gray-50 pt-2">
        Admin Dashboard
      </h2>
      <nav>
        <ul className="list-none flex m-0 p-0">
          <li className="text-white no-underline">
            <Link to="/dashboard" className="ml-4">
              Home
            </Link>
          </li>
          <li className="text-white no-underline">
            <Link to="/dashboard/profile" className="ml-4">
              Profile
            </Link>
          </li>

          <li className="text-white no-underline">
            <Link to="/dashboard/settings" className="ml-4">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
