import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import UseTokenRefresh from './components/UseTokenRefresh';

const App = () => {
  UseTokenRefresh();
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
