import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');
    //로컬 스토리지 토큰확인
    return !!accessToken; 
  };

  return (
    <Routes>
      <Route
        {...rest}
        element={isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default PrivateRoute;