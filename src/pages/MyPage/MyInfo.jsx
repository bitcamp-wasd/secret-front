import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "../../assets/css/style.css";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import UserIcon from "../../assets/images/user_icon.svg";

const MyInfo = () => {
  const [userInfo, setUserInfo] = useState({
    email: "user@example.com",
    nickName: "유저닉네임",
    point: 100
  });

  useEffect(() => {
    // 임시데이터
    const dummyData = {
      email: "noton2@naver.com",
      nickName: "이경석",
      point: 1500
    };

    // 설정
    setUserInfo(dummyData);

    // API 호출
    // fetch('/api/user/auth/myinfo')
    //   .then(response => response.json())
    //   .then(data => setUserInfo(data))
    //   .catch(error => console.error('Error fetching data:', error));

  }, []);

  return (
    <Layout showFooter={true} bannerType="my">
      <div className="main-container-810 mt120">
        <div class="myinfo-box">
          <div class="myinfo-headline">
            <div class="flex align-center">
              <img src={UserIcon} alt="usericon" className="usericon" />
              <h2 class="ml8">내 정보</h2>
            </div>
            
            <Button size="tag" to="/mypage/myinfoedit">수정하기</Button>
            
          </div>

          <div className="info-box">
            <div className="info-item">
              <label>닉네임</label>
              <div className="info-content">
                <span>{userInfo.nickName}</span>
              </div>
            </div>
            <div className="info-item">
              <label>이메일</label>
              <div className="info-content">
                <span>{userInfo.email}</span>
              </div>
            </div>
            <div className="info-item">
              <label>포인트</label>
              <div className="info-content">
                <span>{userInfo.point}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyInfo;
