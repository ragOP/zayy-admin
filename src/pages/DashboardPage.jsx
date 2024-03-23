// DashboardPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import the Sidebar component

function DashboardPage() {
  return (
    <div>
      <header style={headerStyle}>
        <h2 style={{ marginLeft: '10px' }}>Dashboard</h2>
        <nav>
          <ul style={navStyle}>
            <li style={navItemStyle}><Link to="/dashboard">Home</Link></li>
            <li style={navItemStyle}><Link to="/dashboard/profile">Profile</Link></li>
            <li style={navItemStyle}><Link to="/dashboard/settings">Settings</Link></li>
          </ul>
        </nav>
      </header>
      <div style={contentStyle}>
        <Sidebar /> {/* Include the Sidebar component here */}
        <div style={{ marginLeft: '220px' }}> {/* Adjust margin to accommodate the sidebar */}
          {/* Add your dashboard content here */}
          <h2>Welcome to the Dashboard!</h2>
        </div>
      </div>
    </div>
  );
}

const headerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const navStyle = {
  listStyle: 'none',
  display: 'flex',
  margin: '0',
  padding: '0',
};

const navItemStyle = {
  marginLeft: '10px',
};

const contentStyle = {
  display: 'flex',
};

export default DashboardPage;
