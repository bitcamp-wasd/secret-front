import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BannerMy from "./BannerMy";
import BannerBattle from "./BannerBattle";
import BannerChallenge from "./BannerChallenge";
import BannerAdmin from "./BannerAdmin";
import "../assets/css/style.css";

const Layout = ({
  children,
  showHeader = true,
  showFooter = true,
  bannerType
}) => {
  const renderBanner = () => {
    switch (bannerType) {
      case "my":
        return <BannerMy />;
      case "battle":
        return <BannerBattle />;
      case "challenge":
        return <BannerChallenge />;
      case "admin":
        return <BannerAdmin />;
      default:
        return null;
    }
  };

  return (
    <div className="layout">
      {showHeader && <Header />}
      {renderBanner()}
      <div className="main-content">
        <div className="content">{children}</div>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
