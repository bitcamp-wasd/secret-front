import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  };

  return isAuthenticated() ? Element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
