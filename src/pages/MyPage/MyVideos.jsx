import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../../assets/css/style.css";
import VideoBox from "../../components/VideoBox";
import Layout from "../../components/Layout";

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // 페이지 번호를 0부터 시작
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef(null); // Intersection Observer를 위한 useRef 사용
  const navigate = useNavigate(); 

  const fetchVideos = async (page) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/api/video/post/auth/myposts?pageNumber=${page}`
      );
      const newVideos = response.data;

      if (newVideos.length === 0) {
        setHasMore(false);
      } else {
        setVideos((prevVideos) => {
          const uniqueNewVideos = newVideos.filter(
            (newVideo) =>
              !prevVideos.some((video) => video.videoId === newVideo.videoId)
          );
          return [...prevVideos, ...uniqueNewVideos];
        });
        setPageNumber(page + 1); // 다음 페이지 번호 설정
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer의 콜백 함수
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      fetchVideos(pageNumber); // 다음 페이지 로드
    }
  };

  useEffect(() => {
    fetchVideos(pageNumber); // 초기 로딩 시 첫 번째 페이지 로드
  }, []);

  useEffect(() => {
    // Intersection Observer 설정
    observer.current = new IntersectionObserver(handleObserver, {
      root: null, // viewport를 기준으로 감시
      rootMargin: "0px",
      threshold: 0.1, // 요소의 10% 이상이 뷰포트에 들어올 때 콜백 호출
    });

    if (videos.length > 0) {
      // videos 배열이 업데이트될 때마다 observer 연결
      observer.current.observe(document.querySelector(".videos-grid > div:last-child"));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect(); // 컴포넌트가 언마운트될 때 observer 정리
      }
    };
  }, [videos]); // videos 배열의 변화를 감지하여 observer 연결

// 동영상 클릭 핸들러
const handleVideoClick = (videoId) => {
  navigate(`/video/play/${videoId}`); // PlayVideo 페이지로 네비게이션
};

  return (
    <Layout showFooter={false} bannerType="my">
      <div className="main-container-1150 mt80">
        <div className="row-direction space-between"></div>
        <div className="videos-grid">
          {videos.map((video) => (
            <div key={video.videoId} onClick={() => handleVideoClick(video.videoId)}>
              <VideoBox
                thumbnail={video.thumbnail}
                title={video.title}
                views={video.views}
                uploadDate={video.uploadDate}
                length={video.length}
                nickname={video.nickname}
              />
            </div>
          ))}
        </div>
        {loading && <p>Loading more videos...</p>}
      </div>
    </Layout>
  );
};

export default MyVideos;
