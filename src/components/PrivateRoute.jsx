import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');
    //로컬 스토리지 토큰확인
    return !!accessToken; 
  };

  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;