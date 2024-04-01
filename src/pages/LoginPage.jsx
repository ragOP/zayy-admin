import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
// import DashboardPage from './DashboardPage';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://zayy-backend.onrender.com/api/auth/admin/login", {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ email: username, password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else
        console.error("Login failed ");
    } catch (error) {
      console.log("Error", error)
    }
  };

  return (
    <div className="background">
      <div className="container">
        <h2>Login Page</h2>
        <form className="form-group" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
