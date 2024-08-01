import React from 'react';
import "../assets/css/style.css";
import admin from "../assets/images/admin.svg";

const BannerAdmin = () => {
  return (
    <div className="banner">
      <div className='banner-admin align-center'>
      <img src={admin} alt="Admin" />
      <h2>관리자</h2>
      </div>
      <div className='banner-admin mt20'>
      <h3>현재 주간 챌린지를 설정할 수 있습니다</h3>
      </div>
    </div>
  );
};

export default BannerAdmin;
