import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Banner";
import "../styles/components/Layout.css";

const Layout = ({ children, showHeader = true, showFooter = true }) => {
  return (
    <div className="layout">
      <Header/>
      <Banner/>
      <div className="main-content">
      
        <div className="main-container">
        
          <div className="content">
            
            {children}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
