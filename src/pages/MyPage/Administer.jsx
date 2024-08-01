import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "../../assets/css/style.css";
import Layout from "../../components/Layout";
import Button from "../../components/Button";


const Administer = () => {
  const [challengeInfo, setChallengeInfo] = useState({
    ctitle: "",
    upload_date: getCurrentDate(),
    number_of_people: "",
    end_date: "",
    vote_end_date: "",
  });

  // 현재 날짜,시간 함수(화면에는 표시되지 않음)
  function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChallengeInfo({
      ...challengeInfo,
      [name]: value,
    });
  };

  // 입력 필드 초기화 함수
  const resetFields = () => {
    setChallengeInfo({
      ctitle: "",
      upload_date: getCurrentDate(),
      number_of_people: "",
      end_date: "",
      vote_end_date: "",
    });
  };

  // 완료 버튼 클릭 핸들러
  const handleSubmit = () => {
    // 투표 시작일의 00:00:00 설정
    const voteStartDate = new Date(challengeInfo.end_date);
    voteStartDate.setHours(0, 0, 0, 0);

    // 투표 마감일의 23:59:59 설정
    const voteEndDate = new Date(challengeInfo.vote_end_date);
    voteEndDate.setHours(23, 59, 59, 0);


    // 데이터 전송 API
    const challengeData = {
      title: challengeInfo.ctitle,
      numberOfPeople: challengeInfo.number_of_people,
      endDate: voteStartDate.toISOString(),
      voteEndDate: voteEndDate.toISOString(),
      
    };
    console.log("전송정보:", challengeData);

    axiosInstance.post('/api/challenge/auth/new', challengeData)
      .then(response => {
        console.log(response.data);
        alert('변경 완료');
        resetFields();
      })
      .catch(error => {
        console.error('Error submitting challenge info:', error);
      });
  };
  return (
    <Layout showFooter={true} bannerType="admin">
      <div className="main-box-810 mt80">
        <div className="myinfo-box">
          <div className="myinfo-headline">
            <div className="flex align-center">
              <h2 className="ml8">챌린지 업데이트</h2>
            </div>
          </div>
          <div className="info-box">
            <div className="info-item">
              <label>이번주곡</label>
              <input
                type="text"
                name="ctitle"
                value={challengeInfo.ctitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-item">
              <label>인원수</label>
              <input
                type="number"
                name="number_of_people"
                value={challengeInfo.number_of_people}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-item">
              <label>모집 마감일</label>
              <input
                type="date"
                name="end_date"
                value={challengeInfo.end_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-item">
              <label>투표 마감일</label>
              <input
                type="date"
                name="vote_end_date"
                value={challengeInfo.vote_end_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-item justify-center mt60 mb50">
              <Button size="large" onClick={handleSubmit}>완료</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Administer;
