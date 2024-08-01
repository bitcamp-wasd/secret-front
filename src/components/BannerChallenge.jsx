import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from "./Button";
import "../assets/css/jun.css";
import ch from "../assets/images/ch.svg";

const BannerChallenge = () => {
  const [challengeData, setChallengeData] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/challenge/list`);
        if (response.data.length > 0) {
          setChallengeData(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching challenge data:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchChallengeData();
  }, []);

  // 날짜를 "YYYY-MM-DD" 형식으로 포맷하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "유효하지 않은 날짜";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 로딩 상태일 때 스피너 표시
  if (loading) {
    return (
      <div className="banner">
        <div className="main-container-1150">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="banner">
      <div className="main-container-1150">
        <img src={ch} alt="Challenge" />
        <div className="ch-banner align-center space-between">
          <h1>{challengeData ? challengeData.title : "제목을 불러오는 중..."}</h1>
          <Button className="upload-button" to="/challenge/register">
            챌린지 업로드
          </Button>
        </div>
        <div className="ch-day">
          모집 : {challengeData ? formatDate(challengeData.endDate) : "날짜를 불러오는 중..."} 까지
        </div>
        <div className="ch-day">
          투표 : {challengeData ? formatDate(challengeData.voteEndDate) : "날짜를 불러오는 중..."} 까지
          <span className="voting-status">
            {challengeData ? challengeData.state : "상태를 불러오는 중..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BannerChallenge;
