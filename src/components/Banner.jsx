import React from 'react';

import Button from './Button';
import "../assets/css/style.css";
import question from '../assets/images/question.svg';

const Banner = () => {
  return (
    <div className="banner">
      <h1>김융님의 등급은 높은음자리표 입니다<img src={question} /></h1>
      <div className='banner-buttons-box'>
      <Button size="middle" to="/mypage/myinfo">정보</Button>
        <Button size="middle" to="/mypage/myvideos">내 동영상</Button>
        <Button size="middle" to="/mypage/mylikes">좋아요</Button>
        <Button size="middle" to="/mypage/mychallenges">챌린지</Button>
        <Button size="middle" to="/mypage/mybettles">배틀</Button>
        <Button size="middle" to="/mypage/mycomments">내 댓글</Button>
      
      </div>
    </div>
  );
};



export default Banner;
