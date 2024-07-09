import React, { useEffect, useState } from "react";
import Button from "./Button";
import "../assets/css/style.css";
import question from "../assets/images/question.svg";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const BannerMy = () => {
  const [userData, setUserData] = useState({
    nickname: "유저닉네임",
    rankName: "유저등급",
  });
  const navigate = useNavigate();

  const openPopup = () => {
    window.open(
      "/mypage/rank",
      "RankPopup",
      "width=700,height=500"
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출
        const response = await axiosInstance.get("/api/user/auth/myinfo");
        const userData = response.data;
        setUserData({
          nickname: userData.nickname,
          rankName: userData.rankName,
        });
      } catch (error) {
        console.error("Token verification failed:", error);
        // 토큰이 유효하지 않은 경우 로그인 페이지로 리디렉션
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="banner">
      <div className="main-container-1150">
        <h1 className="banner-my">
          {userData.nickname}님의 등급은{" "}
          <span className="rank-name">{userData.rankName}</span> 입니다
          <img src={question} alt="question" onClick={openPopup} className="ml8" />
        </h1>
        <div className="banner-buttons-box">
          <Button size="middle" to="/mypage/myinfo">
            정보
          </Button>
          <Button size="middle" to="/mypage/myvideos">
            내 동영상
          </Button>
          <Button size="middle" to="/mypage/mylikes">
            좋아요
          </Button>
          <Button size="middle" to="/mypage/mychallenges">
            챌린지
          </Button>
          <Button size="middle" to="/mypage/mybettles">
            배틀
          </Button>
          <Button size="middle" to="/mypage/mycomments">
            내 댓글
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerMy;
