import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../assets/css/style.css";
import Layout from "../../components/Layout";
import Tag from "../../components/Tag";
import VideoBox_ch from "../../components/VideoBox_ch";
import VideoBox_best from "../../components/VideoBox_best";
import chbest from "../../assets/images/chbest.svg";
import one from "../../assets/images/1.svg";
import two from "../../assets/images/2.svg";
import three from "../../assets/images/3.svg";

const ChallengeList = () => {
  const [showPreviousChallenges, setShowPreviousChallenges] = useState(false);
  const [challengeData, setChallengeData] = useState(null);
  const [previousChallenges, setPreviousChallenges] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const dropdownRef = useRef(null);

  const togglePreviousChallenges = () => {
    setShowPreviousChallenges(!showPreviousChallenges);
  };

  const handleChallengeClick = (challenge) => {
    console.log("Selected challengeId:", challenge.challengeId); // 콘솔 로그 추가
    setChallengeData(challenge);
    setShowPreviousChallenges(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPreviousChallenges(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 최신 챌린지 데이터 요청
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/challenge/list`)
      .then((response) => {
        if (response.data.length > 0) {
          // 응답 데이터에서 `_id` 필드를 사용
          setChallengeData(response.data[0]);
        }
      })
      .catch((error) => console.error("Error fetching challenge data:", error));
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/challenge/complete?pageNumber=0`)
      .then((response) => {
        setPreviousChallenges(response.data);
      })
      .catch((error) => console.error("Error fetching previous challenges:", error));
  }, []);

  useEffect(() => {
    if (challengeData) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/challenge/view`, {
        params: { challengeId: challengeData.challengeId }
      })
        .then((response) => {
          console.log("Fetched videos:", response.data);
          setVideoList(response.data);
        })
        .catch((error) => console.error("Error fetching challenge videos:", error));
    }
  }, [challengeData]);

  const dummyVideo = {
    id: 1,
    title: `챌린지 Best`,
    thumbnail: `https://via.placeholder.com/276x155.25?text=Thumbnail+1`,
    nickname: "김융",
    cnt: '1234',
  };

  return (
    <Layout showFooter={false} bannerType="challenge">
      <div className="challenge-text mt80">
        <div onClick={togglePreviousChallenges} style={{ cursor: "pointer" }}>
          이전 챌린지 보기 ▼
        </div>
        <div
          className={`previous-challenges-dropdown ${showPreviousChallenges ? "open" : ""}`}
          ref={dropdownRef}
        >
          {previousChallenges.map((challenge) => (
            <div
              className="challenge-item"
              key={challenge.challengeId}
              onClick={() => handleChallengeClick(challenge)}
            >
              {challenge.title}
            </div>
          ))}
        </div>
      </div>
      <div className="challenge-container">
        <div className="best-challenge">
          <img src={chbest} alt="챌린지 베스트 이미지" />
          <div className="text-overlay">{challengeData ? `${challengeData.title}` : "제목을 불러오는 중..."} <br />챌린지 BEST3</div>
        </div>
        <div className="sub-box-300">
          <div className="video-box-ch" style={{ position: "relative" }}>
            <VideoBox_best
              key={dummyVideo.id}
              thumbnail={dummyVideo.thumbnail}
              title={dummyVideo.title}
              nickname={dummyVideo.nickname}
              cnt={dummyVideo.cnt}
            />
            <img className="video-overlay" src={one} alt="One 이미지" />
          </div>
        </div>
        <div className="sub-box-300">
          <div className="video-box-ch" style={{ position: "relative" }}>
            <VideoBox_best
              key={dummyVideo.id}
              thumbnail={dummyVideo.thumbnail}
              title={dummyVideo.title}
              nickname={dummyVideo.nickname}
              cnt={dummyVideo.cnt}
            />
            <img className="video-overlay" src={two} alt="Two 이미지" />
          </div>
        </div>
        <div className="sub-box-300">
          <div className="video-box-ch" style={{ position: "relative" }}>
            <VideoBox_best
              key={dummyVideo.id}
              thumbnail={dummyVideo.thumbnail}
              title={dummyVideo.title}
              nickname={dummyVideo.nickname}
              cnt={dummyVideo.cnt}
            />
            <img className="video-overlay" src={three} alt="Three 이미지" />
          </div>
        </div>
      </div>

      <div className="main-container-1150 mt80">
        <div className="mr10 ml10">
          <div className="row-direction space-between mb50">
            <Tag />
          </div>
          <div className="videos-grid mb60">
            {videoList.length > 0 ? (
              videoList.map((video) => (
                <VideoBox_ch
                  key={video.videoId}
                  thumbnail={`${process.env.REACT_APP_ASSET_URL}/${video.thumbnailPath}`}
                  title={video.title}
                  nickname={video.nickname}
                  cnt={video.cnt}
                />
              ))
            ) : (
              <p>첫 챌린지를 등록해보세요!</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeList;
