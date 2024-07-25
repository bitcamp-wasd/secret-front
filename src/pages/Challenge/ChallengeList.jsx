import React, { useState, useEffect, useRef } from "react";
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
  const dropdownRef = useRef(null); // useRef를 이용해 드롭다운 요소를 참조합니다.

  const togglePreviousChallenges = () => {
    setShowPreviousChallenges(!showPreviousChallenges);
  };

  // useEffect를 이용하여 컴포넌트가 마운트될 때 한 번 이벤트 리스너를 추가합니다.
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


  const dummyVideo = {
    id: 1,
    title: `챌린지 Best`,
    thumbnail: `https://via.placeholder.com/276x155.25?text=Thumbnail+1`,
    nickname: "김융",
    views: "1234",
    uploadDate: "2일전",
    length: "12:23",
    like: "390"
  };

  // 더미 데이터 생성
  const dummyVideos = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Video ${index + 1}`,
    thumbnail: `https://via.placeholder.com/276x155.25?text=Thumbnail+${index + 1}`,
    nickname: "김융",
    views: "1234",
    uploadDate: "2일전",
    length: "12:23",
    like: "390"
  }));

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
          <div className="challenge-item">챌린지 1</div>
          <div className="challenge-item">챌린지 2</div>
          <div className="challenge-item">챌린지 3</div>
        </div>
      </div>
      <div className="challenge-container">
        <div className="best-challenge">
          <img src={chbest} alt="챌린지 베스트 이미지" />
          <div className="text-overlay">캐논변주곡 <br />챌린지 BEST3</div>
        </div>
        <div className="sub-box-300">
          <div className="video-box-ch" style={{ position: "relative" }}>
            <VideoBox_best
              key={dummyVideo.id}
              thumbnail={dummyVideo.thumbnail}
              title={dummyVideo.title}
              nickname={dummyVideo.nickname}
              views={dummyVideo.views}
              uploadDate={dummyVideo.uploadDate}
              length={dummyVideo.length}
              like={dummyVideo.like}
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
              views={dummyVideo.views}
              uploadDate={dummyVideo.uploadDate}
              length={dummyVideo.length}
              like={dummyVideo.like}
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
              views={dummyVideo.views}
              uploadDate={dummyVideo.uploadDate}
              length={dummyVideo.length}
              like={dummyVideo.like}
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
          <div className="videos-grid">
            {dummyVideos.map((video) => (
              <VideoBox_ch
                key={video.id}
                thumbnail={video.thumbnail}
                title={video.title}
                nickname={video.nickname}
                views={video.views}
                uploadDate={video.uploadDate}
                length={video.length}
                like={video.like}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeList;
