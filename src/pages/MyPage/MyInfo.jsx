import React, { useEffect, useState } from "react";
import "../../assets/css/style.css";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import UserIcon from "../../assets/images/user_icon.svg";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from 'react-router-dom';

const MyInfo = () => {
  const [userInfo, setUserInfo] = useState({
    email: "초기이메일",
    nickName: "초기닉네임",
    point: 100
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //API 호출
        const response = await axiosInstance.get("/api/user/auth/myinfo");
        const userData = response.data;
        setUserInfo({
          email: userData.email,
          nickName: userData.nickName,
          point: userData.point
        });
      } catch (error) {
        console.error('Token verification failed:', error);
        // 토큰이 유효하지 않은 경우 로그인 페이지로 리디렉션
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

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
