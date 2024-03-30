// LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
   try{
    const response = await fetch ("https://zayy-backend.onrender.com/api/auth/admin/login",{
      method:"POST",
      headers :{'Content-Type':"application/json"},
      body: JSON.stringify({ email: username, password })
    });
    if(response.ok){
      const data= await response.json();
      localStorage.setItem("token",data.token);
      navigate("/dashboard");
    }else 
    console.error("Login failed ");
   }catch (error){
    console.log("Error",error)
   }
  
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" >Login</button>
        </form>
    </div>
  );
}

export default LoginPage;
