/*마이페이지에서 사용할 배너
배너 통합할 방법 찾아봐야함
*/
import React from 'react';
import Button from './Button';
import "../assets/css/style.css";


const Banner = () => {
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



export default Banner;
