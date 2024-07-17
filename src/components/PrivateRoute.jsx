import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRoleFromToken } from '../utils/jwtUtils';

const PrivateRoute = ({ element: Element }) => {
  const userRole = getUserRoleFromToken();

  if (userRole === 'ROLE_USER') {
    return Element;
  } else if (userRole === 'ROLE_ADMIN') {
    return <Navigate to="/mypage/administer" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;