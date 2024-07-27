import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../assets/css/style.css";
import Layout from "../../components/Layout";
import Tag from "../../components/Tagch"; // 수정된 Tag 컴포넌트
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
  const [topVideos, setTopVideos] = useState([]); // 상위 3개의 비디오
  const [filters, setFilters] = useState({
    sort: "uploadDate",
    category: []
  });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const togglePreviousChallenges = () => {
    setShowPreviousChallenges(!showPreviousChallenges);
  };

  const handleChallengeClick = (challenge) => {
    setChallengeData(challenge);
    setShowPreviousChallenges(false);
  };

  const handleVideoClick = (videoId) => {
    navigate(`/challenge/detail/${videoId}`);
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

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/challenge/list`)
      .then((response) => {
        if (response.data.length > 0) {
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
          const filteredAndSortedVideos = applyFiltersAndSort(response.data, filters);
          setVideoList(filteredAndSortedVideos);
          setTopVideos(getTopThreeVideos(response.data)); // 상위 3개 비디오 설정
        })
        .catch((error) => console.error("Error fetching challenge videos:", error));
    }
  }, [challengeData, filters]);

  // 필터링 및 정렬 함수
  const applyFiltersAndSort = (videos, filters) => {
    return videos
      .filter(video => filters.category.length === 0 || filters.category.includes(video.category))
      .sort((a, b) => {
        if (filters.sort === "views") {
          return b.cnt - a.cnt;
        } else if (filters.sort === "video.likeCount") {
          return b.cnt - a.cnt;
        } else {
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        }
      });
  };

  // 상위 3개 비디오를 반환하는 함수
  const getTopThreeVideos = (videos) => {
    return videos
      .sort((a, b) => b.cnt - a.cnt)
      .slice(0, 3);
  };

  // Tag 컴포넌트에서 필터를 업데이트하는 함수
  const handleTagClick = (newFilters) => {
    setFilters(newFilters);
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
          <div className="text-overlay">
            {challengeData ? `${challengeData.title}` : <div className="spinner"></div>}
            <br />
            챌린지 BEST3
          </div>
        </div>
        {topVideos.map((video, index) => (
          <div className="sub-box-300" key={video.videoId} onClick={() => handleVideoClick(video.videoId)}>
            <div className="video-box-ch" style={{ position: "relative" }}>
              <VideoBox_best
                thumbnail={`${process.env.REACT_APP_ASSET_URL}/${video.thumbnailPath}`}
                title={video.title}
                nickname={video.nickname}
                cnt={video.cnt}
              />
              <img className="video-overlay" src={[one, two, three][index]} alt={`Best ${index + 1} 이미지`} />
            </div>
          </div>
        ))}
      </div>

      <div className="main-container-1150 mt80">
        <div className="mr10 ml10">
          <div className="row-direction space-between mb50">
            <Tag onTagClick={handleTagClick} /> {/* Tag 컴포넌트와 핸들러 연결 */}
          </div>
          <div className="videos-grid mb60">
            {videoList.length > 0 ? (
              videoList.map((video) => (
                <div
                  key={video.videoId}
                  onClick={() => handleVideoClick(video.videoId)}
                  style={{ cursor: 'pointer' }}
                >
                  <VideoBox_ch
                    thumbnail={`${process.env.REACT_APP_ASSET_URL}/${video.thumbnailPath}`}
                    title={video.title}
                    nickname={video.nickname}
                    cnt={video.cnt}
                  />
                </div>
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
