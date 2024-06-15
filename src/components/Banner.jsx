/*마이페이지에서 사용할 배너
배너 통합할 방법 찾아봐야함
*/
import React from 'react';
import Button from './Button';
import '../styles/components/Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <h1>김융님의 등급은 거장입니다</h1>
      <div className='banner-buttons'>
      <Button size="banner">정보</Button>
      <Button size="banner">내 동영상</Button>
      <Button size="banner">내 댓글</Button>
      <Button size="banner">좋아요</Button>
      </div>
    </div>
  );
};



export default Banner;
