import React, { useEffect, useState } from "react";
import axios from 'axios'; // axios import
import Button from "./Button";
import "../assets/css/jun.css";
import ch from "../assets/images/ch.svg";

const BannerChallenge = () => {
  const [challengeData, setChallengeData] = useState(null);

  useEffect(() => {
    // API 호출
    axios.get(`${process.env.REACT_APP_API_URL}/api/challenge/list`)
      .then((response) => {
        // 데이터가 배열이므로 첫 번째 아이템만 사용
        if (response.data.length > 0) {
          setChallengeData(response.data[0]);
        }
      })
      .catch((error) => console.error("Error fetching challenge data:", error));
  }, [process.env.REACT_APP_API_URL]);

  // 날짜를 "YYYY-MM-DD" 형식으로 포맷하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "날짜를 불러오는 중...";
    }
    // YYYY-MM-DD 형식으로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="banner">
      <div className="main-container-1150">
        <img src={ch} alt="Challenge" />
        <div className="ch-banner align-center space-between">
          <h1>{challengeData ? `${challengeData.title}` : "제목을 불러오는 중..."}</h1>
          <Button className="upload-button" to="/challenge/register">
            챌린지 업로드
          </Button>
        </div>
        <div className="ch-day">
          모집 : {challengeData ? formatDate(challengeData.endDate) : "날짜를 불러오는 중..."} 까지
        </div>
        <div className="ch-day">
          투표 : {challengeData ? formatDate(challengeData.voteEndDate) : "날짜를 불러오는 중..."} 까지
        </div>
      </div>
    </div>
  );
};

export default BannerChallenge;
