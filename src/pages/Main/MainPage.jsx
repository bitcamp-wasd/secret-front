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
  const [loading, setLoading] = useState(false); // 로딩 상태를 관리하는 상태 변수

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      console.log("검색어:", event.target.value);
    }
  };

  const loadMoreVideos = () => {
    setLoading(true); // 데이터를 불러오는 중임을 표시
    setTimeout(() => { // setTimeout을 이용하여 임시로 로딩을 보여줍니다.
      setVisibleVideos((prevVisibleVideos) => {
        const newVisibleVideos = prevVisibleVideos + 12;
        setVideos(allVideos.slice(0, newVisibleVideos));
        setLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 변경
        return newVisibleVideos;
      });
    }, 1000); // 임시로 1초 후에 데이터를 로딩한다고 가정합니다.
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 50 &&
      !loading // 로딩 중이 아닐 때만 추가 데이터 로드
    ) {
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
          {loading && <div className="loading-indicator">로딩 중...</div>}
        </div>
      </div>
    </Layout>
  );
};

export default MainPage;
