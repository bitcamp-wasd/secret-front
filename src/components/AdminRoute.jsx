import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRoleFromToken } from '../utils/jwtUtils';

const AdminRoute = ({ element: Element }) => {
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    return !!accessToken;
  };

  const userRole = getUserRoleFromToken();

  return isAuthenticated() && userRole === 'ROLE_ADMIN' ? (
    Element
  ) : (
    
    <Navigate to="/" replace />
  );
};

export default AdminRoute;