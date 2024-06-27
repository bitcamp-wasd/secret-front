import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Banner_Ba";
import "../assets/css/style.css";

const Layout = ({ children, showHeader = true, showFooter = true }) => {
    return (
        <div className="layout">
            {showHeader && <Header />}
            <Banner />
            <div className="main-content">
                <div className="main-container">
                    <div className="content">{children}</div>
                </div>
            </div>
            {showFooter && <Footer />}
        </div>
    );
};

export default Layout;
