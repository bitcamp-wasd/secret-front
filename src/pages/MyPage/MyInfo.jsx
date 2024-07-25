import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "../../assets/css/style.css";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import UserIcon from "../../assets/images/user_icon.svg";


const MyInfo = () => {
  const [userInfo, setUserInfo] = useState({
    email: "초기이메일",
    nickname: "초기닉네임",
    point: 100
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        //API 호출
        const response = await axiosInstance.get("/api/user/auth/myinfo");
        const userData = response.data;
        setUserInfo({
          email: userData.email,
          nickname: userData.nickname,
          point: userData.point
        });
        setLoading(false);
      } catch (error) {
        console.error('Token verification failed:', error);

      }
    };

    loadUserInfo();
  }, []);

  // 데이터 로딩 중일 때 스피너 표시
  if (loading) {
    return (
      <div className="banner">
        <div className="main-container-1150">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <Layout showFooter={true} bannerType="my">
      <div className="my-container-810 mt120">
        <div className="myinfo-box">
          <div className="myinfo-headline">
            <div className="flex align-center">
              <img src={UserIcon} alt="usericon" className="usericon" />
              <h2 className="ml8">내 정보</h2>
            </div>

            <Button size="tag" to="/mypage/myinfoedit">수정하기</Button>

          </div>

          <div className="info-box">
            <div className="info-item">
              <label>닉네임</label>
              <div className="info-content">
                <span>{userInfo.nickname}</span>
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
