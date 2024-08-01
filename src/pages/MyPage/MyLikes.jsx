import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "../../assets/css/style.css";
import Layout from "../../components/Layout";
import VideoBox from "../../components/VideoBox";

const MyLikes = () => {
  const [videos, setVideos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef(null); 
  const navigate = useNavigate(); 

  const fetchVideos = async (page) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/api/video/like/auth/like?pageNumber=${page}`
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
        setPageNumber(page + 1); 
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      fetchVideos(pageNumber); 
    }
  };

  useEffect(() => {
    fetchVideos(pageNumber); 
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: null, 
      rootMargin: "0px",
      threshold: 0.1, 
    });

    if (videos.length > 0) {
      observer.current.observe(document.querySelector(".videos-grid > div:last-child"));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect(); 
      }
    };
  }, [videos]); 

const handleVideoClick = (videoId) => {
  navigate(`/video/play/${videoId}`); 
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

export default MyLikes;
