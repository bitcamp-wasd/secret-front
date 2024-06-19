import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/components/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <div className="main-container">
          <div className="content">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
