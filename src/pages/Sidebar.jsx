// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div style={sidebarStyle}>
      <Link to="/dashboard/customers" style={linkStyle}>
        🤵 Customer List
      </Link>
      <Link to="/dashboard/sellers" style={linkStyle}>
        🏪 Seller List
      </Link>
      <Link to="/dashboard/products" style={linkStyle}>
        📦 All Products
      </Link>
      <Link to="/dashboard/wages" style={linkStyle}>
        💰 Wages
      </Link>
      <Link to="/dashboard/extra" style={linkStyle}>
        ➕ Extra
      </Link>
    </div>
  );
}

const sidebarStyle = {
  backgroundColor: '#333',
  color: '#fff',
  height: '100%',
  width: '200px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  marginBottom: '10px',
};

export default Sidebar;
