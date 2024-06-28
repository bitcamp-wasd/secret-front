
import React from "react";
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";

import "../../assets/css/style.css";
import "../../components/Layout";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import Tag from "../../components/Tag";
import VideoBox from "../../components/VideoBox";
import Upload from "../../assets/images/upload.svg";

const MainPage = () => {
  const allVideos = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    title: `Video ${index + 1} 이렇게 제목이 길면 너가 뭘 할 수 있는지 궁금한데`,
    thumbnail: `https://via.placeholder.com/276x155.25?text=Thumbnail+${index + 1}`,
    author: "홍길동",
  }));

  const [visibleVideos, setVisibleVideos] = useState(12);
  const [videos, setVideos] = useState(allVideos.slice(0, visibleVideos));

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      console.log("검색어:", event.target.value);
    }
  };

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
    <Layout showFooter={false}>
      <div className="main-container-1150 mt80">

        
        <div className="row-direction space-between mb50">
          <Tag />

          <div className="tag-main-right">
            <Button size="tag" to="/video/register">
              <span className="icon-wrapper">
                <img src={Upload} alt="upload" />
              </span>
              동영상 업로드
            </Button>

            <input
              type="text"
              placeholder="검색"
              onKeyDown={handleSearch}
              className="search-input"
            />
          </div>
        </div>
        <div className="videos-grid">
          {videos.map((video) => (
            <VideoBox
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

export default MainPage;
