import React, { useEffect, useState } from 'react';
import Button from './Button';
import "../assets/css/style.css";
import question from '../assets/images/question.svg';

const BannerMy = () => {
  const [userData, setUserData] = useState({ nickName: "유저닉네임", rank_name: "유저등급" });
  
  useEffect(() => {
    // 임시데이터
    const dummyData = {
      nickName: "이경석",
      rank_name: "8분음표"
    };

    // 설정
    setUserData(dummyData);

    // API 호출
    //fetch('/api/user/auth/:id')
    //   .then(response => response.json())
    //   .then(data => setUserData(data))
    //   .catch(error => console.error('Error fetching data:', error));

  }, []);
  
  return (
    <div className="banner">
      <h1>{userData.nickName}님의 등급은 {userData.rank_name} 입니다<img src={question} /></h1>
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

export default BannerMy;
