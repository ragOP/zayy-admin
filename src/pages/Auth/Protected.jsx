import React from 'react'
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';


const Protected = ({ element, screen }) => {
  if(screen === 'login'){
    return isAuthenticated() ? <Navigate to="/dashboard" /> : element;
  }
  return isAuthenticated() ? element : <Navigate to="/" />;
};

export default Protected;