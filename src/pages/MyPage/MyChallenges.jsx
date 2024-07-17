import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import VideoBox_hart from '../../components/VideoBox_hart';
import Layout from '../../components/Layout';


const MyChallenges = () => {
  // 더미 데이터 생성
  const allVideos = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    title: `Video ${index + 1} 내 챌린지 페이지에요.`,
    thumbnail: `https://via.placeholder.com/276x155.25?text=Thumbnail+${index + 1}`,
    author: "홍길동",
  }));

  const [visibleVideos, setVisibleVideos] = useState(12);
  const [videos, setVideos] = useState(allVideos.slice(0, visibleVideos));

  const loadMoreVideos = () => {
    setVisibleVideos((prevVisibleVideos) => {
      const newVisibleVideos = prevVisibleVideos + 12;
      setVideos(allVideos.slice(0, newVisibleVideos));
      return newVisibleVideos;
    });
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 50) {
      loadMoreVideos();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout showFooter={false} bannerType="my">
      <div className="main-container-1150 mt80">


        <div className="row-direction space-between mb50">
        </div>
        <div className="videos-grid">
          {videos.map((video) => (
            <VideoBox_hart
              key={video.id}
              thumbnail={video.thumbnail}
              title={video.title}
              author={video.author}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default MyChallenges;
