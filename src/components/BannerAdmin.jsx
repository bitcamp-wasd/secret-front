import React from 'react';
import Button from './Button';
import "../assets/css/style.css";

const BannerAdmin = () => {
  return (
    <div className="banner">
      <h1>관리자 페이지입니다</h1>
      <div className='banner-admin'>
      <Button>챌린지 업데이트</Button>
      <Button>배틀 업데이트</Button>     
      </div>
    </div>
  );
};

export default BannerAdmin;
